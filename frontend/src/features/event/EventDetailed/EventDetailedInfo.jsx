import React, { Component } from "react";
import { Segment, Grid, Icon, Button } from "semantic-ui-react";
import EventDetailedMap from "./EventDetailedMap";
import format from "date-fns/format";

class EventDetailedInfo extends Component {
  state = {
    showMap: false
  };

  componentWillUnmount() {
    this.setState({
      showMap: false
    });
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { event } = this.props;
    let eventDate;
    if (event.date) {
      eventDate = event.date.toDate();
    }
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="violet" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="violet" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(eventDate, "dddd Do MMM")} at{" "}
                {format(eventDate, "h:mm A")}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="violet" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                onClick={this.showMapToggle}
                color="violet"
                size="tiny"
                content={this.state.showMap ? "Hide Map" : "Show Map"}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap && (
          <EventDetailedMap
            lat={event.venueLatLng.lat}
            lng={event.venueLatLng.lng}
          />
        )}
      </Segment.Group>
    );
  }
}

export default EventDetailedInfo;
