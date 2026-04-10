const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");

// GET goals — always returns one document
router.get("/", async (req, res) => {
  try {
    let goal = await Goal.findOne();
    if (!goal) {
      goal = await Goal.create({ weeklyWorkoutTarget: 4, targetWeight: null });
    }
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update goals
router.put("/", async (req, res) => {
  try {
    let goal = await Goal.findOne();
    if (!goal) {
      goal = await Goal.create(req.body);
    } else {
      goal = await Goal.findByIdAndUpdate(goal._id, req.body, { new: true });
    }
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;