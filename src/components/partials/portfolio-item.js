import React from "react";

const PortfolioItem = props => {
  const { name, description, url } = props;

  return (
    <div className="data-list-item">
      <div className="title">{name}</div>
      <div className="title">{description}</div>
      <div className="details">
        <a href={url}>{url}</a>
      </div>
    </div>
  );
};

export default PortfolioItem;
