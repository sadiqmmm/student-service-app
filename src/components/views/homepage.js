import React, { Component } from "react";
import Registration from "../auth/registration";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null
    };

    this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(
      this
    );

    this.handleUnSuccessfulRegistration = this.handleUnSuccessfulRegistration.bind(
      this
    );
  }

  handleSuccessfulRegistration(e) {
    this.props.history.push("/dashboard");
  }

  handleUnSuccessfulRegistration(errorMessage) {
    this.setState({
      errorMessage:
        "There was an error processing your registration, please try again."
    });
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>

        <div>{this.state.errorMessage}</div>

        <Registration
          handleSuccessfulRegistration={this.handleSuccessfulRegistration}
          handleUnSuccessfulRegistration={this.handleUnSuccessfulRegistration}
        />
      </div>
    );
  }
}
