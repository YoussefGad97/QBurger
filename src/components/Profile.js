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
  Radio,
  IconButton,
  InputAdornment,
  Grid,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { CreditCard, Delete, Lock, ExpandMore } from '@mui/icons-material';
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
    defaultAddress: '',
    cards: []
  });
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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
        cards: user.cards || []
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
      newData.defaultAddress !== user.defaultAddress ||
      JSON.stringify(newData.cards) !== JSON.stringify(user.cards || [])
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

  const handleCardChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number with spaces
    if (name === 'number') {
      value = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
      value = value.substring(0, 19); // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      value = value.substring(0, 5); // Limit to MM/YY format
    }

    // Limit CVV to 3 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3);
    }

    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCard = () => {
    const { number, name, expiry, cvv } = newCard;
    
    if (!number || number.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (!name) {
      setError('Please enter the cardholder name');
      return false;
    }
    
    if (!expiry || !expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    if (!cvv || cvv.length !== 3) {
      setError('Please enter a valid 3-digit CVV');
      return false;
    }

    // Check if expiry date is not in the past
    const [month, year] = expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (expiryDate < new Date()) {
      setError('Card has expired');
      return false;
    }

    return true;
  };

  const addCard = () => {
    if (!validateCard()) return;

    const maskedNumber = '•••• '.repeat(3) + newCard.number.slice(-4);
    const newCardData = {
      id: Date.now().toString(),
      maskedNumber,
      name: newCard.name,
      expiry: newCard.expiry,
      lastFour: newCard.number.slice(-4)
    };

    const newFormData = {
      ...formData,
      cards: [...formData.cards, newCardData]
    };

    setFormData(newFormData);
    setHasChanges(checkForChanges(newFormData));
    setNewCard({ number: '', name: '', expiry: '', cvv: '' });
    setError('');
  };

  const removeCard = (cardId) => {
    const newFormData = {
      ...formData,
      cards: formData.cards.filter(card => card.id !== cardId)
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
        <Typography variant="h4" className="welcome-text">
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

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Methods
          </Typography>

          <Paper className="card-input-container" elevation={0}>
            <div className={`card-preview ${isFlipped ? 'flipped' : ''}`}>
              <div className="card-front">
                <div className="card-type">
                  <CreditCard />
                  <span>Credit Card</span>
                </div>
                <div className="card-number">
                  {newCard.number || '•••• •••• •••• ••••'}
                </div>
                <div className="card-details">
                  <div className="card-name">
                    <span>Card Holder</span>
                    <span>{newCard.name || 'YOUR NAME'}</span>
                  </div>
                  <div className="card-expiry">
                    <span>Expires</span>
                    <span>{newCard.expiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <div className="card-stripe"></div>
                <div className="card-cvv">
                  <span>CVV</span>
                  <div className="cvv-field">
                    <span>{newCard.cvv || '•••'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="number"
                    value={newCard.number}
                    onChange={handleCardChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="1234 5678 9012 3456"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    name="name"
                    value={newCard.name}
                    onChange={handleCardChange}
                    placeholder="JOHN DOE"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    name="expiry"
                    value={newCard.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleCardChange}
                    type="password"
                    placeholder="123"
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => setIsFlipped(false)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={addCard}
                    fullWidth
                    className="add-card-button"
                  >
                    Add Card
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Saved Cards
          </Typography>

          {formData.cards.map(card => (
            <Box key={card.id} className="saved-card">
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <CreditCard />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">
                    {card.maskedNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.name} • Expires {card.expiry}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton 
                    onClick={() => removeCard(card.id)}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}

          {error && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Typography>
          )}
          
          {success && (
            <Typography color="success.main" sx={{ mt: 2, mb: 2 }}>
              Profile updated successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !hasChanges}
            fullWidth
            sx={{ mt: 3 }}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;