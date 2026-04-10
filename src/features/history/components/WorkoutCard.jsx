import { useState } from "react";
import { MoreHorizontal, ChevronUp, ChevronDown, Trophy, Clock, Package, Trash2 } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { getBestSet } from "../utils/getBestSet";
import { calculateWorkoutVolume } from "../../workout/utils/workoutCalculations";
import useWorkout from "../../workout/hooks/useWorkout";
import ConfirmModal from "../../../components/ui/ConfirmModal";

function formatDuration(seconds) {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function WorkoutCard({ workout, prs }) {
  const { deleteWorkout, editWorkoutName, editWorkoutSets } = useWorkout();
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingSets, setEditingSets] = useState(false);
  const [nameInput, setNameInput] = useState(workout.name || "Workout");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const volume = calculateWorkoutVolume(workout);
  const duration = formatDuration(workout.duration);
  const hasPRs = prs && prs.length > 0;
  const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];

  function handleSaveName() {
    if (nameInput.trim()) editWorkoutName(workout._id, nameInput.trim());
    setEditing(false);
  }

  const menuBtnStyle = {
    display: "flex", alignItems: "center", gap: "8px",
    width: "100%", textAlign: "left", padding: "10px 16px",
    fontSize: "13px", background: "transparent", transition: "background 0.1s",
  };

  return (
    <Card>
      <div className="px-6 py-5 space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4 space-y-0.5">
            {editing ? (
              <input
                autoFocus value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={handleSaveName}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                className="rounded-lg px-3 py-1 text-base font-semibold outline-none w-full"
                style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-light)" }}
              />
            ) : (
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{workout.name || "Workout"}</h2>
            )}
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {workout.date && !isNaN(new Date(workout.date))
                ? new Date(workout.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
                : "No Date"}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)", background: expanded ? "var(--bg-elevated)" : "transparent" }}
            >
              {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text-secondary)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
              >
                <MoreHorizontal size={15} />
              </button>
              {showMenu && (
                <div
                  className="absolute top-8 right-0 rounded-xl overflow-hidden z-20 shadow-2xl w-40"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)" }}
                >
                  {[
                    { label: "Rename", Icon: null, action: () => { setEditing(true); setShowMenu(false); }, color: "var(--text-primary)" },
                    { label: "Edit Sets", Icon: null, action: () => { setEditingSets(true); setExpanded(true); setShowMenu(false); }, color: "var(--text-primary)" },
                    { label: "Delete", Icon: Trash2, action: () => { setShowMenu(false); setShowDeleteConfirm(true); }, color: "var(--red)" },
                    { label: "Close", Icon: null, action: () => setShowMenu(false), color: "var(--text-secondary)" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      style={{ ...menuBtnStyle, color: item.color }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {item.Icon && <item.Icon size={13} />}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* EXERCISES */}
        <div className="space-y-1">
          <div className="grid grid-cols-2 text-xs px-1 mb-2" style={{ color: "var(--text-muted)" }}>
            <span>Exercise</span>
            <span className="text-right">Best Set</span>
          </div>

          {exercises.map((exercise, index) => {
            const sets = Array.isArray(exercise.sets) ? exercise.sets : [];
            const best = getBestSet({ ...exercise, sets });
            return (
              <div key={exercise._id || exercise.id || index}>
                <div className="grid grid-cols-2 items-center px-1 py-1.5 rounded-lg text-sm" style={{ color: "var(--text-primary)" }}>
                  <span>{sets.length} × {exercise.name}</span>
                  <span className="text-right text-sm" style={{ color: "var(--text-secondary)" }}>
                    {best.weight} kg × {best.reps}
                  </span>
                </div>

                {expanded && (
                  <div className="mt-1 ml-4 space-y-1 pb-1">
                    {sets.map((set, j) => (
                      <div key={set._id || set.id || j} className="flex justify-between items-center text-xs py-0.5" style={{ color: "var(--text-muted)" }}>
                        <span>Set {j + 1}</span>
                        {editingSets ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number" value={set.weight}
                              onChange={(e) => editWorkoutSets(workout._id, exercise.id || exercise._id, set.id || set._id, "weight", e.target.value)}
                              className="w-14 text-xs text-center outline-none rounded-lg px-2 py-1"
                              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                            />
                            <span>kg ×</span>
                            <input
                              type="number" value={set.reps}
                              onChange={(e) => editWorkoutSets(workout._id, exercise.id || exercise._id, set.id || set._id, "reps", e.target.value)}
                              className="w-12 text-xs text-center outline-none rounded-lg px-2 py-1"
                              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                            />
                            <span>reps</span>
                          </div>
                        ) : (
                          <span>{set.weight} kg × {set.reps} reps</span>
                        )}
                      </div>
                    ))}
                    {hasPRs && prs.filter((pr) => pr.exercise === exercise.name).map((pr, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs mt-1" style={{ color: "#f59e0b" }}>
                        <Trophy size={11} />
                        <span>{pr.type} — {pr.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div
          className="flex items-center gap-5 pt-3 text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          {duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {duration}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Package size={12} />
            {volume.toLocaleString()} kg
          </span>
          {hasPRs && (
            <span className="flex items-center gap-1.5 font-medium" style={{ color: "#f59e0b" }}>
              <Trophy size={12} />
              {prs.length} PR{prs.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <ConfirmModal
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => deleteWorkout(workout._id)}
          title="Delete Workout"
          message="Delete this workout? This cannot be undone."
        />
      </div>
    </Card>
  );
}

export default WorkoutCard;