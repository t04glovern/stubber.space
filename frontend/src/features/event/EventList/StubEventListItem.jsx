import React, { Component } from "react";
import {
  Button,
  Segment,
  Icon,
  Label,
  List,
  Item,
  Grid,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import EventListAttendee from "./EventListAttendee";
import { objectToArray } from "../../../app/common/util/helpers";

class StubEventListItem extends Component {
  render() {
    const { stubEvent } = this.props;
    let eventDate = new Date(Number(stubEvent.time));
    return (
      <Grid.Column width={8}>
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" circular src="/assets/user.png" />
                <Item.Content>
                  <Item.Header as={Link} to={`/event/${stubEvent.id}`}>
                    {stubEvent.name}
                  </Item.Header>
                  <Item.Description>
                    Hosted by{" "}
                    <Popup
                      trigger={
                        <Label
                          href={`https://rinkeby.etherscan.io/address/${
                            stubEvent.artist
                          }`}
                        >
                          {stubEvent.artist.substring(0, 12)}
                          {"..."}
                        </Label>
                      }
                      content={stubEvent.artist}
                      position="bottom center"
                      size="tiny"
                    />
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
            <Grid columns={2}>
              <Grid.Row width={16}>
                <Grid.Column width={11}>
                  <Icon name="clock" /> {format(eventDate, "ddd Do MMM")} at{" "}
                  {format(eventDate, "h:mm A")}
                </Grid.Column>
                <Grid.Column width={5}>
                  <Icon name="ticket" /> {stubEvent.sales}
                  {" / "}
                  {stubEvent.salesCap}
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
          </Segment>
          <Segment clearing>
            <Button
              as={Link}
              to={`/event/${stubEvent.id}`}
              color="violet"
              floated="right"
              content="View"
            />
          </Segment>
        </Segment.Group>
      </Grid.Column>
    );
  }
}

export default StubEventListItem;
