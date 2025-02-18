import React, { useState } from "react";
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
  { name: "Top Bun", image: TopBun1 },
  { name: "Beef", image: Beef },
  { name: "Chicken", image: Chicken },
  { name: "Bacon", image: Bacon },
  { name: "Cheese", image: Cheese },
  { name: "Jalapeno", image: Jalapeno },
  { name: "Thousand Island", image: ThousandIsland },
  { name: "Ketchup", image: Ketchup },
  { name: "Mustard", image: Mustard },
  { name: "Mayonnaise", image: Mayonnaise },
  { name: "Ranch", image: Ranch },
  { name: "Tasty", image: Tasty },
  { name: "Lettuce", image: Lettuce },
  { name: "Tomato", image: Tomato },
  { name: "Mozzarella", image: Mozzarella },
  { name: "Mushroom", image: Mushroom },
  { name: "Onion", image: Onion },
  { name: "Pickles", image: Pickles },
  { name: "Onion Rings", image: OnionRings },
  { name: "Bottom Bun", image: BotBun1 }
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
    <Box className="burger-builder">
      <Grid container className="bigboy" spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h3" align="center" gutterBottom className="burger-title">
            Build Your Own Burger
          </Typography>
          <div className="ingredient-list">
            {ingredientsList.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <span>{ingredient.name}</span>
                <button onClick={() => handleAddIngredient(ingredient)}>+</button>
                <button onClick={() => handleRemoveIngredient(index)}>x</button>
              </div>
            ))}
          </div>
          <button className="reset-button" onClick={handleResetBurger}>
            Reset Burger
          </button>
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
