import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EcommerceContext } from "../context/EcommerceContext";
import { UserContext } from "../context/UserContext";
import Search from "./Search";
import { FaShoppingCart, FaUserCircle, FaBox, FaSearch } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";

function Header({ onSearch }) {
  const navigate = useNavigate();
  const { state } = useContext(EcommerceContext);
  const { cart } = state;
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const user = userState.user;

  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <header className="bg-blue-700 dark:bg-slate-900 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-white dark:bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
            <span className="text-blue-700 dark:text-white font-black text-lg">
              ME
            </span>
          </div>
          <h3 className="text-xl font-black hidden sm:block">
            Mini E-Commerce
          </h3>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-white hover:bg-blue-600 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links & Actions */}
        <div
          className={`${isOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row w-full lg:w-auto mt-4 lg:mt-0 items-center gap-6`}
        >
          {/* Search Toggle */}
          <div className="flex items-center w-full lg:w-auto">
            {showSearch && <Search onSearch={onSearch} />}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-blue-600 dark:hover:bg-slate-800 rounded-full ml-2"
            >
              <FaSearch />
            </button>
          </div>

          {/* Products Link */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center hover:text-blue-200 transition-colors font-medium"
          >
            <FaBox className="mr-2" /> Products
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 hover:bg-blue-600 dark:hover:bg-slate-800 rounded-full transition-all"
          >
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-orange-500 text-[10px] font-bold rounded-full border-2 border-blue-700 dark:border-slate-900">
                {cart.length}
              </span>
            )}
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1 border-2 border-transparent hover:border-white rounded-full transition-all"
            >
              <FaUserCircle size={28} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl py-2 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b dark:border-slate-700">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="font-bold truncate">{user?.name || "Guest"}</p>
                </div>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Checkout
                </button>
                <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Component */}
          <div className="border-l border-blue-600 dark:border-slate-700 pl-4">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
