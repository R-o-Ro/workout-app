import { calculate1RM } from "./calculate1RM";

export function detectPRs(workouts) {

  if (!workouts || !Array.isArray(workouts)) return {};

  const best = {};
  const prMap = {};

  [...workouts]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((workout) => {

      const prs = [];

      const exercises = Array.isArray(workout.exercises)
        ? workout.exercises
        : [];

      exercises.forEach((exercise) => {

        const name = exercise.name;

        if (!best[name]) {
          best[name] = { weight: 0, volume: 0, oneRM: 0 };
        }

        const sets = Array.isArray(exercise.sets)
          ? exercise.sets
          : [];

        sets.forEach((set) => {

          const weight = Number(set.weight);
          const reps = Number(set.reps);

          if (!weight || !reps) return;

          const volume = weight * reps;
          const oneRM = calculate1RM(weight, reps);

          if (weight > best[name].weight) {
            best[name].weight = weight;
            prs.push({ exercise: name, type: "Max Weight", value: `${weight} kg` });
          }

          if (volume > best[name].volume) {
            best[name].volume = volume;
            prs.push({ exercise: name, type: "Max Volume", value: `${volume} kg` });
          }

          if (oneRM > best[name].oneRM) {
            best[name].oneRM = oneRM;
            prs.push({ exercise: name, type: "Est. 1RM", value: `${oneRM} kg` });
          }

        });

      });

      prMap[workout._id || workout.id] = prs;

    });

  return prMap;
}