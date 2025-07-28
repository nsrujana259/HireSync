import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hiresync-3492.onrender.com/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
