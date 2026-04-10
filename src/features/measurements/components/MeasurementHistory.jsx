import { useState, useEffect } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import * as api from "../../../services/api";

function MeasurementHistory() {
  const [measurements, setMeasurements] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    api.fetchMeasurements()
      .then((data) => setMeasurements(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  async function deleteMeasurement(id) {
    try {
      await api.deleteMeasurement(id);
      setMeasurements((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Failed to delete measurement:", err);
    }
  }

  if (measurements.length === 0) {
    return (
      <div className="rounded-2xl px-6 py-10 text-center" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>No measurements yet</p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Log your first measurements above to start tracking.</p>
      </div>
    );
  }

  const fields = [
    { key: "neck", label: "Neck" },
    { key: "shoulders", label: "Shoulders" },
    { key: "chest", label: "Chest" },
    { key: "arms", label: "Arms" },
    { key: "waist", label: "Waist" },
    { key: "quads", label: "Quads" },
    { key: "calves", label: "Calves" },
  ];

  return (
    <div className="space-y-3">
      {[...measurements].reverse().map((entry) => (
        <Card key={entry._id}>
          <div className="px-6 py-5 space-y-4">

            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {new Date(entry.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                </p>
                {entry.weight && (
                  <p className="text-2xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
                    {entry.weight}
                    <span className="text-sm font-normal ml-1" style={{ color: "var(--text-muted)" }}>kg</span>
                  </p>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === entry._id ? null : entry._id)}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--text-secondary)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  <MoreHorizontal size={16} />
                </button>

                {menuOpen === entry._id && (
                  <div
                    className="absolute top-8 right-0 rounded-xl overflow-hidden z-20 shadow-2xl w-36"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)" }}
                  >
                    <button
                      onClick={() => { setMenuOpen(null); setDeleteId(entry._id); }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm transition-colors"
                      style={{ color: "var(--red)" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <Trash2 size={13} />
                      Delete
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
            </div>

            {/* Measurements grid */}
            {fields.some((f) => entry[f.key]) && (
              <>
                <div style={{ borderTop: "1px solid var(--border)" }} />
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {fields.filter((f) => entry[f.key]).map((f) => (
                    <div key={f.key} className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{f.label}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{entry[f.key]} cm</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>
      ))}

      <ConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { deleteMeasurement(deleteId); setDeleteId(null); }}
        title="Delete Measurement"
        message="Delete this entry? This cannot be undone."
      />
    </div>
  );
}

export default MeasurementHistory;