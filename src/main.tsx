import React from "react";
import { Nav } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import App from "./App";
import { NavMenu } from "./components/nav-menu.component";
import { ProductDetails } from "./components/product-details.component";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavMenu />
    <App />
  </React.StrictMode>
);
