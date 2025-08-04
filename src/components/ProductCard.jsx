import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';

function ProductCard({ product }) {
  const { dispatch } = useContext(EcommerceContext);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer">
      
      <img src={product.image} alt={product.name} className="w-full h-auto max-h-72 object-contain bg-white rounded-lg" />
      <h2 className="text-lg md:text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-3 w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={addToCart}>
        Add to Cart 
      </button>
    </div>
  );
}

export default ProductCard;