import useWorkout from "../../hooks/useWorkout";

function FinishWorkoutButton() {
  const { finishWorkout } = useWorkout();

  return (
    <button
      onClick={finishWorkout}
      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
      style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--purple-dim-hover)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--purple-dim)"}
    >
      Finish Workout
    </button>
  );
}

export default FinishWorkoutButton;