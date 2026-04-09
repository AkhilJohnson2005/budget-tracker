import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import axios from "axios";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const username = localStorage.getItem("currentUser");

  // ✅ LOAD transactions from MongoDB
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5000/api/transactions/${username}`)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.log(err));
    }
  }, [username]);

  // ✅ ADD transaction
  const addTransaction = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/transactions",
        {
          ...data,
          user: username
        }
      );

      setTransactions([...transactions, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE transaction (using _id)
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/transactions/${id}`
      );

      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        {isLoggedIn && <Sidebar />}

        {/* Main Content */}
        <div style={{ width: "100%" }}>
          <Routes>
            {/* If NOT logged in */}
            {!isLoggedIn && (
              <>
                <Route
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}

            {/* If logged in */}
            {isLoggedIn && (
              <>
                <Route
                  path="/"
                  element={
                    <Dashboard
                      transactions={transactions}
                      deleteTransaction={deleteTransaction}
                    />
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <Transactions addTransaction={addTransaction} />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;