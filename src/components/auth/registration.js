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
        "https://devcamp-student-service.herokuapp.com/",
        {
          user: {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(function(response) {
        // TODO
        console.log(response);
      })
      .catch(function(error) {
        // TODO
        console.log(error);
      });

    console.log("A name was submitted: " + this.state.email);
    console.log("A password was submitted: " + this.state.password);
    console.log(
      "A password conf was submitted: " + this.state.password_confirmation
    );
    event.preventDefault();
  }

  render() {
    return (
      <div className="registrationFormWrapper">
        <div className="card">
          <div className="homepageQuote">
            Pearson's Law: "That which is measured improves. That which is
            measured and reported improves exponentially."
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
