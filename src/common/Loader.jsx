// common/Loader.jsx
import React from "react";
import PropTypes from "prop-types";

import "./Loader.css";

/**
 * @description: Show loader when APi calls
 */
const Loader = ({ isLoading }) =>
  isLoading && (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Loader;
