// src/App.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { EcommerceContext } from "./context/EcommerceContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Success from "./components/Success";

function App() {
  const { state } = useContext(EcommerceContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Sync Dark Mode with Body class
useEffect(() => {
  if (state.darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [state.darkMode]);

const handleSearch = (searchTerm) => {
  navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
};
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header onSearch={handleSearch} />

      {/* Added responsive padding and min-height to push footer down */}
      <main className="flex-grow p-4 pt-24 pb-20 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/order" element={<Order />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/search"
            element={<ProductList searchTerm={query.get("query") || ""} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
