const mongoose = require("mongoose");

const CustomExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  bodyPart: String,
  category: String,
  isCustom: { type: Boolean, default: true },
  instructions: [String]
});

module.exports = mongoose.model("CustomExercise", CustomExerciseSchema);