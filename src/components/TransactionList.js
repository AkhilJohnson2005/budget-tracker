import "./TransactionList.css";

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div className="transactions">
      <h3>Recent Transactions</h3>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map((t) => (
          <div key={t._id} className="transaction-item">
            <div>
              <strong>{t.category}</strong>
              <p>{t.date}</p>
            </div>

            <div>
              <span className={t.type === "expense" ? "red" : "green"}>
                {t.type === "expense" ? "-" : "+"} ₹{t.amount}
              </span>

              <button onClick={() => deleteTransaction(t._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;