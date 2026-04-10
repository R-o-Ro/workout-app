import { Card, CardContent } from "../../../../components/ui/Card";
import { calculate1RM } from "../../../history/utils/calculate1RM";

function HistoryTab({ history }) {

  if (history.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No history yet. Log this exercise in a workout to see it here.
      </p>
    );
  }

  return (

    <div className="space-y-4">

      {[...history].reverse().map((session, i) => (

        <Card key={i}>
          <CardContent className="space-y-3">

            <div>
              <div className="text-sm font-medium">{session.workoutName}</div>
              <div className="text-xs text-gray-400">
                {new Date(session.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </div>
            </div>

            <div className="space-y-1">

              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Sets Performed</span>
                <span>1RM</span>
              </div>

              {session.sets.map((set, j) => (
                <div key={j} className="flex justify-between text-sm">
                  <span>
                    {j + 1} &nbsp; {set.weight} kg × {set.reps}
                  </span>
                  <span className="text-gray-400">
                    {calculate1RM(set.weight, set.reps)}
                  </span>
                </div>
              ))}

            </div>

          </CardContent>
        </Card>

      ))}

    </div>

  );

}

export default HistoryTab;