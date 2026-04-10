import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Card } from "../../../../components/ui/Card";
import { calculate1RM } from "../../../history/utils/calculate1RM";
import ProgressCard from "./ProgressCard";

function getBestSet(sets) {
  return sets.reduce((best, set) => {
    const est = calculate1RM(set.weight, set.reps);
    return est > calculate1RM(best.weight, best.reps) ? set : best;
  }, sets[0]);
}

function ChartCard({ label, data, dataKey, color = "#a855f7" }) {

  const values = data.map((d) => d[dataKey]).filter(Boolean);
  const minVal = Math.floor(Math.min(...values)) - 5;
  const maxVal = Math.ceil(Math.max(...values)) + 5;

  return (

    <Card className="px-3 py-4">

      <h2 className="text-sm text-gray-300 mb-3 px-1">{label}</h2>

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
            domain={[minVal, maxVal]}
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
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </Card>

  );

}

function ChartsTab({ history }) {

  if (history.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No data yet. Log this exercise in a workout to see charts here.
      </p>
    );
  }

  const recent = history.slice(-20);

  const chartData = recent.map((session) => {
    const best = getBestSet(session.sets);
    const totalVolume = session.sets.reduce(
      (sum, s) => sum + Number(s.weight) * Number(s.reps), 0
    );
    return {
      date: new Date(session.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit"
      }),
      est1RM: calculate1RM(best.weight, best.reps),
      maxWeight: Number(best.weight),
      volume: totalVolume
    };
  });

  return (

    <div className="space-y-6">

      <ProgressCard history={history} />

      <ChartCard
        label="Best Set (est. 1RM)"
        data={chartData}
        dataKey="est1RM"
      />

      <ChartCard
        label="Best Set (max weight)"
        data={chartData}
        dataKey="maxWeight"
      />

      <ChartCard
        label="Total Volume (kg)"
        data={chartData}
        dataKey="volume"
        color="#3b82f6"
      />

    </div>

  );

}

export default ChartsTab;