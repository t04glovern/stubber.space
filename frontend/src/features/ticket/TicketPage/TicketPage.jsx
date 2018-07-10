import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";
import { drizzleConnect } from "drizzle-react";
import { getTicketsForPage } from "../ticketActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TicketList from "./TicketList";

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    accounts: state.accounts
  };
};

const mapState = state => ({
  tickets: state.tickets,
  loading: state.async.loading
});

const actions = {
  getTicketsForPage
};

class TicketPage extends Component {
  constructor(props, context) {
    super(props);
    this.drizzle = context.drizzle;
  }

  state = {
    loadingInitial: true,
    loadingDrizzle: true
  };

  async componentDidMount() {
    let tickets = [{
      id: 'ywz0UMwANjDzLBEQTckR',
      name: "Kendrick Lamar",

    }];
    // Checks to see if Events finished loading
    let items = await this.props.getTicketsForPage(tickets);
    if (items) {
      this.setState({
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
  };

  render() {
    const { loading, tickets } = this.props;
    const { loadingDrizzle } = this.state;
    if (loadingDrizzle && !tickets) return <LoadingComponent inverted={true} />;
    return (
      <Grid stackable>
        <Grid.Column width={12}>
          <TicketList
            loading={loading}
            tickets={tickets}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

TicketPage.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object
};

export default connect(
  mapState,
  actions
)(drizzleConnect((TicketPage), mapStateToProps));
