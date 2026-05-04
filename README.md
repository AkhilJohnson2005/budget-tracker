# 💰 Budget Tracker — Personal Finance Management App

A Full Stack web application built with **React.js**, **Node.js + Express**, and **MongoDB**.

---

## 📌 Project Description

This app allows users to manage their personal finances by tracking income and expenses. It includes a dashboard with summary cards, analytics with charts, a budget & goals tracker, and a settings page — all behind a secure login system.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |

---

## ✨ Features

- 🔐 User Authentication (Signup / Login)
- 📊 Dashboard with income, expense, balance summary
- 💸 Add, view, and delete transactions
- 📈 Analytics page with charts (bar, line, pie, heatmap, scatter)
- 🎯 Budget & Goals tracker with circular progress
- ⚙️ Settings page (profile, notifications, appearance, data export)
- 🔍 Filter transactions by date, type, and category

---

## 📁 Project Structure

```
budget-tracker/
├── client/                  → React frontend code
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── Dashboard.js
│           ├── Transactions.js
│           ├── AddTransaction.js
│           ├── TransactionList.js
│           ├── SummaryCards.js
│           ├── Analytics.js
│           ├── BudgetGoals.js
│           ├── Settings.js
│           ├── Sidebar.js
│           ├── Login.js
│           └── Signup.js
├── server/                  → Node.js + Express backend code
│   ├── index.js
│   ├── models/
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── transactions.js
│   │   └── auth.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation Steps

### Prerequisites
- Node.js installed
- MongoDB running locally (`mongodb://localhost:27017`)

---

### Backend Setup

```bash
cd server
npm install
npm start
```

Server starts at **http://localhost:5000**

---

### Frontend Setup

```bash
cd ..
npm install
npm start
```

App opens at **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login existing user |
| GET | `/api/transactions/:user` | Get all transactions for a user |
| POST | `/api/transactions` | Add a new transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction by ID |

---

## 🚀 How to Run

1. Make sure MongoDB is running locally
2. Open **two terminals**

**Terminal 1 — Backend:**
```bash
cd server
npm start
```

**Terminal 2 — Frontend:**
```bash
npm start
```

3. Open **http://localhost:3000** in your browser
4. Sign up for an account and start tracking!

---

## 👤 Author

**Akhil Johnson**  
GitHub: [@AkhilJohnson2005](https://github.com/AkhilJohnson2005)
