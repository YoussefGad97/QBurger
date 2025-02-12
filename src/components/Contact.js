import React from 'react';
import '../styles/Contact.scss';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="map-container">
            <iframe
              title="Restaurant Location"
              src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <div className="contact-details">
            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div className="info-content">
                  <h3>Email</h3>
                  <p><a href="mailto:info@burgerbuilder.com">info@burgerbuilder.com</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info-content">
                  <h3>Address</h3>
                  <p>123 Burger Street</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div className="info-content">
                  <h3>Hours</h3>
                  <p>Monday - Friday: 11am - 10pm</p>
                  <p>Saturday - Sunday: 12pm - 11pm</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 