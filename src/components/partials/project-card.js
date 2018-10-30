import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
  const { id, title, logo, language, slug } = props.project;

  return (
    <div className="card project-card">
      <div className="center-text flex-center">
        <h2>{title}</h2>
        <img src={logo} alt={language} />
        <Link exact to={`/project/${slug}`} className="link-btn btn-primary">
          <button>View Data</button>
        </Link>
      </div>
    </div>
  );
}
