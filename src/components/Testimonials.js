import React, { useState, useRef, useEffect } from 'react';
import '../styles/Testimonials.scss';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const allTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "The burger customization is incredible! I love how I can create my perfect burger with exactly what I want. The quality of ingredients is outstanding.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Food Critic",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "A revolutionary approach to burger ordering. The ability to build your own burger with such high-quality ingredients sets them apart from other restaurants.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "I've never had a burger place that lets me be so creative with my order. The ingredients are always fresh, and the service is exceptional!",
    rating: 5
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Burger Enthusiast",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "The make your own burger option is a game changer. Fresh ingredients, great service, and a fun experience!",
    rating: 5
  },
  {
    id: 5,
    name: "Olivia Brown",
    role: "Student",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "Best burgers in town! The variety of ingredients and the ability to customize my burger is amazing.",
    rating: 5
  },
  {
    id: 6,
    name: "Daniel Smith",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    text: "I love the quality and taste of the burgers here. Being able to choose exactly what I want makes it a perfect meal every time.",
    rating: 5
  }
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const testimonialsGrid = useRef(null);

  const visibleTestimonials = allTestimonials.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    if (transitioning) return;

    setTransitioning(true);
    const firstCard = testimonialsGrid.current.firstChild;
    firstCard.classList.add('fade-out');

    setTimeout(() => {
      setStartIndex(prev => (prev === 0 ? allTestimonials.length - 3 : prev - 1));
      firstCard.classList.remove('fade-out');
      firstCard.classList.add('fade-in');
      setTimeout(() => {
        firstCard.classList.remove('fade-in');
        setTransitioning(false);
      }, 300);
    }, 300);
  };

  const handleNext = () => {
    if (transitioning) return;

    setTransitioning(true);
    const lastCard = testimonialsGrid.current.lastChild;
    lastCard.classList.add('fade-out');

    setTimeout(() => {
      setStartIndex(prev => (prev === allTestimonials.length - 3 ? 0 : prev + 1));
      lastCard.classList.remove('fade-out');
      lastCard.classList.add('fade-in');
      setTimeout(() => {
        lastCard.classList.remove('fade-in');
        setTransitioning(false);
      }, 300);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (testimonialsGrid.current) {
        const cards = testimonialsGrid.current.children;
        if (cards.length > 0) {
          cards[0].classList.remove('fade-in');
          cards[cards.length - 1].classList.remove('fade-in');
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [visibleTestimonials]);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-carousel">
          <IconButton
            onClick={handlePrev}
            className="carousel-button carousel-button-prev"
          >
            <ArrowBackIos />
          </IconButton>
          <div className="testimonials-grid" ref={testimonialsGrid}>
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-image"
                  />
                  <div className="testimonial-info">
                    <h3>{testimonial.name}</h3>
                    <span className="role">{testimonial.role}</span>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <span key={index} className="star">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="quote-icon">❝</div>
              </div>
            ))}
          </div>
          <IconButton
            onClick={handleNext}
            className="carousel-button carousel-button-next"
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 