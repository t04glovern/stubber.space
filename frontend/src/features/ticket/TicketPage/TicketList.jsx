import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
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
      <Grid.Column>
        {ticketMap && ticketMap.length > 0 ?
          ticketMap.map(ticket => (
            <TicketListItem key={ticket.id} ticket={ticket} />
          )) : <Header content="You don't own any tickets yet!" />}
        </Grid.Column>
    );
  }
}

export default TicketList;
