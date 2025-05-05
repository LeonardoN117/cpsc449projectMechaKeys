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
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import { supabase } from "./data/supabaseClient";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import "./styles/App.css";
import { STRIPE_KEYS } from "./data/stripeKeys";

const stripeServer = new Stripe(STRIPE_KEYS[0].SECRET_KEY);
const stripePromise = loadStripe(STRIPE_KEYS[0].PUBLISHABLE_KEY);

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
    if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    if (!user) {
        alert("Please log in to check out.");
        navigate('/login');
        return;
    }

    // Format cart items for Stripe
    let line_items;
    try {
        line_items = cart.map(item => {
            if (typeof item.price !== 'number' || item.price <= 0) {
                console.error("Invalid price for item:", item);
                throw new Error(`Invalid or missing price for item: ${item.name}. Please check cart data.`);
            }
              if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                console.error("Invalid quantity for item:", item);
                  throw new Error(`Invalid or missing quantity for item: ${item.name}.`);
            }
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${item.name} (${item.selectedColor || 'Default'})`,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });
    } catch (error) {
        alert(`Checkout Error: ${error.message}`);
        console.error("Error formatting line items:", error);
        return;
    }

    const success_url = `${window.location.origin}/orderSuccess?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${window.location.origin}/cart`;

    try {
        // Create Stripe session
        console.log("Creating Stripe session with line items:", JSON.stringify(line_items, null, 2));
        const session = await stripeServer.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
            metadata: {
                userId: user.id,
            },
        });
        console.log("Stripe session created:", session.id);


        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
          if (!stripe) {
            throw new Error("Stripe.js failed to load.");
        }
        const { error: stripeError } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (stripeError) {
            console.error("Stripe redirection error:", stripeError);
            alert(`Could not redirect to checkout: ${stripeError.message}`);
        }

    } catch (error) {
        console.error('Stripe Session Creation/Redirection Error:', error);
          if (error.type === 'StripeInvalidRequestError') {
            alert(`Checkout failed: Invalid data sent to Stripe. ${error.message}`);
          } else {
            alert(`Checkout failed: ${error.message || 'Could not create Stripe session.'}`);
          }
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
          <Route path="/orderSuccess" element={<OrderSuccessPage cart={[]} user={user} />} />
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