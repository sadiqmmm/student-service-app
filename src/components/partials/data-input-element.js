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
  } else if (name === "blog_status") {
    return (
      <div className="form-element-group">
        <label htmlFor={name}>{name}</label>
        <br />
        <select onChange={handleInputValueChange}>
          <option name={name} value="draft">
            Draft
          </option>
          <option name={name} value="published">
            Published
          </option>
        </select>
      </div>
    );
  } else if (name === "status") {
    return (
      <div className="form-element-group">
        <label htmlFor={name}>{name}</label>
        <br />
        <select onChange={handleInputValueChange}>
          <option name={name} value="active">
            Active
          </option>
          <option name={name} value="archived">
            Archived
          </option>
        </select>
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
