import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.scss';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    address3: '',
    defaultAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        address3: user.address3 || '',
        defaultAddress: user.defaultAddress || 'address1'
      });
    }
  }, [user]);

  const checkForChanges = (newData) => {
    if (!user) return false;
    
    return (
      newData.phone !== user.phone ||
      newData.address1 !== user.address1 ||
      newData.address2 !== user.address2 ||
      newData.address3 !== user.address3 ||
      newData.defaultAddress !== user.defaultAddress
    );
  };

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    setHasChanges(checkForChanges(newFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) {
      setError('No changes were made');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const updatedUser = {
        ...user,
        ...formData,
        updatedAt: new Date().toISOString()
      };

      await updateUser(updatedUser);
      setSuccess(true);
      setHasChanges(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} className="profile-page">
      <Box className="profile-container">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Hi! {user?.username?.split(' ')[0]}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Delivery Addresses
          </Typography>
          
          <TextField
            fullWidth
            label="Address 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address 2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address 3"
            name="address3"
            value={formData.address3}
            onChange={handleChange}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Default Delivery Address</FormLabel>
            <RadioGroup
              name="defaultAddress"
              value={formData.defaultAddress}
              onChange={handleChange}
            >
              <FormControlLabel
                value="address1"
                control={<Radio />}
                label="Address 1"
                disabled={!formData.address1}
              />
              <FormControlLabel
                value="address2"
                control={<Radio />}
                label="Address 2"
                disabled={!formData.address2}
              />
              <FormControlLabel
                value="address3"
                control={<Radio />}
                label="Address 3"
                disabled={!formData.address3}
              />
            </RadioGroup>
          </FormControl>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          {success && (
            <Typography color="success.main" sx={{ mb: 2 }}>
              Profile updated successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !hasChanges}
            fullWidth
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;