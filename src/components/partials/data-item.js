import React from "react";

const DataItem = props => {
  const rowData = props.data.map(column => {
    return <div key={props.data[0]}>{column}</div>;
  });

  return (
    <div className="data-list-item">
      {rowData}
      <hr />
    </div>
  );
};

export default DataItem;
