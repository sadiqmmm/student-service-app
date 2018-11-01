import React from "react";

const SingleRecordListItem = props => {
  return (
    <div className="single-record-list-item">
      <div className="title">
        <a href={props.item} target="_blank">
          {props.item}
        </a>
      </div>

      <div className="actions">
        <button onClick={props.handleWhiteListLinkDelete}>Delete</button>
      </div>
    </div>
  );
};

export default SingleRecordListItem;
