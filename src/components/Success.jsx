import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EcommerceContext } from "../context/EcommerceContext";
import { FaCheckCircle } from "react-icons/fa";

function Success() {
  const { dispatch } = useContext(EcommerceContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Clear the cart globally now that payment is confirmed
    dispatch({ type: "CHECKOUT" });

    // 2. Optional: Redirect to home or orders after 5 seconds
    const timer = setTimeout(() => {
      navigate("/products");
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl text-center animate-fadeIn">
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your order has been placed and is being processed. You will receive a
          confirmation email shortly.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/products")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")} // Assuming you have an orders page
            className="w-full py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
          >
            View My Orders
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
}

export default Success;
