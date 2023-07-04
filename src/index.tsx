import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import HomePage from "./home-page/HomePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<HomePage />);
