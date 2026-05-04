import React, { useState, useRef } from "react";
import "./Settings.css";

const TABS = ["Profile", "Notifications", "Appearance", "Data"];

const Settings = ({ setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("Profile");

  // Profile state
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") || ""
  );
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || ""
  );
  const [profileSaved, setProfileSaved] = useState(false);

  // Password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMsg, setPassMsg] = useState("");

  // Notifications state
  const [notifs, setNotifs] = useState({
    budgetAlerts: localStorage.getItem("notif_budgetAlerts") !== "false",
    weeklyReport: localStorage.getItem("notif_weeklyReport") !== "false",
    goalReached: localStorage.getItem("notif_goalReached") !== "false",
    newTransaction: localStorage.getItem("notif_newTransaction") === "true",
  });

  // Appearance state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const fileRef = useRef();
  const username = localStorage.getItem("currentUser");

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : username?.slice(0, 2).toUpperCase() || "U";

  // --- Handlers ---
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      localStorage.setItem("avatar", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleChangePassword = () => {
    const stored = localStorage.getItem("userPassword") || "";
    if (!currentPass) return setPassMsg("Enter your current password.");
    if (stored && currentPass !== stored) return setPassMsg("Current password is incorrect.");
    if (newPass.length < 6) return setPassMsg("New password must be at least 6 characters.");
    if (newPass !== confirmPass) return setPassMsg("Passwords do not match.");
    localStorage.setItem("userPassword", newPass);
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
    setPassMsg("✓ Password updated successfully!");
    setTimeout(() => setPassMsg(""), 2500);
  };

  const handleNotifToggle = (key) => {
    const updated = { ...notifs, [key]: !notifs[key] };
    setNotifs(updated);
    localStorage.setItem(`notif_${key}`, updated[key]);
  };

  const handleDarkMode = (val) => {
    setDarkMode(val);
    localStorage.setItem("darkMode", val);
  };

  const handleExportData = () => {
    const data = {
      profile: { fullName, email, username },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "budget_tracker_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This will clear all your local data and log you out.")) {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  };

  // --- Tab Renders ---
  const renderProfile = () => (
    <div className="st-section">
      <div className="st-block">
        <h3 className="st-block-title">Profile Information</h3>
        <p className="st-block-sub">Update your personal details</p>

        {/* Avatar */}
        <div className="st-avatar-row">
          <div className="st-avatar" onClick={() => fileRef.current.click()}>
            {avatar
              ? <img src={avatar} alt="avatar" className="st-avatar-img" />
              : <span className="st-avatar-initials">{initials}</span>
            }
          </div>
          <div>
            <button className="st-outline-btn" onClick={() => fileRef.current.click()}>
              ↑ Change Photo
            </button>
            <p className="st-hint">JPG, PNG or GIF. Max size 2MB</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

        {/* Name & Email */}
        <div className="st-two-col">
          <div>
            <label className="st-label">Full Name</label>
            <input
              className="st-input"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="st-label">Email Address</label>
            <input
              className="st-input"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className="st-primary-btn" onClick={handleSaveProfile}>
          {profileSaved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Change Password */}
      <div className="st-block">
        <h3 className="st-block-title">Change Password</h3>
        <p className="st-block-sub">Update your account password</p>

        <label className="st-label">Current Password</label>
        <input
          className="st-input"
          type="password"
          placeholder="••••••••"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
        />

        <div className="st-two-col" style={{ marginTop: "14px" }}>
          <div>
            <label className="st-label">New Password</label>
            <input
              className="st-input"
              type="password"
              placeholder="••••••••"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div>
            <label className="st-label">Confirm New Password</label>
            <input
              className="st-input"
              type="password"
              placeholder="••••••••"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </div>

        {passMsg && (
          <p className={`st-msg ${passMsg.startsWith("✓") ? "st-msg-success" : "st-msg-error"}`}>
            {passMsg}
          </p>
        )}

        <button className="st-primary-btn" onClick={handleChangePassword}>
          Update Password
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="st-section">
      <div className="st-block">
        <h3 className="st-block-title">Notification Preferences</h3>
        <p className="st-block-sub">Choose what alerts you want to receive</p>

        {[
          { key: "budgetAlerts", label: "Budget Alerts", desc: "Get notified when you're close to or over your budget" },
          { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly summary of your spending" },
          { key: "goalReached", label: "Goal Reached", desc: "Be notified when you hit a savings milestone" },
          { key: "newTransaction", label: "New Transaction", desc: "Alert for every transaction added" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="st-notif-row">
            <div>
              <p className="st-notif-label">{label}</p>
              <p className="st-notif-desc">{desc}</p>
            </div>
            <div
              className={`st-toggle ${notifs[key] ? "st-toggle-on" : ""}`}
              onClick={() => handleNotifToggle(key)}
            >
              <div className="st-toggle-knob" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="st-section">
      <div className="st-block">
        <h3 className="st-block-title">Theme Preferences</h3>
        <p className="st-block-sub">Customize the look and feel of your app</p>

        <div className="st-notif-row">
          <div>
            <p className="st-notif-label">Dark Mode</p>
            <p className="st-notif-desc">Switch between light and dark themes</p>
          </div>
          <div
            className={`st-toggle ${darkMode ? "st-toggle-on" : ""}`}
            onClick={() => handleDarkMode(!darkMode)}
          >
            <div className="st-toggle-knob" />
          </div>
        </div>

        <div className="st-theme-preview">
          <div
            className={`st-theme-card ${!darkMode ? "st-theme-selected" : ""}`}
            onClick={() => handleDarkMode(false)}
          >
            <div className="st-theme-light-mock">
              <div className="st-mock-line" style={{ background: "#e2e8f0", width: "60%" }} />
              <div className="st-mock-line" style={{ background: "#e2e8f0", width: "40%" }} />
              <div className="st-mock-line" style={{ background: "#e2e8f0", width: "80%" }} />
            </div>
            <p className="st-theme-label">Light</p>
          </div>

          <div
            className={`st-theme-card ${darkMode ? "st-theme-selected" : ""}`}
            onClick={() => handleDarkMode(true)}
          >
            <div className="st-theme-dark-mock">
              <div className="st-mock-line" style={{ background: "#4b5563", width: "60%" }} />
              <div className="st-mock-line" style={{ background: "#4b5563", width: "40%" }} />
              <div className="st-mock-line" style={{ background: "#4b5563", width: "80%" }} />
            </div>
            <p className="st-theme-label">Dark</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="st-section">
      <div className="st-block">
        <h3 className="st-block-title">Data Management</h3>
        <p className="st-block-sub">Export or manage your account data</p>

        <div className="st-data-row">
          <div>
            <p className="st-notif-label">Export Data</p>
            <p className="st-notif-desc">Download your profile data as a JSON file</p>
          </div>
          <button className="st-outline-btn" onClick={handleExportData}>
            ↓ Export
          </button>
        </div>

        <div className="st-divider" />

        <div className="st-data-row">
          <div>
            <p className="st-notif-label" style={{ color: "#ef4444" }}>Delete Account</p>
            <p className="st-notif-desc">Permanently clear all local data and log out</p>
          </div>
          <button className="st-danger-btn" onClick={handleDeleteAccount}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const tabContent = {
    Profile: renderProfile,
    Notifications: renderNotifications,
    Appearance: renderAppearance,
    Data: renderData,
  };

  return (
    <div className="settings-page">
      <div className="st-header">
        <h1 className="st-title">Settings</h1>
        <p className="st-subtitle">Manage your account and preferences</p>
      </div>

      <div className="st-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`st-tab ${activeTab === tab ? "st-tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabContent[activeTab]?.()}
    </div>
  );
};

export default Settings;
