import React, { useState } from "react";
import axios from "axios";
import "./login.css"; // Ensure you have this CSS file for styling

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setMessage("");
    setName("");
    setEmail("");
    setPassword("");
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

  const isFormValid = isLogin 
    ? email && password.length >= 6 
    : name && email && password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const payload = isLogin 
        ? { email, password }
        : { username: name, email, password };

      const response = await axios.post(url, payload);
      setMessage(response.data.message);

      if (isLogin && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/income"; // Redirect to income page after login
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      </div>
      <div className="auth-card-body">
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
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
          </div>
          <button type="submit" className="submit-btn" disabled={!isFormValid}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="auth-card-footer">
        <span>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Login;