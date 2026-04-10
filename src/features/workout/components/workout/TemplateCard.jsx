import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import ConfirmModal from "../../../../components/ui/ConfirmModal";

function getLastUsed(template) {
  if (!template.lastUsed) return null;
  const date = new Date(template.lastUsed);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function TemplateCard({ template, onStart, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const preview = template.exercises.slice(0, 3).map((e) => e.name).join(", ");
  const hasMore = template.exercises.length > 3;
  const lastUsed = getLastUsed(template);

  return (
    <div
      className="relative rounded-2xl p-4 flex flex-col gap-3 transition-all duration-150"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-sm leading-snug flex-1" style={{ color: "var(--text-primary)" }}>
          {template.name}
        </h3>
        {onDelete && (
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="p-1 rounded-lg transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-secondary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <MoreHorizontal size={15} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showMenu && (
        <div
          className="absolute top-10 right-3 rounded-xl overflow-hidden z-20 shadow-2xl w-36"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)" }}
        >
          <button
            onClick={() => { setShowMenu(false); setShowDeleteConfirm(true); }}
            className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm transition-colors"
            style={{ color: "var(--red)" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Trash2 size={13} />
            Delete
          </button>
          <button
            onClick={() => setShowMenu(false)}
            className="w-full text-left px-4 py-2.5 text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Preview */}
      <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
        {preview}{hasMore ? " ···" : ""}
      </p>

      {/* Footer */}
      <div className="space-y-2">
        {lastUsed && (
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Last used: {lastUsed}</p>
        )}
        <button
          onClick={onStart}
          className="w-full py-2 rounded-xl text-xs font-semibold transition-all duration-150"
          style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--purple-dim-hover)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--purple-dim)"}
        >
          Start
        </button>
      </div>

      <ConfirmModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDelete}
        title="Delete Template"
        message={`Delete "${template.name}"? This cannot be undone.`}
      />
    </div>
  );
}

export default TemplateCard;