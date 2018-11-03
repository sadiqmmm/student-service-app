import React from "react";

const DataItem = props => {
  const rowData = props.data.slice(0, -1).map((column, idx) => {
    return <div key={idx}>{column || "null"}</div>;
  });

  return (
    <div className={`dynamic-row-${props.data.slice(0, -1).length + 1}`}>
      {rowData}
      <div className="actions">
        <button onClick={props.handleRecordDelete}>
          <i className="fas fa-times-circle" />
        </button>
      </div>
    </div>
  );
};

export default DataItem;
