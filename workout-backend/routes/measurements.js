const express = require("express");
const router = express.Router();
const Measurement = require("../models/Measurement");

// GET all measurements
router.get("/", async (req, res) => {
  try {
    const measurements = await Measurement.find().sort({ date: 1 });
    res.json(measurements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create measurement
router.post("/", async (req, res) => {
  try {
    const measurement = new Measurement(req.body);
    const saved = await measurement.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE measurement
router.delete("/:id", async (req, res) => {
  try {
    await Measurement.findByIdAndDelete(req.params.id);
    res.json({ message: "Measurement deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;