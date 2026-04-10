const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  id: Number,
  weight: String,
  reps: String
});

const ExerciseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  sets: [SetSchema]
});

const WorkoutSchema = new mongoose.Schema({
  name: String,
  date: String,
  duration: Number,
  notes: String,
  exercises: [ExerciseSchema]
});

module.exports = mongoose.model("Workout", WorkoutSchema);