const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema({
  date: String,
  weight: String,
  neck: String,
  shoulders: String,
  chest: String,
  arms: String,
  waist: String,
  quads: String,
  calves: String
});

module.exports = mongoose.model("Measurement", MeasurementSchema);