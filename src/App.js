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

function About() {
  return <h1>About Us</h1>;
}

function SpecialOffers() {
  return <h1>Special Offers</h1>;
}

function MostPopular() {
  return <h1>Most Popular Burgers</h1>;
}

function Contact() {
  return <h1>Contact Us</h1>;
}

function Testimonials() {
  return <h1>Customer Testimonials</h1>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/special-offers" element={<SpecialOffers />} />
          <Route path="/most-popular" element={<MostPopular />} />
          <Route path="/make-your-burger" element={<MakeYourBurger />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
