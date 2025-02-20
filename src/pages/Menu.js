import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './Menu.scss';

const Menu = () => {
  // Sample data for menu items
  const menuItems = [
    { id: 1, name: 'Classic Cheeseburger', description: 'Juicy beef patty with cheese, lettuce, and tomato.', price: 50 },
    { id: 2, name: 'Spicy Chicken Sandwich', description: 'Crispy chicken with spicy mayo and pickles.', price: 55 },
    { id: 3, name: 'Veggie Burger', description: 'A delicious plant-based burger with fresh veggies.', price: 45 },
    { id: 4, name: 'BBQ Bacon Burger', description: 'Beef patty topped with BBQ sauce and crispy bacon.', price: 60 },
  ];

  return (
    <Box className="menu-container">
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>
      <Box className="menu-items">
        {menuItems.map(item => (
          <Box key={item.id} className="menu-item">
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">{item.description}</Typography>
            <Typography variant="body1">{item.price} L.E</Typography>
            <Button variant="contained" color="primary">Order Now</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Menu; 