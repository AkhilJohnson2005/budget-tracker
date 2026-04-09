import React, { useState } from "react";
import "./Transactions.css";

const AddTransaction = ({ addTransaction }) => {
  const [form, setForm] = useState({
    date: "",
    type: "expense",
    category: "",
    amount: "",
    description: ""
  });

  const expenseCategories = [
    "Food","Transport","Shopping","Bills","Rent","Entertainment","Healthcare","Other"
  ];

  const incomeCategories = [
    "Salary","Freelance","Investment","Other"
  ];

  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction(form);

    setForm({
      date: "",
      type: "expense",
      category: "",
      amount: "",
      description: ""
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Transaction Details</h3>
      <p className="form-subtext">
        Enter the information for your new transaction
      </p>

      {/* DATE */}
      <label>Date</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      {/* TYPE */}
      <label>Type</label>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* CATEGORY */}
      <label>Category</label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select category</option>
        {categories.map((cat, i) => (
          <option key={i}>{cat}</option>
        ))}
      </select>

      {/* AMOUNT */}
      <label>Amount (₹)</label>
      <input
        type="number"
        name="amount"
        placeholder="0.00"
        value={form.amount}
        onChange={handleChange}
        required
      />

      {/* DESCRIPTION */}
      <label>Description</label>
      <textarea
        name="description"
        placeholder="Enter transaction details..."
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit" className="submit-btn">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;