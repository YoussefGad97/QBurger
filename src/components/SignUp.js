import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import "../styles/SignUp.scss";

const SignUp = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Check if user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === formData.username)) {
      setError('Username already exists');
      return;
    }

    const newUser = {
      username: formData.username,
      password: formData.password,
      orders: []
    };

    // Save user to local storage
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    login(newUser);
  };

  return (
    <div className="signup-page">
      <Container maxWidth="sm" className="auth-container">
        <Typography variant="h4" className="auth-title">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            className="auth-input"
            margin="normal"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            className="auth-input"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            className="auth-input"
            margin="normal"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          {error && <Typography className="error-message">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            className="auth-button"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default SignUp; 