import React from "react";

/**
 * @name: FormButton
 * @description: A functional component to create a button
 */
const FormButton = props => {
  const { buttonType, buttonLabel, isPrimary, isLoader } = props;

  return (
    <button
      type={buttonType}
      className={isPrimary ? "btn btn-primary" : "btn btn-default"}
      disabled={isLoader}
    >
      {buttonLabel}
    </button>
  );
};

FormButton.defaultProps = {
  buttonType: "submit",
  buttonLabel: "Reset",
  isPrimary: false
};

export default FormButton;
