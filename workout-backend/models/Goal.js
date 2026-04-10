const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  weeklyWorkoutTarget: { type: Number, default: 4 },
  targetWeight: { type: Number, default: null }
});

module.exports = mongoose.model("Goal", GoalSchema);