import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function ProfileMeasurementChart({ data, dataKey, label }) {
  return (
    <div className="mb-6">

      <h3 className="text-xs text-gray-400 mb-2">{label}</h3>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >

          <CartesianGrid stroke="#333" vertical={false} />

          <XAxis
            dataKey="date"
            stroke="#888"
            tick={{ fontSize: 10 }}
          />

          <YAxis
            stroke="#888"
            tick={{ fontSize: 10 }}
            width={35}
          />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "none",
              borderRadius: "8px"
            }}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ProfileMeasurementChart;