import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

function SettingsPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        alert("Failed to fetch user: " + error.message);
      } else if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateEmail = async () => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      alert("Error updating email: " + error.message);
    } else {
      alert("Email updated!");
    }
  };

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated!");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;

    const { error } = await supabase.rpc("delete_user"); 
    if (error) {
      alert("Unable to delete account: " + error.message);
    } else {
      alert("Account deleted.");
      await supabase.auth.signOut();
      navigate("/signup");
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>

      {user ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Email</label>
          <br></br>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={handleUpdateEmail}>Update Email</button>
          <br></br>
          <label>New Password</label>
          <br></br>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
          <button type="button" onClick={handleUpdatePassword}>Update Password</button>

          <hr style={{ margin: "20px 0" }} />

          <button
            type="button"
            style={{ color: "red", border: "1px solid red", borderRadius: "5px" }}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </form>
      ) : (
        <p>You must be logged in to view settings.</p>
      )}
    </div>
  );
}

export default SettingsPage;
