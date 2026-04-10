const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const workouts = require("./routes/workouts");
const measurements = require("./routes/measurements");
const templates = require("./routes/templates");
const customExercises = require("./routes/customExercises");
const goals = require("./routes/goals");

app.use(cors());
app.use(express.json());

app.use("/api/workouts", workouts);
app.use("/api/measurements", measurements);
app.use("/api/templates", templates);
app.use("/api/custom-exercises", customExercises);
app.use("/api/goals", goals);

app.get("/", (req, res) => {
  res.json({ message: "FitTrack API is running" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));