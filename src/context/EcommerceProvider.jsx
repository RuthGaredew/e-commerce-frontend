import React, { useReducer } from 'react';
import { EcommerceContext } from './EcommerceContext';

const initialState = {
  cart: [],
  filters: { category: 'all' },
  darkMode: false,
};
// Inside EcommerceProvider
useEffect(() => {
  // 1. Check the state
  if (state.darkMode) {
    document.documentElement.classList.add("dark");
    // 2. Save it so it stays dark even if they refresh the page
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [state.darkMode]);
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'CHECKOUT':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const EcommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
};