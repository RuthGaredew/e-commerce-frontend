import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout({ onCheckoutComplete }) {
  const location = useLocation();
  const { state: ecommerceState } = useContext(EcommerceContext);
  const cart = location.state?.cart || ecommerceState.cart;
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert('Thank you for your order!');
    cart.forEach(item => {
      userDispatch({ type: 'ADD_ORDER', payload: item });
    });
    userDispatch({ type: 'CHECKOUT' });
    if (onCheckoutComplete) onCheckoutComplete();
    navigate('/products');
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 pt-10 pb-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Checkout</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between p-2 border-b border-gray-200">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              className="bg-green-600 text-white rounded-lg p-2 w-full hover:bg-green-700 transition duration-200"
            >
              Complete Purchase
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;