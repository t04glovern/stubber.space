import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";

const AsyncHomePage = Loadable({
  loader: () => import("../../features/home/HomePage"),
  loading: LoadingComponent
});

const AsyncEventForm = Loadable({
  loader: () => import("../../features/event/EventForm/EventForm"),
  loading: LoadingComponent
});

const AsyncNavBar = Loadable({
  loader: () => import("../../features/nav/NavBar/NavBar"),
  loading: LoadingComponent
});

const AsyncFootBar = Loadable({
  loader: () => import("../../features/nav/FootBar/FootBar"),
  loading: LoadingComponent
});

const AsyncEventDashboard = Loadable({
  loader: () => import("../../features/event/EventDashboard/EventDashboard"),
  loading: LoadingComponent
});

const AsyncTicketPage = Loadable({
  loader: () => import("../../features/ticket/TicketPage/TicketPage"),
  loading: LoadingComponent
});

const AsyncSettingsDashboard = Loadable({
  loader: () => import("../../features/user/Settings/SettingsDashboard"),
  loading: LoadingComponent
});

const AsyncUserDetailedPage = Loadable({
  loader: () => import("../../features/user/UserDetailed/UserDetailedPage"),
  loading: LoadingComponent
});

const AsyncPeopleDashboard = Loadable({
  loader: () => import("../../features/user/PeopleDashboard/PeopleDashboard"),
  loading: LoadingComponent
});

const AsyncEventDetailedPage = Loadable({
  loader: () => import("../../features/event/EventDetailed/EventDetailedPage"),
  loading: LoadingComponent
});

const AsyncModalManager = Loadable({
  loader: () => import("../../features/modals/ModalManager"),
  loading: LoadingComponent
});

const AsyncNotFound = Loadable({
  loader: () => import("./NotFound"),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <div>
        <AsyncModalManager />
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <AsyncNavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={AsyncEventDashboard} />
                  <Route path="/event/:id" component={AsyncEventDetailedPage} />
                  <Route
                    path="/manage/:id"
                    component={UserIsAuthenticated(AsyncEventForm)}
                  />
                  <Route
                    path="/tickets"
                    component={UserIsAuthenticated(AsyncTicketPage)}
                  />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(AsyncPeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(AsyncUserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(AsyncSettingsDashboard)}
                  />
                  <Route
                    path="/createEvent"
                    component={UserIsAuthenticated(AsyncEventForm)}
                  />
                  <Route
                    path="/error"
                    component={UserIsAuthenticated(AsyncNotFound)}
                  />
                  <Route component={AsyncNotFound} />
                </Switch>
              </Container>
              <br/>
              <br/>
              <br/>
              <AsyncFootBar />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
