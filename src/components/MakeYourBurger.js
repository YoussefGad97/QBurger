import React, { useState } from "react";
import "../styles/MakeYourBurger.scss";

const ingredients = [
  { id: 1, name: "Beef", price: 2.5 , },
  { id: 2, name: "Tomato", price: 1.0 },
  { id: 3, name: "Lettuce", price: 0.5 },
  { id: 4, name: "Onion", price: 0.75 },
  { id: 5, name: "Pickles", price: 1.25 },
  { id: 6, name: "Top Bun", price: 1.0 },
  { id: 7, name: "Bottom Bun", price: 1.0 },
];

const BurgerBuilder = () => {
  const [burgerStack, setBurgerStack] = useState([
    ingredients[5], // Top Bun
    ingredients[0], // Beef
    ingredients[1], // Tomato
    ingredients[2], // Lettuce
    ingredients[3], // Onion
    ingredients[4], // Pickles
    ingredients[6], // Bottom Bun
  ]);

  const handleSwitchIngredient = (index, direction) => {
    const newStack = [...burgerStack];
    const currentIngredient = newStack[index];
    const currentIndex = ingredients.findIndex(
      (ing) => ing.id === currentIngredient.id
    );
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = ingredients.length - 1;
    if (newIndex >= ingredients.length) newIndex = 0;
    newStack[index] = ingredients[newIndex];
    setBurgerStack(newStack);
  };

  const handleRemoveIngredient = (index) => {
    if (burgerStack.length > 2) {
      const newStack = burgerStack.filter((_, i) => i !== index);
      setBurgerStack(newStack);
    }
  };

  const handleAddIngredient = (ingredient) => {
    const newStack = [...burgerStack];
    newStack.splice(burgerStack.length - 1, 0, ingredient);
    setBurgerStack(newStack);
  };

  const handleResetBurger = () => {
    setBurgerStack([
      ingredients[5],
      ingredients[0],
      ingredients[1],
      ingredients[2],
      ingredients[3],
      ingredients[4],
      ingredients[6],
    ]);
  };

  const calculateTotal = () => {
    return burgerStack
      .reduce((total, ingredient) => total + ingredient.price, 0)
      .toFixed(2);
  };

  return (
    <div className="burger-builder">
      <div className="burger-builder__container">
        <div className="burger-builder__ingredients">
          <h2 className="burger-builder__ingredients-title">Ingredients</h2>
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="burger-builder__ingredient-item"
            >
              <span>
                {ingredient.name} - ${ingredient.price}
              </span>
              <button onClick={() => handleAddIngredient(ingredient)}>+</button>
            </div>
          ))}
        </div>

        <div className="burger-builder__burger-visual">
          <div className="burger-builder__stack-container">
            {burgerStack.map((ingredient, index) => (
              <div key={index} className="burger-builder__ingredient-stack">
                <button
                  className="burger-builder__arrow-button burger-builder__arrow-button--left"
                  onClick={() => handleSwitchIngredient(index, -1)}
                  style={{
                    display:
                      index === 0 || index === burgerStack.length - 1
                        ? "none"
                        : "flex",
                  }}
                >
                  ←
                </button>

                <div
                  className="burger-builder__ingredient-image"
                  style={{
                    backgroundColor: "#ddd",
                    height: "64px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {ingredient.name}
                </div>

                <button
                  className="burger-builder__arrow-button burger-builder__arrow-button--right"
                  onClick={() => handleSwitchIngredient(index, 1)}
                  style={{
                    display:
                      index === 0 || index === burgerStack.length - 1
                        ? "none"
                        : "flex",
                  }}
                >
                  →
                </button>

                {index !== 0 && index !== burgerStack.length - 1 && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="burger-builder__controls">
        <span className="burger-builder__total">
          Total: ${calculateTotal()}
        </span>
        <button
          className="burger-builder__reset-button"
          onClick={handleResetBurger}
        >
          Reset Burger
        </button>
      </div>
    </div>
  );
};

export default BurgerBuilder;
