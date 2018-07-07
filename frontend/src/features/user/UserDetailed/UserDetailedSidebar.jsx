import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailedSidebar = ({
  isCurrentUser,
  followUser,
  profile,
  isFollowing,
  unfollowUser
}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings"
            color="violet"
            fluid
            basic
            content="Edit Profile"
          />
        )}
        {!isCurrentUser &&
          !isFollowing && (
            <Button
              onClick={() => followUser(profile)}
              color="violet"
              fluid
              basic
              content="Follow user"
            />
          )}

        {!isCurrentUser &&
          isFollowing && (
            <Button
              onClick={() => unfollowUser(profile)}
              color="violet"
              fluid
              basic
              content="Unfollow"
            />
          )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
