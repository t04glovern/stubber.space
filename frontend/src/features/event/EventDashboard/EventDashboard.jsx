import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Loader } from "semantic-ui-react";
import { drizzleConnect } from "drizzle-react";
import StubEventList from "../EventList/StubEventList";
import { getEventsForDashboard } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
];

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    StubToken: state.contracts.StubToken,
    accounts: state.accounts
  };
};

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
  }

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: []
  };

  async componentDidMount() {
    // Checks to see if Events finished loading
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleContextRef = contextRef =>
    this.setState({
      contextRef
    });

  render() {
    const {
      loading,
      activities,
      StubToken,
      accounts,
      drizzleStatus
    } = this.props;
    if (!drizzleStatus.initialized) return <LoadingComponent inverted={true} />;
    var storedData = this.contracts["StubToken"].methods[
      "getAllEvents"
    ].cacheCall({ from: accounts[0] });
    var stubEvents =
      StubToken.synced && StubToken["getAllEvents"][storedData]
        ? StubToken["getAllEvents"][storedData].value
        : "Loading...";
    return (
      <Grid stackable>
        <Grid.Column width={12}>
          {stubEvents !== "Loading..." && (
            <div ref={this.handleContextRef}>
              <StubEventList stubEvents={stubEvents} web3={this.web3} events={this.state.loadedEvents} />
            </div>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <EventActivity
            activities={activities}
            contextRef={this.state.handleContextRef}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

EventDashboard.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object
};

export default connect(
  mapState,
  actions
)(drizzleConnect(firestoreConnect(query)(EventDashboard), mapStateToProps));
