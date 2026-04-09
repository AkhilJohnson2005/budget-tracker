const router = require("express").Router();
const User = require("../models/User");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.json("Signup successful");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json("Invalid credentials");
    }

    res.json("Login successful");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;