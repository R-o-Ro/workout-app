const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// GET all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create workout
router.post("/", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    const saved = await workout.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update workout
router.put("/:id", async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE workout
router.delete("/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;