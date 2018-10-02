import React, { Component } from "react";
import axios from "axios";
import "../../style/auth.scss";
import "../../style/project-card.scss";
import "../../style/buttons.scss";
import "../../style/forms.scss";
import "../../style/helpers.scss";

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
        <div className="project-card auth-card">
          <div className="metadata">
            <div className="title">Login</div>

            <div class="small-green-line" />
          </div>

          <div className="auth-form">
            <form onSubmit={this.handleSubmit} className="form-wrapper">
              <div className="input-elements">
                <div className="form-element-group">
                  <label for="login-email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="login-email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="full-width-element"
                  />
                </div>

                <div className="form-element-group">
                  <label for="login-password">Email</label>
                  <input
                    type="password"
                    name="password"
                    id="login-password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className="full-width-element"
                  />
                </div>
              </div>

              <div className="form-buttons-wrapper">
                <div className="link-btn btn-primary">
                  <button type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
