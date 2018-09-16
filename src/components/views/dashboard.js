import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      projects: []
    };
  }

  getProjectList() {
    axios
      .get("https://api.devcamp.space/projects", {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          projects: response.data.projects
        });

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
    const projects = this.state.projects.map(project => {
      return (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <img src={project.logo} alt={project.language} />
        </div>
      );
    });

    return (
      <div>
        <h1>Dashboard</h1>

        <p>And a bunch of data goes here</p>

        {projects}
      </div>
    );
  }
}
