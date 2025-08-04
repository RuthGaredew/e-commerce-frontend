import React, { useContext, useState } from 'react';
import { EcommerceContext } from '../context/EcommerceContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { state, dispatch } = useContext(EcommerceContext);
  const { cart } = state;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // State for selected product
  const [selectedProductId, setSelectedProductId] = useState(cart.length > 0 ? cart[0].id : null);

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    // If removed item was selected, select another or null
    if (selectedProductId === item.id) {
      const remaining = cart.filter(i => i.id !== item.id);
      setSelectedProductId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const updateQuantity = (item, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.id, quantity } });
  };

  const handleCheckout = () => {
    if (user) {
      if (!selectedProductId) {
        alert('Please select a product to checkout.');
        return;
      }
      const selectedProduct = cart.find(item => item.id === selectedProductId);
      navigate('/checkout', { state: { cart: [selectedProduct] } });
    } else {
      alert('Please log in to proceed to checkout.');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 pt-10 pb-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col md:flex-row justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-4">
                    {/* Radio button for selection */}
                    <input
                      type="radio"
                      name="selectedProduct"
                      checked={selectedProductId === item.id}
                      onChange={() => setSelectedProductId(item.id)}
                      className="h-5 w-5"
                    />
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <span className="font-bold">{item.name}</span>
                      <div className="text-gray-700">${item.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateQuantity(item, Number(e.target.value))}
                      className="w-12 text-center border rounded"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                    >+</button>
                    <button onClick={() => removeFromCart(item)} className="text-red-500 ml-2">Remove</button>
                  </div>
                  <div className="font-semibold mt-2 md:mt-0">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold mb-4">
              <strong>Total:</strong>
              <strong>
                {selectedProductId
                  ? `$${(
                      cart.find(item => item.id === selectedProductId)?.price *
                      cart.find(item => item.id === selectedProductId)?.quantity
                    ).toFixed(2)}`
                  : "$0.00"}
              </strong>
            </div>
            <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 w-full">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;