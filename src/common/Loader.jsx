// common/Loader.jsx
import React from "react";

import "./Loader.css";

/**
 * @description: Show loader when APi calls
 */
export default ({ isLoading }) =>
  isLoading && (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );
