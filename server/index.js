const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth"); // 🔥 NEW

// ✅ Use Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes); // 🔥 NEW

// ✅ MongoDB Connection
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/budgetDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start Server
const PORT = 5000;
app.get("/api/seed", async (req, res) => {
  try {
    const Transaction = require("./models/Transaction");
    const sampleTransactions = [
      { date: "2026-02-01", type: "income", category: "Salary", amount: 45000, description: "Monthly salary", user: "lux" },
      { date: "2026-02-03", type: "expense", category: "Rent", amount: 12000, description: "February rent", user: "lux" },
      { date: "2026-02-05", type: "expense", category: "Food", amount: 800, description: "Groceries", user: "lux" },
      { date: "2026-02-08", type: "expense", category: "Transport", amount: 500, description: "Bus and auto", user: "lux" },
      { date: "2026-02-10", type: "expense", category: "Bills", amount: 1200, description: "Electricity bill", user: "lux" },
      { date: "2026-02-12", type: "expense", category: "Food", amount: 600, description: "Restaurant dinner", user: "lux" },
      { date: "2026-02-14", type: "expense", category: "Entertainment", amount: 800, description: "Movie and outing", user: "lux" },
      { date: "2026-02-16", type: "income", category: "Freelance", amount: 8000, description: "Web design project", user: "lux" },
      { date: "2026-02-18", type: "expense", category: "Shopping", amount: 2500, description: "Clothes shopping", user: "lux" },
      { date: "2026-02-20", type: "expense", category: "Healthcare", amount: 700, description: "Doctor visit", user: "lux" },
      { date: "2026-02-22", type: "expense", category: "Food", amount: 400, description: "Swiggy orders", user: "lux" },
      { date: "2026-02-25", type: "expense", category: "Transport", amount: 300, description: "Uber rides", user: "lux" },
      { date: "2026-02-28", type: "income", category: "Investment", amount: 2000, description: "Dividend received", user: "lux" },
      { date: "2026-03-01", type: "income", category: "Salary", amount: 45000, description: "Monthly salary", user: "lux" },
      { date: "2026-03-02", type: "expense", category: "Rent", amount: 12000, description: "March rent", user: "lux" },
      { date: "2026-03-04", type: "expense", category: "Food", amount: 900, description: "Groceries", user: "lux" },
      { date: "2026-03-06", type: "expense", category: "Bills", amount: 900, description: "Internet + water bill", user: "lux" },
      { date: "2026-03-08", type: "expense", category: "Transport", amount: 600, description: "Monthly bus pass", user: "lux" },
      { date: "2026-03-10", type: "expense", category: "Shopping", amount: 3500, description: "Electronics", user: "lux" },
      { date: "2026-03-12", type: "income", category: "Freelance", amount: 12000, description: "App development project", user: "lux" },
      { date: "2026-03-14", type: "expense", category: "Food", amount: 700, description: "Lunch with friends", user: "lux" },
      { date: "2026-03-16", type: "expense", category: "Entertainment", amount: 500, description: "Spotify + Netflix", user: "lux" },
      { date: "2026-03-18", type: "expense", category: "Healthcare", amount: 1200, description: "Medicines", user: "lux" },
      { date: "2026-03-20", type: "expense", category: "Food", amount: 500, description: "Zomato orders", user: "lux" },
      { date: "2026-03-22", type: "expense", category: "Shopping", amount: 1800, description: "Home decor", user: "lux" },
      { date: "2026-03-25", type: "income", category: "Investment", amount: 3000, description: "Stock sale profit", user: "lux" },
      { date: "2026-03-28", type: "expense", category: "Transport", amount: 400, description: "Cab rides", user: "lux" },
      { date: "2026-04-01", type: "income", category: "Salary", amount: 45000, description: "Monthly salary", user: "lux" },
      { date: "2026-04-02", type: "expense", category: "Rent", amount: 12000, description: "April rent", user: "lux" },
      { date: "2026-04-03", type: "expense", category: "Food", amount: 750, description: "Groceries", user: "lux" },
      { date: "2026-04-04", type: "expense", category: "Bills", amount: 1100, description: "Electricity + gas", user: "lux" },
      { date: "2026-04-08", type: "income", category: "Freelance", amount: 6000, description: "Logo design gig", user: "lux" },
      { date: "2026-04-10", type: "expense", category: "Transport", amount: 450, description: "Auto and bus", user: "lux" },
      { date: "2026-04-12", type: "expense", category: "Food", amount: 900, description: "Family dinner out", user: "lux" },
      { date: "2026-04-14", type: "expense", category: "Entertainment", amount: 1200, description: "Concert tickets", user: "lux" },
      { date: "2026-04-16", type: "expense", category: "Healthcare", amount: 500, description: "Gym membership", user: "lux" },
      { date: "2026-04-20", type: "income", category: "Investment", amount: 1500, description: "Mutual fund return", user: "lux" },
      { date: "2026-04-22", type: "expense", category: "Shopping", amount: 2200, description: "Footwear", user: "lux" },
      { date: "2026-04-25", type: "expense", category: "Transport", amount: 600, description: "Weekend trip travel", user: "lux" },
      { date: "2026-04-28", type: "expense", category: "Bills", amount: 800, description: "Phone recharge + OTT", user: "lux" },
      { date: "2026-05-01", type: "income", category: "Salary", amount: 45000, description: "Monthly salary", user: "lux" },
      { date: "2026-05-02", type: "expense", category: "Rent", amount: 12000, description: "May rent", user: "lux" },
      { date: "2026-05-03", type: "expense", category: "Food", amount: 820, description: "Groceries", user: "lux" },
      { date: "2026-05-04", type: "expense", category: "Transport", amount: 350, description: "Cab to office", user: "lux" },
      { date: "2026-05-04", type: "income", category: "Freelance", amount: 9000, description: "UI design project", user: "lux" },
    ];
    await Transaction.insertMany(sampleTransactions);
    res.send("✅ Seeded successfully!");
  } catch (err) {
    res.status(500).send("❌ Error: " + err.message);
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});