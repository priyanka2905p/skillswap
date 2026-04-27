const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


// ➕ ADD SKILL
router.post("/", auth, (req, res) => {
  const { skill_name, type } = req.body;

  db.query(
    "INSERT INTO skills (user_id, skill_name, type) VALUES (?, ?, ?)",
    [req.user.id, skill_name, type],
    (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      res.json({ message: "Skill added successfully" });
    }
  );
});


// 📥 GET SKILLS (ONLY USER)
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM skills WHERE user_id = ?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      res.json(result);
    }
  );
});


// ❌ DELETE SKILL
router.delete("/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM skills WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      res.json({ message: "Skill deleted successfully" });
    }
  );
});

router.get("/match/:skill", auth, (req, res) => {
  db.query(
    "SELECT users.name, skills.skill_name FROM skills JOIN users ON users.id = skills.user_id WHERE skills.skill_name = ? AND skills.type = 'teach'",
    [req.params.skill],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


module.exports = router;