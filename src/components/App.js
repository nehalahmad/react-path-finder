import React, { Component } from "react";

// import MainArea component
import MainArea from "./MainArea";

/**
 * @description: wrapper file to display overall map page UI
 */
export default class App extends Component {
  /**
   * @description: life cycle method
   */
  componentDidMount() {
    window.addEventListener("error", this._handleGlobalError);
    window.addEventListener("unhandledrejection", this._unhandledRejection);
  }

  /**
   * @description: life cycle method
   */
  render() {
    return <MainArea ref="main" />;
  }

  /**
   * @description: life cycle method
   */
  componentWillUnmount() {
    window.removeEventListener("error", this._handleGlobalError);
    window.removeEventListener("unhandledrejection", this._unhandledRejection);
  }

  /**
   * @description: Handler erros on window level
   */
  _handleGlobalError = (msg, url, lineNo, columnNo, error) => {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1) {
      this.refs.main._setErrorMessageHandler(
        "Script Error: See Browser Console for Detail"
      );
    } else {
      var message = [
        "Message: " + msg,
        "URL: " + url,
        "Line: " + lineNo,
        "Column: " + columnNo,
        "Error object: " + JSON.stringify(error)
      ].join(" - ");
      this.refs.main._setErrorMessageHandler(message);
    }
    return false;
  };

  /**
   * @description: handle global unhandled rejections
   */
  _unhandledRejection = event => {
    this.refs.main._setErrorMessageHandler(
      `UNHANDLED PROMISE REJECTION: ${event.reason}`
    );
  };
}
