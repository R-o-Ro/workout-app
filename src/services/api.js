const BASE_URL = "http://localhost:5000/api";

// ─── WORKOUTS ───────────────────────────────────────────
export async function fetchWorkouts() {
  const res = await fetch(`${BASE_URL}/workouts`);
  return res.json();
}

export async function saveWorkout(workout) {
  const res = await fetch(`${BASE_URL}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout)
  });
  return res.json();
}

export async function updateWorkout(id, data) {
  const res = await fetch(`${BASE_URL}/workouts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteWorkout(id) {
  await fetch(`${BASE_URL}/workouts/${id}`, { method: "DELETE" });
}

// ─── MEASUREMENTS ────────────────────────────────────────
export async function fetchMeasurements() {
  const res = await fetch(`${BASE_URL}/measurements`);
  return res.json();
}

export async function saveMeasurement(measurement) {
  const res = await fetch(`${BASE_URL}/measurements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(measurement)
  });
  return res.json();
}

export async function deleteMeasurement(id) {
  await fetch(`${BASE_URL}/measurements/${id}`, { method: "DELETE" });
}

// ─── TEMPLATES ───────────────────────────────────────────
export async function fetchTemplates() {
  const res = await fetch(`${BASE_URL}/templates`);
  return res.json();
}

export async function saveTemplate(template) {
  const res = await fetch(`${BASE_URL}/templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(template)
  });
  return res.json();
}

export async function updateTemplate(id, data) {
  const res = await fetch(`${BASE_URL}/templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTemplate(id) {
  await fetch(`${BASE_URL}/templates/${id}`, { method: "DELETE" });
}

// ─── CUSTOM EXERCISES ─────────────────────────────────────
export async function fetchCustomExercises() {
  const res = await fetch(`${BASE_URL}/custom-exercises`);
  return res.json();
}

export async function saveCustomExercise(exercise) {
  const res = await fetch(`${BASE_URL}/custom-exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exercise)
  });
  return res.json();
}

export async function deleteCustomExercise(id) {
  await fetch(`${BASE_URL}/custom-exercises/${id}`, { method: "DELETE" });
}

// ─── GOALS ───────────────────────────────────────────────
export async function fetchGoals() {
  const res = await fetch(`${BASE_URL}/goals`);
  return res.json();
}

export async function updateGoals(data) {
  const res = await fetch(`${BASE_URL}/goals`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}