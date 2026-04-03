import React, { useContext } from "react";
import { EcommerceContext } from "../context/EcommerceContext";

function ProductCard({ product }) {
  const { dispatch } = useContext(EcommerceContext);

  // Data mapping
  const title = product.title || "Untitled";
  const image = product.imageCover || product.image || "./img/placeholder.jpeg";
  const price = product.price || 0;
  const categoryName = product.category?.name || "General";

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="p-4 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] bg-white dark:bg-gray-800 flex flex-col justify-between h-full">
      {/* ... your JSX code ... */}
      <img src={image} alt={title} className="w-full h-48 object-contain" />
      <h2 className="font-bold dark:text-white">{title}</h2>
      <p className="text-orange-500">${price}</p>
      <button
        onClick={addToCart}
        className="bg-blue-600 hover:bg-indigo-600 active:bg-indigo-700 text-white p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}


export default ProductCard;
