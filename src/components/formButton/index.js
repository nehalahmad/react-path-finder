import React from "react";

/**
 * @name: FormButton
 * @description: A functional component to create a button
 */
export default props => {
  let {
    buttonType = "submit",
    buttonLabel = "Reset",
    isPrimary = false,
    isLoader
  } = props;

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
