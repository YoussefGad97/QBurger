import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Divider,
  Zoom
} from '@mui/material';
import '../styles/OrderDialog.scss';

const OrderDialog = ({ open, onClose, burger, onOrderComplete }) => {
  const [pattyChoice, setPattyChoice] = useState('single');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const getPrice = (price) => {
    return typeof price === 'string' ? parseFloat(price) : price;
  };

  const calculatePrice = () => {
    const basePrice = pattyChoice === 'double' 
      ? getPrice(burger.price.double) 
      : getPrice(burger.price.single);
    return basePrice * quantity;
  };

  const handleOrder = () => {
    const orderItem = {
      id: `${burger.id}-${Date.now()}`,
      burgerId: burger.id,
      name: burger.name,
      price: calculatePrice(),
      pattyType: pattyChoice,
      quantity: quantity,
      specialInstructions: specialInstructions,
      image: burger.image,
      timestamp: new Date().toISOString()
    };
    
    onOrderComplete(orderItem);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      className="order-dialog"
      TransitionComponent={Zoom}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5">
          Customize Your {burger?.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="burger-preview">
          <img src={burger?.image} alt={burger?.name} />
          <Typography variant="h6">
            {burger?.name}
          </Typography>
          <Typography variant="body1">
            {burger?.description}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" className="section-title">
          Select Patty Type
        </Typography>
        <RadioGroup
          value={pattyChoice}
          onChange={(e) => setPattyChoice(e.target.value)}
        >
          <FormControlLabel 
            value="single" 
            control={<Radio />} 
            label={
              <Box className="patty-option">
                <Typography variant="subtitle1">Single Patty</Typography>
                <Typography variant="body2">
                  {getPrice(burger?.price?.single).toFixed(2)} L.E
                </Typography>
              </Box>
            }
          />
          <FormControlLabel 
            value="double" 
            control={<Radio />} 
            label={
              <Box className="patty-option">
                <Typography variant="subtitle1">Double Patty</Typography>
                <Typography variant="body2">
                  {getPrice(burger?.price?.double).toFixed(2)} L.E
                </Typography>
              </Box>
            }
          />
        </RadioGroup>

        <Box className="quantity-selector">
          <Typography variant="h6">Quantity</Typography>
          <Box className="quantity-controls">
            <Button onClick={() => handleQuantityChange(-1)}>-</Button>
            <Typography>{quantity}</Typography>
            <Button onClick={() => handleQuantityChange(1)}>+</Button>
          </Box>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Special Instructions"
          placeholder="Any special requests?"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="special-instructions"
        />

        <Box className="price-summary">
          <Typography variant="h6">
            Total: {calculatePrice().toFixed(2)} L.E
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleOrder} 
          variant="contained" 
          color="primary"
        >
          Add to Basket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog; 