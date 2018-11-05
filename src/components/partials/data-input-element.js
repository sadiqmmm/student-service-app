import React from "react";

export default ({ name, handleInputValueChange }) => {
  const inputTypeSelector = name => {
    if (name.endsWith("_image") || name === "logo") {
      return "file";
    } else {
      return "text";
    }
  };

  return (
    <div className="form-element-group">
      <label htmlFor={name}>{name}</label>
      <input
        type={inputTypeSelector(name)}
        id={name}
        name={name}
        onChange={handleInputValueChange}
        className="full-width-element data-input"
      />
    </div>
  );
};
