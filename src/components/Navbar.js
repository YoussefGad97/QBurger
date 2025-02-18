import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.scss";
import Logo from "../assets/images/logo.jpg";

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Only show scroll behavior on home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar ${
        visible ? "visible" : "hidden"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Logo" className="navbar-logo" />
          Q-Burger
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {isHomePage ? (
              // Scroll links for home page
              <>
                <li className="nav-item">
                  <ScrollLink
                    className="nav-link"
                    to="landing"
                    smooth={true}
                    duration={500}
                  >
                    Home
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    className="nav-link"
                    to="about"
                    smooth={true}
                    duration={500}
                  >
                    About
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    className="nav-link"
                    to="special-offers"
                    smooth={true}
                    duration={500}
                  >
                    Special Offers
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    className="nav-link"
                    to="most-popular"
                    smooth={true}
                    duration={500}
                  >
                    Most Popular
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    className="nav-link"
                    to="make-your-burger"
                    smooth={true}
                    duration={500}
                  >
                    Make Your Burger
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink
                    className="nav-link"
                    to="testimonials"
                    smooth={true}
                    duration={500}
                  >
                    Testimonials
                  </ScrollLink>
                </li>
              </>
            ) : (
              // Regular router links for other pages
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/special-offers">
                    Special Offers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/most-popular">
                    Most Popular
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/make-your-burger">
                    Make Your Burger
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/testimonials">
                    Testimonials
                  </Link>
                </li>
              </>
            )}
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <div className="d-flex align-items-center">
                      <div className="user-avatar me-2">
                        {user.username[0].toUpperCase()}
                      </div>
                      {user.username}
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
