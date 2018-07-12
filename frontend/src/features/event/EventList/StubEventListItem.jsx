import React, { Component } from "react";
import {
  Button,
  Card,
  Icon,
  Image,
  Label,
  Grid,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

class StubEventListItem extends Component {
  render() {
    const { stubEvent } = this.props;
    let eventDate = new Date(Number(stubEvent.time));
    return (
      <Grid.Column>
        <Card fluid>
          <Image src="/assets/categoryImages/culture.jpg" />
          <Card.Content>
            <Card.Header as={Link} to={`/event/${stubEvent.id}`}>
              {stubEvent.name}
            </Card.Header>
            <Card.Meta>
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
                position="top center"
                size="tiny"
              />
            </Card.Meta>
            <Card.Description>
              <Icon name="clock" /> {format(eventDate, "ddd Do MMM")} at{" "}
              {format(eventDate, "h:mm A")}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="ticket" /> {stubEvent.sales}
            {" / "}
            {stubEvent.salesCap}
            <Button
              as={Link}
              to={`/event/${stubEvent.id}`}
              color="violet"
              floated="right"
              content="View"
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default StubEventListItem;
