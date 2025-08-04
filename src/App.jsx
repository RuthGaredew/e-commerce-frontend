// src/App.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { EcommerceProvider, EcommerceContext } from "./context/EcommerceContext";
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
  const { state } = useContext(EcommerceContext);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (state.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [state.darkMode]);

  const handleSearch = (searchTerm) => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <EcommerceProvider>
      <Header onSearch={handleSearch} />
      <main className="p-4 pt-20 pb-20">
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<ProductList searchTerm={query.get("query") || ""} />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </main>
      <Footer />
    </EcommerceProvider>
  );
}

export default App;