import React from 'react';
import { Carousel } from 'react-bootstrap';
import './SpecialOffers.scss';
import Offer1 from '../assets/images/Offer1.jpg';
import Offer2 from '../assets/images/Offer2.png';
import Offer3 from '../assets/images/Offer3.png';


const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on all menu items every weekend! Perfect for family gatherings and special occasions.",
      image:Offer1,
    },



    {
      id: 2,
      title: "Lunch Deal",
      description: "Buy any main course and get a free dessert! Available Monday to Friday, 11 AM to 3 PM.",
      image: Offer2,
    },

    {
      id: 3,
      title: "Group Discount",
      description: "Planning a party? Get 15% off when you order for 10 or more people!",
      image: Offer3,
    }
  ];


  return (
    <section className="special-offers">
      <Carousel interval={5000} className="offers-carousel">
        {offers.map((offer) => (
          <Carousel.Item key={offer.id}>
            <div 
              className="carousel-slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${offer.image})`
              }}
            >
              <div className="offer-details">
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <button className="order-now-btn">Order Now</button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default SpecialOffers; 