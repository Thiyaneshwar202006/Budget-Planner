import React, { useState } from "react";
import "./login.css"; // We'll create this CSS file next

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setPassword("");
    setEmail("");
    setName("");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
    } else {
      setError("");
    }
  };

  const isFormValid = isLogin ? email && password.length >= 6 : name && email && password.length >= 6;

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      </div>
      <div className="auth-card-body">
        {isLogin ? (
          <form>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={handlePasswordChange}
              />
              {error && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" className="submit-btn" disabled={!isFormValid}>
              Login
            </button>
          </form>
        ) : (
          <form>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={handlePasswordChange}
              />
              {error && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" className="submit-btn" disabled={!isFormValid}>
              Sign Up
            </button>
          </form>
        )}
      </div>
      <div className="auth-card-footer">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthCard;