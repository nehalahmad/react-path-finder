import React, { Fragment } from "react";

export default props => {
  if (!props.errorMessage) {
    return null;
  }

  return (
    <Fragment>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        onClick={() => props.setErrorMessageHandler("")}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.setErrorMessageHandler("")}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Error</h4>
            </div>
            <div className="modal-body">
              <p>{props.errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        onClick={() => props.setErrorMessageHandler("")}
      />
    </Fragment>
  );
};
