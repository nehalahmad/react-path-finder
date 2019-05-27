import React from "react";

import FormButton from "../../../formButton";

/**
 * A wrapper container for form buttons
 */
export default props => {
  return (
    <div className="button-container text-right">
      <FormButton
        buttonType="submit"
        buttonLabel={props.submitBtnText}
        isPrimary
      />
      <FormButton buttonType="reset" buttonLabel="Reset" />
    </div>
  );
};
