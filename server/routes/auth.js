const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

console.log("Auth routes loaded");


// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    // const { email, password } = req.body;
    console.log("req body:", req.body);

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );

    // if (result.rows.length === 0) {
    //   return res.status(400).json({ message: "User not found" });
    // }
    console.log("db result:", result.rows);
    const user = result.rows[0];
    // if user not found
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // const valid = await bcrypt.compare(password, user.password);

    // if (!valid) {
    //   return res.status(400).json({ message: "Wrong password" });
    // }

    const token = jwt.sign({ id: user.id },
      process.env.JWT_SECRET, { expiresIn: "id" }
    );

    res.json({ token });

  } catch (err) {
    console.log("full error:", error);
    return res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;