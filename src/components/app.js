import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";

import Home from "./views/homepage";
import Dashboard from "./views/dashboard";
import NoMatch from "./views/no-match";
import NavLinks from "./partials/navigation";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavLinks />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
