import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { RESET_TEXT } from "../config/AppConstants";

/**
 * @description: A wrapper container for form buttons
 */
const ButtonContainer = props => {
  const { isLoader, submitBtnText } = props;

  return (
    <div className="button-container text-right">
      <Button type="submit" variant="primary" disabled={isLoader}>
        {submitBtnText}
      </Button>
      <Button type="reset" variant="reset">
        {RESET_TEXT}
      </Button>
    </div>
  );
};

// validate prop types
ButtonContainer.propTypes = {
  isLoader: PropTypes.bool,
  submitBtnText: PropTypes.string
};

export default ButtonContainer;
