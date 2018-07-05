import React, { Component } from "react";
import StubEventListItem from "./StubEventListItem";

class EventList extends Component {
  render() {
    const { stubEvents, web3 } = this.props;

    let stubEventMap = [];
    for (var x = 0; x < stubEvents[0].length; x++) {
      stubEventMap[x] = {
        id: x,
        artist: stubEvents[0][x],
        name: web3.utils.hexToAscii(stubEvents[1][x]),
        location: web3.utils.hexToAscii(stubEvents[2][x]),
        price: web3.utils.fromWei(stubEvents[3][x]),
        time: stubEvents[4][x],
        sales: stubEvents[5][x],
        salesCap: stubEvents[6][x]
      };
    }

    return (
      <div>
        {stubEventMap &&
          stubEventMap.map(stubEvent => (
            <StubEventListItem key={stubEvent.id} stubEvent={stubEvent} />
          ))}
      </div>
    );
  }
}

export default EventList;
