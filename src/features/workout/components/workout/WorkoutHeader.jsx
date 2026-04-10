import { useState } from "react";
import { ArrowLeft, MoreHorizontal, BookmarkPlus, X } from "lucide-react";
import useWorkout from "../../hooks/useWorkout";
import ConfirmModal from "../../../../components/ui/ConfirmModal";

const menuBtnStyle = {
  display: "block", width: "100%", textAlign: "left",
  padding: "10px 16px", fontSize: "13px", background: "transparent", transition: "background 0.1s",
};

function WorkoutHeader() {
  const { workoutName, setWorkoutName, elapsed, formatTime, finishWorkout, cancelWorkout, saveCurrentAsTemplate } = useWorkout();
  const [showMenu, setShowMenu] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  function handleSaveAsTemplate() {
    saveCurrentAsTemplate();
    setShowMenu(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  }

  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <button
          onClick={() => setShowCancelConfirm(true)}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
        >
          <ArrowLeft size={18} />
        </button>

        <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text-secondary)" }}>
          {formatTime(elapsed)}
        </span>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
            >
              <MoreHorizontal size={18} />
            </button>

            {showMenu && (
              <div
                className="absolute top-9 right-0 rounded-xl overflow-hidden z-20 shadow-2xl w-44"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)" }}
              >
                <button
                  onClick={handleSaveAsTemplate}
                  style={{ ...menuBtnStyle, color: "var(--text-primary)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  Save as Template
                </button>
                <button
                  onClick={() => { setShowMenu(false); setShowCancelConfirm(true); }}
                  style={{ ...menuBtnStyle, color: "var(--red)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  Cancel Workout
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  style={{ ...menuBtnStyle, color: "var(--text-secondary)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          <button
            onClick={finishWorkout}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "var(--purple-dim)", color: "var(--purple-light)", border: "1px solid var(--purple-dim-hover)" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--purple-dim-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--purple-dim)"}
          >
            Finish
          </button>
        </div>
      </div>

      {showSavedToast && (
        <div
          className="rounded-xl px-4 py-2.5 text-xs font-medium text-center"
          style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "var(--green)" }}
        >
          Template saved successfully
        </div>
      )}

      <input
        type="text"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        className="bg-transparent text-2xl font-bold outline-none w-full"
        style={{ color: "var(--text-primary)" }}
      />

      <ConfirmModal
        open={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={cancelWorkout}
        title="Cancel Workout"
        message="Are you sure you want to cancel? All progress will be lost."
        confirmLabel="Cancel Workout"
      />
    </div>
  );
}

export default WorkoutHeader;