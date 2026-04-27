console.log("Auth routes loaded");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Database error" });
        }

        // ✅ ALWAYS send JSON
        res.json({ message: "Signup successful" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Login
router.post("/login", (req, res) => {
  console.log("new login code ");
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    // ✅ User not found
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    const valid = await bcrypt.compare(password, user.password);

    // ✅ Wrong password
    if (!valid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // ✅ Success
    const token = jwt.sign({ id: user.id }, "secretkey");
    res.json({ token });
  });
});

module.exports = router;