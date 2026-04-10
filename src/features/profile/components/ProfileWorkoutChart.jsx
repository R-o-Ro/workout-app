import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import useWorkout from "../../workout/hooks/useWorkout";
import { getWeeklyWorkoutData, getMaxWeeklyWorkouts } from "../utils/workoutStats";
import { Card } from "../../../components/ui/Card";

function ProfileWorkoutChart() {

  const { workouts } = useWorkout();
  const data = getWeeklyWorkoutData(workouts);
  const maxWorkouts = getMaxWeeklyWorkouts(data);

  return (

    <Card className="px-3 py-4">

      <h2 className="text-sm text-gray-300 mb-3 px-1">
        Workouts per week
      </h2>

      <ResponsiveContainer width="100%" height={220}>

        <BarChart
          data={data}
          margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          barCategoryGap="30%"
        >

          <defs>
            <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#333" vertical={false} />

          <XAxis
            dataKey="week"
            stroke="#888"
            tick={{ fontSize: 12 }}
            tickMargin={8}
          />

          <YAxis
            orientation="left"
            width={35}
            stroke="#888"
            tick={{ fontSize: 12 }}
            allowDecimals={false}
            domain={[0, maxWorkouts]}
            ticks={Array.from({ length: maxWorkouts + 1 }, (_, i) => i)}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              background: "#111",
              border: "none",
              borderRadius: "8px"
            }}
          />

          <Bar
            dataKey="workouts"
            fill="url(#workoutGradient)"
            radius={[6, 6, 0, 0]}
            barSize={28}
          />

        </BarChart>

      </ResponsiveContainer>

    </Card>

  );

}

export default ProfileWorkoutChart;