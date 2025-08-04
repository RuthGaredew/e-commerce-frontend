import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { FaUser, FaShoppingBag, FaHistory } from 'react-icons/fa';

function Profile() {
  const { state } = useContext(UserContext);
  const { user, orders } = state;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fadeIn">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You need to be logged in to view your profile.
          </p>
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 mb-8 animate-slideIn">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <FaUser className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, {user.username}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account and view your order history
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 animate-slideIn" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
              <FaShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 animate-slideIn" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">$</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${orders.reduce((total, order) => total + (order.price || 0), 0).toFixed(2)}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Spent</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 animate-slideIn" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
              <FaHistory className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {orders.length > 0 ? 'Active' : 'New'}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Account Status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 animate-slideIn" style={{ animationDelay: '400ms' }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaHistory className="mr-3 text-blue-600 dark:text-blue-400" />
          Order History
        </h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your order history here!
            </p>
            <a
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200"
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FaShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {order.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order #{index + 1001}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${order.price}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Completed
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;