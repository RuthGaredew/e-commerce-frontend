import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';

function DarkModeToggle() {
  const { dispatch } = useContext(EcommerceContext);

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 bg-gray-200 rounded">
      Toggle Dark Mode
    </button>
  );
}

export default DarkModeToggle;