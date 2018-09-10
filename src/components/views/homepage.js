import React, { Component } from "react";
import Registration from "../auth/registration";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    console.log("Props", props.history);

    this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(
      this
    );
  }

  handleSuccessfulRegistration(e) {
    console.log("HANDLINGGGGG", e);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>

        <Registration
          handleSuccessfulRegistration={this.handleSuccessfulRegistration}
        />
      </div>
    );
  }
}
