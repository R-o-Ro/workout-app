import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { exercises as defaultExercises } from "../features/exercises/data/exerciseData";
import { useCustomExercises } from "../hooks/useCustomExercises";
import useWorkout from "../features/workout/hooks/useWorkout";
import AboutTab from "../features/exercises/components/detail/AboutTab";
import HistoryTab from "../features/exercises/components/detail/HistoryTab";
import ChartsTab from "../features/exercises/components/detail/ChartsTab";
import RecordsTab from "../features/exercises/components/detail/RecordsTab";

const TABS = ["About", "History", "Charts", "Records"];

function ExerciseDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const exerciseName = decodeURIComponent(name);
  const [activeTab, setActiveTab] = useState("About");
  const { workouts } = useWorkout();
  const { customExercises } = useCustomExercises();

  const exercise =
    defaultExercises.find((e) => e.name === exerciseName) ||
    customExercises.find((e) => e.name === exerciseName) ||
    { name: exerciseName, bodyPart: "Other", category: "Other", instructions: [] };

  const history = workouts
    .filter((w) => w.exercises?.some((e) => e.name === exerciseName))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((w) => ({
      date: w.date,
      workoutName: w.name || "Workout",
      sets: w.exercises.find((e) => e.name === exerciseName)?.sets || [],
    }));

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{exercise.name}</h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {exercise.bodyPart} · {exercise.category}
            {exercise.isCustom && (
              <span className="ml-2" style={{ color: "var(--purple-light)" }}>Custom</span>
            )}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2.5 text-sm font-medium transition-colors relative"
            style={{ color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)" }}
          >
            {tab}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "var(--purple-light)" }}
              />
            )}
          </button>
        ))}
      </div>

      {activeTab === "About"   && <AboutTab exercise={exercise} />}
      {activeTab === "History" && <HistoryTab history={history} />}
      {activeTab === "Charts"  && <ChartsTab history={history} />}
      {activeTab === "Records" && <RecordsTab history={history} />}

    </div>
  );
}

export default ExerciseDetail;