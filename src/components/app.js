import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link,
} from 'react-router-dom';

import Home from './views/homepage';
import Dashboard from './views/dashboard';
import NoMatch from './views/no-match';
import NavLinks from './partials/navigation';
import loggedIn from './helpers/logged-in';
import PrivateRoute from './helpers/private-route';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      loggedInStatus: false,
    };
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res) {
          this.setState({loggedInStatus: true});
        } else {
          this.setState({loggedInStatus: false});
        }
        this.setState({isLoading: false});
      })
      .catch(error => {
        console.log('nope', error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return 'Loading...';
    }

    return (
      <div className="container">
        <Router>
          <div>
            <NavLinks />
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute
                path="/dashboard"
                loggedInStatus={this.state.loggedInStatus}
                component={Dashboard}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
