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
import ProjectDetail from "./views/project-detail";
import DataDetail from "./views/data-detail";
import WhiteListedLinks from "./views/white-listed-links";
import NoMatch from "./views/no-match";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/white-listed-links" component={WhiteListedLinks} />
              <Route path="/project/:slug" component={ProjectDetail} />
              <Route
                path="/project/:slug/data/:table-name"
                component={DataDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
