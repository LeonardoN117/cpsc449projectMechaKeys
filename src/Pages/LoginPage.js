import React from "react";
import "../styles/login.css"

function LoginPage() {
  return (
    <div>
      <div className="login-container">
        <img src="../images/logo.png"></img>
        <h1>Login</h1>
        <form>
          <label>Username</label>
          <br />
          <input type="text" name="username" required />
          <br />
          <label>Password</label>
          <br />
          <input type="password" name="password" required />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
