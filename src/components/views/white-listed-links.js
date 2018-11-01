import React, { Component } from "react";
import axios from "axios";

import DashboardNavigation from "../partials/navigation";
import SingleRecordListItem from "../partials/single-record-list-item";

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

  createNewWhiteListLink() {
    axios
      .post(
        "https://api.devcamp.space/client_domains",
        {
          client_domain: {
            url: "https://testing.com"
          }
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("createNewWhiteListLink", response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const clientDomainList = this.state.clientDomains.map(clientDomain => {
      return (
        <SingleRecordListItem key={clientDomain.id} item={clientDomain.url} />
      );
    });

    return (
      <div>
        <DashboardNavigation />

        <div className="card">
          <h2>White List Links</h2>

          <div className="list-container">{clientDomainList}</div>
        </div>
      </div>
    );
  }
}
