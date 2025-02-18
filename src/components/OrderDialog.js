import React from 'react';
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
  FormControlLabel
} from '@mui/material';
import { useBasket } from '../contexts/BasketContext';
import '../styles/OrderDialog.scss';

const OrderDialog = ({ open, onClose, burger }) => {
  const [pattyChoice, setPattyChoice] = React.useState('single');
  const { addToBasket } = useBasket();

  const handleOrder = () => {
    const orderItem = {
      id: `${burger.id}-${Date.now()}`,
      burgerId: burger.id,
      name: burger.name,
      price: pattyChoice === 'double' ? burger.price * 1.5 : burger.price,
      pattyType: pattyChoice,
      image: burger.image
    };
    
    addToBasket(orderItem);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      className="order-dialog"
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
                  ${burger?.price?.toFixed(2)}
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
                  ${(burger?.price * 1.5).toFixed(2)}
                </Typography>
              </Box>
            }
          />
        </RadioGroup>
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