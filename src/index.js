import ReactDOM from "react-dom";
import React from "react";
import App from "./component/App.jsx";
import "./stylesheets/style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
