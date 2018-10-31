import React, { Component } from "react";
import axios from "axios";

import DashboardNavigation from "../partials/navigation";

export default class WhiteListedLinks extends Component {
  constructor() {
    super();

    this.state = {
      clientDomains: []
    };
  }

  componentDidMount() {
    this.getWhiteListLinks();
  }

  getWhiteListLinks() {
    axios
      .get(`https://api.devcamp.space/client_domains`, {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          clientDomains: [...response.data.client_domains]
        });
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  render() {
    const clientDomainList = this.state.clientDomains.map(clientDomain => {
      return clientDomain.url;
    });

    return (
      <div>
        <DashboardNavigation />
        <h1>White List Links</h1>
        {clientDomainList}
      </div>
    );
  }
}
