import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { dispatch } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const newUser = { username, password };
    dispatch({ type: 'REGISTER', payload: newUser });
    alert('Registration successful');
    // Pass username and password to login page via navigation state
    navigate('/login', { state: { username, password } });
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
      <button type="submit" onClick={handleRegister} className="bg-blue-500 text-white p-2 mt-2">
        Register
      </button>
    </div>
  );
}

export default Register;