import React from "react";

export default ({ name, handleInputValueChange }) => {
  if (name.endsWith("_image") || name === "logo") {
    return (
      <div className="form-element-group">
        <label htmlFor={name}>{name}</label>
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleInputValueChange}
          className="full-width-element data-input"
          multiple
        />
      </div>
    );
  } else {
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
  }
};
