import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const { dispatch } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    const loggedInUser = { username, password }; // In a real app, verify credentials
    dispatch({ type: 'LOGIN', payload: loggedInUser });
    alert('Login successful');
    navigate('/products'); // Redirect to product list page
  };

  return (
    <div className="border p-4">
      <h2 className="text-lg">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-2">
        Login
      </button>
    </div>
  );
}

export default Login;