import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Avatar, 
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
    defaultAddress: '', // Added for default address selection
    profilePic: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false); // Track if changes were made

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        address3: user.address3 || '',
        defaultAddress: user.defaultAddress || 'address1',
        profilePic: user.profilePic || ''
      });
    }
  }, [user]);

  // Check for changes in form data
  const checkForChanges = (newData) => {
    if (!user) return false;
    
    return (
      newData.phone !== user.phone ||
      newData.address1 !== user.address1 ||
      newData.address2 !== user.address2 ||
      newData.address3 !== user.address3 ||
      newData.defaultAddress !== user.defaultAddress ||
      newData.profilePic !== user.profilePic
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, WebP, or SVG)');
      return;
    }

    // Increased max size to 10MB
    if (file.size > 10485760) { // 10MB
      setError('Image size should be less than 10MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        
        img.onload = () => {
          // Create canvas
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          let quality = 0.8; // Default quality
          
          // Dynamic compression based on file size
          if (file.size > 5242880) { // > 5MB
            quality = 0.6;
          } else if (file.size > 2097152) { // > 2MB
            quality = 0.7;
          }

          // Calculate new dimensions while maintaining aspect ratio
          const maxDimension = 1200; // Increased max dimension
          if (width > height) {
            if (width > maxDimension) {
              height = Math.round(height * (maxDimension / width));
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round(width * (maxDimension / height));
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Use better image rendering
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Determine output format
          let outputFormat = 'image/jpeg';
          if (file.type === 'image/png' && file.size < 1048576) { // < 1MB
            outputFormat = 'image/png'; // Keep PNG for small files
          } else if (file.type === 'image/webp') {
            outputFormat = 'image/webp'; // Keep WebP if supported
          }

          // Get compressed data URL
          const compressedDataUrl = canvas.toDataURL(outputFormat, quality);

          // Verify final size
          const base64Size = compressedDataUrl.length * (3/4) - 2;
          if (base64Size > 2097152) { // > 2MB after compression
            // Try additional compression
            const finalDataUrl = canvas.toDataURL('image/jpeg', 0.5);
            updateFormDataWithImage(finalDataUrl);
          } else {
            updateFormDataWithImage(compressedDataUrl);
          }
        };

        img.onerror = () => {
          setError('Failed to process image. Please try another file.');
        };

        img.src = reader.result;
      };

      reader.onerror = () => {
        setError('Failed to read image file');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image processing error:', error);
      setError('Failed to process image. Please try another file.');
    }
  };

  // Helper function to update form data with new image
  const updateFormDataWithImage = (imageData) => {
    const newFormData = {
      ...formData,
      profilePic: imageData
    };
    setFormData(newFormData);
    setHasChanges(checkForChanges(newFormData));
    setError(''); // Clear any existing errors
  };

  // Add these helper functions at the top of your component
  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  };

  const isValidImageFile = (file) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const extension = getFileExtension(file.name);
    return validExtensions.includes(extension);
  };

  return (
    <Container maxWidth={false} className="profile-page">
      <Box className="profile-container">
        <Typography variant="h4">
          Profile Settings
        </Typography>
        
        <div className="profile-picture-section">
          <Avatar
            src={formData.profilePic}
            sx={{ width: 80, height: 80 }}
          />
          <input
            accept="image/*"
            id="profile-picture-upload"
            type="file"
            hidden
            onChange={handleFileChange}
          />
          <label htmlFor="profile-picture-upload">
            <Button variant="outlined" component="span">
              Upload Photo
            </Button>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={formData.username}
            disabled
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            disabled
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          {/* Address Fields */}
          <TextField
            fullWidth
            label="Primary Address"
            name="address1"
            multiline
            rows={2}
            margin="normal"
            value={formData.address1}
            onChange={handleChange}
            placeholder="Enter your primary delivery address"
          />
          <TextField
            fullWidth
            label="Secondary Address"
            name="address2"
            multiline
            rows={2}
            margin="normal"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Enter an alternative delivery address"
          />
          <TextField
            fullWidth
            label="Work Address"
            name="address3"
            multiline
            rows={2}
            margin="normal"
            value={formData.address3}
            onChange={handleChange}
            placeholder="Enter your work address"
          />

          {/* Default Address Selection */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Default Delivery Address</FormLabel>
            <RadioGroup
              name="defaultAddress"
              value={formData.defaultAddress}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="address1" 
                control={<Radio />} 
                label="Primary Address"
                disabled={!formData.address1}
              />
              <FormControlLabel 
                value="address2" 
                control={<Radio />} 
                label="Secondary Address"
                disabled={!formData.address2}
              />
              <FormControlLabel 
                value="address3" 
                control={<Radio />} 
                label="Work Address"
                disabled={!formData.address3}
              />
            </RadioGroup>
          </FormControl>
          
          {error && (
            <Typography 
              color="error" 
              align="center" 
              sx={{ 
                mt: 1,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                padding: '8px',
                borderRadius: '4px'
              }}
            >
              {error}
            </Typography>
          )}
          
          {success && (
            <Typography color="success" align="center" sx={{ mt: 1 }}>
              Profile updated successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="auth-button"
            disabled={loading || !hasChanges}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile; 