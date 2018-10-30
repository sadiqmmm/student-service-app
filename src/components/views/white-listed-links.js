import React, { Component } from "react";
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
    // TODO Get the whtie list links from API, doesn't need subdomain
    console.log("Getting white list links");
  }

  render() {
    return (
      <div>
        <DashboardNavigation />
        <h1>White List Links</h1>
      </div>
    );
  }
}
