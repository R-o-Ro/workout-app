import { useState, useEffect } from "react";
import * as api from "../services/api";

export function useCustomExercises() {

  const [customExercises, setCustomExercises] = useState([]);

  useEffect(() => {
    api.fetchCustomExercises()
      .then((data) => setCustomExercises(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  async function addCustomExercise(exercise) {
    try {
      const saved = await api.saveCustomExercise(exercise);
      setCustomExercises((prev) => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error("Failed to save custom exercise:", err);
    }
  }

  async function removeCustomExercise(id) {
    try {
      await api.deleteCustomExercise(id);
      setCustomExercises((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete custom exercise:", err);
    }
  }

  return { customExercises, addCustomExercise, removeCustomExercise };

}