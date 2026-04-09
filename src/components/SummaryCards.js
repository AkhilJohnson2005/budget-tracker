import "./SummaryCards.css";

const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  // ✅ FIXED TOP CATEGORY LOGIC
  const categoryCount = {};

  transactions.forEach((t) => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  });

  let topCategory = "N/A";
  let max = 0;

  for (let cat in categoryCount) {
    if (categoryCount[cat] > max) {
      max = categoryCount[cat];
      topCategory = cat;
    }
  }

  return (
    <div className="cards">
      <div className="card">
        <p>Total Income</p>
        <h2 className="green">₹{income}</h2>
      </div>

      <div className="card">
        <p>Total Expense</p>
        <h2 className="red">₹{expense}</h2>
      </div>

      <div className="card">
        <p>Balance</p>
        <h2 className="blue">₹{balance}</h2>
      </div>

      <div className="card">
        <p>Top Category</p>
        <h3>{topCategory}</h3>
      </div>

      <div className="card">
        <p>Total Transactions</p>
        <h2>{transactions.length}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;