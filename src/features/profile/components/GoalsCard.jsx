import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { useGoals } from "../../../hooks/useGoals";
import useWorkout from "../../workout/hooks/useWorkout";

function getStartOfWeek() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function ProgressBar({ value, color = "var(--purple-light)" }) {
  return (
    <div className="w-full rounded-full h-1.5" style={{ background: "var(--bg-elevated)" }}>
      <div
        className="h-1.5 rounded-full transition-all duration-700"
        style={{ width: `${Math.min(value * 100, 100)}%`, background: color }}
      />
    </div>
  );
}

function GoalsCard({ latestWeight }) {
  const { goals, saveGoals } = useGoals();
  const { workouts } = useWorkout();
  const [editing, setEditing] = useState(false);
  const [weeklyInput, setWeeklyInput] = useState(() => goals.weeklyWorkoutTarget || 4);
  const [weightInput, setWeightInput] = useState(() => goals.targetWeight || "");

  function handleEdit() {
    setWeeklyInput(goals.weeklyWorkoutTarget || 4);
    setWeightInput(goals.targetWeight || "");
    setEditing(true);
  }

  async function handleSave() {
    await saveGoals({
      weeklyWorkoutTarget: Number(weeklyInput) || 4,
      targetWeight: weightInput !== "" ? Number(weightInput) : null,
    });
    setEditing(false);
  }

  const startOfWeek = getStartOfWeek();
  const workoutsThisWeek = workouts.filter((w) => new Date(w.date) >= startOfWeek).length;
  const weeklyTarget = goals.weeklyWorkoutTarget || 4;
  const weeklyProgress = Math.min(workoutsThisWeek / weeklyTarget, 1);
  const weeklyDone = workoutsThisWeek >= weeklyTarget;

  const weightProgress =
    goals.targetWeight && latestWeight
      ? Math.min(latestWeight / goals.targetWeight, 1)
      : null;
  const weightDone = latestWeight && goals.targetWeight && latestWeight <= goals.targetWeight;

  const inputStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-light)",
    color: "var(--text-primary)",
    borderRadius: "8px",
    outline: "none",
    fontSize: "13px",
    padding: "3px 8px",
    textAlign: "center",
  };

  return (
    <Card>
      <div className="px-6 py-5 space-y-5">

        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Goals</p>
          {editing ? (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="text-xs font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-xs font-semibold px-3 py-1 rounded-lg"
                style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Edit
            </button>
          )}
        </div>

        {/* Weekly goal */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Workouts this week</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold" style={{ color: weeklyDone ? "var(--green)" : "var(--text-primary)" }}>
                {workoutsThisWeek}
              </span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>/</span>
              {editing ? (
                <input
                  type="number" min="1" max="14"
                  value={weeklyInput}
                  onChange={(e) => setWeeklyInput(e.target.value)}
                  style={{ ...inputStyle, width: "44px" }}
                />
              ) : (
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{weeklyTarget}</span>
              )}
            </div>
          </div>
          <ProgressBar value={weeklyProgress} color={weeklyDone ? "var(--green)" : "var(--purple-light)"} />
          {weeklyDone && !editing && (
            <div className="flex items-center gap-1.5">
              <Check size={12} style={{ color: "var(--green)" }} />
              <p className="text-xs font-medium" style={{ color: "var(--green)" }}>Weekly goal achieved</p>
            </div>
          )}
        </div>

        {/* Weight goal */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Target weight</span>
            {editing ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="kg"
                  style={{ ...inputStyle, width: "64px" }}
                />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>kg</span>
              </div>
            ) : (
              <span className="text-sm font-semibold" style={{ color: weightDone ? "var(--green)" : "var(--text-primary)" }}>
                {goals.targetWeight ? `${goals.targetWeight} kg` : "—"}
              </span>
            )}
          </div>

          {goals.targetWeight && latestWeight && (
            <>
              <ProgressBar value={weightProgress} color={weightDone ? "var(--green)" : "#3b82f6"} />
              <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                <span>Current: {latestWeight} kg</span>
                <span>Target: {goals.targetWeight} kg</span>
              </div>
              {weightDone && (
                <div className="flex items-center gap-1.5">
                  <Check size={12} style={{ color: "var(--green)" }} />
                  <p className="text-xs font-medium" style={{ color: "var(--green)" }}>Weight goal achieved</p>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </Card>
  );
}

export default GoalsCard;