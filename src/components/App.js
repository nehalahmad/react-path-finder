import React, { Component } from "react";

// import PathFinder component
import PathFinder from "./pages/path-finder";
import './../services/errorHandler';

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
