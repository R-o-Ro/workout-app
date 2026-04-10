import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Card } from "../../../components/ui/Card";

function ProfileWeightChart({ measurements }) {

  const data = measurements
    .filter((entry) => entry.weight)
    .map((entry) => ({
      date: entry.date,
      weight: parseFloat(entry.weight)
    }));

  if (data.length === 0) return null;

  const weights = data.map((d) => d.weight);
  const minWeight = Math.floor(Math.min(...weights)) - 2;
  const maxWeight = Math.ceil(Math.max(...weights)) + 2;

  return (

    <Card className="px-3 py-4">

      <h2 className="text-sm text-gray-300 mb-3 px-1">
        Body Weight
      </h2>

      <ResponsiveContainer width="100%" height={200}>
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
            domain={[minWeight, maxWeight]}
          />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "none",
              borderRadius: "8px"
            }}
            formatter={(value) => [`${value} kg`, "Weight"]}
          />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </Card>

  );

}

export default ProfileWeightChart;