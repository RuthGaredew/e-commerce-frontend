import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { EcommerceProvider } from "./context/EcommerceContext";
import "./styles/index.css"; // Ensure your styles are imported

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserProvider>
      <EcommerceProvider>
        <App />
      </EcommerceProvider>
    </UserProvider>
  </Router>
);