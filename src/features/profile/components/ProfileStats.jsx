import useWorkout from "../../workout/hooks/useWorkout";
import { calculateWorkoutVolume } from "../../workout/utils/workoutCalculations";
import { Card, CardContent } from "../../../components/ui/Card";

function getStartOfWeek() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getStartOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function ProfileStats() {

  const { workouts, loading } = useWorkout();

  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  if (loading) {
    return (
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 text-center">
        <p className="text-gray-400 text-sm">Loading stats...</p>
      </div>
    );
  }

  const startOfWeek = getStartOfWeek();
  const startOfMonth = getStartOfMonth();

  const totalWorkouts = safeWorkouts.length;

  const totalVolume = safeWorkouts.reduce((sum, workout) => {
    return sum + calculateWorkoutVolume(workout);
  }, 0);

  const lastWorkout = safeWorkouts.length
    ? new Date(
        [...safeWorkouts].sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
      ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "None";

  const workoutsThisWeek = safeWorkouts.filter(
    (w) => new Date(w.date) >= startOfWeek
  ).length;

  const workoutsThisMonth = safeWorkouts.filter(
    (w) => new Date(w.date) >= startOfMonth
  ).length;

  const volumeThisMonth = safeWorkouts
    .filter((w) => new Date(w.date) >= startOfMonth)
    .reduce((sum, w) => sum + calculateWorkoutVolume(w), 0);

  return (

    <div className="space-y-3">

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{workoutsThisWeek}</p>
          <p className="text-xs text-gray-400 mt-1">This Week</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{workoutsThisMonth}</p>
          <p className="text-xs text-gray-400 mt-1">This Month</p>
        </div>

      </div>

      <Card>
        <CardContent className="space-y-3">

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Workouts</span>
            <span className="font-medium">{totalWorkouts}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Volume</span>
            <span className="font-medium">{totalVolume.toLocaleString()} kg</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Volume This Month</span>
            <span className="font-medium">{volumeThisMonth.toLocaleString()} kg</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Last Workout</span>
            <span className="font-medium">{lastWorkout}</span>
          </div>

        </CardContent>
      </Card>

    </div>

  );

}

export default ProfileStats;