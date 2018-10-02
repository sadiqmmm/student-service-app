import React from "react";

export default function(props) {
  const { id, title, logo, language } = props.project;
  return (
    <div className="project-card flex-center">
      <div>
        <h2>{title}</h2>
        <img src={logo} alt={language} />
      </div>
    </div>
  );
}
