import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { state } = useContext(UserContext);
  const { user, orders } = state;

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 pt-10 pb-10">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-2">User Profile</h2>
        {user ? (
          <>
            <div className="mb-2">
              <p className="text-lg font-medium">Username: <span className="font-normal">{user.username}</span></p>
            </div>
            <h3 className="text-md font-semibold mb-2">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found</p>
            ) : (
              <ul className="border-t border-gray-300 pt-2">
                {orders.map((order, index) => (
                  <li key={index} className="flex justify-between p-2 border-b border-gray-200">
                    <span>{order.name}</span>
                    <span>${order.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;