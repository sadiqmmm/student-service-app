import React, { Component } from "react";
import axios from "axios";

export default class ApiKey extends Component {
  constructor() {
    super();

    this.state = {
      apiKey: ""
    };
  }

  componentDidMount() {
    this.getApiKey();
  }

  getApiKey() {
    axios
      .get("https://api.devcamp.space/get-client-applications", {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          apiKey: response.data.client.auth_token
        });
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  render() {
    return (
      <div className="card">
        <h2>API Key</h2>
        <div className="two-column-grid">
          <div className="title">Key</div>
          <div>{this.state.apiKey}</div>
        </div>
      </div>
    );
  }
}
