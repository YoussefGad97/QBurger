import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.scss";
import Logo from "../assets/images/logo.jpg";
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const isHomePage = location.pathname === '/';

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  // Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  // Navigation items
  const navItems = [
    { id: 'landing', text: 'Home' },
    { id: 'about', text: 'About' },
    { id: 'special-offers', text: 'Special Offers' },
    { id: 'most-popular', text: 'Most Popular' },
    { id: 'make-your-burger', text: 'Make Your Burger' },
    { id: 'testimonials', text: 'Testimonials' }
  ];

  // Add better null checks when accessing user properties
  const displayName = user?.displayName || user?.username || 'U';
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar ${visible ? "visible" : "hidden"}`}>
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                {isHomePage ? (
                  <ScrollLink
                    className="nav-link"
                    to={item.id}
                    smooth={true}
                    duration={500}
                  >
                    {item.text}
                  </ScrollLink>
                ) : (
                  <Link className="nav-link" to={`/#${item.id}`}>
                    {item.text}
                  </Link>
                )}
              </li>
            ))}

            {user ? (
              <li className="nav-item">
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0, ml: 2 }}
                  aria-label="user menu"
                >
                  <Avatar 
                    alt={displayName}
                    sx={{ 
                      bgcolor: '#F87810',
                      width: 40,
                      height: 40,
                      border: '2px solid white'
                    }}
                  >
                    {firstLetter}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </li>
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
