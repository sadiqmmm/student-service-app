import React, { Component } from "react";
import axios from "axios";

import loggedIn from "../helpers/logged-in";
import DashboardNavigation from "../partials/navigation";

import "../../style/lists.scss";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: "",
      currentClient: {},
      project: {}
    };

    this.getProjectDetails = this.getProjectDetails.bind(this);
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.setState({ currentClient: res.current_client });
        } else {
          this.props.history.push("/");
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("nope", error);
      });
    this.getProjectDetails();
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

        console.log("client project", response);
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    const { title, language, logo, slug } = this.state.project;
    const { subdomain } = this.state.currentClient;

    return (
      <div>
        <DashboardNavigation />
        <h1>{title}</h1>
        <h2>{subdomain}</h2>

        <div className="card">
          <h2>API Endpoints</h2>

          <div className="list-container">
            <div className="list-item-sm title">All portfolio items</div>
            <div className="list-item-lg">
              <a href="https://google.com">google.com</a>
            </div>
          </div>
        </div>

        <img src={logo} alt={slug} />
      </div>
    );
  }
}
