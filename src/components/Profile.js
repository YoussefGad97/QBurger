import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Avatar } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    profilePic: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        profilePic: currentUser.profilePic || ''
      });
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, ...formData };
    updateUser(updatedUser);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="md" className="profile-page">
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>
      
      <div className="profile-picture-section">
        <Avatar
          src={formData.profilePic}
          sx={{ width: 120, height: 120 }}
        />
        <input
          accept="image/*"
          id="profile-picture-upload"
          type="file"
          hidden
          onChange={handleFileChange}
        />
        <label htmlFor="profile-picture-upload">
          <Button variant="outlined" component="span" sx={{ mt: 2 }}>
            Upload Photo
          </Button>
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <TextField
          fullWidth
          label="Address"
          multiline
          rows={4}
          margin="normal"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
        
        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
            className="auth-button"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Profile; 