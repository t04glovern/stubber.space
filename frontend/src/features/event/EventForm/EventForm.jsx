/*global google*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Script from "react-load-script";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  hasLengthBetween
} from "revalidate";
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Icon,
  Image
} from "semantic-ui-react";
import { createEvent, updateEvent, cancelToggle } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import NumberInput from "../../../app/common/form/NumberInput";
import DummyEvent from "./DummyEvent";

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: "alternative", text: "Alternative", value: "alternative" },
  { key: "blues", text: "Blues", value: "blues" },
  { key: "classical", text: "Classical", value: "classical" },
  { key: "country", text: "Country", value: "country" },
  { key: "dance", text: "Dance", value: "dance" },
  { key: "easylistening", text: "Easy Listening", value: "easylistening" },
  { key: "electronic", text: "Electronic", value: "electronic" },
  { key: "europeanfolkpop", text: "European (Folk Pop)", value: "europeanfolkpop" },
  { key: "hiphoprap", text: "Hip Hop / Rap", value: "hiphoprap" },
  { key: "indiepop", text: "Indie Pop", value: "indiepop" },
  { key: "gospel", text: "Gospel", value: "gospel" },
  { key: "asianpop", text: "Asian Pop", value: "asianpop" },
  { key: "jazz", text: "Jazz", value: "jazz" },
  { key: "latin", text: "Latin", value: "latin" },
  { key: "newage", text: "New Age", value: "newage" },
  { key: "opera", text: "Opera", value: "opera" },
  { key: "pop", text: "Pop", value: "pop" },
  { key: "rbsoul", text: "R&B / Soul", value: "rbsoul" },
  { key: "reggae", text: "Reggae", value: "reggae" },
  { key: "rock", text: "Rock", value: "rock" },
  { key: "singerfolk", text: "Singer (Folk)", value: "singerfolk" },
  { key: "worldmusicbeats", text: "World Music / Beats", value: "worldmusicbeats" }
];

const validate = combineValidators({
  title: composeValidators(
    isRequired({ message: "The event title is required" }),
    hasLengthBetween(4, 30)({
      message: "Title must be less than 30 characters"
    })
  )(),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be atleast 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date"),
  ticketcap: isRequired("Ticket Cap"),
  ticketprice: isRequired("Ticket Price")
});

class EventForm extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
    this.drizzle = context.drizzle;
  }

  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false,
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoaded = () =>
    this.setState({
      scriptLoaded: true
    });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng;
      }
      await this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(
        values,
        this.drizzle,
        this.state.image,
        this.state.fileName
      );
      this.props.history.push("/events");
    }
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr.success("Success!", "Photo has been uploaded");
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  render() {
    const {
      loading,
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle
    } = this.props;
    return (
      <Grid stackable>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSElKjzs646chUBuPWJwuNdtEzCST1j3A&libraries=places"
          onLoad={this.handleScriptLoaded}
        />

        <Grid.Row width={10} columns={3}>
          <Grid.Column width={3}>
            <Header color="violet" sub content="Step 1 - Add Photo" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ paddingTop: "30px", textAlign: "center" }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to add" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header sub color="violet" content="Step 2 - Resize image" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: 112 }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={16 / 9}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Header sub color="violet" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: "200px", minWidth: "112px" }}
                  src={this.state.cropResult}
                />
              </div>
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Column width={10}>
          <Segment>
            <Header sub color="violet" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Genre of Music"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="violet" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                placeholder="Event City"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ["establishment"]
                  }}
                  placeholder="Event Venue"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date and Time of event"
              />
              <Header sub color="violet" content="Event Ticketing" />
              <Form.Group widths={2}>
                <Field
                  name="ticketcap"
                  type="number"
                  component={NumberInput}
                  placeholder="Total Tickets on sale"
                />
                <Field
                  name="ticketprice"
                  type="number"
                  component={NumberInput}
                  placeholder="Price of Ticket (ETH)"
                />
              </Form.Group>
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                disabled={loading}
                onClick={this.props.history.goBack}
                type="button"
              >
                Cancel
              </Button>
              {event.id && (
                <Button
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                  type="button"
                  color={event.cancelled ? "green" : "red"}
                  floated="right"
                  content={
                    event.cancelled ? "Reactivate Event" : "Cancel Event"
                  }
                />
              )}
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <DummyEvent />
        </Grid.Column>
      </Grid>
    );
  }
}

EventForm.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object
};

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
      EventForm
    )
  )
);
