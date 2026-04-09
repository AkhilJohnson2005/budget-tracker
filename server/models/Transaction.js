const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: String,
  type: String,
  category: String,
  amount: Number,
  description: String,
  user: String
});

module.exports = mongoose.model("Transaction", transactionSchema);