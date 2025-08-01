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

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate(user ? '/profile' : '/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProductClick = () => {
    navigate('/products');
  };

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' });
    setShowProfileMenu(false);
    navigate('/login');
  };

  const handleCheckoutClick = () => {
    if (user) {
      navigate('/checkout');
    } else {
      alert('Please log in to proceed to checkout.');
      navigate('/login');
    }
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center absolute top-0 left-0 right-0 z-10">
      <h1 className="text-2xl">Mini E-Commerce</h1>
      <div className="flex items-center">
        {showSearch && <Search onSearch={onSearch} />}
        <button onClick={toggleSearch} className="ml-4">
          🔍
        </button>
        <div className="relative ml-4">
          <button onClick={handleProductClick} className="flex items-center">
            <FaBox className="mr-1" />
            Products
          </button>
        </div>
        <div className="relative ml-4">
          <button onClick={handleCartClick}>
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
                    <li className="p-2 border-b" onClick={handleProfileClick}>
                      Profile
                    </li>
                    <li className="p-2 border-b" onClick={handleCheckoutClick}>
                      Checkout
                    </li>
                    <li className="p-2 border-b text-gray-800" onClick={handleLogout}>
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li className="p-2 border-b" onClick={handleProfileClick}>
                      Login
                    </li>
                    <li className="p-2 border-b text-gray-800" onClick={() => navigate('/register')}>
                      Register
                    </li>
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