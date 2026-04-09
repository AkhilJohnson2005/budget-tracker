const router = require("express").Router();
const Transaction = require("../models/Transaction");

// ADD transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET transactions by user
router.get("/:user", async (req, res) => {
  try {
    const data = await Transaction.find({ user: req.params.user });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;