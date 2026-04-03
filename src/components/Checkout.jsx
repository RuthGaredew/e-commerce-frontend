import React, { useContext, useState } from "react";
import { EcommerceContext } from "../context/EcommerceContext";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock, FaCheck } from "react-icons/fa";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: ecommerceState } = useContext(EcommerceContext);
  const { user } = useContext(UserContext); // Get user for auth token

  const cart = location.state?.cart || ecommerceState.cart;
  const cartId = ecommerceState.cartId || "manual_checkout"; // Use cart ID from API if available
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripeCheckout = async () => {
    setIsProcessing(true);

    try {
      // 1. Call your API to create a Stripe Session
      const response = await fetch(
        `https://your-api.com/api/v1/orders/checkout-session/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Send JWT token
          },
          // If your API requires the products list in the body:
          body: JSON.stringify({
            products: cart.map((item) => ({
              product: item._id || item.id,
              count: item.quantity,
              price: item.price,
            })),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.session?.url) {
        // 2. Redirect user to Stripe's secure hosted page
        window.location.href = data.session.url;
      } else {
        alert(data.message || "Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Checkout</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Secure Stripe Payment Gateway
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary Side */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-6 dark:text-white">
            Order Summary
          </h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item._id || item.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain bg-white rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold dark:text-white line-clamp-1">
                    {item.name || item.title}
                  </h4>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 text-xl font-bold flex justify-between dark:text-white">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Action Side */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold dark:text-white">
              Secure Checkout
            </h3>
            <p className="text-sm text-gray-500">
              You will be redirected to Stripe to complete your purchase safely.
            </p>
          </div>

          <button
            onClick={handleStripeCheckout}
            disabled={isProcessing || cart.length === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isProcessing ? "Opening Secure Gateway..." : "Pay with Card"}
          </button>

          <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
            <FaLock className="mr-2" /> Encrypted by Stripe SSL
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
