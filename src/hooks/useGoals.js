import { useState, useEffect } from "react";
import * as api from "../services/api";

export function useGoals() {

  const [goals, setGoals] = useState({
    weeklyWorkoutTarget: 4,
    targetWeight: null
  });

  useEffect(() => {
    api.fetchGoals()
      .then((data) => setGoals(data))
      .catch(console.error);
  }, []);

  async function saveGoals(newGoals) {
    try {
      const updated = await api.updateGoals(newGoals);
      setGoals(updated);
    } catch (err) {
      console.error("Failed to save goals:", err);
    }
  }

  return { goals, saveGoals };

}