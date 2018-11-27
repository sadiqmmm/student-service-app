import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
  const { slug, white_logo, title } = props;

  return (
    <Link className="project-detail-header" to={`/project/${slug}`}>
      <img src={white_logo} alt={slug} />
      <h1>{title}</h1>
    </Link>
  );
}
