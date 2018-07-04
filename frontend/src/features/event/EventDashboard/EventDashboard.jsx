import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Loader } from "semantic-ui-react";
import { drizzleConnect } from "drizzle-react";
import { ContractData } from "drizzle-react-components";
import EventList from "../EventList/EventList";
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
  }

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadingDrizzle: true,
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
    // Checks to see if Drizzle finished loading
    let status = this.props.drizzleStatus;
    if (status && status.initialized) {
      this.setState({
        loadingDrizzle: false
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
    const { loading, activities, drizzleStatus, accounts } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingDrizzle) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          {drizzleStatus.initialized && (
            <div>
              <p>
                <strong>
                  <ContractData
                    contract="StubToken"
                    method="symbol"
                    hideIndicator
                  />
                  's Sold
                </strong>:{" "}
                <ContractData
                  contract="StubToken"
                  method="totalSupply"
                  methodArgs={[{ from: accounts[0] }]}
                />
              </p>
            </div>
          )}
          <div ref={this.handleContextRef}>
            <EventList
              loading={loading}
              moreEvents={moreEvents}
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity
            activities={activities}
            contextRef={this.state.handleContextRef}
          />
        </Grid.Column>
        <Grid.Column width={10}>
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
)(
  drizzleConnect(EventDashboard, mapStateToProps),
  firestoreConnect(query)(EventDashboard)
);
