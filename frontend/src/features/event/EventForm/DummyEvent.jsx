import React, { Component } from "react";
import { Button, Card, Icon, Image, Grid } from "semantic-ui-react";
import format from "date-fns/format";

class DummyEvent extends Component {
  render() {
    return (
      <Grid.Column width={8}>
        <Card fluid>
          <Image src="/assets/categoryImages/music.jpg" />
          <Card.Content>
            <Card.Header>
              <i>Event Title</i>
            </Card.Header>
            <Card.Meta>
              Hosted by <i>Artist Address</i>
            </Card.Meta>
            <Card.Description>
              <Icon name="clock" /> {format(new Date(), "dddd Do MMMM")} at{" "}
              {format(new Date(), "HH:mm")} |
              <Icon name="marker" /> <i>Event Venue</i>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="ticket" /> 12
            {" / "}
            56000
            <Button color="violet" floated="right" content="View" disabled />
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default DummyEvent;
