import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import KeyboardPage from "./Pages/KeyboardsPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/Signup";
import SwitchPage from "./Pages/Switche";
import CartPage from "./Pages/Cart";
import AccessoriesPage from "./Pages/AccessoriesPage";
import SettingsPage from "./Pages/Settings";
import OrderHistoryPage from "./Pages/OrderHistory";
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
  const hideFooter = ["/login", "/signup", "/settings"].includes(location.pathname);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);

        const { data: userOrders, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id);

        if (!error) {
          setOrders(userOrders);
        } else {
          console.error("Failed to fetch orders:", error);
        }
      }
    };

    fetchUserAndOrders();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);

        supabase
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id)
          .then(({ data, error }) => {
            if (!error) setOrders(data);
          });
      } else {
        setUser(null);
        setOrders([]);
      }
    });

    return () => authListener?.subscription?.unsubscribe();
  }, []);

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

  const handleCheckout = async () => {
    if (cart.length === 0 || !user) {
      alert("Your cart is empty or you're not logged in.");
      return;
    }

    const orderPromises = cart.map((item) =>
      supabase.from("orders").insert({
        user_id: user.id,
        product_name: item.name,
        selected_color: item.selectedColor,
        quantity: item.quantity,
        price: item.price
      })
    );

    const results = await Promise.all(orderPromises);
    const errors = results.filter(r => r.error);

    if (errors.length > 0) {
      console.error("Some errors occurred:", errors);
      alert("Some orders failed. Please try again.");
    } else {
      setCart([]);
      alert("Checkout successful! Your order has been placed.");

      const { data: updatedOrders } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id);

      setOrders(updatedOrders || []);
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
                  <Link to="/orderHistory" onClick={() => setShowDropdown(false)}>Order History</Link>
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
          <Route path="/keyboard" element={<KeyboardPage addToCart={addToCart} user={user} />} />
          <Route path="/switches" element={<SwitchPage addToCart={addToCart} user={user} />} />
          <Route path="/accessories" element={<AccessoriesPage addToCart={addToCart} user={user} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/orderHistory" element={<OrderHistoryPage orders={orders} />} />
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
