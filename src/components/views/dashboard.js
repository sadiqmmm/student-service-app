import React, { Component } from "react";
import axios from "axios";

import Logo from "../svgs/bottega-white-logo";
import ProjectCard from "../partials/project-card";
import DashboardNavigation from "../partials/navigation";
import loggedIn from "../helpers/logged-in";

import "../../style/project-dashboard.scss";
import "../../style/project-card.scss";
import "../../style/helpers.scss";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      isLoading: true,
      loggedInStatus: false
    };
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.setState({ loggedInStatus: true });
        } else {
          this.props.history.push("/");
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("nope", error);
      });
    this.getProjectList();
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

  render() {
    const projectList = this.state.projects.map(project => {
      return <ProjectCard key={project.id} project={project} />;
    });

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <DashboardNavigation />
        <h1>Project Dashboard</h1>

        <p>Select a project to view its data and API endpoints</p>

        <div className="project-cards-wrapper">{projectList}</div>
      </div>
    );
  }
}
