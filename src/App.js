import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import KeyboardPage from "./Pages/KeyboardsPage";
import LoginPage from "./Pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.jpg" alt="MechaKeys Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/keyboard">Keyboards</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/keyboard" element={<KeyboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 MechaKeys. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </Router>
    
  );
}


export default App;
