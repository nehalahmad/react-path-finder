import React from "react";

export default props => {
  return (
    props.isLoading && (
      <div className="loader-container">
        <div className="loader" />
      </div>
    )
  );
};