import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import OrderDialog from './OrderDialog';
import { useBasket } from '../contexts/BasketContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../styles/BurgerGallery.scss";
import Burger1 from "../assets/Sandimages/ClassicBurger.png";
import Burger2 from "../assets/Sandimages/MushroomBurger.png";
import Burger3 from "../assets/Sandimages/BaconBurger.png";
import Burger4 from "../assets/Sandimages/WorldEnd.png";
import Burger5 from "../assets/Sandimages/ChickenZinger.png";
import Burger6 from "../assets/Sandimages/ChickenRanch.png";
import Burger7 from "../assets/Sandimages/ClassicChicken.png";
import Burger8 from "../assets/Sandimages/WorldEndChicken.png";

const BurgerGallery = () => {
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addToBasket } = useBasket();

  const burgers = [
    {
      id: 1,
      name: "Classic Burger",
      description: "Cheddar Cheese , Lettuce , Onion , Tomato , Pickles , Mayonnaise , Ketchup",
      price: {
        single: 90,
        double: 160,
      },
      image: Burger1,
    },
    {
      id: 2,
      name: "Big Tasty",
      description: "Double Patty , Cheddar Cheese , Lettuce , Onion , Tomato , Pickles , Mayonnaise , Ketchup",
      price: {
        single: 140,
        double: 200,
      },
      image: Burger3,
    },
    {
      id: 3,
      name: "Mushroom Swiss",
      description: "Cheddar Cheese , Lettuce , Onion , Tomato , Jalapeno , Mayonnaise , Barbecue , Portobello Mushroom",
      price: {
        single: 110,
        double: 140,
      },
      image: Burger2,
    },
    {
      id: 5,
      name: "Chicken Zinger",
      description: "Fresh jalapeños with pepper jack cheese",
      price: {
        single: 130,
        double: 160,
      },
      image: Burger5,
    },
    {
      id: 6,
      name: "Chicken Ranch",
      description: "Double patty with double cheese",
      price: {
        single: 160,
        double: 200,
      },
      image: Burger6,
    },
    {
      id: 7,
      name: "Classic Chicken",
      description: "Plant-based patty with fresh vegetables",
      price: {
        single: 120,
        double: 150,
      },
      image: Burger7,
    },
  ];

  const handleOrderClick = (burger) => {
    setSelectedBurger(burger);
    setOrderDialogOpen(true);
  };

  const handleOrderComplete = (orderDetails) => {
    addToBasket(orderDetails);
    setOrderDialogOpen(false);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth={false} className="burger-gallery">
      <Typography variant="h2" className="section-title">
        Most Popular Burgers
      </Typography>
      
      <Grid container spacing={4} className="burger-grid">
        {burgers.map((burger) => (
          <Grid item xs={12} sm={6} md={4} key={burger.id}>
            <Card className="burger-card">
              <CardMedia
                component="img"
                height="200"
                image={burger.image}
                alt={burger.name}
                className="burger-image"
              />
              <CardContent className="burger-content">
                <Typography variant="h5" className="burger-title">
                  {burger.name}
                </Typography>
                <Typography variant="body1" className="burger-description">
                  {burger.description}
                </Typography>
                <Typography variant="h6" className="burger-price">
                  Starting at {burger.price.single} L.E
                </Typography>
                <Button 
                  variant="contained" 
                  className="order-button"
                  onClick={() => handleOrderClick(burger)}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedBurger && (
        <OrderDialog
          open={orderDialogOpen}
          onClose={() => setOrderDialogOpen(false)}
          burger={selectedBurger}
          onOrderComplete={handleOrderComplete}
        />
      )}

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Added to basket!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BurgerGallery;
