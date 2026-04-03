import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

// Initialize state from localStorage to prevent "flicker"
const initialState = {
  products: [],
  categories: [],
  cart: [],
  filters: { category: "all" },
  darkMode: localStorage.getItem("theme") === "dark",
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "ADD_TO_CART": {
      const idToFind = action.payload._id || action.payload.id;
      const existing = state.cart.find(
        (item) => (item._id || item.id) === idToFind,
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            (item._id || item.id) === idToFind
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            (item._id || item.id) !== (action.payload._id || action.payload.id),
        ),
      };
    case "CHECKOUT":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const EcommerceContext = createContext();

export const EcommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const API_BASE = "https://ecommerce.routemisr.com/api/v1";

  // 1. Dark Mode Persistence Logic
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [state.darkMode]);

  // 2. Data Fetching
  const fetchProducts = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(`${API_BASE}/products`);
      const result = await response.json();
      dispatch({ type: "SET_PRODUCTS", payload: result.data });
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      const result = await response.json();
      dispatch({ type: "SET_CATEGORIES", payload: result.data });
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <EcommerceContext.Provider value={{ state, dispatch, fetchProducts }}>
      {children}
    </EcommerceContext.Provider>
  );
};
