import React, { useState } from "react";
import "../styles/MakeYourBurger.scss";

const ingredientsList = [
  {
    name: "Lettuce",
    images: ["/path/to/lettuce1.png", "/path/to/lettuce2.png"],
  },
  { name: "Tomato", images: ["/path/to/tomato1.png", "/path/to/tomato2.png"] },
  // Add more ingredients as needed
];

const MakeYourBurger = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const addIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) %
        ingredientsList[currentIngredientIndex].images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex -
        1 +
        ingredientsList[currentIngredientIndex].images.length) %
        ingredientsList[currentIngredientIndex].images.length
    );
  };

  return (
    <section className="make-your-burger">
      <h1>Build Your Own Burger!</h1>
      <h2>Your Way</h2>
      <div className="burger-builder">
        <div className="ingredient-stack">
          <img
            src="/path/to/top-bun.png"
            alt="Top Bun"
            className="fixed-ingredient"
          />
          {selectedIngredients.map((ingredient, index) => (
            <div key={index} className="ingredient">
              <img
                src={ingredient.images[currentImageIndex]}
                alt={ingredient.name}
              />
            </div>
          ))}
          <img
            src="/path/to/bottom-bun.png"
            alt="Bottom Bun"
            className="fixed-ingredient"
          />
        </div>
        <div className="controls">
          <button onClick={prevImage}>←</button>
          <button onClick={nextImage}>→</button>
        </div>
      </div>
      <div className="actions">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="add-ingredient-btn"
        >
          Add Ingredient
        </button>
        <button className="rearrange-btn">Rearrange</button>
      </div>
      {showDropdown && (
        <div className="ingredient-dropdown">
          {ingredientsList.map((ingredient, index) => (
            <div key={index} className="ingredient-option">
              <span>{ingredient.name}</span>
              <button onClick={() => addIngredient(ingredient)}>+</button>
              <button onClick={() => removeIngredient(ingredient)}>-</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MakeYourBurger;
