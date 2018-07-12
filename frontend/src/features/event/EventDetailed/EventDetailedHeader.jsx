import React from "react";
import { Segment, Image, Item, Header, Button, Label } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import format from "date-fns/format";

const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventDetailedHeader = ({
  loading,
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
  authenticated,
  openModal,
  drizzle
}) => {
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <LazyLoad
          placeholder={<Image src="/assets/categoryImages/music.jpg" />}
        >
          <Image
            fluid
            style={eventImageStyle}
            src={event.photoURL || `/assets/categoryImages/music.jpg`}
          />
        </LazyLoad>

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(eventDate, "dddd Do MMMM")}</p>
                <p>
                  Hosted by <strong>{event.artist}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing &&
              !event.cancelled && (
                <Button
                  color="green"
                  disabled /*onClick={() => cancelGoingToEvent(event)}*/
                >
                  Attending
                </Button>
              )}

            {!isGoing &&
              authenticated &&
              !event.cancelled && (
                <Button
                  loading={loading}
                  onClick={() => goingToEvent(event, drizzle)}
                  color="violet"
                >
                  Purchase Ticket
                </Button>
              )}

            {!authenticated &&
              !event.cancelled && (
                <Button
                  loading={loading}
                  onClick={() => openModal("UnauthModal")}
                  color="violet"
                >
                  Purchase Ticket
                </Button>
              )}

            {event.cancelled &&
              !isHost && (
                <Label
                  size="large"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
          </div>
        )}

        {/* {isHost && (
          <Button as={Link} to={`/manage/${event.id}`} color="orange">
            Manage Event
          </Button>
        )} */}
        {isHost && (
          <Button color="green" disabled>
            Hosting
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
