import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Trash2, MoreHorizontal, ChevronRight } from "lucide-react";
import { exercises as defaultExercises } from "../data/exerciseData";
import useWorkout from "../../workout/hooks/useWorkout";
import { useCustomExercises } from "../../../hooks/useCustomExercises";
import CreateExerciseModal from "./CreateExerciseModal";
import ConfirmModal from "../../../components/ui/ConfirmModal";

function ExerciseList() {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const { workouts } = useWorkout();
  const { customExercises, addCustomExercise, removeCustomExercise } = useCustomExercises();

  const loggedNames = new Set(workouts.flatMap((w) => w.exercises?.map((e) => e.name) || []));
  const defaultNames = new Set(defaultExercises.map((e) => e.name));
  const customNames = new Set(customExercises.map((e) => e.name));

  const extraExercises = [...loggedNames]
    .filter((name) => !defaultNames.has(name) && !customNames.has(name))
    .map((name) => ({ name, bodyPart: "Other", category: "Other", instructions: [] }));

  const allExercises = [...defaultExercises, ...customExercises, ...extraExercises];
  const filtered = allExercises.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce((acc, exercise) => {
    const group = exercise.bodyPart || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(exercise);
    return acc;
  }, {});
  const sortedGroups = Object.keys(grouped).sort();

  return (
    <div className="space-y-5">

      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-4 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--purple-dim-hover)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--purple-dim)"}
        >
          <Plus size={14} />
          New
        </button>
      </div>

      {sortedGroups.length === 0 && (
        <p className="text-sm py-4 text-center" style={{ color: "var(--text-secondary)" }}>No exercises found.</p>
      )}

      {sortedGroups.map((group) => (
        <div key={group}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: "var(--text-muted)" }}>
            {group}
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            {grouped[group].map((exercise, i) => {
              const count = workouts.filter((w) => w.exercises?.some((e) => e.name === exercise.name)).length;
              const isLast = i === grouped[group].length - 1;
              return (
                <div
                  key={exercise._id || exercise.name}
                  className="relative flex items-center"
                  style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => navigate(`/exercises/${encodeURIComponent(exercise.name)}`)}
                    className="flex-1 text-left px-4 py-3 flex items-center justify-between transition-colors"
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{exercise.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{exercise.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {count > 0 && (
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{count}×</span>
                      )}
                      {exercise.isCustom && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: "var(--purple-dim)", color: "var(--purple-light)" }}
                        >
                          Custom
                        </span>
                      )}
                      <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
                    </div>
                  </button>

                  {exercise.isCustom && (
                    <div className="relative pr-3">
                      <button
                        onClick={() => setMenuOpen(menuOpen === exercise.name ? null : exercise.name)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--text-secondary)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                      >
                        <MoreHorizontal size={15} />
                      </button>
                      {menuOpen === exercise.name && (
                        <div
                          className="absolute top-8 right-2 rounded-xl overflow-hidden z-20 shadow-2xl w-36"
                          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)" }}
                        >
                          <button
                            onClick={() => { setMenuOpen(null); setDeleteTarget(exercise); }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm transition-colors"
                            style={{ color: "var(--red)" }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                          <button
                            onClick={() => setMenuOpen(null)}
                            className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <CreateExerciseModal open={showCreate} onClose={() => setShowCreate(false)} onCreate={addCustomExercise} />
      <ConfirmModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { removeCustomExercise(deleteTarget._id); setDeleteTarget(null); }}
        title="Delete Exercise"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </div>
  );
}

export default ExerciseList;