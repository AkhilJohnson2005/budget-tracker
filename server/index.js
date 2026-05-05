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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});