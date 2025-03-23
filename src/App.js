import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import KeyboardPage from "./Pages/KeyboardsPage";
import LoginPage from "./Pages/LoginPage";
import SwitchesPage from "./Pages/Switche";
import CartPage from "./Pages/Cart";
import "./styles/App.css";

function App() {
  const [cart, setCart] = useState([]); // Global cart state
  const [orders, setOrders] = useState([]);


  // Function to add items to the cart
  const addToCart = (keyboard, selectedColor) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === keyboard.id && item.selectedColor === selectedColor
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === keyboard.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...keyboard, selectedColor, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id, color) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedColor === color)));
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      const newOrders = [...orders];
  
      cart.forEach(item => {
        const existingOrderIndex = newOrders.findIndex(
          order => order.id === item.id && order.selectedColor === item.selectedColor
        );
        if (existingOrderIndex >= 0) {
          newOrders[existingOrderIndex].quantity += item.quantity;
        } else {
          newOrders.push({ ...item });
        }
      });
  
      setOrders(newOrders);
      setCart([]);
      alert("Checkout successful! Your order has been placed.");
    }
  };
  
  
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="MechaKeys Logo" />            
          </Link>
        </div>
        <h1>MechaKeys</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/keyboard">Keyboards</Link>
          <Link to="/switches">Switches</Link>
          <Link to="/about">About</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />          
          <Route path="/keyboard" element={<KeyboardPage addToCart={addToCart} orders={orders} setOrders={setOrders} />} />
          <Route path="/switches" element={<SwitchesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 MechaKeys. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">X</a>
        </div>
      </footer>
    </Router>
    
  );
}


export default App;
