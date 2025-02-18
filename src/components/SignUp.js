import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/SignUp.scss";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      await signup(formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="sm" className="signup-page">
      <Box className="auth-container">
        <Typography variant="h4" className="auth-title">
          Sign Up
        </Typography>
        
        {success ? (
          <Typography variant="h6" className="success-message">
            Thank you for signing up! Redirecting to login...
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              className="auth-input"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="auth-input"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="auth-input"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
              className="auth-input"
            />
            
            {error && <Typography className="error-message">{error}</Typography>}
            
            <div className="button-container">
              <Button
                type="submit"
                variant="contained"
                className="auth-button"
              >
                Sign Up
              </Button>
            </div>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default SignUp; 