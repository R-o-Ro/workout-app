import { Card, CardContent } from "../../../../components/ui/Card";
import { calculate1RM } from "../../../history/utils/calculate1RM";

function RecordsTab({ history }) {

  if (history.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No records yet. Log this exercise in a workout to see records here.
      </p>
    );
  }

  const allSets = history.flatMap((session) =>
    session.sets.map((set) => ({ ...set, date: session.date }))
  );

  const estimated1RM = Math.max(
    ...allSets.map((s) => calculate1RM(s.weight, s.reps))
  );

  const maxWeight = Math.max(...allSets.map((s) => Number(s.weight)));

  const maxVolume = Math.max(
    ...history.map((session) =>
      session.sets.reduce((sum, s) => sum + s.weight * s.reps, 0)
    )
  );

  // Best performance per rep count (1–10)
  const repRecords = Array.from({ length: 10 }, (_, i) => {
    const rep = i + 1;
    const setsAtRep = allSets.filter((s) => Number(s.reps) === rep);
    if (setsAtRep.length === 0) return null;
    const best = setsAtRep.reduce((a, b) =>
      Number(a.weight) >= Number(b.weight) ? a : b
    );
    return {
      reps: rep,
      weight: best.weight,
      date: new Date(best.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      estimated: calculate1RM(best.weight, rep)
    };
  }).filter(Boolean);

  return (

    <div className="space-y-6">

      {/* Top records */}
      <Card>
        <CardContent className="space-y-3">

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated 1RM</span>
            <span className="font-medium">{estimated1RM} kg</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Max Weight</span>
            <span className="font-medium">{maxWeight} kg</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Max Volume</span>
            <span className="font-medium">{maxVolume} kg</span>
          </div>

        </CardContent>
      </Card>

      {/* Per-rep breakdown */}
      {repRecords.length > 0 && (

        <div>

          <h2 className="text-sm text-gray-300 mb-3">Best Per Rep</h2>

          <Card>
            <CardContent className="space-y-0 divide-y divide-neutral-800 p-0">

              <div className="flex justify-between text-xs text-gray-400 px-4 py-2">
                <span>Reps</span>
                <span>Best Performance</span>
                <span>Estimated</span>
              </div>

              {repRecords.map((record) => (
                <div
                  key={record.reps}
                  className="flex justify-between text-sm px-4 py-3"
                >
                  <span className="w-8">{record.reps}</span>
                  <span className="text-center">
                    <div>{record.weight} kg</div>
                    <div className="text-xs text-gray-400">{record.date}</div>
                  </span>
                  <span className="text-right">{record.estimated} kg</span>
                </div>
              ))}

            </CardContent>
          </Card>

        </div>

      )}

    </div>

  );

}

export default RecordsTab;