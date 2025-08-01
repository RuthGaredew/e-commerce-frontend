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
      <button type="submit" onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-2">
        Login
      </button>
    </div>
  );
}

export default Login;