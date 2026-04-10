import { useState } from "react";
import { Dumbbell, Plus, ArrowRight } from "lucide-react";
import useWorkout from "../../hooks/useWorkout";
import { exampleTemplates } from "../../data/templateData";
import TemplateCard from "./TemplateCard";
import CreateTemplateModal from "./CreateTemplateModal";

function WorkoutHome() {
  const { startWorkout, userTemplates, deleteUserTemplate, updateUserTemplateLastUsed } = useWorkout();
  const [showCreateModal, setShowCreateModal] = useState(false);

  function handleStartTemplate(template) {
    if (template._id) updateUserTemplateLastUsed(template._id);
    startWorkout(template.exercises);
  }

  return (
    <div className="space-y-8">

      {/* Quick Start */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Quick Start</p>
        <button
          onClick={() => startWorkout([])}
          className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl font-semibold text-sm transition-all duration-150 group"
          style={{ background: "var(--purple-dim)", border: "1px solid var(--purple-dim-hover)", color: "var(--purple-light)" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--purple-dim-hover)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--purple-dim)"}
        >
          <Dumbbell size={16} />
          <span>Start Empty Workout</span>
          <ArrowRight size={15} className="ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* My Templates */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>My Templates</p>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
              {userTemplates.length}
            </span>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <Plus size={13} />
            New
          </button>
        </div>

        {userTemplates.length === 0 ? (
          <div className="rounded-2xl px-6 py-8 text-center" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>No templates yet</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Create one above, or save a workout as a template after finishing it.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {userTemplates.map((t) => (
              <TemplateCard key={t._id} template={t} onStart={() => handleStartTemplate(t)} onDelete={() => deleteUserTemplate(t._id)} />
            ))}
          </div>
        )}
      </div>

      {/* Example Templates */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Example Templates</p>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
            {exampleTemplates.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {exampleTemplates.map((t) => (
            <TemplateCard key={t.id} template={t} onStart={() => handleStartTemplate(t)} />
          ))}
        </div>
      </div>

      <CreateTemplateModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}

export default WorkoutHome;