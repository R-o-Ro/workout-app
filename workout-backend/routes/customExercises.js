const express = require("express");
const router = express.Router();
const CustomExercise = require("../models/CustomExercise");

// GET all
router.get("/", async (req, res) => {
  try {
    const exercises = await CustomExercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post("/", async (req, res) => {
  try {
    const exercise = new CustomExercise(req.body);
    const saved = await exercise.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await CustomExercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;