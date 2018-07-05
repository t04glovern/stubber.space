import React, { Component } from "react";
import { Progress } from "semantic-ui-react";

class StubEventSalesBar extends Component {
  render() {
    const { sales, salesCap } = this.props;
    return (
        <Progress percent={sales / salesCap * 100} indicating>
        </Progress>
    );
  }
}

export default StubEventSalesBar;
