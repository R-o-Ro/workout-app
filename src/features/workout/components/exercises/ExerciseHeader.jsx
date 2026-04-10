import { ChevronUp, ChevronDown, X } from "lucide-react";
import useWorkout from "../../hooks/useWorkout";

function ExerciseHeader({ exercise, isFirst, isLast }) {
  const { removeExercise, reorderExercise } = useWorkout();

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-semibold flex-1" style={{ color: "var(--text-primary)" }}>
        {exercise.name}
      </h2>
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => reorderExercise(exercise.id, "up")}
          disabled={isFirst}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: isFirst ? "var(--text-muted)" : "var(--text-secondary)", cursor: isFirst ? "not-allowed" : "pointer" }}
          onMouseEnter={e => { if (!isFirst) e.currentTarget.style.background = "var(--bg-hover)"; }}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={() => reorderExercise(exercise.id, "down")}
          disabled={isLast}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: isLast ? "var(--text-muted)" : "var(--text-secondary)", cursor: isLast ? "not-allowed" : "pointer" }}
          onMouseEnter={e => { if (!isLast) e.currentTarget.style.background = "var(--bg-hover)"; }}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <ChevronDown size={14} />
        </button>
        <button
          onClick={() => removeExercise(exercise.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.background = "var(--bg-hover)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default ExerciseHeader;