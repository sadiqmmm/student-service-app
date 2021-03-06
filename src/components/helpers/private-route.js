import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import loggedIn from './logged-in';

const PrivateRoute = ({component: Component, loggedInStatus, rest}) => (
  <Route
    {...rest}
    render={props =>
      loggedInStatus ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
