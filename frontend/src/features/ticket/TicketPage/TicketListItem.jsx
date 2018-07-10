import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

class TicketListItem extends Component {
  render() {
    const { ticket } = this.props;
    return (
      <Segment.Group>
        <Segment>
          {ticket.name}
        </Segment>
      </Segment.Group>
    );
  }
}

export default TicketListItem;
