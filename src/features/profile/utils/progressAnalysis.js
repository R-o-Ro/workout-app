import { calculate1RM } from "../../history/utils/calculate1RM";

function getBestSetOneRM(sets) {
  if (!sets || sets.length === 0) return 0;
  return Math.max(...sets.map((s) => calculate1RM(s.weight, s.reps)));
}

export function analyzeProgress(history) {

  if (!history || history.length < 3) return null;

  const recent = history.slice(-6);

  const oneRMs = recent.map((session) => ({
    date: session.date,
    oneRM: getBestSetOneRM(session.sets),
    bestSet: session.sets.reduce((best, s) => {
      return calculate1RM(s.weight, s.reps) > calculate1RM(best.weight, best.reps)
        ? s
        : best;
    }, session.sets[0])
  }));

  const lastThree = oneRMs.slice(-3);
  const first = lastThree[0].oneRM;
  const last = lastThree[lastThree.length - 1].oneRM;
  const allSame = lastThree.every((s) => Math.abs(s.oneRM - first) <= 2);
  const trending = last - first;

  const lastSession = oneRMs[oneRMs.length - 1];
  const lastBestSet = lastSession.bestSet;
  const lastWeight = Number(lastBestSet.weight);
  const lastReps = Number(lastBestSet.reps);

  // DECLINING
  if (trending < -5) {
    const deloadWeight = Math.round(lastWeight * 0.65 / 2.5) * 2.5;
    return {
      status: "deload",
      label: "Deload Recommended",
      color: "red",
      message: `Your estimated 1RM has dropped ${Math.abs(Math.round(trending))} kg over your last 3 sessions. Your body needs recovery.`,
      suggestion: `Drop to ${deloadWeight} kg for ${lastReps} reps next session and focus on form. Resume normal weight after 1-2 sessions.`
    };
  }

  // PLATEAUING
  if (allSame) {
    const addRepsOption = lastReps < 12
      ? `Try ${lastReps + 1}-${lastReps + 2} reps at ${lastWeight} kg`
      : null;
    const addWeightOption = `Increase weight to ${lastWeight + 2.5} kg for ${Math.max(lastReps - 2, 4)} reps`;

    return {
      status: "plateau",
      label: "Plateau Detected",
      color: "yellow",
      message: `Your performance has been flat for ${lastThree.length} sessions in a row.`,
      suggestion: addRepsOption
        ? `Option 1: ${addRepsOption}. Option 2: ${addWeightOption}.`
        : addWeightOption
    };
  }

  // PROGRESSING
  if (trending > 0) {
    const suggestedWeight = lastReps >= 10
      ? lastWeight + 2.5
      : lastWeight;
    const suggestedReps = lastReps >= 10
      ? Math.max(lastReps - 2, 4)
      : lastReps + 1;

    return {
      status: "progress",
      label: "On Track",
      color: "green",
      message: `Your estimated 1RM has gone up ${Math.round(trending)} kg over your last 3 sessions.`,
      suggestion: lastReps >= 10
        ? `Try increasing weight: ${suggestedWeight} kg × ${suggestedReps} reps next session.`
        : `Aim for ${suggestedReps} reps at ${lastWeight} kg next session.`
    };
  }

  return null;

}