import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../contexts/BasketContext';
import CreditCardForm from '../components/CreditCardForm';
import '../styles/Checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const { basketItems, clearBasket } = useBasket();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  useEffect(() => {
    if (basketItems.length === 0) {
      navigate('/basket');
    }
  }, [basketItems, navigate]);

  const calculateTotal = () => {
    return basketItems.reduce((total, item) => total + item.price, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{11}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 11-digit phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow numbers and limit to 11 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      const isValid = validateForm();
      if (!isValid) {
        setShowError(true);
        setErrorMessage('Please fill in all required fields correctly');
        return;
      }
    }

    if (activeStep === 1 && paymentMethod === 'card' && !cardDetails) {
      setShowCardForm(true);
      return;
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);
    if (method === 'card' && !cardDetails) {
      setShowCardForm(true);
    }
  };

  const handleCardFormSubmit = (cardData) => {
    setCardDetails(cardData);
    setShowCardForm(false);
    handleNext();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowError(true);
      setErrorMessage('Please check your delivery details');
      return;
    }

    try {
      // Here you would typically send the order to your backend
      const orderData = {
        items: basketItems,
        deliveryDetails: formData,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null,
        total: calculateTotal()
      };
      console.log('Order submitted:', orderData);
      
      clearBasket();
      navigate('/orders', { 
        state: { 
          orderSuccess: true,
          orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      });
    } catch (error) {
      setShowError(true);
      setErrorMessage('Failed to submit order. Please try again.');
    }
  };

  const DeliveryForm = () => (
    <Box className="form-section">
      <Typography variant="h6" gutterBottom>
        Delivery Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone || 'Enter 11-digit phone number'}
            placeholder="01234567890"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Delivery Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            multiline
            rows={2}
            error={!!errors.address}
            helperText={errors.address}
            placeholder="Enter your full delivery address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            multiline
            rows={2}
            placeholder="Special instructions for delivery (optional)"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const PaymentSection = () => (
    <Box className="form-section">
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span>Cash on Delivery</span>
                <Typography variant="body2" color="textSecondary">
                  (Pay when you receive your order)
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span>Credit Card</span>
                {cardDetails && (
                  <Typography variant="body2" color="primary">
                    (Card ending in {cardDetails.cardNumber.slice(-4)})
                  </Typography>
                )}
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const OrderReview = () => (
    <Box className="order-review">
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Box className="review-section">
        <Typography variant="subtitle1" gutterBottom>
          Delivery Details
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">{formData.fullName}</Typography>
          <Typography variant="body2" color="textSecondary">{formData.phone}</Typography>
          <Typography variant="body2" color="textSecondary">{formData.address}</Typography>
          <Typography variant="body2" color="textSecondary">{formData.city}</Typography>
          {formData.notes && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Notes: {formData.notes}
            </Typography>
          )}
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Items ({basketItems.length})
        </Typography>
        {basketItems.map((item) => (
          <Box key={item.id} className="order-item">
            <Typography variant="body1">
              {item.name} ({item.pattyType})
            </Typography>
            <Typography variant="body2">
              {item.price.toFixed(2)} L.E
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider className="divider" />
      <Box className="total-section">
        <Typography variant="h6">Total Amount</Typography>
        <Typography variant="h6">
          {calculateTotal().toFixed(2)} L.E
        </Typography>
      </Box>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DeliveryForm />;
      case 1:
        return <PaymentSection />;
      case 2:
        return <OrderReview />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container className="checkout-container">
      <Paper className="checkout-paper">
        <Typography variant="h4" className="page-title">
          Checkout
        </Typography>
        
        <Stepper activeStep={activeStep} className="stepper">
          {['Delivery Details', 'Payment Method', 'Order Review'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className="checkout-content">
          {getStepContent(activeStep)}
          
          <Box className="button-group">
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep === 2 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="submit-button"
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                className="next-button"
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <CreditCardForm
        open={showCardForm}
        onClose={() => setShowCardForm(false)}
        onSubmit={handleCardFormSubmit}
      />

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Checkout;
