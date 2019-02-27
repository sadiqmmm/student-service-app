import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      subdomain: "",
      emailValidationState: "NEED_MORE",
      subdomainValidationState: "NEED_MORE",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidationCheck(attribute, value) {
    if (value.length > 3) {
      axios
        .get(
          `https://api.devcamp.space/registration-validations?${attribute}=${value}`
        )
        .then(response => {
          if (response.data.validation === "EXISTS") {
            if (attribute === "email") {
              this.setState({ emailValidationState: "NOT_VALID" });
            } else if (attribute === "subdomain") {
              this.setState({ subdomainValidationState: "NOT_VALID" });
            }
          } else if (response.data.validation === "DOES_NOT_EXIST") {
            if (attribute === "email") {
              this.setState({ emailValidationState: "VALID" });
            } else if (attribute === "subdomain") {
              this.setState({ subdomainValidationState: "VALID" });
            }
          }
        })
        .catch(error => {
          console.log("handleValidationCheck error", error);
        });
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.handleValidationCheck(name, value);
    this.setState({ [name]: value });
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
        this.setState({
          errorText: "An error occured, please try again."
        });
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
              {this.state.errorText ? (
                <div className="validation-warning-text">
                  {this.state.errorText}
                  <div className="spacer30" />
                </div>
              ) : null}
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
                  {this.state.emailValidationState === "NOT_VALID" &&
                  this.state.email.length > 4 ? (
                    <div className="validation-warning-text">
                      Email already taken
                    </div>
                  ) : null}
                  {this.state.emailValidationState === "VALID" &&
                  this.state.email.length > 4 ? (
                    <div className="validation-valid-text">
                      Email is available
                    </div>
                  ) : null}
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
                  {this.state.subdomainValidationState === "NOT_VALID" &&
                  this.state.subdomain.length > 2 ? (
                    <div className="validation-warning-text">
                      Subdomain already taken
                    </div>
                  ) : null}
                  {this.state.subdomainValidationState === "VALID" &&
                  this.state.subdomain.length > 2 ? (
                    <div className="validation-valid-text">
                      Subdomain is available
                    </div>
                  ) : null}
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
