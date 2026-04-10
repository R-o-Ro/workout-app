const mongoose = require("mongoose");

const TemplateExerciseSchema = new mongoose.Schema({
  name: String
});

const TemplateSchema = new mongoose.Schema({
  name: String,
  lastUsed: String,
  exercises: [TemplateExerciseSchema]
});

module.exports = mongoose.model("Template", TemplateSchema);