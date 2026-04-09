import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("currentUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    navigate("/login");

    window.location.reload(); // 🔥 force refresh
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#1e1e2f",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <h2>Budget</h2>

        <p>
          <Link to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
        </p>

        <p>
          <Link to="/transactions" style={{ color: "white" }}>
            Transactions
          </Link>
        </p>
      </div>

      {/* 🔥 USER + LOGOUT */}
      <div>
        <p style={{ marginBottom: "10px" }}>
          👤 {username}
        </p>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "8px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;