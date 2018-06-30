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
      >
        <Icon name="google plus" />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
