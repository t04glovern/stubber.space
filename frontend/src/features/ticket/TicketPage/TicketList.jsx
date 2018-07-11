import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import TicketListItem from "./TicketListItem";

class TicketList extends Component {
  render() {
    const { tickets } = this.props;
    let ticketMap = [];
    for (var x = 0; x < tickets.length; x++) {
      ticketMap[x] = {
        id: x,
        number: tickets[x]
      };
    }

    return (
      <Grid.Row stretched>
        {ticketMap &&
          ticketMap.map(ticket => (
            <TicketListItem key={ticket.id} ticket={ticket} />
          ))}
      </Grid.Row>
    );
  }
}

export default TicketList;
