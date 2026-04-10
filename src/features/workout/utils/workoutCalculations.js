export function calculateWorkoutVolume(workout) {
  if (!workout || !Array.isArray(workout.exercises)) return 0;

  return workout.exercises.reduce((total, exercise) => {
    if (!Array.isArray(exercise.sets)) return total;
    return total + exercise.sets.reduce((sum, set) => {
      const weight = Number(set.weight) || 0;
      const reps = Number(set.reps) || 0;
      return sum + weight * reps;
    }, 0);
  }, 0);
}