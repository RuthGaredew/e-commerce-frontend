import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import users from '../context/demo.json'; // Import the JSON file

function Login() {
  const { dispatch } = useContext(UserContext);
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Pre-fill form if coming from registration
  useEffect(() => {
    if (location.state?.username) setUsername(location.state.username);
    if (location.state?.password) setPassword(location.state.password);
  }, [location.state]);

  const handleLogin = () => {
    // Find user in demo.json
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      dispatch({ type: 'LOGIN', payload: foundUser });
      dispatch({ type: 'ADD_ORDER', payload: foundUser.orders || [] });
      alert('Login successful');
      navigate('/products');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 pt-10 pb-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue-600 text-white rounded-lg p-2 w-full hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;