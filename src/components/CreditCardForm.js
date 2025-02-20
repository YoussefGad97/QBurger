import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import '../styles/CreditCardForm.scss';

const CreditCardForm = ({ open, onClose, onSubmit }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    // Limit CVV to 3 or 4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cardData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className="credit-card-dialog"
    >
      <DialogTitle>
        <Typography variant="h5">
          Enter Card Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="credit-card-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                inputProps={{ maxLength: 19 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Card Holder Name"
                name="cardHolder"
                value={cardData.cardHolder}
                onChange={handleInputChange}
                placeholder="JOHN DOE"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="CVV"
                name="cvv"
                value={cardData.cvv}
                onChange={handleInputChange}
                type="password"
                placeholder="123"
                inputProps={{ maxLength: 4 }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained" 
          color="primary"
        >
          Confirm Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreditCardForm;
