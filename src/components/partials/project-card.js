import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
  return (
    <div className="card project-card">
      <div className="center-text flex-center">
        <h2>{props.title}</h2>
        <img src={props.logo} alt={props.language} />
        <Link exact to={props.url} className="link-btn btn-primary">
          <button>View Data</button>
        </Link>
      </div>
    </div>
  );
}
