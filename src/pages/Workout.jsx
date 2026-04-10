import useWorkout from "../features/workout/hooks/useWorkout";
import WorkoutHome from "../features/workout/components/workout/WorkoutHome";
import WorkoutHeader from "../features/workout/components/workout/WorkoutHeader";
import ExerciseBlock from "../features/workout/components/exercises/ExerciseBlock";
import AddExerciseButton from "../features/workout/components/exercises/AddExerciseButton";
import FinishWorkoutButton from "../features/workout/components/workout/FinishWorkoutButton";
import RestTimer from "../features/workout/components/sets/RestTimer";
import WorkoutSummaryModal from "../features/workout/components/workout/WorkoutSummaryModal";

function Workout() {
  const {
    isActive,
    exercises,
    notes,
    setNotes,
    lastFinishedWorkout,
    clearLastFinishedWorkout
  } = useWorkout();

  return (
    <>
      {isActive ? (
        <div
          className="flex flex-col"
          style={{
            height: "100%",
            margin: "-2rem -2.5rem",
            padding: "0 2.5rem",
          }}
        >
          {/* Workout header: name, timer, finish button */}
          <div className="shrink-0 pt-6 pb-2">
            <WorkoutHeader />
          </div>

          {/* Scrollable exercise list + notes */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {exercises.map((exercise, i) => (
              <ExerciseBlock
                key={exercise.id}
                exercise={exercise}
                isFirst={i === 0}
                isLast={i === exercises.length - 1}
              />
            ))}

            <div className="space-y-1 px-1">
              <label className="text-xs" style={{ color: "var(--text-muted)" }}>
                Workout Notes (optional)
              </label>
              <textarea
                placeholder="How did it feel? Any PRs? Injuries?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          {/* Fixed bottom bar: rest timer + action buttons */}
          <div
            className="shrink-0 space-y-2 pb-4"
            style={{ background: "var(--bg-base)" }}
          >
            <RestTimer />
            <div className="flex gap-3">
              <div className="flex-1">
                <AddExerciseButton />
              </div>
              <div className="flex-1">
                <FinishWorkoutButton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <WorkoutHome />
      )}

      <WorkoutSummaryModal
        open={lastFinishedWorkout !== null}
        onClose={clearLastFinishedWorkout}
        workout={lastFinishedWorkout}
      />
    </>
  );
}

export default Workout;