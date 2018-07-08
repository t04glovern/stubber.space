import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import StubEventListItem from "./StubEventListItem";

class EventList extends Component {
  render() {
    const { stubEvents, web3 } = this.props;

    let stubEventMap = [];
    for (var x = 0; x < stubEvents[0].length; x++) {
      stubEventMap[x] = {
        artist: stubEvents[0][x],
        id: web3.utils.hexToAscii(stubEvents[1][x]).replace(/\0.*$/g,''),
        name: web3.utils.hexToAscii(stubEvents[2][x]).replace(/\0.*$/g,''),
        price: web3.utils.fromWei(stubEvents[3][x]),
        time: stubEvents[4][x],
        sales: stubEvents[5][x],
        salesCap: stubEvents[6][x]
      };
    }

    return (
      <Grid.Row columns={3}>
        {stubEventMap &&
          stubEventMap.map(stubEvent => (
            <StubEventListItem key={stubEvent.id} stubEvent={stubEvent} />
          ))}
      </Grid.Row>
    );
  }
}

export default EventList;
