import React from "react";

const linkBuilder = (subdomain, routeNamespace, endpointPath) => {
  return `https://${subdomain}.devcamp.space/${routeNamespace}/${endpointPath}`;
};

const ListItem = props => {
  const { title, http_verb, link, subdomain, routeNamespace } = props;

  const fullLink = linkBuilder(subdomain, routeNamespace, link);

  return (
    <div className="endpoint-list-item">
      <div className="sm-column">{http_verb}</div>
      <div className="title">{title}</div>
      <div className="details">
        <a href={fullLink} target="_blank">
          {fullLink}
        </a>
      </div>
    </div>
  );
};

export default ListItem;
