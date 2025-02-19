import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutPage from "mechakeys/public/Pages/AboutPage.js";
import LoginPage from "mechakeys/public/Pages/KeyboardsPage.js";
import KeyboardPage from "mechakeys/public/Pages/LoginPage.js";
const App = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="p-4 bg-gray-200">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/keyboard">Keyboards</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-10">this is from the app.js</h1>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/keyboard" element={<KeyboardPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
