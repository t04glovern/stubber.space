import React, { Component } from "react";
import TicketListItem from "./TicketListItem";

class TicketList extends Component {
  render() {
    const { tickets } = this.props;
    return (
      <div>
        {tickets &&
          tickets.map(ticket => <TicketListItem key={ticket.id} ticket={ticket} />)}
      </div>
    );
  }
}

export default TicketList;
