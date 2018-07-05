import React, { Component } from "react";
import { Button, Segment, Icon, Label, List, Item, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EventListAttendee from "./EventListAttendee";
import { objectToArray } from "../../../app/common/util/helpers";
import StubEventSalesBar from "./StubEventSalesBar";

class StubEventListItem extends Component {
  render() {
    const { stubEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${stubEvent.id}`}>
                  {stubEvent.name}
                </Item.Header>
                <Item.Description>
                  Hosted by{" "}
                  <Link to={`/profile/${stubEvent.artist}`}>{stubEvent.artist}</Link>
                </Item.Description>
                {stubEvent.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="This event has been cancelled."
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row width={16}>
              <Grid.Column width={4}>
                <Icon name="clock" /> {stubEvent.time}
              </Grid.Column>
              <Grid.Column width={4}>
              <Icon name="marker" /> {stubEvent.location}
              </Grid.Column>
              <Grid.Column width={8}>
              <Icon name="ticket" /> {stubEvent.sales}{" "} sold out of {stubEvent.salesCap}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {stubEvent.attendees &&
              objectToArray(stubEvent.attendees).map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
          <StubEventSalesBar sales={stubEvent.sales} salesCap={stubEvent.salesCap} />
        </Segment>
        <Segment clearing>
          <Button
            as={Link}
            to={`/event/${stubEvent.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default StubEventListItem;
