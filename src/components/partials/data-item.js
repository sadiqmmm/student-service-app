import React from "react";

const DataItem = props => {
  const rowData = props.data.map(column => {
    return (
      <div
        key={
          column ||
          Math.random()
            .toString(36)
            .substr(2, 5)
        }
      >
        {column || "null"}
      </div>
    );
  });

  return <div className={`dynamic-row-${props.data.length}`}>{rowData}</div>;
};

export default DataItem;
