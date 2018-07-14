import React, { Component } from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";
import { Menu, Container, Item, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus
  };
};

class FootBar extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
  }

  render() {
    let { drizzleStatus } = this.props;
    if (!drizzleStatus.initialized) return <LoadingComponent inverted={true} />;
    let address = this.contracts["StubToken"].address;
    return (
      <Menu inverted fixed="bottom">
        <Container>
          <Item>
            <Item.Content>
              <Grid.Row>
                <Item.Description>
                  Checkout the contract!{" "}
                  <a
                    style={{ color: "orange" }}
                    href={`https://ropsten.etherscan.io/address/${address}`}
                    target="_target"
                  >
                    <strong>
                      {address.substring(0, 12)}
                      {"..."}
                    </strong>
                  </a>
                </Item.Description>
              </Grid.Row>
            </Item.Content>
          </Item>
        </Container>
      </Menu>
    );
  }
}

FootBar.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object
};

export default drizzleConnect(FootBar, mapStateToProps);
