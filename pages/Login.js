import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sis-backend-temp.herokuapp.com/api/auth/login', { email, password });
      const { role, token } = response.data;

      localStorage.setItem('token', token);
      switch (role) {
        case 'Admin':
          window.location.href = '/admin';
          break;
        case 'Teacher':
          window.location.href = '/teacher';
          break;
        case 'Parent':
          window.location.href = '/parent';
          break;
        case 'Student':
          window.location.href = '/student';
          break;
        default:
          setError('Invalid role');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
