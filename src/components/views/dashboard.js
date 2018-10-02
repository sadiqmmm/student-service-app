import React, { Component } from "react";
import axios from "axios";
import Logo from "../svgs/bottega-white-logo";

import "../../style/project-dashboard.scss";
import "../../style/project-card.scss";
import "../../style/helpers.scss";

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
        <div key={project.id} className="project-card flex-center">
          <div>
            <h2>{project.title}</h2>
            <img src={project.logo} alt={project.language} />
          </div>
        </div>
      );
    });

    return (
      <div>
        <Logo />
        <h1>Project Dashboard</h1>

        <p>Select a project to view its data and API endpoints</p>

        <div className="project-cards-wrapper">{projects}</div>
      </div>
    );
  }
}
