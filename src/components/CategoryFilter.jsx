import React, { useContext } from "react";
import { EcommerceContext } from "../context/EcommerceContext";

function CategoryFilter() {
  const { state, dispatch } = useContext(EcommerceContext);
  const { categories, filters } = state;

  // Normalize category names into a unique list of strings
  const categoryNames = [
    "all",
    ...new Set(
      categories.map((cat) => (typeof cat === "string" ? cat : cat.name)),
    ),
  ];

  const handleFilter = (name) => {
    dispatch({ type: "SET_FILTERS", payload: { category: name } });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 my-10">
      
      {categoryNames.map((name) => {
        // Compare values safely for the "active" style
        const isActive =
          (filters.category || "all").toLowerCase() === name.toLowerCase();

        return (
          <button
            key={name}
            onClick={() => handleFilter(name)}
            className={`px-6 py-2.5 rounded-xl border-2 transition-all duration-300 capitalize font-bold text-sm
              ${
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none scale-105"
                  : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
              }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
