import React from "react";
import { Button, Icon } from "semantic-ui-react";

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <Button
        onClick={() => socialLogin("facebook")}
        type="button"
        fluid
        color="facebook"
        style={{ marginBottom: "10px" }}
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>

      <Button
        onClick={() => socialLogin("google")}
        type="button"
        fluid
        color="google plus"
        style={{ marginBottom: "10px" }}
      >
        <Icon name="google plus" />
        Login with Google
      </Button>

      <Button
        onClick={() => socialLogin("uport")}
        disabled
        type="button"
        fluid
        style={{backgroundColor: "#5B4FCB", color: "white"}}
      >
        <Icon name="users" />
        Login with uPort
      </Button>
    </div>
  );
};

export default SocialLogin;
