import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import KeyboardPage from "./Pages/KeyboardsPage";
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/keyboard">Keyboards</Link> | 
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/keyboard" element={<KeyboardPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
