import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
  orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { ...state, user: action.payload, orders: [] };
    case 'LOGIN':
      return { ...state, user: action.payload, orders: action.payload.orders || [] };
    case 'LOGOUT':
      return { ...state, user: null, orders: [] };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, ...(Array.isArray(action.payload) ? action.payload : [action.payload])] };
    default:
      return state;
  }
};
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};