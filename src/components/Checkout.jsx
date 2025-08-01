import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout({ onCheckoutComplete }) {
  const location = useLocation();
  const { state: ecommerceState } = useContext(EcommerceContext); // Always call useContext at the top
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
    <div className="border p-4 mt-4">
      <h2 className="text-lg">Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-2">
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button onClick={handleCheckout} className="bg-green-500 text-white p-2 mt-4">
            Complete Purchase
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;