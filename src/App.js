import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import KeyboardPage from "./Pages/KeyboardsPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/Signup";
import SwitchPage from "./Pages/Switche";
import CartPage from "./Pages/Cart";
import AccessoriesPage from "./Pages/AccessoriesPage";
import { supabase } from "./data/supabaseClient";
import "./styles/App.css";

function AppContent() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/signup";

  // Fetch user session on mount and listen for auth changes
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addToCart = (item, selectedColor) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id === item.id && i.selectedColor === selectedColor
      );
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id && i.selectedColor === selectedColor
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prevCart, { ...item, selectedColor, quantity: 1 }];
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="App-layout">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="MechaKeys Logo" />
          </Link>
        </div>
        <h2>MechaKeys</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/keyboard">Keyboards</Link>
          <Link to="/switches">Switches</Link>
          <Link to="/accessories">Accessories</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <div className="user-menu" ref={dropdownRef}>
              <img
                src="/images/userIcon.svg"
                alt="User Icon"
                className="user-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/keyboard" element={<KeyboardPage addToCart={addToCart} orders={orders} setOrders={setOrders} />} />
          <Route path="/switches" element={<SwitchPage addToCart={addToCart} orders={orders} setOrders={setOrders} />} />
          <Route path="/accessories" element={<AccessoriesPage addToCart={addToCart} orders={orders} setOrders={setOrders} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>

      {!hideFooter && (
        <footer className="footer">
          <p>&copy; 2025 MechaKeys. All rights reserved.</p>
          <div>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">X</a>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
