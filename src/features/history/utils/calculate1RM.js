export function calculate1RM(weight, reps) {

  weight = Number(weight);
  reps = Number(reps);

  if (!weight || !reps) return 0;

  // Epley formula — rounded to nearest whole number
  return Math.round(weight * (1 + reps / 30));

}