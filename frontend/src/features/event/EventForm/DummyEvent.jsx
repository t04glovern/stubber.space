import React, { Component } from "react";
import {
  Button,
  Segment,
  Icon,
  Image,
  List,
  Item,
  Grid,
  Header
} from "semantic-ui-react";
import format from "date-fns/format";

class DummyEvent extends Component {
  render() {
    return (
      <Grid.Column width={8}>
        <Segment>
          <Header size="small" content="Example Event Layout" />
        </Segment>
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" circular src="/assets/user.png" />
                <Item.Content>
                  <Item.Header>
                    <i>Event Title</i>
                  </Item.Header>
                  <Item.Description>
                    Hosted by <i>Artist Address</i>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment>
            <span>
              <Icon name="clock" /> {format(new Date(), "dddd Do MMMM")} at{" "}
              {format(new Date(), "HH:mm")} |
              <Icon name="marker" /> <i>Event Venue</i>
            </span>
          </Segment>
          <Segment secondary>
            <List horizontal>
              <List.Item>
                <Image size="mini" circular src="/assets/user.png" />
              </List.Item>
              <List.Item>
                <Image size="mini" circular src="/assets/user.png" />
              </List.Item>
              <List.Item>
                <Image size="mini" circular src="/assets/user.png" />
              </List.Item>
            </List>
          </Segment>
          <Segment clearing>
            <Button color="violet" floated="right" content="View" disabled />
          </Segment>
        </Segment.Group>
      </Grid.Column>
    );
  }
}

export default DummyEvent;
