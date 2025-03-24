import React from "react";
import "../styles/signup.css"

function SignupPage() {
    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required/>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required/>
                <label for="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="confirm_password" required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;