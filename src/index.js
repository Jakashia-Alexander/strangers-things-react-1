import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {Register, Auth} from "./components/index";

const App = () => {
  return (
    <div>
      <h1>Strangers Things</h1>
      <Auth />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
