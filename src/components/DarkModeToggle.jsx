import React, { useContext } from "react";
import { EcommerceContext } from "../context/EcommerceContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Using react-icons for a pro look

function DarkModeToggle() {
  const { state, dispatch } = useContext(EcommerceContext);
  const { darkMode } = state;

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
      className="p-2.5 rounded-xl bg-blue-600 dark:bg-slate-700 text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* If it IS dark mode, show the Sun. If it IS light mode, show the Moon. */}
      {darkMode ? (
        <FaSun className="text-yellow-400 w-5 h-5" />
      ) : (
        <FaMoon className="text-white w-5 h-5" />
      )}
    </button>
  );
}

export default DarkModeToggle;
