import React from "react";

const PortfolioItem = props => {
  const { id, name, description, url } = props;

  return (
    <div className="data-list-item">
      <div className="sm-column">{id}</div>
      <div className="title">{name}</div>
      <div>{description}</div>
      <div className="details">
        <a href={url} target="_blank">
          {url}
        </a>
      </div>
    </div>
  );
};

export default PortfolioItem;
