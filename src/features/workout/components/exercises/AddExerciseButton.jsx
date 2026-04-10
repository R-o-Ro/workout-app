import { useState } from "react";
import { Search, Plus } from "lucide-react";
import useWorkout from "../../hooks/useWorkout";
import { exercises as defaultExercises } from "../../../exercises/data/exerciseData";
import { useCustomExercises } from "../../../../hooks/useCustomExercises";
import Modal from "../../../../components/ui/Modal";

function AddExerciseButton() {
  const { addExercise } = useWorkout();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { customExercises } = useCustomExercises();

  const allExercises = [...customExercises, ...defaultExercises];
  const filtered = allExercises.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce((acc, exercise) => {
    const group = exercise.bodyPart || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(exercise);
    return acc;
  }, {});
  const sortedGroups = Object.keys(grouped).sort();

  function handleSelect(name) {
    addExercise(name);
    setSearch("");
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        <Plus size={15} />
        Add Exercise
      </button>

      <Modal open={open} onClose={() => { setSearch(""); setOpen(false); }}>
        <div className="space-y-4">
          <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Add Exercise</h2>

          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
          >
            <Search size={13} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--text-primary)" }}
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-4 -mx-1 px-1">
            {sortedGroups.map((group) => (
              <div key={group}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1 px-2" style={{ color: "var(--text-muted)" }}>
                  {group}
                </p>
                {grouped[group].map((exercise) => (
                  <button
                    key={exercise._id || exercise.name}
                    onClick={() => handleSelect(exercise.name)}
                    className="w-full text-left px-3 py-2.5 rounded-xl transition-colors flex justify-between items-center"
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{exercise.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{exercise.category}</p>
                    </div>
                    {exercise.isCustom && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                        style={{ background: "var(--purple-dim)", color: "var(--purple-light)" }}
                      >
                        Custom
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddExerciseButton;