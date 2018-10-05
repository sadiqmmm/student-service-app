import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

import { NavLink } from "react-router-dom";
import Logo from "../svgs/bottega-white-logo";

import "../../style/dashboard-nav.scss";

class NavLinks extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    axios
      .delete(`https://api.devcamp.space/logout`, {
        withCredentials: true
      })
      .then(response => {
        this.props.history.push("/");
        return response;
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="left-side">
          <NavLink exact to="/">
            <Logo />
          </NavLink>
        </div>

        <div className="right-side">
          <div className="nav-icon">
            <NavLink exact to="/" activeClassName="active-nav-link">
              <i className="fas fa-sliders-h" />
            </NavLink>
          </div>

          <div className="nav-icon">
            <a href="#" onClick={this.signOut}>
              <i className="fas fa-sign-in-alt" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavLinks);
