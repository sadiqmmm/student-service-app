import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  getProjectList() {
    axios
      .get("https://api.devcamp.space/projects", {
        withCredentials: true
      })
      .then(response => {
        console.log("client project", response);
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  componentDidMount() {
    this.getProjectList();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>

        <p>And a bunch of data goes here</p>
      </div>
    );
  }
}
