const mongoose = require("mongoose");

// ⚠️ Change this to your actual username in the app
const USERNAME = "lux";

const transactionSchema = new mongoose.Schema({
  date: String,
  type: String,
  category: String,
  amount: Number,
  description: String,
  user: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

const sampleTransactions = [
  // --- February 2026 ---
  { date: "2026-02-01", type: "income",  category: "Salary",        amount: 45000, description: "Monthly salary" },
  { date: "2026-02-03", type: "expense", category: "Rent",           amount: 12000, description: "February rent" },
  { date: "2026-02-05", type: "expense", category: "Food",           amount: 800,   description: "Groceries" },
  { date: "2026-02-08", type: "expense", category: "Transport",      amount: 500,   description: "Bus and auto" },
  { date: "2026-02-10", type: "expense", category: "Bills",          amount: 1200,  description: "Electricity bill" },
  { date: "2026-02-12", type: "expense", category: "Food",           amount: 600,   description: "Restaurant dinner" },
  { date: "2026-02-14", type: "expense", category: "Entertainment",  amount: 800,   description: "Movie and outing" },
  { date: "2026-02-16", type: "income",  category: "Freelance",      amount: 8000,  description: "Web design project" },
  { date: "2026-02-18", type: "expense", category: "Shopping",       amount: 2500,  description: "Clothes shopping" },
  { date: "2026-02-20", type: "expense", category: "Healthcare",     amount: 700,   description: "Doctor visit" },
  { date: "2026-02-22", type: "expense", category: "Food",           amount: 400,   description: "Swiggy orders" },
  { date: "2026-02-25", type: "expense", category: "Transport",      amount: 300,   description: "Uber rides" },
  { date: "2026-02-28", type: "income",  category: "Investment",     amount: 2000,  description: "Dividend received" },

  // --- March 2026 ---
  { date: "2026-03-01", type: "income",  category: "Salary",        amount: 45000, description: "Monthly salary" },
  { date: "2026-03-02", type: "expense", category: "Rent",           amount: 12000, description: "March rent" },
  { date: "2026-03-04", type: "expense", category: "Food",           amount: 900,   description: "Groceries" },
  { date: "2026-03-06", type: "expense", category: "Bills",          amount: 900,   description: "Internet + water bill" },
  { date: "2026-03-08", type: "expense", category: "Transport",      amount: 600,   description: "Monthly bus pass" },
  { date: "2026-03-10", type: "expense", category: "Shopping",       amount: 3500,  description: "Electronics" },
  { date: "2026-03-12", type: "income",  category: "Freelance",      amount: 12000, description: "App development project" },
  { date: "2026-03-14", type: "expense", category: "Food",           amount: 700,   description: "Lunch with friends" },
  { date: "2026-03-16", type: "expense", category: "Entertainment",  amount: 500,   description: "Spotify + Netflix" },
  { date: "2026-03-18", type: "expense", category: "Healthcare",     amount: 1200,  description: "Medicines" },
  { date: "2026-03-20", type: "expense", category: "Food",           amount: 500,   description: "Zomato orders" },
  { date: "2026-03-22", type: "expense", category: "Shopping",       amount: 1800,  description: "Home decor" },
  { date: "2026-03-25", type: "income",  category: "Investment",     amount: 3000,  description: "Stock sale profit" },
  { date: "2026-03-28", type: "expense", category: "Transport",      amount: 400,   description: "Cab rides" },

  // --- April 2026 ---
  { date: "2026-04-01", type: "income",  category: "Salary",        amount: 45000, description: "Monthly salary" },
  { date: "2026-04-02", type: "expense", category: "Rent",           amount: 12000, description: "April rent" },
  { date: "2026-04-03", type: "expense", category: "Food",           amount: 750,   description: "Groceries" },
  { date: "2026-04-04", type: "expense", category: "Bills",          amount: 1100,  description: "Electricity + gas" },
  { date: "2026-04-05", type: "expense", category: "Shopping",       amount: 700,   description: "Accessories" },
  { date: "2026-04-06", type: "expense", category: "Shopping",       amount: 150,   description: "Stationery" },
  { date: "2026-04-08", type: "income",  category: "Freelance",      amount: 6000,  description: "Logo design gig" },
  { date: "2026-04-10", type: "expense", category: "Transport",      amount: 450,   description: "Auto and bus" },
  { date: "2026-04-12", type: "expense", category: "Food",           amount: 900,   description: "Family dinner out" },
  { date: "2026-04-14", type: "expense", category: "Entertainment",  amount: 1200,  description: "Concert tickets" },
  { date: "2026-04-16", type: "expense", category: "Healthcare",     amount: 500,   description: "Gym membership" },
  { date: "2026-04-18", type: "expense", category: "Food",           amount: 350,   description: "Snacks and drinks" },
  { date: "2026-04-20", type: "income",  category: "Investment",     amount: 1500,  description: "Mutual fund return" },
  { date: "2026-04-22", type: "expense", category: "Shopping",       amount: 2200,  description: "Footwear" },
  { date: "2026-04-25", type: "expense", category: "Transport",      amount: 600,   description: "Weekend trip travel" },
  { date: "2026-04-28", type: "expense", category: "Bills",          amount: 800,   description: "Phone recharge + OTT" },

  // --- May 2026 ---
  { date: "2026-05-01", type: "income",  category: "Salary",        amount: 45000, description: "Monthly salary" },
  { date: "2026-05-02", type: "expense", category: "Rent",           amount: 12000, description: "May rent" },
  { date: "2026-05-03", type: "expense", category: "Food",           amount: 820,   description: "Groceries" },
  { date: "2026-05-04", type: "expense", category: "Transport",      amount: 350,   description: "Cab to office" },
  { date: "2026-05-04", type: "income",  category: "Freelance",      amount: 9000,  description: "UI design project" },
];

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/budgetDB");
    console.log("✅ Connected to MongoDB");

    const data = sampleTransactions.map((t) => ({ ...t, user: USERNAME }));

    await Transaction.insertMany(data);
    console.log(`✅ Inserted ${data.length} sample transactions for user: "${USERNAME}"`);

    await mongoose.disconnect();
    console.log("✅ Done! Now refresh your app.");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seed();
