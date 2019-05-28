import React, { Component, Fragment } from "react";

export default class Modal extends Component {
  render() {
    if (!this.props.errorMessage) {
      return null;
    }

    return (
      <Fragment>
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          onClick={this._clickOutsideHandler}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.props.setErrorMessageHandler("")}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Error</h4>
              </div>
              <div className="modal-body">
                <p>{this.props.errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop fade show"
          onClick={this._clickOutsideHandler}
        />
      </Fragment>
    );
  }

  _clickOutsideHandler = e => {
    if (e.target.className && e.target.className.includes("show")) {
      this.props.setErrorMessageHandler("");
    }
  };
}
