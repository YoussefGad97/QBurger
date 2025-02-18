import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBasket } from '../contexts/BasketContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Basket.scss';

const Basket = () => {
  const { basketItems, removeFromBasket, clearBasket } = useBasket();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return basketItems.reduce((total, item) => total + item.price, 0);
  };

  if (basketItems.length === 0) {
    return (
      <Container maxWidth={false} className="basket-page empty">
        <Box className="basket-container">
          <Typography variant="h5" className="empty-message">
            Your basket is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            className="continue-shopping"
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} className="basket-page">
      <Box className="basket-container">
        <Typography variant="h4" className="basket-title">
          Your Basket
        </Typography>

        <div className="basket-items">
          {basketItems.map((item) => (
            <Card key={item.id} className="basket-item">
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                className="item-image"
              />
              <CardContent className="item-details">
                <Typography variant="h6">
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.pattyType} Patty
                </Typography>
                <Typography variant="h6" color="primary">
                  ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
              <IconButton 
                onClick={() => removeFromBasket(item.id)}
                className="remove-button"
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </div>

        <Divider className="basket-divider" />

        <Box className="basket-summary">
          <Typography variant="h5">
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
          <div className="basket-actions">
            <Button 
              variant="outlined" 
              onClick={clearBasket}
              className="clear-basket"
            >
              Clear Basket
            </Button>
            <Button 
              variant="contained"
              onClick={() => navigate('/checkout')}
              className="checkout"
            >
              Proceed to Checkout
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Basket; 