import React from "react";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { RESET_TEXT } from "../../../config/appConstants";

/**
 * @name: FormButton
 * @description: A functional component to create a button
 */
const FormButton = props => {
  const { buttonType, buttonLabel, isPrimary, isLoader } = props;

  return (
    <Button
      type={buttonType}
      variant={isPrimary ? "primary" : "reset"}
      disabled={isLoader}
    >
      {buttonLabel}
    </Button>
  );
};

FormButton.propTypes = {
  buttonType: PropTypes.string,
  buttonLabel: PropTypes.string,
};

FormButton.defaultProps = {
  buttonType: "submit",
  buttonLabel: RESET_TEXT,
  isPrimary: false
};

export default FormButton;
