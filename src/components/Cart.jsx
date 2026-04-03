import React, { useContext, useState, useEffect } from "react";
import { EcommerceContext } from "../context/EcommerceContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { state, dispatch } = useContext(EcommerceContext);
  const { cart } = state;
  const { user } = useContext(UserContext); // Assuming user contains token and data
  const navigate = useNavigate();

  // Use _id for API compatibility, fallback to id for local
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Sync selected ID when cart loads
  useEffect(() => {
    if (cart.length > 0 && !selectedProductId) {
      setSelectedProductId(cart[0]._id || cart[0].id);
    }
  }, [cart, selectedProductId]);

  const removeFromCart = (item) => {
    const itemId = item._id || item.id;
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: itemId } });

    if (selectedProductId === itemId) {
      const remaining = cart.filter((i) => (i._id || i.id) !== itemId);
      setSelectedProductId(
        remaining.length > 0 ? remaining[0]._id || remaining[0].id : null,
      );
    }
  };

  const updateQuantity = (item, quantity) => {
    if (quantity < 1) return;
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id: item._id || item.id, quantity },
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (!selectedProductId) {
      alert("Please select a product to checkout.");
      return;
    }

    const selectedProduct = cart.find(
      (item) => (item._id || item.id) === selectedProductId,
    );

    // API Integration: You mentioned POST /api/v1/orders/checkout-session/:cartId
    // Usually, you'd send the cart data to your backend here to get a Stripe URL
    navigate("/checkout", { state: { items: [selectedProduct] } });
  };

  // Helper to find selected item for total calculation
  const selectedItem = cart.find(
    (item) => (item._id || item.id) === selectedProductId,
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Your cart is feeling lonely.</p>
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline"
            >
              Go shopping →
            </button>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.map((item) => {
                const itemId = item._id || item.id;
                const title = item.title || item.name;
                return (
                  <li
                    key={itemId}
                    className="flex flex-col md:flex-row justify-between items-center py-4 gap-4"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <input
                        type="radio"
                        name="selectedProduct"
                        checked={selectedProductId === itemId}
                        onChange={() => setSelectedProductId(itemId)}
                        className="h-5 w-5 accent-blue-500"
                      />
                      <img
                        src={item.image || item.imageCover}
                        alt={title}
                        className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-1"
                      />
                      <div className="flex-1">
                        <span className="font-bold block dark:text-white">
                          {title}
                        </span>
                        <div className="text-blue-600 font-semibold">
                          ${item.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-6">
                      <div className="flex items-center border rounded-lg dark:border-gray-600 overflow-hidden">
                        <button
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 transition"
                          onClick={() =>
                            updateQuantity(item, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-medium dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 transition"
                          onClick={() =>
                            updateQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-red-500 hover:text-red-700 font-medium transition"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center text-lg">
                <span className="dark:text-gray-300">Selected Item Total:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  $
                  {selectedItem
                    ? (selectedItem.price * selectedItem.quantity).toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
