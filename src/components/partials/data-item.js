import React from "react";

const DataItem = props => {
  const urlMatcher = /(https?:\/\/.*\.(?:png|jpg))/i;

  const stringTruncate = (str, length) => {
    const dots = str.length > length ? "..." : "";
    return str.substring(0, length) + dots;
  };

  const rowData = props.data.slice(0, -1).map((column, idx) => {
    if (urlMatcher.test(column)) {
      return (
        <img
          key={idx}
          src={column}
          style={{
            width: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            height: "80px"
          }}
        />
      );
    } else {
      return (
        <div key={idx}>
          {(column && stringTruncate(column.toString(), 20)) || "null"}
        </div>
      );
    }
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
