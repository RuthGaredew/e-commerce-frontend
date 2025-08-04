import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';

function ProductCard({ product }) {
  const { dispatch } = useContext(EcommerceContext);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer">
      
      <img src={product.image} alt={product.name} className="w-full h-auto object-cover mb-2 rounded-lg" />
      <h2 className="text-lg">{product.name}</h2>
      <p>${product.price}</p>
      <button className="bg-blue-500 text-white p-2 hover:bg-blue-800" onClick={addToCart}>
        Add to Cart 
      </button>
    </div>
  );
}

export default ProductCard;