import React, { useContext } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';

function Cart() {
  const { state, dispatch } = useContext(EcommerceContext);
  const { cart } = state;
  const { user } = useContext(UserContext);

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const handleCheckout = () => {
    if (user) {
      // Navigate to checkout page
      // You might want to set the current page to checkout here
      // Example: setCurrentPage('checkout');
    } else {
      alert('Please log in to proceed to checkout.');
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-lg">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button onClick={() => removeFromCart(item)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <strong>Total:</strong>
            <strong>${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</strong>
          </div>
          <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 mt-4">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;