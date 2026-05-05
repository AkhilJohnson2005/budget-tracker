import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        form
      );

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Error signing up");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p>Start tracking your expenses</p>

        <form onSubmit={handleSignup}>
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

          <button type="submit">Signup</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;