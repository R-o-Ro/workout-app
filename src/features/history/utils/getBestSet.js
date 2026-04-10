export function getBestSet(exercise) {

  let best = { weight: 0, reps: 0 };

  exercise.sets.forEach(set => {

    const weight = Number(set.weight);
    const reps = Number(set.reps);

    if (weight * reps > best.weight * best.reps) {
      best = { weight, reps };
    }

  });

  return best;

}