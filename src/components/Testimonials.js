import React from 'react';
import '../styles/Testimonials.scss';

const testimonials = [
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
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
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
      </div>
    </section>
  );
};

export default Testimonials; 