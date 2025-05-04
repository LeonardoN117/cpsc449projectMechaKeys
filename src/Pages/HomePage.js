import React from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";

const HomePage = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <h1> Find Your Perfect Gaming Keyboard</h1>
        <p>Custom mechanical keyboards for every gamer and enthusiast.</p>
        <Link to="/keyboard" className="cta-button">Shop Now</Link>
      </section>

      {/* Keyboards Section */}
      <section className="content-section">
        <img src="/images/keyboards.jpg" alt="Keyboards"/>
        <div>
          <h2>Keyboards</h2>
          <p>Discover the latest mechanical keyboards designed for gamers and professionals.</p>
          <Link to="/keyboard" className="cta-button">Browse Keyboards</Link>
        </div>
      </section>

      {/* Switches Section */}
      <section className="content-section">
        <img src="/images/switches.jpg" alt="Switches"/>
        <div>
          <h2>Mechanical Switches</h2>
          <p>Choose from a variety of switches to customize your typing experience.</p>
          <Link to="/switches" className="cta-button">Explore Switches</Link>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="content-section">
        <img src="/images/accessories.jpg" alt="Accessories"/>
        <div>
          <h2>Keyboard Accessories</h2>
          <p>Enhance your setup with high-quality keyboard accessories.</p>
          <Link to="/accessories" className="cta-button">Shop Accessories</Link>
        </div>
      </section> 
    </div>
  );
};

export default HomePage;
