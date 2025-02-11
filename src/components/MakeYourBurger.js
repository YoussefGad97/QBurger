import React, { useState } from "react";
import "../styles/MakeYourBurger.scss";
import TopBun1 from "../assets/Ingredients/SesameTop.png"
import TopBun2 from "../assets/Ingredients/NoSesameTop.png"
import Beef from "../assets/Ingredients/Beef.png"
import Chicken from "../assets/Ingredients/Chicken.png"
import Bacon from "../assets/Ingredients/Bacon.png"
import Cheese from "../assets/Ingredients/CheddarCheese.png"
import Jalapeno from "../assets/Ingredients/Jalapeno.png"
import ThousandIsland from "../assets/Ingredients/1000.png"
import Ketchup from "../assets/Ingredients/Ketchup.png"
import Mustard from "../assets/Ingredients/Mustard.png"
import Mayonnaise from "../assets/Ingredients/Mayonnaise.png"
import Ranch from "../assets/Ingredients/Ranch.png"
import Tasty from "../assets/Ingredients/Tasty.png"
import Lettuce from "../assets/Ingredients/Lettuce.png"
import Tomato from "../assets/Ingredients/Tomato.png"
import Mozzarella from "../assets/Ingredients/Mozzarella.png"
import Mushroom from "../assets/Ingredients/Mushroom.png"
import Onion from "../assets/Ingredients/Onion.png"
import Pickles from "../assets/Ingredients/Pickles.png"
import OnionRings from "../assets/Ingredients/Rings.png"
import BotBun1 from "../assets/Ingredients/SesameBot.png"
import BotBun2 from "../assets/Ingredients/NoSesameBot.png"




const ingredientsList = [
  {
    name: "TopBun",
    images: [TopBun1, TopBun2],
  },
  { name: "Tomato", images: [Tomato] },
  { name: "Cheese", images: [Cheese, Mozzarella] },
  { name: "Patty", images: [Beef, Chicken] },
  { name: "Bacon", images: [Bacon] },
  { name: "Jalapeno", images: [Jalapeno] },
  { name: "Sauce", images: [ThousandIsland, Ketchup, Mustard, Mayonnaise, Ranch, Tasty] },
  { name: "Lettuce", images: [Lettuce] },
  { name: "Mushroom", images: [Mushroom] },
  { name: "Onion", images: [Onion, OnionRings] },
  { name: "Pickles", images: [Pickles] },
  {
    name: "BottomBun",
    images: [BotBun1, BotBun2],
  },
];

const MakeYourBurger = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const addIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = selectedIngredients.filter((_, i) => i !== index);
    setSelectedIngredients(updatedIngredients);
  };

  const moveIngredient = (fromIndex, toIndex) => {
    const updatedIngredients = [...selectedIngredients];
    const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
    updatedIngredients.splice(toIndex, 0, movedIngredient);
    setSelectedIngredients(updatedIngredients);
  };

  return (
    <section className="make-your-burger">
      <h1>Build Your Own Burger!</h1>
      <h2>Your Way</h2>
      <div className="burger-builder">
        <div className="ingredient-stack">
          <img
            src={TopBun1}
            alt="Top Bun"
            className="fixed-ingredient"
          />
          {selectedIngredients.map((ingredient, index) => (
            <div key={index} className="ingredient">
              <img
                src={ingredient.images[0]}
                alt={ingredient.name}
              />
              <div className="ingredient-controls">
                <button onClick={() => moveIngredient(index, index - 1)}>↑</button>
                <button onClick={() => moveIngredient(index, index + 1)}>↓</button>
                <button onClick={() => removeIngredient(index)}>×</button>
              </div>
            </div>
          ))}
          <img
            src={BotBun1}
            alt="Bottom Bun"
            className="fixed-ingredient"
          />
        </div>
        <div className="actions">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="add-ingredient-btn"
          >
            Add Ingredient
          </button>
        </div>
        {showDropdown && (
          <div className="ingredient-dropdown">
            {ingredientsList.map((ingredient, index) => (
              <div key={index} className="ingredient-option">
                <span>{ingredient.name}</span>
                <button onClick={() => addIngredient(ingredient)}>+</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MakeYourBurger;
