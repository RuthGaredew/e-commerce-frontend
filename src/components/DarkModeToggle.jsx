import React, { useContext } from "react";
import { EcommerceContext } from "../context/EcommerceContext";

function DarkModeToggle() {
  const { state, dispatch } = useContext(EcommerceContext);

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <button onClick={toggleDarkMode} className="ml-4">
      {state.darkMode ? "🌞" : "🌙"}
    </button>
  );
}

export default DarkModeToggle;
