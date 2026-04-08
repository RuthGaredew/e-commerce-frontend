import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { EcommerceProvider } from "./context/EcommerceContext";
import { UserProvider } from "./context/UserContext";
import App from "./App";
import "C:/Users/Kelela/Documents/GitHub/e-commerce-frontend/src/styles/index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <EcommerceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EcommerceProvider>
  </UserProvider>,
);
