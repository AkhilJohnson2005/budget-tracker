import React from "react";
import AddTransaction from "./AddTransaction";
import "./Transactions.css";

const Transactions = ({ addTransaction }) => {
  return (
    <div className="transactions-page">
      <h1 className="page-title">Add Transaction</h1>
      <p className="page-subtitle">
        Record your income or expense
      </p>

      <div className="transaction-card">
        <AddTransaction addTransaction={addTransaction} />
      </div>
    </div>
  );
};

export default Transactions;