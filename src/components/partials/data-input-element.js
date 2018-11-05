import React from "react";

export default ({ name, handleInputValueChange }) => {
  return (
    <div className="form-element-group">
      <label htmlFor={name}>{name}</label>
      <input
        type="text"
        id={name}
        name={name}
        onChange={handleInputValueChange}
        className="full-width-element data-input"
      />
    </div>
  );
};
