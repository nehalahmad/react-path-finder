import React from "react";

const toastMessage = porps => {
  return (
    <div className="alert alert-danger alert-dismissible fade in error-message" role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close" 
        onClick={() => porps.setErrorMessageHandler("")}
      >
        <span aria-hidden="true">×</span>
      </button>
      {porps.errorMessage}
    </div>
  );
};

export default toastMessage;
