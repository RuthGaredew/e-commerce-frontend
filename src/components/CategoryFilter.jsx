import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';

function CategoryFilter() {
  const { dispatch } = useContext(EcommerceContext);
  const categories = ['all', 'electronics', 'clothing', 'footwear', 'home', 'accessories'];

  const filterByCategory = (category) => {
    dispatch({ type: 'SET_FILTERS', payload: { category } });
  };

  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <button key={category} onClick={() => filterByCategory(category)} className="p-2">
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;