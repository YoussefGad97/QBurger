import React from "react";
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
  const burgers = [
    {
      id: 1,
      name: "Classic Burger",
      description: "Cheddar Cheese , Lettuce , Onion , Tomato , Pickles , Mayonnaise , Ketchup",
      price: {
        single: "90",
        double: "160",
      },




      image: Burger1,
    },
    {
      id: 2,

      name: "Big Tasty",
      description: "Double Patty , Cheddar Cheese , Lettuce , Onion , Tomato , Pickles , Mayonnaise , Ketchup",
      price: {
        single: "140",
        double: "200",
      },

      image: Burger3,
    },
    {
      id: 3,
      name: "Mushroom Swiss",
      description: "Cheddar Cheese , Lettuce , Onion , Tomato , Jalapeno , Mayonnaise , Barbecue , Portobello Mushroom",
      price: {
        single: "110",
        double: "140",
      },
      image: Burger2,



    },
    {
      id: 4,
      name: "World End Burger",
      description: "Mozzarella Sticks , Beef Bacon , Cheddar Cheese , Lettuce , Onion , Tomato , Pickles , Mayonnaise , Thousand Island Sauce",
      price: {
        single: "120",
        double: "150",
      },

      image: Burger4,



    },
    {
      id: 5,

      name: "Chicken Zinger",
      description: "Fresh jalapeños with pepper jack cheese",
      price: {
        single: "130",
        double: "160",
      },
      image: Burger5,

    },
    {
      id: 6,
      name: "Chicken Ranch",
      description: "Double patty with double cheese",
      price: {
        single: "160",
        double: "200",
      },
      image: Burger6,

    },
    {
      id: 7,
      name: "Classic Chicken",
      description: "Plant-based patty with fresh vegetables",
      price: {
        single: "120",
        double: "150",
      },
      image: Burger7,

    },
    {
      id: 8,
      name: "World End Chicken",
      description: "Everything you could want on a burger",
      price: {
        single: "170",
        double: "200",
      },
      image: Burger8,

    },
  ];

  return (
    <section id="most-popular" className="burger-gallery">
      <h2>Most Popular </h2>
      <div className="gallery-container">
        {burgers.map((burger) => (
          <div key={burger.id} className="burger-card">
            <div className="burger-image">
              <img src={burger.image} alt={burger.name} />
            </div>
            <div className="burger-info">
              <h3>{burger.name}</h3>
              <p>{burger.description}</p>
              <div className="price-boxes">
                <div className="price-box">
                  <span className="type">Single</span>
                  <span className="price">${burger.price.single}</span>
                </div>
                <div className="price-box">
                  <span className="type">Double</span>
                  <span className="price">${burger.price.double}</span>
                </div>
              </div>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BurgerGallery;
