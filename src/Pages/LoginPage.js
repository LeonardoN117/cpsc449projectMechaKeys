import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <img src="../images/logo.png" alt="Logo" />
      <h2>Login</h2>
      <p>Enter your email and password.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <br />
        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>No account?</p>
      <Link to="/signup" className="signup">Sign Up</Link>
    </div>
  );
}

export default LoginPage;
