export function groupWorkoutsByMonth(workouts) {

  const groups = {};

  workouts.forEach(workout => {

    const date = new Date(workout.date);

    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric"
    });

    if (!groups[month]) {
      groups[month] = [];
    }

    groups[month].push(workout);

  });

  return groups;

}