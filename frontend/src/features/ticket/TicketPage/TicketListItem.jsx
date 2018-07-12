import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { drizzleConnect } from "drizzle-react";
import { Segment, Card, Icon, Label, Popup } from "semantic-ui-react";
import format from "date-fns/format";

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    StubToken: state.contracts.StubToken,
    accounts: state.accounts
  };
};

const mapState = state => ({
  tickets: state.tickets,
  loading: state.async.loading
});

class TicketListItem extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
  }

  state = {
    loadingDrizzle: true
  };

  async componentDidMount() {
    // Checks to see if Drizzle finished loading
    let status = this.props.drizzleStatus;
    if (status && status.initialized) {
      this.setState({
        loadingDrizzle: false
      });
    }
  }

  render() {
    const { ticket, StubToken } = this.props;
    if (!this.state.loadingDrizzle) {
      var storedData = this.contracts["StubToken"].methods[
        "getTicketDetails"
      ].cacheCall(ticket.number);
      var stubTicket =
        StubToken.synced && StubToken["getTicketDetails"][storedData]
          ? StubToken["getTicketDetails"][storedData].value
          : "Loading...";
    }
    return (
      <Segment.Group style={{ background: "purple" }}>
        {stubTicket &&
          stubTicket !== "Loading..." && (
            <Segment>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    {this.web3.utils
                      .hexToAscii(stubTicket.name)
                      .replace(/\0.*$/g, "")}
                  </Card.Header>
                  <Card.Meta>
                    <Popup
                      trigger={
                        <Label
                          size="small"
                          href={`https://ropsten.etherscan.io/address/${
                            stubTicket.artist
                          }`}
                        >
                          {stubTicket.artist}
                        </Label>
                      }
                      content={stubTicket.artist}
                      position="bottom center"
                      size="tiny"
                    />
                  </Card.Meta>
                  <Card.Description>
                    <Icon name="money" />{" "}
                    {this.web3.utils.fromWei(stubTicket.price)}
                    <strong>{" ETH"}</strong>
                  </Card.Description>
                  <Card.Description>
                    <Icon name="clock" />{" "}
                    {format(new Date(Number(stubTicket.time)), "ddd Do MMM")} at{" "}
                    {format(new Date(Number(stubTicket.time)), "h:mm A")}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Segment>
          )}
      </Segment.Group>
    );
  }
}

TicketListItem.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object
};

export default connect(
  mapState,
  null
)(drizzleConnect(TicketListItem, mapStateToProps));
