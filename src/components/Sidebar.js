import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: "▣" },
  { path: "/transactions", label: "Add Transaction", icon: "+" },
  { path: "/analytics", label: "Analytics", icon: "◑" },
  { path: "/budget", label: "Budget & Goals", icon: "⊙" },
  { path: "/settings", label: "Settings", icon: "⚙" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("currentUser");
  const fullName = localStorage.getItem("fullName");
  const avatar = localStorage.getItem("avatar");
  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : username?.slice(0, 2).toUpperCase() || "U";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "#1e1e2f",
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexShrink: 0,
    }}>
      <div>
        <h2 style={{ marginBottom: "28px", fontSize: "18px", fontWeight: 700 }}>
          🗂 ExpenseTracker
        </h2>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              marginBottom: "6px",
              borderRadius: "10px",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: location.pathname === item.path ? 600 : 400,
              background: location.pathname === item.path
                ? "rgba(255,255,255,0.12)"
                : "transparent",
              transition: "background 0.18s",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
      <div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#818cf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            {avatar
              ? <img src={avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>{initials}</span>
            }
          </div>
          <span style={{ fontSize: "14px" }}>{fullName || username}</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;