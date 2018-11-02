import React, { Component } from "react";
import axios from "axios";

import loggedIn from "../helpers/logged-in";
import DashboardNavigation from "../partials/navigation";
import ListItem from "../partials/list-item";
import ProjectCard from "../partials/project-card";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: "",
      currentClient: {},
      project: {},
      endpointList: []
    };

    this.getProjectDetails = this.getProjectDetails.bind(this);
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.setState({ currentClient: res.current_client });
          this.getProjectDetails();
        } else {
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log("not signed in", error);
      });
  }

  getProjectDetails() {
    axios
      .get(
        `https://api.devcamp.space/projects/${this.props.match.params.slug}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          project: response.data.project,
          endpointList: response.data.project.endpoints,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  getSubdomain() {
    return this.state.currentClient.subdomain;
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    const databaseTableList = this.state.project.project_tables.map(
      project_table => {
        return (
          <ProjectCard
            key={project_table.id}
            title={project_table.formatted_name}
            logo={this.state.project.logo}
            language={this.state.project.language}
            url={`/project/${this.state.project
              .slug}/data/${project_table.table_name}`}
          />
        );
      }
    );

    const {
      title,
      language,
      white_logo,
      slug,
      route_namespace
    } = this.state.project;
    const { subdomain } = this.state.currentClient;

    const endpointList = this.state.endpointList.map(endpoint => {
      return (
        <ListItem
          key={endpoint.id}
          {...endpoint}
          subdomain={subdomain}
          routeNamespace={route_namespace}
        />
      );
    });

    return (
      <div>
        <DashboardNavigation />

        <div className="project-detail-header">
          <img src={white_logo} alt={slug} />
          <h1>{title}</h1>
        </div>

        <div className="card">
          <h2>API Endpoints</h2>

          <div className="list-container">{endpointList}</div>
        </div>

        <h2>Select a database table for your project to view data</h2>

        <div className="project-cards-wrapper">{databaseTableList}</div>
      </div>
    );
  }
}
