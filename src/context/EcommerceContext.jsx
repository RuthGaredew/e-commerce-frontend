import React, { createContext, useReducer, useEffect } from 'react';

// Initial state for the context
const initialState = {
  cart: [],
  filters: { category: 'all' },
  darkMode: false,
};

// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        // If already in cart, increase quantity
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
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

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const EcommerceContext = createContext();

// Provider component
export const EcommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Apply dark mode to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
};