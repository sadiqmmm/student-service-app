import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      subdomain: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://api.devcamp.space/clients",
        {
          client: {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            subdomain: this.state.subdomain
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleSuccessfulAuth(response.data);
      })
      .catch(error => {
        this.props.handleUnSuccessfulAuth(error);
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
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="subdomain"
                placeholder="Subdomain"
                value={this.state.subdomain}
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
