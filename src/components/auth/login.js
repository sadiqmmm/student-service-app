import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleSuccessfulLogin(response.data);
      })
      .catch(error => {
        this.props.handleUnSuccessfulLogin(error);
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
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
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
