import React, { Component } from "react";
import axios from "axios";
import Logo from "../svgs/bottega-white-logo";
import ProjectCard from "../partials/project-card";

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
    const projectList = this.state.projects.map(project => {
      return <ProjectCard key={project.id} project={project} />;
    });

    return (
      <div>
        <Logo />
        <h1>Project Dashboard</h1>

        <p>Select a project to view its data and API endpoints</p>

        <div className="project-cards-wrapper">{projectList}</div>
      </div>
    );
  }
}
