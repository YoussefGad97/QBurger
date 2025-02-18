import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.scss";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(u => 
      u.username === formData.username && 
      u.password === formData.password
    );

    if (!user) {
      setError('Invalid username or password');
      return;
    }

    login(user);
    navigate('/');
  };

  return (
    <div className="login-page">
      <Container maxWidth="sm" className="auth-container">
        <Typography variant="h4" className="auth-title">
          Login
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
          {error && <Typography className="error-message">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            className="auth-button"
          >
            Login
          </Button>
        </form>
        <Typography className="auth-link">
          Don't have an account? <Button href="/signup">Sign Up</Button>
        </Typography>
      </Container>
    </div>
  );
};

export default Login; 