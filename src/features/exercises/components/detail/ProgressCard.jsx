import { analyzeProgress } from "../../../profile/utils/progressAnalysis";

const colorMap = {
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    label: "text-green-400",
    dot: "bg-green-400"
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    label: "text-yellow-400",
    dot: "bg-yellow-400"
  },
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    label: "text-red-400",
    dot: "bg-red-400"
  }
};

function ProgressCard({ history }) {

  const analysis = analyzeProgress(history);

  if (!analysis) {
    return (
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 space-y-1">
        <p className="text-sm font-medium text-gray-300">Progress Analysis</p>
        <p className="text-xs text-gray-400">
          Log at least 3 sessions of this exercise to see progress analysis and suggestions.
        </p>
      </div>
    );
  }

  const colors = colorMap[analysis.color];

  return (

    <div className={`rounded-xl border p-4 space-y-3 ${colors.bg} ${colors.border}`}>

      {/* Header */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <p className={`text-sm font-semibold ${colors.label}`}>
          {analysis.label}
        </p>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-300">
        {analysis.message}
      </p>

      {/* Suggestion box */}
      <div className="bg-black/20 rounded-lg px-3 py-2.5">
        <p className="text-xs text-gray-400 mb-1">💡 Suggestion</p>
        <p className="text-sm text-white">
          {analysis.suggestion}
        </p>
      </div>

    </div>

  );

}

export default ProgressCard;