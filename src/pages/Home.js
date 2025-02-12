import React from "react";
import "../styles/Home.scss";
import About from '../components/About';
import SpecialOffers from '../components/SpecialOffers';
import BurgerGallery from '../components/BurgerGallery';
import MakeYourBurger from '../components/MakeYourBurger';
import ScrollToTop from '../components/ScrollToTop';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="home-page">

      {/* Landing Section */}
      <section id="landing" className="landing-section">
      </section>

      {/* About Section */}
      <About />

      {/* Special Offers Section */}
      <SpecialOffers />

      {/* Most Popular Section */}
      <BurgerGallery />

      {/* Make Your Burger Section */}
      <MakeYourBurger />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      <ScrollToTop />
    </div>
  );
};

export default Home;
