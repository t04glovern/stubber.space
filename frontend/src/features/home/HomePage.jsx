import React from "react";

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image"
              src="/assets/logo.png"
              alt="logo"
            />
            <br/>
            <div className="content">Stubber</div>
          </h1>
          <h2>Digitally traceable ticket sales on the blockchain</h2>
          <div
            onClick={() => history.push("/events")}
            className="ui huge white inverted button"
          >
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
