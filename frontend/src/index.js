import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // <--- PASTIKAN BARIS INI ADA
import App from "./App"; // <--- PASTIKAN BARIS INI ADA

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
