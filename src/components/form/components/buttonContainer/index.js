import React from "react";

import FormButton from "../../../formButton";

/**
 * @description: A wrapper container for form buttons
 */
export default props => {
  return (
    <div className="button-container text-right">
      <FormButton
        buttonLabel={props.submitBtnText}
        isPrimary
        isLoader={props.isLoader}
      />
      <FormButton buttonType="reset" />
    </div>
  );
};
