import React, { useState } from "react";
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

const sauces = {
  thousandIsland: {
    name: "Thousand Island",
    image: ThousandIsland,
    price: 0.3,
  },
  ketchup: {
    name: "Ketchup",
    image: Ketchup,
    price: 0.3,
  },
  mustard: {
    name: "Mustard",
    image: Mustard,
    price: 0.3,
  },
  mayonnaise: {
    name: "Mayonnaise",
    image: Mayonnaise,
    price: 0.3,
  },
  ranch: {
    name: "Ranch",
    image: Ranch,
    price: 0.3,
  },
  tasty: {
    name: "Tasty Sauce",
    image: Tasty,
    price: 0.3,
  },
};

const ingredients = {
  meat: {
    name: "Beef Patty",
    image: Beef,
    price: 2.5,
  },
  Chicken: {
    name: "Chicken",
    image: Chicken,
    price: 2.5,
  },
  sauce: {
    name: "Sauce",
    type: "sauce-selector",
    options: sauces,
    currentSauce: "thousandIsland",
    image: ThousandIsland,
    price: 0.3,
  },
  lettuce: {
    name: "Lettuce",
    image: Lettuce,
    price: 0.5,
  },
  tomato: {
    name: "Tomato",
    image: Tomato,
    price: 0.3,
  },
  Jalapeno: {
    name: "Jalapeno",
    image: Jalapeno,
    price: 0.3,
  },
  cheese: {
    name: "Cheese",
    image: Cheese,
    price: 1.0,
  },
  mozzarella: {
    name: "Mozzarella",
    image: Mozzarella,
    price: 2.0,
  },
  bacon: {
    name: "Bacon",
    image: Bacon,
    price: 1.5,
  },
  onion: {
    name: "Onion",
    image: Onion,
    price: 0.3,
  },
  mushroom: {
    name: "Mushroom",
    image: Mushroom,
    price: 0.5,
  },
  pickles: {
    name: "Pickles",
    image: Pickles,
    price: 0.3,
  },
  onionRings: {
    name: "Onion Rings",
    image: OnionRings,
    price: 1.0,
  },
};

const buns = {
  top: TopBun1,
  bottom: BotBun1,
};

const MakeYourBurger = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(4.99);
  const [sauceSelections, setSauceSelections] = useState({}); // Track sauce selections for each sauce layer
  const [activeSauceIndex, setActiveSauceIndex] = useState(null);

  // Updated scale factor calculation
  const getScaleFactor = (index, totalIngredients) => {
    if (totalIngredients <= 3) return 1;

    // Calculate available space and required scaling
    const maxIngredientHeight = 100; // Approximate height of each ingredient in pixels
    const availableSpace = 400; // Available space between buns in pixels
    const totalRequiredSpace = maxIngredientHeight * totalIngredients;

    // Calculate scale needed to fit all ingredients
    const scale = availableSpace / totalRequiredSpace;

    // Ensure scale stays between 0.4 and 1
    return Math.min(Math.max(scale, 0.4), 1);
  };

  // Calculate margin top based on number of ingredients
  const getMarginTop = (index, totalIngredients) => {
    if (index === 0) return 0;
    const scale = getScaleFactor(index, totalIngredients);
    return `${-30 - (1 - scale) * 20}%`; // Adjust overlap based on scale
  };

  const addIngredient = (ingredientKey) => {
    const newIngredients = [...selectedIngredients, ingredientKey];
    setSelectedIngredients(newIngredients);

    const ingredient = ingredients[ingredientKey];
    if (ingredient.type === "sauce-selector") {
      // Initialize sauce selection for this layer
      setSauceSelections((prev) => ({
        ...prev,
        [newIngredients.length - 1]: ingredient.currentSauce,
      }));
    }
    setTotalPrice((prev) => prev + ingredient.price);
  };

  const changeSauce = (index, sauceKey) => {
    setSauceSelections((prev) => ({
      ...prev,
      [index]: sauceKey,
    }));
    setActiveSauceIndex(null); // Close the menu after selection
  };

  const removeIngredient = (index) => {
    const ingredientKey = selectedIngredients[index];
    const newIngredients = selectedIngredients.filter((_, i) => i !== index);
    setSelectedIngredients(newIngredients);
    setTotalPrice(
      (prev) =>
        prev -
        (ingredientKey.startsWith("sauce_")
          ? sauces[ingredientKey.split("_")[1]].price
          : ingredients[ingredientKey].price)
    );
  };

  const getIngredientImage = (ingredientKey) => {
    if (ingredientKey.startsWith("sauce_")) {
      const sauceKey = ingredientKey.split("_")[1];
      return sauces[sauceKey].image;
    }
    return ingredients[ingredientKey].image;
  };

  const getIngredientName = (ingredientKey) => {
    if (ingredientKey.startsWith("sauce_")) {
      const sauceKey = ingredientKey.split("_")[1];
      return sauces[sauceKey].name;
    }
    return ingredients[ingredientKey].name;
  };

  const moveIngredient = (index, direction) => {
    const newIngredients = [...selectedIngredients];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newIngredients.length) {
      [newIngredients[index], newIngredients[newIndex]] = [newIngredients[newIndex], newIngredients[index]];
      setSelectedIngredients(newIngredients);
      
      // Update sauce selections if moving sauce ingredients
      if (sauceSelections[index] || sauceSelections[newIndex]) {
        setSauceSelections(prev => {
          const newSelections = { ...prev };
          [newSelections[index], newSelections[newIndex]] = [newSelections[newIndex], newSelections[index]];
          return newSelections;
        });
      }
    }
  };

  const resetBurger = () => {
    setSelectedIngredients([]);
    setSauceSelections({});
    setTotalPrice(4.99);
  };

  return (
    <div id="make-your-burger" className="burger-builder">
      <div className="burger-builder__header">
        <h1>Build Your Perfect Burger</h1>
        <div className="header-controls">
          <p>Current Price: ${totalPrice.toFixed(2)}</p>
          <button className="reset-button" onClick={resetBurger}>
            Reset Burger
          </button>
        </div>
      </div>

      <div className="burger-builder__workspace">
        <div className="ingredients-panel">
          <h2>Available Ingredients</h2>
          <div className="ingredients-grid">
            {Object.entries(ingredients).map(([key, ingredient]) => {
              const count = selectedIngredients.filter(i => i === key).length;
              return (
                <button
                  key={key}
                  className="ingredient-button"
                  onClick={() => addIngredient(key)}
                >
                  <img src={ingredient.image} alt={ingredient.name} />
                  <span>{ingredient.name}</span>
                  <div className="ingredient-actions">
                    <span>${ingredient.price.toFixed(2)}</span>
                    {count > 0 && (
                      <div className="ingredient-count">
                        <span className="count">{count}</span>
                        <button 
                          className="remove-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const index = selectedIngredients.lastIndexOf(key);
                            if (index > -1) removeIngredient(index);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="burger-preview">
          <img src={buns.top} alt="Top Bun" className="bun bun-top" />
          <div className="ingredients-stack">
            {selectedIngredients.map((ingredientKey, index) => {
              const scale = getScaleFactor(index, selectedIngredients.length);
              const marginTop = getMarginTop(index, selectedIngredients.length);
              const ingredient = ingredients[ingredientKey];

              return (
                <div
                  key={index}
                  className="ingredient-layer"
                  style={{
                    marginTop,
                  }}
                  onMouseLeave={() => setActiveSauceIndex(null)}
                >
                  <img
                    src={
                      ingredient.type === "sauce-selector"
                        ? sauces[sauceSelections[index]].image
                        : ingredient.image
                    }
                    alt={ingredient.name}
                    style={{
                      transform: `scale(${scale})`,
                    }}
                  />
                  {ingredient.type === "sauce-selector" && (
                    <div
                      className={`sauce-selector ${
                        activeSauceIndex === index ? "active" : ""
                      }`}
                      onClick={() => setActiveSauceIndex(index)}
                    >
                      {Object.entries(sauces).map(([sauceKey, sauce]) => (
                        <button
                          key={sauceKey}
                          className={`sauce-option ${
                            sauceSelections[index] === sauceKey ? "active" : ""
                          }`}
                          onClick={() => changeSauce(index, sauceKey)}
                        >
                          <img src={sauce.image} alt={sauce.name} />
                          <span>{sauce.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <img src={buns.bottom} alt="Bottom Bun" className="bun bun-bottom" />
        </div>
      </div>

      <button
        className="order-button"
        disabled={selectedIngredients.length === 0}
      >
        Order Now - ${totalPrice.toFixed(2)}
      </button>
    </div>
  );
};

export default MakeYourBurger;
