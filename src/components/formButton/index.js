import React from "react";

/**
 * @name: FormButton
 * @description: A functional component to create a button
 */
export default props => {
  let { buttonType, buttonLabel, isPrimary } = props;

  return (
    <button
      type={buttonType}
      className={isPrimary ? "btn btn-primary m-r-20" : "btn btn-default"}
    >
      {buttonLabel}
    </button>
  );
};