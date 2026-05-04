import React, { useState, useMemo } from "react";
import "./BudgetGoals.css";

const PIE_COLORS = ["#818cf8", "#4ade80", "#f472b6", "#f59e0b", "#60a5fa", "#a78bfa", "#34d399", "#94a3b8"];

const BudgetGoals = ({ transactions }) => {
  const [monthlyBudget, setMonthlyBudget] = useState(
    Number(localStorage.getItem("monthlyBudget")) || 0
  );
  const [savingsGoal, setSavingsGoal] = useState(
    Number(localStorage.getItem("savingsGoal")) || 0
  );
  const [budgetInput, setBudgetInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [budgetSaved, setBudgetSaved] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);

  // Current month expenses
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthExpenses = useMemo(() => {
    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === "expense" &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions, currentMonth, currentYear]);

  // Total savings = all income - all expenses
  const totalIncome = useMemo(() =>
    transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0),
    [transactions]
  );
  const totalExpenses = useMemo(() =>
    transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0),
    [transactions]
  );
  const currentSavings = totalIncome - totalExpenses;

  // Category breakdown for this month
  const categoryBreakdown = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === "expense" &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount);
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, currentMonth, currentYear]);

  const budgetPercent = monthlyBudget > 0
    ? Math.min((thisMonthExpenses / monthlyBudget) * 100, 100)
    : 0;
  const budgetRemaining = monthlyBudget - thisMonthExpenses;
  const isOverBudget = thisMonthExpenses > monthlyBudget && monthlyBudget > 0;

  const savingsPercent = savingsGoal > 0
    ? Math.min((currentSavings / savingsGoal) * 100, 100)
    : 0;
  const savingsRemaining = savingsGoal - currentSavings;

  const handleSaveBudget = () => {
    const val = Number(budgetInput);
    if (!val || val <= 0) return;
    setMonthlyBudget(val);
    localStorage.setItem("monthlyBudget", val);
    setBudgetInput("");
    setBudgetSaved(true);
    setTimeout(() => setBudgetSaved(false), 2000);
  };

  const handleSaveGoal = () => {
    const val = Number(goalInput);
    if (!val || val <= 0) return;
    setSavingsGoal(val);
    localStorage.setItem("savingsGoal", val);
    setGoalInput("");
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2000);
  };

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="bg-page">
      <div className="bg-header">
        <h1 className="bg-title">Budget & Goals</h1>
        <p className="bg-subtitle">Track your spending and savings targets</p>
      </div>

      {/* Top Row */}
      <div className="bg-top-row">

        {/* Monthly Budget */}
        <div className="bg-card">
          <h3 className="bg-card-title">Monthly Budget</h3>
          <p className="bg-card-sub">Set and track your monthly spending limit</p>

          <div className="bg-input-row">
            <label className="bg-label">Budget Amount (₹)</label>
            <div className="bg-input-group">
              <input
                type="number"
                className="bg-input"
                placeholder={monthlyBudget > 0 ? monthlyBudget : "Enter amount"}
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button className="bg-save-btn" onClick={handleSaveBudget}>
                {budgetSaved ? "✓ Saved!" : "Set Budget"}
              </button>
            </div>
          </div>

          <div className="bg-stat-row">
            <span className="bg-stat-label">Spent this month</span>
            <span className="bg-stat-value">
              ₹{thisMonthExpenses.toLocaleString()} / ₹{monthlyBudget.toLocaleString()}
            </span>
          </div>

          <div className="bg-progress-wrap">
            <div
              className="bg-progress-bar"
              style={{
                width: `${budgetPercent}%`,
                background: isOverBudget ? "#ef4444" : budgetPercent > 80 ? "#f59e0b" : "#4ade80",
              }}
            />
          </div>

          <div className="bg-progress-labels">
            <span style={{ color: isOverBudget ? "#ef4444" : budgetPercent > 80 ? "#f59e0b" : "#16a34a" }}>
              {monthlyBudget === 0
                ? "No budget set"
                : isOverBudget
                ? `⚠ Over budget by ₹${Math.abs(budgetRemaining).toLocaleString()}`
                : budgetPercent > 80
                ? `⚠ ${budgetPercent.toFixed(0)}% used`
                : `✓ Within Budget`}
            </span>
            <span className="bg-remaining">
              {monthlyBudget > 0 && !isOverBudget
                ? `₹${budgetRemaining.toLocaleString()} remaining`
                : ""}
            </span>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="bg-card">
          <h3 className="bg-card-title">Savings Goal</h3>
          <p className="bg-card-sub">Work towards your financial target</p>

          <div className="bg-input-row">
            <label className="bg-label">Goal Amount (₹)</label>
            <div className="bg-input-group">
              <input
                type="number"
                className="bg-input"
                placeholder={savingsGoal > 0 ? savingsGoal : "Enter amount"}
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
              />
              <button className="bg-save-btn" onClick={handleSaveGoal}>
                {goalSaved ? "✓ Saved!" : "Set Goal"}
              </button>
            </div>
          </div>

          <div className="bg-stat-row">
            <span className="bg-stat-label">Current savings</span>
            <span className="bg-stat-value">
              ₹{currentSavings.toLocaleString()} / ₹{savingsGoal.toLocaleString()}
            </span>
          </div>

          {/* Circular progress */}
          <div className="bg-circle-wrap">
            <svg viewBox="0 0 120 120" className="bg-circle-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke={savingsPercent >= 100 ? "#4ade80" : "#818cf8"}
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - savingsPercent / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
              <text x="60" y="64" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
                {savingsPercent.toFixed(0)}%
              </text>
            </svg>
            <p className="bg-circle-label">
              {savingsGoal > 0 && currentSavings < savingsGoal
                ? `₹${savingsRemaining.toLocaleString()} more to reach your goal`
                : savingsGoal > 0
                ? "🎉 Goal reached!"
                : "Set a savings goal"}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-card bg-full">
        <h3 className="bg-card-title">Category Breakdown</h3>
        <p className="bg-card-sub">
          This month's spending by category —{" "}
          {MONTHS[currentMonth]} {currentYear}
        </p>

        {categoryBreakdown.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: "16px" }}>
            No expenses recorded this month yet.
          </p>
        ) : (
          <div className="bg-cat-grid">
            {categoryBreakdown.map((cat, i) => {
              const catPercent = monthlyBudget > 0
                ? ((cat.value / monthlyBudget) * 100).toFixed(1)
                : null;
              const barWidth = (cat.value / (categoryBreakdown[0]?.value || 1)) * 100;
              return (
                <div key={i} className="bg-cat-row">
                  <div className="bg-cat-top">
                    <div className="bg-cat-dot-name">
                      <div
                        className="bg-cat-dot"
                        style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <span className="bg-cat-name">{cat.name}</span>
                    </div>
                    <div className="bg-cat-right">
                      <span className="bg-cat-amt">₹{cat.value.toLocaleString()}</span>
                      {catPercent && (
                        <span className="bg-cat-pct">{catPercent}% of budget</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-bar-wrap">
                    <div
                      className="bg-bar-fill"
                      style={{
                        width: `${barWidth}%`,
                        background: PIE_COLORS[i % PIE_COLORS.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetGoals;
