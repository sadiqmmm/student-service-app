import React from "react";
import { Link } from "react-router-dom";

import "../../style/buttons.scss";
import "../../style/helpers.scss";

export default function(props) {
  const { id, title, logo, language, slug } = props.project;
  return (
    <div className="project-card flex-center">
      <div>
        <h2>{title}</h2>
        <img src={logo} alt={language} />

        <div className="spacer40" />

        <Link exact to={`/project/${slug}`} className="link-btn btn-primary">
          <button>View Data</button>
        </Link>
      </div>
    </div>
  );
}
