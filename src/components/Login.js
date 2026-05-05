import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = ({ setIsLoggedIn }) => {
  // ✅ Pre-filled demo credentials
  const [form, setForm] = useState({
    username: "lux",
    password: "2005"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://budget-tracker-ahav.onrender.com/api/auth/login`,
        form
      );

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", form.username);

      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        {/* Optional hint */}
        <p className="demo-hint">Demo account is pre-filled</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;