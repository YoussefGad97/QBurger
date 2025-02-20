import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import MakeYourBurger from './components/MakeYourBurger';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BasketProvider } from './contexts/BasketContext';

// Move page components to separate files
import About from './components/About';
import SpecialOffers from './components/SpecialOffers';
import MostPopular from './components/BurgerGallery';
import Testimonials from './components/Testimonials';
import Profile from './components/Profile';
import Basket from './components/Basket';
import Menu from './components/Menu';
import Checkout from './pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/special-offers" element={<SpecialOffers />} />
              <Route path="/most-popular" element={<MostPopular />} />
              <Route path="/make-your-burger" element={<MakeYourBurger />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </Router>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
