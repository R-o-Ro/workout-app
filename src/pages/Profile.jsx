import { useState, useEffect } from "react";
import { Dumbbell, Ruler } from "lucide-react";
import useWorkout from "../features/workout/hooks/useWorkout";
import ProfileStats from "../features/profile/components/ProfileStats";
import ProfileWorkoutChart from "../features/profile/components/ProfileWorkoutChart";
import ProfileWeightChart from "../features/profile/components/ProfileWeightChart";
import ProfileMeasurementChart from "../features/profile/components/ProfileMeasurementChart";
import GoalsCard from "../features/profile/components/GoalsCard";
import * as api from "../services/api";
import { Card } from "../components/ui/Card";

const measurementKeys = [
  { key: "neck",      label: "Neck" },
  { key: "shoulders", label: "Shoulders" },
  { key: "chest",     label: "Chest" },
  { key: "arms",      label: "Arms" },
  { key: "waist",     label: "Waist" },
  { key: "quads",     label: "Quads" },
  { key: "calves",    label: "Calves" },
];

// eslint-disable-next-line no-unused-vars
function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <Card>
      <div className="px-6 py-10 text-center space-y-2">
        <div className="flex justify-center mb-3">
          <Icon size={22} style={{ color: "var(--text-muted)" }} />
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{title}</p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{subtitle}</p>
      </div>
    </Card>
  );
}

function Profile() {
  const { workouts, loading } = useWorkout();
  const [rawMeasurements, setRawMeasurements] = useState([]);

  useEffect(() => {
    api.fetchMeasurements()
      .then((data) => setRawMeasurements(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const measurements = rawMeasurements.map((entry) => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }),
  }));

  const latestWeight = rawMeasurements.length
    ? parseFloat([...rawMeasurements].reverse().find((m) => m.weight)?.weight)
    : null;

  if (loading) {
    return <div className="py-12 text-center text-sm" style={{ color: "var(--text-secondary)" }}>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-5">
        <ProfileStats />
        <GoalsCard latestWeight={latestWeight} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {workouts.length === 0 ? (
          <EmptyState icon={Dumbbell} title="No workouts yet" subtitle="Finish your first workout to see your weekly activity." />
        ) : (
          <ProfileWorkoutChart />
        )}
        {measurements.length > 0 ? (
          <ProfileWeightChart measurements={measurements} />
        ) : (
          <EmptyState icon={Ruler} title="No weight logged yet" subtitle="Add your first measurement to track body weight." />
        )}
      </div>

      {measurements.length >= 2 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            Measurements Progress
          </p>
          <div className="grid grid-cols-2 gap-4">
            {measurementKeys.map((m) => (
              <ProfileMeasurementChart key={m.key} data={measurements} dataKey={m.key} label={m.label} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;