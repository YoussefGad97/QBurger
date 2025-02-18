import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/Login.scss";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryData, setRecoveryData] = useState({ identifier: '', username: '' });
  const [recoveryError, setRecoveryError] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await login(formData.identifier, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

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
    <Container maxWidth={false} className="login-page">
      <Box className="auth-container">
        <Typography variant="h4" className="auth-title">
          Login
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email, Username, or Phone"
            margin="normal"
            value={formData.identifier}
            onChange={(e) => setFormData({...formData, identifier: e.target.value})}
            required
            className="auth-input"
            placeholder="Enter your email, username, or phone number"
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="auth-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
          
          {error && (
            <Typography color="error" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success" align="center" sx={{ mt: 1 }}>
              Login successful! Redirecting...
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="auth-button"
            disabled={loading || success}
          >
            {loading ? 'Logging in...' : success ? 'Success!' : 'Login'}
          </Button>

          <Typography className="auth-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </form>

        <Button 
          className="forgot-password" 
          onClick={() => setShowRecovery(true)}
        >
          Forgot Password?
        </Button>
      </Box>

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
    </Container>
  );
};

export default Login; 