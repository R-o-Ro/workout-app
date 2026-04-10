import { ClipboardList } from "lucide-react";
import useWorkout from "../../workout/hooks/useWorkout";
import WorkoutCard from "./WorkoutCard";
import { groupWorkoutsByMonth } from "../utils/groupWorkoutsByMonth";
import { detectPRs } from "../utils/detectPRs";

function WorkoutList() {
  const { workouts, loading } = useWorkout();

  if (loading) {
    return <div className="py-12 text-center text-sm" style={{ color: "var(--text-secondary)" }}>Loading workouts...</div>;
  }

  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  if (safeWorkouts.length === 0) {
    return (
      <div className="rounded-2xl px-8 py-14 text-center" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
        <div className="flex justify-center mb-3">
          <ClipboardList size={22} style={{ color: "var(--text-muted)" }} />
        </div>
        <p className="text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>No workouts logged yet</p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Head to Workout, start a session, and finish it to see your history here.
        </p>
      </div>
    );
  }

  const sortedWorkouts = [...safeWorkouts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const grouped = groupWorkoutsByMonth(sortedWorkouts);
  const prMap = detectPRs(sortedWorkouts);

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([month, list], idx) => (
        <div key={month || idx} className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{month}</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{list.length} workout{list.length > 1 ? "s" : ""}</span>
          </div>
          <div className="space-y-3">
            {list.map((workout, i) => (
              <WorkoutCard
                key={workout._id || workout.id || i}
                workout={workout}
                prs={prMap[workout._id || workout.id] || []}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;