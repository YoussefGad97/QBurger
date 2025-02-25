import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.scss";
import Logo from "../assets/images/logo.jpg";
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Badge from '@mui/material/Badge';
import { useBasket } from '../contexts/BasketContext';

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { getTotalItems } = useBasket();

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

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation items
  const navItems = [
    { id: 'landing', text: 'Home' },
    { id: 'about', text: 'About' },
    { id: 'special-offers', text: 'Special Offers' },
    { id: 'menu', text: 'Menu' },
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

        <div className="mobile-controls">
          {user && (
            <IconButton
              color="inherit"
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
          )}
          <IconButton
            color="inherit"
            onClick={() => navigate('/basket')}
            className="mobile-basket-btn"
          >
            <Badge 
              badgeContent={getTotalItems()} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: getTotalItems() > 0 ? '#e67e22' : 'inherit',
                  color: 'white'
                }
              }}
            >
              <ShoppingBasketIcon 
                sx={{ 
                  color: getTotalItems() > 0 ? '#e67e22' : 'white',
                  fontSize: '1.5rem'
                }} 
              />
            </Badge>
          </IconButton>

          <button
            className={`navbar-toggler ${isMenuOpen ? 'open' : ''}`}
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                {item.text === 'Menu' ? (
                  <Link className="nav-link" to="/menu" onClick={() => setIsMenuOpen(false)}>
                    {item.text}
                  </Link>
                ) : isHomePage ? (
                  <ScrollLink
                    className="nav-link"
                    to={item.id}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </ScrollLink>
                ) : (
                  <Link className="nav-link" to={`/#${item.id}`} onClick={() => setIsMenuOpen(false)}>
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
            {user && window.innerWidth > 992 && (
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
              </li>
            )}
            <li className="nav-item basket-desktop">
              <IconButton
                color="inherit"
                onClick={() => navigate('/basket')}
                sx={{ ml: 2 }}
              >
                <Badge 
                  badgeContent={getTotalItems()} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: getTotalItems() > 0 ? '#e67e22' : 'inherit',
                      color: 'white'
                    }
                  }}
                >
                  <ShoppingBasketIcon 
                    sx={{ 
                      color: getTotalItems() > 0 ? '#e67e22' : 'white',
                      fontSize: '1.5rem'
                    }} 
                  />
                </Badge>
              </IconButton>
            </li>

            {user ? (
              <li className="nav-item">
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={() => setIsMenuOpen(false)}>
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
