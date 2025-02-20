import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import '../styles/Orders.scss';

const Orders = () => {
  // Sample data for favorites and past orders
  const favorites = [
    { id: 1, name: 'Classic Cheeseburger' },
    { id: 2, name: 'Spicy Chicken Sandwich' },
  ];

  const pastOrders = [
    { id: 1, name: 'Classic Cheeseburger', quantity: 2, totalPrice: 150 },
    { id: 2, name: 'Spicy Chicken Sandwich', quantity: 1, totalPrice: 75 },
  ];

  const handleReorder = (order) => {
    // Logic to reorder the item
    console.log('Reordering:', order);
  };

  return (
    <Box className="orders-container">
      <Box className="favorites-section">
        <Typography variant="h4">Favorite Sandwiches</Typography>
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <Typography>{favorite.name}</Typography>
            <Button onClick={() => handleReorder(favorite)}>Reorder</Button>
          </div>
        ))}
      </Box>

      <Box className="past-orders-section">
        <Typography variant="h4">Past Orders</Typography>
        {pastOrders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-details">
              <Typography>{order.name}</Typography>
              <Typography>Quantity: {order.quantity}</Typography>
              <Typography>Total Price: {order.totalPrice} L.E</Typography>
            </div>
            <Button onClick={() => handleReorder(order)}>Reorder</Button>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Orders; 