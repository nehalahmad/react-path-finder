import React from "react";

/**
 * @description: Show loader when APi calls
 */
export default props => {
  return (
    props.isLoading && (
      <div className="loader-container">
        <div className="loader" />
      </div>
    )
  );
};