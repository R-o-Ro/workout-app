import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";

const PRESETS = [60, 90, 120, 180];

function RestTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(90);
  const [remaining, setRemaining] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) { clearInterval(intervalRef.current); setIsRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function startTimer(seconds) {
    clearInterval(intervalRef.current);
    setDuration(seconds);
    setRemaining(seconds);
    setIsRunning(true);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setRemaining(null);
  }

  function formatTime(s) {
    return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  }

  const progress = remaining !== null ? remaining / duration : 1;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const done = remaining === 0;

  return (
    <div className="space-y-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>

      <p className="text-xs font-medium px-1" style={{ color: "var(--text-muted)" }}>Rest Timer</p>

      <div className="flex gap-2">
        {PRESETS.map((s) => (
          <button
            key={s}
            onClick={() => startTimer(s)}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: duration === s && isRunning ? "var(--purple-dim-hover)" : "var(--bg-elevated)",
              color: duration === s && isRunning ? "var(--purple-light)" : "var(--text-secondary)",
              border: `1px solid ${duration === s && isRunning ? "var(--purple-dim-hover)" : "var(--border)"}`,
            }}
          >
            {s < 60 ? `${s}s` : `${s / 60}m${s % 60 ? `${s % 60}s` : ""}`}
          </button>
        ))}
      </div>

      {remaining !== null && (
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="absolute" width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--border)" strokeWidth="3.5" />
              <circle
                cx="32" cy="32" r={radius} fill="none"
                stroke={done ? "var(--green)" : "var(--purple-light)"}
                strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 32 32)"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="text-sm font-semibold z-10 tabular-nums" style={{ color: "var(--text-primary)" }}>
              {formatTime(remaining)}
            </span>
          </div>

          <div className="flex-1 px-4">
            {done ? (
              <div className="flex items-center gap-2">
                <CheckCircle size={14} style={{ color: "var(--green)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--green)" }}>Rest complete</p>
              </div>
            ) : (
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Resting...</p>
            )}
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {done ? "Ready for next set" : `${formatTime(remaining)} remaining`}
            </p>
          </div>

          <button
            onClick={resetTimer}
            className="text-xs font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text-secondary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default RestTimer;