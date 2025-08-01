import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Checkout({ onCheckoutComplete }) {
  const { state } = useContext(EcommerceContext);
  const { cart } = state;
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const { dispatch: userDispatch } = useContext(UserContext);
   const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckout = () => {
    alert('Thank you for your order!');
    cart.forEach(item => {
      userDispatch({ type: 'ADD_ORDER', payload: item });
    });
    userDispatch({ type: 'CHECKOUT' });
    onCheckoutComplete();
     navigate('/products'); // Redirect to product list page
    
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
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-2">
            <strong>Total:</strong>
            <strong>${total}</strong>
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