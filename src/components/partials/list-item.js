import React from "react";

const ListItem = props => {
  const { title, http_verb, link } = props;

  return (
    <div className="list-item">
      <div className="sm-column">{http_verb}</div>
      <div className="title">{title}</div>
      <div className="details">
        <a href={link}>{link}</a>
      </div>
    </div>
  );
};

export default ListItem;
