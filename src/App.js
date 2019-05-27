import React from "react";
import "./assets/css/app.css";

import GetMapPath from "./components/App";

/**
 * @description: app level entry point
 */
function App() {
  return (
    <div className="App container-fluid">
      <GetMapPath />
    </div>
  );
}

export default App;
