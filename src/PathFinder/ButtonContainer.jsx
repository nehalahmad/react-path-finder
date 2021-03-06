// PathFinder/ButtonContainer.jsx
import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { RESET_TEXT } from "../config/AppConstants";

/**
 * @description: A wrapper container for form buttons - submit and reset
 */
const ButtonContainer = ({ isLoader, submitBtnText }) => (
  <div className="button-container text-right">
    <Button type="submit" variant="primary" disabled={isLoader}>
      {submitBtnText}
    </Button>
    <Button type="reset" variant="reset">
      {RESET_TEXT}
    </Button>
  </div>
);

// validate prop types
ButtonContainer.propTypes = {
  isLoader: PropTypes.bool.isRequired,
  submitBtnText: PropTypes.string.isRequired
};

export default ButtonContainer;
