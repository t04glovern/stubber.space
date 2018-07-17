import React from "react";
import { Dimmer, Grid, Loader, Image } from "semantic-ui-react";

const MetaMaskConnect = ({ inverted }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Image wrapped size="small" src="/assets/fox.svg" />
              Web3 Service Unknown 😱 Please install / login to{" "}
              <a href="https://metamask.io/">metamask</a>!
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Loader>
    </Dimmer>
  );
};

export default MetaMaskConnect;
