export function getWeeklyWorkoutData(workouts) {

  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  const weeks = [];
  const now = new Date();

  for (let i = 7; i >= 0; i--) {

    const start = new Date(now);
    start.setDate(now.getDate() - i * 7);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    const count = safeWorkouts.filter((workout) => {
      const date = new Date(workout.date);
      return date >= start && date < end;
    }).length;

    const label = start.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit"
    });

    weeks.push({
      week: label,
      workouts: count
    });
  }

  return weeks;
}

export function getMaxWeeklyWorkouts(data) {
  const max = Math.max(...data.map((d) => d.workouts));
  return max > 0 ? max : 4;
}