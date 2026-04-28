const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


// ➕ ADD SKILL
router.post("/", auth, async (req, res) => {
  const { skill_name, type } = req.body;

  try {
    await db.query(
      "INSERT INTO skills (user_id, skill_name, type) VALUES ($1, $2, $3)",
      [req.user.id, skill_name, type]
    );

    res.json({ message: "Skill added successfully" });

  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});


// 📥 GET SKILLS
router.get("/", auth, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM skills WHERE user_id = $1",
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});


// ❌ DELETE SKILL
router.delete("/:id", auth, async (req, res) => {
  try {
    await db.query(
      "DELETE FROM skills WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );

    res.json({ message: "Skill deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});


// 🔍 MATCH SKILL
router.get("/match/:skill", auth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT users.name, skills.skill_name 
       FROM skills 
       JOIN users ON users.id = skills.user_id 
       WHERE skills.skill_name = $1 AND skills.type = 'teach'`,
      [req.params.skill]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;