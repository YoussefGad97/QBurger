import React, { useState, useMemo } from "react";
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import "../styles/MakeYourBurger.scss";
import TopBun1 from "../assets/Ingredients/SesameTop.png";
import Beef from "../assets/Ingredients/Beef.png";
import Chicken from "../assets/Ingredients/Chicken.png";
import Bacon from "../assets/Ingredients/Bacon.png";
import Cheese from "../assets/Ingredients/CheddarCheese.png";
import Jalapeno from "../assets/Ingredients/Jalapeno.png";
import ThousandIsland from "../assets/Ingredients/1000.png";
import Ketchup from "../assets/Ingredients/Ketchup.png";
import Mustard from "../assets/Ingredients/Mustard.png";
import Mayonnaise from "../assets/Ingredients/Mayonnaise.png";
import Ranch from "../assets/Ingredients/Ranch.png";
import Tasty from "../assets/Ingredients/Tasty.png";
import Lettuce from "../assets/Ingredients/Lettuce.png";
import Tomato from "../assets/Ingredients/Tomato.png";
import Mozzarella from "../assets/Ingredients/Mozzarella.png";
import Mushroom from "../assets/Ingredients/Mushroom.png";
import Onion from "../assets/Ingredients/Onion.png";
import Pickles from "../assets/Ingredients/Pickles.png";
import OnionRings from "../assets/Ingredients/Rings.png";
import BotBun1 from "../assets/Ingredients/SesameBot.png";

const ingredientsList = [
  { name: "Top Bun", image: TopBun1, price: 2.00 },
  { name: "Beef", image: Beef, price: 5.00 },
  { name: "Chicken", image: Chicken, price: 4.50 },
  { name: "Bacon", image: Bacon, price: 3.00 },
  { name: "Cheese", image: Cheese, price: 1.50 },
  { name: "Jalapeno", image: Jalapeno, price: 0.50 },
  { name: "Thousand Island", image: ThousandIsland, price: 0.75 },
  { name: "Ketchup", image: Ketchup, price: 0.25 },
  { name: "Mustard", image: Mustard, price: 0.25 },
  { name: "Mayonnaise", image: Mayonnaise, price: 0.50 },
  { name: "Ranch", image: Ranch, price: 0.50 },
  { name: "Tasty", image: Tasty, price: 0.50 },
  { name: "Lettuce", image: Lettuce, price: 0.25 },
  { name: "Tomato", image: Tomato, price: 0.25 },
  { name: "Mozzarella", image: Mozzarella, price: 1.00 },
  { name: "Mushroom", image: Mushroom, price: 0.50 },
  { name: "Onion", image: Onion, price: 0.25 },
  { name: "Pickles", image: Pickles, price: 0.25 },
  { name: "Onion Rings", image: OnionRings, price: 0.50 },
  { name: "Bottom Bun", image: BotBun1, price: 2.00 }
];

const getRandomIndex = () => Math.floor(Math.random() * (ingredientsList.length - 2)) + 1;

const MakeYourBurger = () => {
  const defaultIndices = [
    0, // TopBun for box 1
    ingredientsList.findIndex(ingredient => ingredient.name === "Bacon"), // Bacon for box 2
    ingredientsList.findIndex(ingredient => ingredient.name === "Cheese"), // Cheese for box 3
    ingredientsList.findIndex(ingredient => ingredient.name === "Beef"), // Burger for box 4
    ingredientsList.findIndex(ingredient => ingredient.name === "Lettuce"), // Lettuce for box 5
    ingredientsList.findIndex(ingredient => ingredient.name === "Tomato"), // Tomato for box 6
    ingredientsList.length - 1 // BotBun for box 7
  ];

  const [currentIndices, setCurrentIndices] = useState(defaultIndices);
  const [currentPosition, setCurrentPosition] = useState(1); // Start from index 1 (position 2)
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotal = useMemo(() => {
    return currentIndices
      .filter(index => index !== null)
      .reduce((sum, index) => sum + (ingredientsList[index]?.price || 0), 0);
  }, [currentIndices]);

  const handleOrderNow = () => {
    alert(`Order placed! Total: $${calculateTotal.toFixed(2)}`);
  };

  const handleAddIngredient = (ingredient) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[currentPosition] = ingredientsList.findIndex(item => item.name === ingredient.name);
      return newIndices;
    });

    setCurrentPosition((prevPosition) => (prevPosition < 6 ? prevPosition + 1 : 1));
  };

  const handleRemoveIngredient = (index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = null; // Set to null to remove the ingredient
      return newIndices;
    });
  };

  const handleResetBurger = () => {
    setCurrentIndices(defaultIndices);
    setCurrentPosition(1); // Reset the position tracker
  };

  const handlePrevious = (index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] - 1 + ingredientsList.length) % ingredientsList.length;
      return newIndices;
    });
  };

  const handleNext = (index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] + 1) % ingredientsList.length;
      return newIndices;
    });
  };

  return (
    <Box className="burger-builder" id="make-your-burger">
      <Grid container className="bigboy" spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h3" align="center" gutterBottom className="burger-title">
            Build Your Own Burger
          </Typography>
          <div className="ingredient-list">
            {ingredientsList.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <span>{ingredient.name}</span>
                <span className="price">${ingredient.price.toFixed(2)}</span>
                <button onClick={() => handleAddIngredient(ingredient)}>+</button>
                <button onClick={() => handleRemoveIngredient(index)}>x</button>
              </div>
            ))}
          </div>
          <div className="total-price">
            Total: ${calculateTotal.toFixed(2)}
          </div>
          <div className="button-group">
            <button className="reset-button" onClick={handleResetBurger}>
              Reset Burger
            </button>
            <button className="order-button" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box className="burger-controls">
            {currentIndices.map((currentIndex, i) => (
              <Box key={i} className="burger-control-item">
                {currentIndex !== null && ingredientsList[currentIndex] && (
                  <>
                    <IconButton onClick={() => handlePrevious(i)}>
                      <ArrowLeft className="icon-button" />
                    </IconButton>
                    <img
                      src={ingredientsList[currentIndex].image}
                      alt={ingredientsList[currentIndex].name}
                      className="burger-image"
                    />
                    <IconButton onClick={() => handleNext(i)}>
                      <ArrowRight className="icon-button" />
                    </IconButton>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MakeYourBurger;
