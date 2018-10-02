import React, { Component } from "react";

export default class ProjectDetail extends Component {
  render() {
    return (
      <div>
        <h1>I'm here</h1>

        <div>{this.props.match.params.slug}</div>

        <div> Me too</div>
      </div>
    );
  }
}
