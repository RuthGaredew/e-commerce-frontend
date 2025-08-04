import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';
import Search from './Search';
import { FaShoppingCart, FaUserCircle, FaBox } from 'react-icons/fa';


function Header({ onSearch }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(EcommerceContext);
  const { cart } = state;
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const user = userState.user;
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleDarkMode = () => dispatch({ type: 'TOGGLE_DARK_MODE' });
   const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-lg">
       <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">ME</span>
              </div>
              <h3 className="text-xl font-bold  text-white bg-clip-text text-transparent">
                Mini E-Commerce
              </h3>
            </div>
            <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
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
      <div className={`lg:flex lg:gap-x-12 ${isOpen ? 'block' : 'hidden'} lg:block`} id="mobile-menu">
        {showSearch && <Search onSearch={onSearch} />}
        <button onClick={toggleSearch} className="ml-4">🔍</button>
        <div className="relative ml-4">
          <button onClick={() => navigate('/products')} className="flex items-center">
            <FaBox className="mr-1" /> Products
          </button>
        </div>
        <div className="relative ml-4">
          <button onClick={() => navigate('/cart')}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="absolute text-xs bg-red-500 text-white rounded-full px-1">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        <div className="relative ml-4">
          <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FaUserCircle />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 bg-white shadow-lg mt-2 w-48 text-gray-800">
              <ul>
                {user ? (
                  <>
                    <li className="p-2 border-b" onClick={() => navigate('/profile')}>Profile</li>
                    <li className="p-2 border-b" onClick={() => navigate('/checkout')}>Checkout</li>
                    <li className="p-2 border-b text-gray-800" onClick={() => { userDispatch({ type: 'LOGOUT' }); navigate('/login'); }}>Logout</li>
                  </>
                ) : (
                  <>
                    <li className="p-2 border-b" onClick={() => navigate('/login')}>Login</li>
                    <li className="p-2 border-b text-gray-800" onClick={() => navigate('/register')}>Register</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        <button onClick={toggleDarkMode} className="ml-4">
          {state.darkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;