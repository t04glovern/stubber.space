import React from "react";
import { Segment, Image, Item, Header, Button, Label } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import format from "date-fns/format";
import compareAsc from "date-fns/compare_asc";

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
  withdrawEventFunds,
  authenticated,
  openModal,
  drizzle
}) => {
  let eventDate;
  let eventOver;
  if (event.dateEpoch) {
    eventDate = new Date(Number(event.dateEpoch));
    eventOver = compareAsc(eventDate, Date.now()) === -1 ? true : false;
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
              !event.cancelled &&
              !eventOver && (
                <Button
                  color="green"
                  disabled /*onClick={() => cancelGoingToEvent(event)}*/
                >
                  Attending
                </Button>
              )}

            {!isGoing &&
              authenticated &&
              !event.cancelled &&
              !eventOver && (
                <Button as="div" labelPosition="right">
                  <Button
                    loading={loading}
                    onClick={() => goingToEvent(event, drizzle)}
                    color="violet"
                  >
                    Purchase Ticket
                  </Button>
                  <Label basic color="violet" pointing="left">
                    {event.ticketprice} ETH
                  </Label>
                </Button>
              )}

            {!authenticated &&
              !event.cancelled &&
              !eventOver && (
                <Button as="div" labelPosition="right">
                  <Button
                    loading={loading}
                    onClick={() => openModal("UnauthModal")}
                    color="violet"
                  >
                    Purchase Ticket
                  </Button>
                  <Label basic color="violet" pointing="left">
                    {event.ticketprice} ETH
                  </Label>
                </Button>
              )}

            {eventOver && (
              <Label
                size="large"
                color="orange"
                content="This event has finished"
              />
            )}
          </div>
        )}

        {eventOver &&
          isHost && (
            <div>
              <Label
                size="large"
                color="orange"
                content="This event has finished"
                disabled
              />
              <Button
                floated="right"
                color="green"
                size="small"
                onClick={() => withdrawEventFunds(event, drizzle)}
              >
                Withdraw Ticket Funds
              </Button>
            </div>
          )}

        {!eventOver &&
          isHost && (
            <Button color="green" disabled>
              Hosting
            </Button>
          )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
