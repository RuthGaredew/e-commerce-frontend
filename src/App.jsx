import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const navigate = useNavigate();
  const query = useQuery();

  const handleSearch = (searchTerm) => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <UserProvider>
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
            {/* Add a default route for unmatched paths */}
            <Route path="/search" element={<ProductList searchTerm={query.get("query") || ""} />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </main>
        <Footer />
      </EcommerceProvider>
    </UserProvider>
  );
}

export default App;
