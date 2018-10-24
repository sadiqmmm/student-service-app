import React from "react";

const PortfolioItem = props => {
  const { name, description, url } = props;

  return (
    <div className="list-item">
      <div className="sm-column">{name}</div>
      <div className="title">{description}</div>
      <div className="details">
        <a href={url}>{url}</a>
      </div>
    </div>
  );
};

export default PortfolioItem;
