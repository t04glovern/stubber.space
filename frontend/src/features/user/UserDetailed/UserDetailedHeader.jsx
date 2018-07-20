import React from "react";
import { Grid, Item, Segment } from "semantic-ui-react";
import differenceInYears from "date-fns/difference_in_years";

const UserDetailedHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "unknown age";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={profile.photoURL || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header >{profile.displayName}</Item.Header>
              <Item.Meta>{profile.occupation}</Item.Meta>
              <Item.Description>
                {age}, Lives in {profile.city || "unknown city"}
              </Item.Description>
              <Item.Extra>{profile.about}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
