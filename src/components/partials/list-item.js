import React from "react";

const linkBuilder = (subdomain, endpointPath) => {
  return `https://${subdomain}.devcamp.space/${endpointPath}`;
};

const ListItem = props => {
  const { title, http_verb, link, subdomain } = props;

  const fullLink = linkBuilder(subdomain, link);

  return (
    <div className="endpoint-list-item">
      <div className="sm-column">{http_verb}</div>
      <div className="title">{title}</div>
      <div className="details">
        <a href={fullLink}>{fullLink}</a>
      </div>
    </div>
  );
};

export default ListItem;
