import React from "react";

import "./Loader.css";

/**
 * @description: Show loader when APi calls
 */
export default props =>
  props.isLoading && (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );
