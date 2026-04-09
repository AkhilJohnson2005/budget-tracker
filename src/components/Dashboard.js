import React, { useState } from "react";
import TransactionList from "./TransactionList";
import SummaryCards from "./SummaryCards";
import "./Dashboard.css";

const Dashboard = ({ transactions, deleteTransaction }) => {
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    category: ""
  });

  const expenseCategories = [
    "Food","Transport","Shopping","Bills","Rent","Entertainment","Healthcare","Other"
  ];

  const incomeCategories = [
    "Salary","Freelance","Investment","Other"
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredTransactions = transactions.filter((t) => {
    const dateMatch = filters.date === "" || t.date.includes(filters.date);
    const typeMatch = filters.type === "" || t.type === filters.type;
    const categoryMatch =
      filters.category === "" ||
      t.category.toLowerCase().includes(filters.category.toLowerCase());

    return dateMatch && typeMatch && categoryMatch;
  });

  const categories =
    filters.type === "income"
      ? incomeCategories
      : filters.type === "expense"
      ? expenseCategories
      : [...expenseCategories, ...incomeCategories];

  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <p className="subtitle">
        Welcome back! Here's your financial overview.
      </p>

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          name="date"
          placeholder="Search date (YYYY / MM / DD)"
          onChange={handleFilterChange}
        />

        <select name="type" onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>

      <SummaryCards transactions={filteredTransactions} />

      <TransactionList
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default Dashboard;