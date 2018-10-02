import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../svgs/bottega-white-logo";

import "../../style/dashboard-nav.scss";

const NavLinks = () => {
  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <Logo />
      </div>

      <div className="right-side">
        <div className="nav-icon">
          <NavLink exact to="/" activeClassName="active-nav-link">
            <i class="fas fa-sliders-h" />
          </NavLink>
        </div>

        <div className="nav-icon">
          <NavLink exact to="/" activeClassName="active-nav-link">
            <i class="fas fa-sign-in-alt" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
