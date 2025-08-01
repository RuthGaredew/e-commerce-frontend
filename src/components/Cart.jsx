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
    navigate('/checkout');
  } else {
    alert('Please log in to proceed to checkout.');
    navigate('/login');
  }
  if (!selectedProductId) {
      alert('Please select a product to checkout.');
      return;
    }
    // Pass only the selected product to checkout (could use context or navigate with state)
    const selectedProduct = cart.find(item => item.id === selectedProductId);
    navigate('/checkout', { state: { cart: [selectedProduct] } });
  
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
              <li key={item.id} className="flex flex-col md:flex-row justify-between items-center py-2 border-b">
                <div className="flex items-center gap-4">
                  {/* Radio button for selection */}
                  <input
                    type="radio"
                    name="selectedProduct"
                    checked={selectedProductId === item.id}
                    onChange={() => setSelectedProductId(item.id)}
                  />
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <span className="font-bold">{item.name}</span>
                    <div>${item.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <button
                    className="px-2 py-1 bg-gray-200"
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                  >-</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item, Number(e.target.value))}
                    className="w-12 text-center border"
                  />
                  <button
                    className="px-2 py-1 bg-gray-200"
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
                    
                    <div className="flex justify-between mt-4">
                      <strong>Total:</strong>
                      <strong>
                        {selectedProductId
                          ? `$${(
                              cart.find(item => item.id === selectedProductId)?.price *
                              cart.find(item => item.id === selectedProductId)?.quantity
                            ).toFixed(2)}`
                          : "$0.00"}
                      </strong>
                      <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 mt-4">
                        Checkout
                      </button>
                    </div>
       
        </>
      )}
    </div>
  );
}

export default Cart;