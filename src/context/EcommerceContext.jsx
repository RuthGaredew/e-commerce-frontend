import React, { createContext, useReducer } from 'react';

// Initial state for the context
const initialState = {
  cart: [],
  filters: { category: 'all' },
  darkMode: false,
};

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

// eslint-disable-next-line react-refresh/only-export-components
export const EcommerceContext = createContext();

export const EcommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
};