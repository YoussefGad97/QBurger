import React from "react";
import "../styles/About.scss";
import AboutImg from "../assets/images/aboutstack1.png";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2>About Us</h2>
        <div className="content-wrapper">
          <div className="image-content">
            <img src={AboutImg} alt="About Q-Burger" />
          </div>
          <div className="text-content">
            <p>
              At Q-Burger, we're passionate about crafting the perfect burger
              experience. Using only the freshest ingredients and innovative
              recipes, we bring you flavors that will leave you craving more.
            </p>
            <p>
              Founded in 2023, our mission is to redefine burger culture by
              combining traditional techniques with modern twists. Join us on
              this delicious journey!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
