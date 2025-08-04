import React, { useContext, useState } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaCheck } from 'react-icons/fa';

function Checkout() {
  const location = useLocation();
  const { state: ecommerceState } = useContext(EcommerceContext);
  const cart = location.state?.cart || ecommerceState.cart;
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderComplete(true);
    
    // Add orders to user context
    cart.forEach(item => {
      userDispatch({ type: 'ADD_ORDER', payload: item });
    });
    
    // Wait a moment to show success animation
    setTimeout(() => {
      userDispatch({ type: 'CHECKOUT' });
      navigate('/products');
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <div className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-custom">
            <FaCheck className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Redirecting to products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Checkout
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete your purchase securely
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add some items to your cart before checking out.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 animate-slideIn">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  Free
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 animate-slideIn" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaCreditCard className="mr-3 text-blue-600 dark:text-blue-400" />
              Payment Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center">
              <FaLock className="text-blue-600 dark:text-blue-400 mr-3" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your payment information is secure and encrypted
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`
                w-full mt-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform
                ${isProcessing 
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
                }
              `}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                `Complete Purchase - $${total.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;