import React, { Component } from "react";

// import PathFinder component
import PathFinder from "./components/path-finder";
import "./services/GlobalErrorHandler";

/**
 * @description: wrapper file to display overall map page UI
 */
export default class App extends Component {
  /**
   * @description: life cycle method
   */
  render() {
    return <PathFinder ref="main" />;
  }
}
