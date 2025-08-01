import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { state } = useContext(UserContext);
  const { user, orders } = state;

  return (
    <div className="border p-4">
      <h2 className="text-lg">User Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <h3 className="text-md">Order History</h3>
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
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;