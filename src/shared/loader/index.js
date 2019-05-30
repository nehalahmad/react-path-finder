import React from "react";

import './loader.css';

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
