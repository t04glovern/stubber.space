import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import MetaMaskConnect from "./MetaMaskConnect";

class LoadingComponent extends Component {
  state = {
    loader: <Loader content="Loading..." />
  };

  componentDidMount = () => {
    setTimeout(
      function() {
        this.setState({ loader: <MetaMaskConnect inverted={true} /> });
      }.bind(this),
      5000
    );
  };

  render() {
    const { inverted } = this.props;
    const { loader } = this.state;
    return (
      <Dimmer inverted={inverted} active={true}>
        {loader}
      </Dimmer>
    );
  }
}

export default LoadingComponent;
