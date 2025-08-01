import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { EcommerceProvider } from "./context/EcommerceContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider>
      <EcommerceProvider>
        <Router>
          <Header />
          <main className="p-4 pt-20 pb-20">
            <Routes>
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<Order />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              {/* Add a default route for unmatched paths */}
              <Route path="/" element={<ProductList />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </EcommerceProvider>
    </UserProvider>
  );
}

export default App;
