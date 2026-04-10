import { useState } from "react";
import { Check, Search } from "lucide-react";
import useWorkout from "../../hooks/useWorkout";
import { exercises as defaultExercises } from "../../../exercises/data/exerciseData";
import { useCustomExercises } from "../../../../hooks/useCustomExercises";
import Modal from "../../../../components/ui/Modal";

function CreateTemplateModal({ open, onClose }) {
  const { saveAsTemplate } = useWorkout();
  const { customExercises } = useCustomExercises();
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const allExercises = [...customExercises, ...defaultExercises];
  const filtered = allExercises.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );
  const grouped = filtered.reduce((acc, exercise) => {
    const group = exercise.bodyPart || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(exercise);
    return acc;
  }, {});
  const sortedGroups = Object.keys(grouped).sort();

  function toggleExercise(exercise) {
    setSelected((prev) =>
      prev.find((e) => e.name === exercise.name)
        ? prev.filter((e) => e.name !== exercise.name)
        : [...prev, { name: exercise.name }]
    );
  }

  function handleSave() {
    if (!name.trim() || selected.length === 0) return;
    saveAsTemplate(name.trim(), selected);
    handleClose();
  }

  function handleClose() {
    setName("");
    setSearch("");
    setSelected([]);
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="space-y-4">

        <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>New Template</h2>

        <input
          type="text"
          placeholder="Template name (e.g. Push Day)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-light)" }}
        />

        {selected.length > 0 && (
          <p className="text-xs font-medium" style={{ color: "var(--purple-light)" }}>
            {selected.length} exercise{selected.length > 1 ? "s" : ""} selected
          </p>
        )}

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
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
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-3 -mx-1 px-1">
          {sortedGroups.map((group) => (
            <div key={group}>
              <h3 className="text-xs uppercase tracking-widest mb-1 px-2 font-semibold" style={{ color: "var(--text-muted)" }}>
                {group}
              </h3>
              {grouped[group].map((exercise) => {
                const isSelected = selected.find((e) => e.name === exercise.name);
                return (
                  <button
                    key={exercise._id || exercise.name}
                    onClick={() => toggleExercise(exercise)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex justify-between items-center"
                    style={{
                      background: isSelected ? "var(--purple-dim)" : "transparent",
                      color: isSelected ? "var(--purple-light)" : "var(--text-secondary)",
                      border: `1px solid ${isSelected ? "var(--purple-dim-hover)" : "transparent"}`,
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "var(--bg-elevated)"; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                  >
                    <div>
                      <div className="font-medium text-sm">{exercise.name}</div>
                      <div className="text-xs mt-0.5 opacity-60">{exercise.category}</div>
                    </div>
                    {exercise.isCustom && !isSelected && (
                      <span
                        className="text-xs rounded-full px-2 py-0.5 shrink-0"
                        style={{ color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)", background: "var(--purple-dim)" }}
                      >
                        Custom
                      </span>
                    )}
                    {isSelected && (
                      <Check size={15} className="shrink-0" style={{ color: "var(--purple-light)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-light)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || selected.length === 0}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)", opacity: (!name.trim() || selected.length === 0) ? 0.4 : 1 }}
          >
            Save Template
          </button>
        </div>

      </div>
    </Modal>
  );
}

export default CreateTemplateModal;