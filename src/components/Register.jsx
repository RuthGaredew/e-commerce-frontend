import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
  const { dispatch } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = () => {
    const newUser = { username, password };
    dispatch({ type: 'REGISTER', payload: newUser });
    alert('Registration successful');
    navigate('/products'); // Redirect to product list page
  };

  return (
    <div className="border p-4">
      <h2 className="text-lg">Register</h2>
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
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2 mt-2">
        Register
      </button>
    </div>
  );
}

export default Register;