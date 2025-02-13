import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul className="footer-links">
            <li>
              <ScrollLink className="nav-link" to="landing" smooth={true} duration={500}>
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink className="nav-link" to="about" smooth={true} duration={500}>
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink className="nav-link" to="special-offers" smooth={true} duration={500}>
                Special Offers
              </ScrollLink>
            </li>
            <li>
              <ScrollLink className="nav-link" to="most-popular" smooth={true} duration={500}>
                Most Popular
              </ScrollLink>
            </li>
            <li>
              <ScrollLink className="nav-link" to="make-your-burger" smooth={true} duration={500}>
                Make Your Burger
              </ScrollLink>
            </li>
            <li>
              <ScrollLink className="nav-link" to="testimonials" smooth={true} duration={500}>
                Testimonials
              </ScrollLink>
            </li>
            <li>
              <ScrollLink className="nav-link" to="contact" smooth={true} duration={500}>
                Contact
              </ScrollLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Hours</h3>
          <div className="hours">
            <p><strong>Monday - Thursday</strong></p>
            <p>11:30 AM - 10:00 PM</p>
            <p><strong>Friday - Saturday</strong></p>
            <p>11:30 AM - 11:00 PM</p>
            <p><strong>Sunday</strong></p>
            <p>12:00 PM - 9:00 PM</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <div className="contact-info">
            <p>123 Restaurant Street</p>
            <p>City, State 12345</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@restaurant.com</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <ul className="footer-links">
            <li><a href="/gift-cards">Gift Cards</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://twitter.com">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="bottom-bar">
        <p>© {new Date().getFullYear()} YousseGad Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
