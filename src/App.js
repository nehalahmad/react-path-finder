import React, { Component } from "react";

// import PathFinder component
import Direction from "./path_finder";
import "./services/GlobalErrorHandler";

/**
 * @description: wrapper file to display overall map page UI
 */
export default class App extends Component {
  /**
   * @description: life cycle method
   */
  render() {
    return <Direction ref="main" />;
  }
}
