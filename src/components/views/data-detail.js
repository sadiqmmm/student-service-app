import React, { Component } from "react";
import axios from "axios";

import loggedIn from "../helpers/logged-in";
import DashboardNavigation from "../partials/navigation";
import ListItem from "../partials/list-item";
import DataItem from "../partials/data-item";

export default class DataDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: "",
      currentClient: {},
      project: {},
      projectDataEndpoint: this.props.match.params.table_name,
      projectData: {
        items: []
      }
    };

    this.getProjectDetails = this.getProjectDetails.bind(this);
    this.getData = this.getData.bind(this);
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
        this.setState({ isLoading: false });
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
          project: response.data.project
        });
        this.getData();
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  getSubdomain() {
    return this.state.currentClient.subdomain;
  }

  getData() {
    axios
      .get(
        `https://${this.getSubdomain()}.devcamp.space/${this.state.project
          .route_namespace}/${this.state.projectDataEndpoint}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          projectData: {
            items: [...response.data[this.state.projectDataEndpoint]]
          }
        });

        console.log("getData", Object.keys(this.state.projectData.items[0]));
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    const {
      title,
      language,
      white_logo,
      slug,
      route_namespace
    } = this.state.project;
    const { subdomain } = this.state.currentClient;

    const dataList = this.state.projectData.items.map(item => {
      console.log("item", Object.values(item));
      return <DataItem key={item.id} data={[Object.values(item)]} />;
    });

    // TODO
    // Customize the data items so that the table is dynamic with headers and data elements

    return (
      <div>
        <DashboardNavigation />

        <div className="project-detail-header">
          <img src={white_logo} alt={slug} />
          <h1>{title}</h1>
        </div>

        <div className="card">
          <div
            className={`list-container-${this.state.projectData.items.length}`}
          >
            {dataList}
          </div>
        </div>
      </div>
    );
  }
}
