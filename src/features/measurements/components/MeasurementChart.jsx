import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "../../../components/ui/Card";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-xl text-sm space-y-1" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-light)" }}>
        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function MeasurementChart({ measurements }) {
  const data = measurements
    .filter((e) => e.weight || e.chest || e.waist || e.arms)
    .map((e) => ({
      date: new Date(e.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }),
      weight: e.weight ? parseFloat(e.weight) : null,
      chest: e.chest ? parseFloat(e.chest) : null,
      waist: e.waist ? parseFloat(e.waist) : null,
      arms: e.arms ? parseFloat(e.arms) : null,
    }));

  if (data.length < 2) return null;

  const lines = [
    { key: "weight", color: "var(--purple-light)", label: "Weight (kg)" },
    { key: "chest",  color: "#3b82f6",             label: "Chest (cm)" },
    { key: "waist",  color: "#f97316",             label: "Waist (cm)" },
    { key: "arms",   color: "var(--green)",        label: "Arms (cm)" },
  ];

  const activeLines = lines.filter((l) => data.some((d) => d[l.key] !== null));

  return (
    <Card>
      <div className="px-6 pt-5 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Overview</p>
        <p className="text-sm font-medium mb-4" style={{ color: "var(--text-secondary)" }}>Progress chart</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {activeLines.map((l) => (
            <div key={l.key} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{l.label}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="transparent" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
            <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
            <Tooltip content={<CustomTooltip />} />
            {activeLines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.label}
                stroke={l.color}
                strokeWidth={2}
                dot={{ r: 2.5, fill: l.color, strokeWidth: 0 }}
                activeDot={{ r: 4, strokeWidth: 0 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MeasurementChart;