import React from "react";
import "../styles/Home.scss";
import About from './About';

const Home = () => {
  return (
    <div className="home-page">
      {/* Landing Section */}
      <section id="landing" className="landing-section">
        <div className="landing-content">
          <h1>Welcome to Q-Burger</h1>
          <p>Discover the best burgers in town!</p>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Special Offers Section */}
      <section id="special-offers" className="page-section">
        <h2>Special Offers</h2>
        <p>Check out our current deals and promotions...</p>
      </section>

      {/* Most Popular Section */}
      <section id="most-popular" className="page-section">
        <h2>Most Popular Burgers</h2>
        <p>See what our customers love the most...</p>
      </section>

      {/* Make Your Burger Section */}
      <section id="make-your-burger" className="page-section">
        <h2>Create Your Burger</h2>
        <p>Customize your perfect burger...</p>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="page-section">
        <h2>Customer Testimonials</h2>
        <p>Hear what our customers are saying...</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="page-section">
        <h2>Contact Us</h2>
        <p>Get in touch with us...</p>
      </section>
    </div>
  );
};

export default Home;
