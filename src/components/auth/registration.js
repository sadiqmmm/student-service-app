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
      <div className="project-cards-wrapper">
        <div className="card auth-card">
          <div className="metadata">
            <div className="title">Sign up for a new account</div>

            <div className="small-green-line" />
          </div>

          <div className="auth-form">
            <form onSubmit={this.handleSubmit} className="form-wrapper">
              <div className="input-elements">
                <div className="form-element-group">
                  <label htmlFor="register-email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="register-email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="full-width-element"
                  />
                </div>

                <div className="form-element-group">
                  <label htmlFor="register-subdomain">Subdomain</label>
                  <input
                    type="text"
                    name="subdomain"
                    id="register-subdomain"
                    placeholder="Subdomain"
                    value={this.state.subdomain}
                    onChange={this.handleChange}
                    className="full-width-element"
                  />
                </div>

                <div className="form-element-group">
                  <label htmlFor="register-password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="register-password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className="full-width-element"
                  />
                </div>

                <div className="form-element-group">
                  <label htmlFor="register-password-confirmation">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="register-password-confirmation"
                    placeholder="Confirm password"
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                    className="full-width-element"
                  />
                </div>
              </div>

              <div className="form-buttons-wrapper">
                <div className="link-btn btn-primary">
                  <button type="submit">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
