import React, { useState, useMemo, useRef } from "react";
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { ArrowLeft, ArrowRight, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../contexts/BasketContext';
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
import CustomBurger from "../assets/images/CustomBurger.jpg";

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
  const navigate = useNavigate();
  const { addToBasket } = useBasket();
  const initialIndices = [
    0, // TopBun for box 1
    ingredientsList.findIndex(ingredient => ingredient.name === "Bacon"), // Bacon for box 2
    ingredientsList.findIndex(ingredient => ingredient.name === "Cheese"), // Cheese for box 3
    ingredientsList.findIndex(ingredient => ingredient.name === "Pickles"), // Pickles for box 7
    ingredientsList.findIndex(ingredient => ingredient.name === "Onion"), // Onion for box 8
    ingredientsList.findIndex(ingredient => ingredient.name === "Lettuce"), // Lettuce for box 5
    ingredientsList.findIndex(ingredient => ingredient.name === "Tomato"), // Tomato for box 6
    ingredientsList.findIndex(ingredient => ingredient.name === "Beef"), // Burger for box 4

    ingredientsList.length - 1 // BotBun for box 9
  ];

  const [currentIndices, setCurrentIndices] = useState([...initialIndices]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const burgerControlsRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const generateCustomBurgerName = (ingredients) => {
    const mainIngredients = ingredients.filter(ingredient => 
      ingredient && ['Beef', 'Chicken'].includes(ingredient.name)
    );
    const extras = ingredients.filter(ingredient => 
      ingredient && !['Top Bun', 'Bottom Bun', 'Beef', 'Chicken'].includes(ingredient.name)
    );

    let name = 'Custom ';
    if (mainIngredients.length > 0) {
      name += mainIngredients[0].name;
    } else {
      name += 'Veggie';
    }
    
    if (extras.length > 0) {
      const significantExtras = extras.slice(0, 2);
      name += ' with ' + significantExtras.map(i => i.name).join(' & ');
      if (extras.length > 2) {
        name += ' & more';
      }
    }
    
    return name + ' Burger';
  };

  const validateBurger = (ingredients) => {
    // Check if burger has both buns
    const hasTopBun = ingredients.some(i => i && i.name === 'Top Bun');
    const hasBottomBun = ingredients.some(i => i && i.name === 'Bottom Bun');
    
    if (!hasTopBun || !hasBottomBun) {
      setErrorMessage('Your burger needs both buns!');
      return false;
    }

    // Check if burger has at least one main ingredient
    const hasMainIngredient = ingredients.some(i => 
      i && (i.name === 'Beef' || i.name === 'Chicken')
    );

    if (!hasMainIngredient) {
      setErrorMessage('Add at least one main ingredient (Beef or Chicken)');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleOrderNow = () => {
    const selectedIngredients = currentIndices
      .filter(index => index !== null)
      .map(index => ingredientsList[index]);

    if (!validateBurger(selectedIngredients)) {
      return;
    }

    const customBurger = {
      id: 'custom-' + Date.now(),
      name: generateCustomBurgerName(selectedIngredients),
      price: calculateTotal,
      image: CustomBurger,
      ingredients: selectedIngredients,
      quantity: 1,
      isCustom: true
    };

    addToBasket(customBurger);
    setShowSuccess(true);
    
    // Reset error message if exists
    setErrorMessage('');
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleAddIngredient = (ingredient) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      let lastNullIndex = newIndices.findLastIndex(i => i === null);
      if (lastNullIndex === -1) {
        return newIndices;
      }
      newIndices[lastNullIndex] = ingredientsList.findIndex(item => item.name === ingredient.name);
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
    setCurrentIndices([...initialIndices]);
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
                <button 
                  onClick={() => handleAddIngredient(ingredient)}
                  className={
                    (ingredient.name === 'Beef' || ingredient.name === 'Chicken') 
                    ? 'main-ingredient' 
                    : ''
                  }
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <div className="total-price">
            Total: ${calculateTotal.toFixed(2)}
          </div>
          {errorMessage && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {errorMessage}
            </div>
          )}
          <div className="button-group">
            <button className="reset-button" onClick={handleResetBurger}>
              <i className="fas fa-undo"></i>
              Reset Burger
            </button>
            <button 
              className="order-button" 
              onClick={handleOrderNow}
              disabled={currentIndices.every(index => index === null)}
            >
              <i className="fas fa-shopping-basket"></i>
              Add to Basket
            </button>
            <button 
              className="checkout-button" 
              onClick={handleCheckout}
            >
              <i className="fas fa-arrow-right"></i>
              Go to Checkout
            </button>
          </div>
          {showSuccess && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              Burger added to basket!
            </div>
          )}
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
