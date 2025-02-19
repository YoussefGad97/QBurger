import React, { useState, useMemo, useRef } from "react";
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { ArrowLeft, ArrowRight, Close } from '@mui/icons-material';
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
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const burgerControlsRef = useRef(null);

  const handleDragStart = (index) => {
    setIsDragging(true);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const targetElement = e.target.closest('.burger-control-item');
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const isMovingDown = mouseY > rect.height / 2;

    if ((isMovingDown && index > draggedIndex) || (!isMovingDown && index < draggedIndex)) {
      const newIndices = [...currentIndices];
      const [draggedItem] = newIndices.splice(draggedIndex, 1);
      newIndices.splice(index, 0, draggedItem);

      setCurrentIndices(newIndices);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };

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
      let firstNullIndex = newIndices.findIndex(i => i === null);
      if (firstNullIndex === -1) {
        firstNullIndex = 1;
      }
      newIndices[firstNullIndex] = ingredientsList.findIndex(item => item.name === ingredient.name);
      return newIndices;
    });
  };

  const handleRemoveIngredient = (index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = null;
      return newIndices;
    });
  };

  const handlePrevious = (index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] === null ? ingredientsList.length - 1 : (newIndices[index] - 1 + ingredientsList.length) % ingredientsList.length);
      return newIndices;
    });
  };

  const handleNext = (index) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] === null ? 0 : (newIndices[index] + 1) % ingredientsList.length);
      return newIndices;
    });
  };

  const handleResetBurger = () => {
    setCurrentIndices([...defaultIndices]);
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
          <Box className="burger-controls" ref={burgerControlsRef}>
            {currentIndices.map((currentIndex, index) => (
              <Box
                key={index}
                className={`burger-control-item ${currentIndex === null ? 'empty' : ''}`}
                draggable={currentIndex !== null}
                onDragStart={(e) => {
                  if (currentIndex === null) {
                    e.preventDefault();
                  } else {
                    handleDragStart(index);
                  }
                }}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  opacity: isDragging && draggedIndex === index ? 0.5 : 1,
                  cursor: 'grab',
                }}
              >
                {currentIndex !== null && (
                  <>
                    <IconButton onClick={() => handlePrevious(index)} disabled={isDragging}>
                      <ArrowLeft className="icon-button" />
                    </IconButton>
                    <img
                      src={ingredientsList[currentIndex].image}
                      alt={ingredientsList[currentIndex].name}
                      className="burger-image"
                    />
                    <IconButton onClick={() => handleNext(index)} disabled={isDragging}>
                      <ArrowRight className="icon-button" />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveIngredient(index)} className="remove-button" >
                      <Close className="icon-button" />
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
