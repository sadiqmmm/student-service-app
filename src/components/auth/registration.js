import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    // TODO
    // Build out auth process and endpoint
    axios
      .post(
        "https://api.devcamp.space/clients",
        {
          client: {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleSuccessfulRegistration(response.data);
      })
      .catch(error => {
        this.props.handleUnSuccessfulRegistration(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="registrationFormWrapper">
        <div className="card">
          <div className="homepageQuote">
            <form onSubmit={this.handleSubmit} className="formWrapper">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm password"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
