import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.scss";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryData, setRecoveryData] = useState({ identifier: '', username: '' });
  const [recoveryError, setRecoveryError] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState('');

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRecovery = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => 
      (u.email === recoveryData.identifier || u.username === recoveryData.identifier) &&
      u.username === recoveryData.username
    );

    if (!user) {
      setRecoveryError('No account found with matching credentials');
      return;
    }

    // In real app, send email here. For demo, show credentials:
    setRecoverySuccess(`Credentials sent to registered email!`);
    setRecoveryError('');
    setTimeout(() => setShowRecovery(false), 3000);
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
            type={showPassword ? 'text' : 'password'}
            className="auth-input"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    className="password-toggle"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <Typography className="error-message">{error}</Typography>}
          <div className="button-container">
            <Button
              type="submit"
              variant="contained"
              className="auth-button"
            >
              Login
            </Button>
          </div>
        </form>
        <Typography className="auth-link">
          Don't have an account? <Button href="/signup">Sign Up</Button>
        </Typography>
        <Button 
          className="forgot-password" 
          onClick={() => setShowRecovery(true)}
        >
          Forgot Password?
        </Button>
      </Container>

      {/* Recovery Dialog */}
      <Dialog open={showRecovery} onClose={() => setShowRecovery(false)}>
        <DialogTitle>Account Recovery</DialogTitle>
        <DialogContent>
          <form onSubmit={handleRecovery}>
            <TextField
              fullWidth
              label="Email or Username"
              margin="normal"
              value={recoveryData.identifier}
              onChange={(e) => setRecoveryData({...recoveryData, identifier: e.target.value})}
              required
            />
            <TextField
              fullWidth
              label="Confirm Username"
              margin="normal"
              value={recoveryData.username}
              onChange={(e) => setRecoveryData({...recoveryData, username: e.target.value})}
              required
            />
            {recoveryError && <Typography color="error">{recoveryError}</Typography>}
            {recoverySuccess && <Typography color="green">{recoverySuccess}</Typography>}
            <div className="button-container">
              <Button
                type="submit"
                variant="contained"
                className="auth-button"
              >
                Recover Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login; 