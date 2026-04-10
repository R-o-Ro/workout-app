/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import * as api from "../../../services/api";

export const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {

  const [workouts, setWorkouts] = useState([]);
  const [userTemplates, setUserTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeWorkoutState, setActiveWorkoutState] = useLocalStorage("activeWorkout", null);
  const [isActive, setIsActive] = useState(() => !!activeWorkoutState);
  const [workoutName, setWorkoutName] = useState(() => activeWorkoutState?.name || "");
  const [exercises, setExercises] = useState(() => activeWorkoutState?.exercises || []);
  const [startTime, setStartTime] = useState(() => activeWorkoutState?.startTime || null);
  const [notes, setNotes] = useState(() => activeWorkoutState?.notes || "");
  const [elapsed, setElapsed] = useState(() => {
    if (!activeWorkoutState?.startTime) return 0;
    return Math.floor((Date.now() - activeWorkoutState.startTime) / 1000);
  });
  const [lastFinishedWorkout, setLastFinishedWorkout] = useState(null);

  // Load workouts and templates from backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedWorkouts, fetchedTemplates] = await Promise.all([
          api.fetchWorkouts(),
          api.fetchTemplates()
        ]);
        setWorkouts(Array.isArray(fetchedWorkouts) ? fetchedWorkouts : []);
        setUserTemplates(Array.isArray(fetchedTemplates) ? fetchedTemplates : []);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Timer tick
  useEffect(() => {
    if (!isActive || !startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  // Persist active workout to localStorage
  useEffect(() => {
    if (isActive) {
      setActiveWorkoutState({ name: workoutName, exercises, startTime, notes });
    } else {
      setActiveWorkoutState(null);
    }
  }, [isActive, workoutName, exercises, startTime, notes, setActiveWorkoutState]);

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getWorkoutName() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Morning Workout";
    if (hour >= 12 && hour < 17) return "Afternoon Workout";
    if (hour >= 17 && hour < 21) return "Evening Workout";
    return "Night Workout";
  }

  function startWorkout(templateExercises = []) {
    const name = getWorkoutName();
    const time = Date.now();
    const exs = templateExercises.map((ex) => ({
      id: Date.now() + Math.random(),
      name: ex.name,
      sets: []
    }));
    setExercises(exs);
    setWorkoutName(name);
    setStartTime(time);
    setElapsed(0);
    setNotes("");
    setIsActive(true);
  }

  function cancelWorkout() {
    setIsActive(false);
    setExercises([]);
    setElapsed(0);
    setStartTime(null);
    setWorkoutName("");
    setNotes("");
  }

  function addExercise(name = "New Exercise") {
    setExercises((prev) => [
      ...prev,
      { id: Date.now(), name, sets: [] }
    ]);
  }

  function addSet(exerciseId) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: [...ex.sets, { id: Date.now(), weight: "", reps: "" }] }
          : ex
      )
    );
  }

  function updateSet(exerciseId, setId, field, value) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) =>
                set.id === setId ? { ...set, [field]: value } : set
              )
            }
          : ex
      )
    );
  }

  function removeExercise(exerciseId) {
    setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  }

  function removeSet(exerciseId, setId) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.filter((set) => set.id !== setId) }
          : ex
      )
    );
  }

  async function finishWorkout() {
    const validExercises = exercises
      .map((ex) => ({
        ...ex,
        sets: ex.sets.filter((set) => set.weight !== "" && set.reps !== "")
      }))
      .filter((ex) => ex.sets.length > 0);

    if (validExercises.length === 0) {
      alert("Please log at least one set before finishing your workout.");
      return;
    }

    const workout = {
      name: workoutName,
      date: new Date().toISOString(),
      duration: elapsed,
      exercises: validExercises,
      notes: notes.trim()
    };

    try {
      const saved = await api.saveWorkout(workout);
      setWorkouts((prev) => [saved, ...prev]);
      setLastFinishedWorkout(saved);
      cancelWorkout();
    } catch (err) {
      console.error("Failed to save workout:", err);
      alert("Failed to save workout. Is the backend running?");
    }
  }

  function clearLastFinishedWorkout() {
    setLastFinishedWorkout(null);
  }

  async function deleteWorkout(workoutId) {
    try {
      await api.deleteWorkout(workoutId);
      setWorkouts((prev) => prev.filter((w) => w._id !== workoutId));
    } catch (err) {
      console.error("Failed to delete workout:", err);
    }
  }

  async function editWorkoutName(workoutId, newName) {
    try {
      const updated = await api.updateWorkout(workoutId, { name: newName });
      setWorkouts((prev) =>
        prev.map((w) => (w._id === workoutId ? updated : w))
      );
    } catch (err) {
      console.error("Failed to update workout:", err);
    }
  }

  async function editWorkoutSets(workoutId, exerciseId, setId, field, value) {
    const workout = workouts.find((w) => w._id === workoutId);
    if (!workout) return;

    const updatedExercises = workout.exercises.map((ex) =>
      ex.id === exerciseId
        ? {
            ...ex,
            sets: ex.sets.map((s) =>
              s.id === setId ? { ...s, [field]: value } : s
            )
          }
        : ex
    );

    try {
      const updated = await api.updateWorkout(workoutId, {
        exercises: updatedExercises
      });
      setWorkouts((prev) =>
        prev.map((w) => (w._id === workoutId ? updated : w))
      );
    } catch (err) {
      console.error("Failed to update sets:", err);
    }
  }

  function reorderExercise(exerciseId, direction) {
    setExercises((prev) => {
      const index = prev.findIndex((ex) => ex.id === exerciseId);
      if (index === -1) return prev;
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }

  function getLastSessionSets(exerciseName) {
  if (!workouts.length) return [];
  const lastSession = [...workouts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find((w) => w.exercises?.some((e) => e.name === exerciseName));
  if (!lastSession) return [];
  return lastSession.exercises.find((e) => e.name === exerciseName)?.sets || [];
}
  async function saveAsTemplate(name, exerciseList) {
    const template = {
      name,
      lastUsed: new Date().toISOString(),
      exercises: exerciseList.map((ex) => ({ name: ex.name }))
    };
    try {
      const saved = await api.saveTemplate(template);
      setUserTemplates((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Failed to save template:", err);
    }
  }

  async function saveCurrentAsTemplate() {
    if (exercises.length === 0) return;
    await saveAsTemplate(workoutName, exercises);
  }

  async function deleteUserTemplate(templateId) {
    try {
      await api.deleteTemplate(templateId);
      setUserTemplates((prev) => prev.filter((t) => t._id !== templateId));
    } catch (err) {
      console.error("Failed to delete template:", err);
    }
  }

  async function updateUserTemplateLastUsed(templateId) {
    try {
      const updated = await api.updateTemplate(templateId, {
        lastUsed: new Date().toISOString()
      });
      setUserTemplates((prev) =>
        prev.map((t) => (t._id === templateId ? updated : t))
      );
    } catch (err) {
      console.error("Failed to update template:", err);
    }
  }

  return (
    <WorkoutContext.Provider
      value={{
        isActive,
        workoutName,
        setWorkoutName,
        exercises,
        elapsed,
        formatTime,
        workouts,
        userTemplates,
        lastFinishedWorkout,
        notes,
        setNotes,
        loading,
        startWorkout,
        cancelWorkout,
        addExercise,
        addSet,
        updateSet,
        removeExercise,
        removeSet,
        finishWorkout,
        clearLastFinishedWorkout,
        saveAsTemplate,
        saveCurrentAsTemplate,
        deleteUserTemplate,
        updateUserTemplateLastUsed,
        deleteWorkout,
        editWorkoutName,
        editWorkoutSets,
        reorderExercise,
        getLastSessionSets,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}