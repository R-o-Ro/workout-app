import Modal from "../../../../components/ui/Modal";
import { calculateWorkoutVolume } from "../../utils/workoutCalculations";

function WorkoutSummaryModal({ open, onClose, workout }) {

  if (!workout) return null;

  const volume = calculateWorkoutVolume(workout);

  function formatDuration(seconds) {
    if (!seconds) return "—";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  return (

    <Modal open={open} onClose={onClose}>

      <div className="space-y-5">

        {/* Title */}
        <div className="text-center space-y-1">
          <p className="text-3xl">🎉</p>
          <h2 className="text-xl font-bold">Workout Complete!</h2>
          <p className="text-sm text-gray-400">{workout.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">

          <div className="bg-neutral-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{formatDuration(workout.duration)}</p>
            <p className="text-xs text-gray-400 mt-1">Duration</p>
          </div>

          <div className="bg-neutral-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{volume.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Total Volume (kg)</p>
          </div>

          <div className="bg-neutral-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{workout.exercises.length}</p>
            <p className="text-xs text-gray-400 mt-1">Exercises</p>
          </div>

          <div className="bg-neutral-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">
              {workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Total Sets</p>
          </div>

        </div>

        {/* Exercise breakdown */}
        <div className="space-y-2">

          <h3 className="text-sm text-gray-400">Exercises</h3>

          <div className="rounded-xl overflow-hidden divide-y divide-neutral-800 bg-neutral-900">
            {workout.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex justify-between items-center px-4 py-3 text-sm"
              >
                <span>{exercise.name}</span>
                <span className="text-gray-400">
                  {exercise.sets.length} sets
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Notes */}
        {workout.notes && (
          <div className="space-y-1">
            <h3 className="text-sm text-gray-400">Notes</h3>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-gray-300">
              {workout.notes}
            </div>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
        >
          Done
        </button>

      </div>

    </Modal>

  );

}

export default WorkoutSummaryModal;