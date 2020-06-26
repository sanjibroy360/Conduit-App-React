import React from "react";
import "./Loader.css";

export default function Loader({ size }) {
  return (
    <div className="loader_wrapper">
      <div class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
