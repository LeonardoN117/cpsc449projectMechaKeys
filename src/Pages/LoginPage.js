import React from "react";
import "../styles/login.css"
import { Link } from "react-router-dom";
import Signup from "./Signup";

function LoginPage() {
  return (
    <div className="login-container">
      <img src="../images/logo.png"></img>
      <h2>Login</h2>
      <p>Enter your email and password.</p>
      <form>
        <input type="text" name="username" placeholder="Username"required />
        <br />
        <input type="password" name="password" placeholder="Password" required />
        <br />
        <button type="submit">Login</button>
      </form>
      <p> No account? </p>
      <Link to="/signup" className="signup">Sign Up</Link>
    </div>
  );
}

export default LoginPage;
