import React, { Component } from "react";
import Registration from "../auth/registration";
import Login from "../auth/login";
import Logo from "../svgs/bottega-white-logo";
import loggedIn from "../helpers/logged-in";

import "../../style/main.scss";
import "../../style/home.scss";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      isLoading: true,
      loggedInStatus: false
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

    this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(e) {
    this.props.history.push("/dashboard");
  }

  handleUnSuccessfulAuth(errorMessage) {
    this.setState({
      errorMessage:
        "There was an error processing your registration, please try again."
    });
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({ loggedInStatus: false });
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("nope", error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return "Loading...";
    }

    return (
      <div className="home">
        <div className="left-column">
          <Logo />
          <div className="headline">Application Data Manager</div>
        </div>

        <div className="right-column">
          <Registration
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
          />

          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
          />
        </div>
      </div>
    );
  }
}
