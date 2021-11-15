import React from "react";

export default ({ handleSearch }) => {
  return (
    <form className="form-inline p-2">
      <div className="input-group">
        <div className="input-group-prepend"></div>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={e => handleSearch(e)}
        />
      </div>
    </form>
  );
};
