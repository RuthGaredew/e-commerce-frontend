import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Order() {
  const { state } = useContext(UserContext);
  const { orders } = state;

  return (
    <div className="border p-4">
      <h2 className="text-lg">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="flex justify-between">
              <span>{order.name}</span>
              <span>${order.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;