import Input from "../../../../components/ui/Input";
import useWorkout from "../../hooks/useWorkout";
import { memo } from "react";

function SetRow({ set, setNumber, exerciseId, exerciseName }) {

  const { updateSet, removeSet, getLastSessionSets } = useWorkout();

  const lastSets = getLastSessionSets(exerciseName);
  const lastSet = lastSets[setNumber - 1] || null;

  return (

    <div className="grid grid-cols-4 items-center gap-3">

      <div className="text-gray-400 text-sm">
        {setNumber}
      </div>

      <div className="relative">
        <Input
          type="number"
          placeholder={lastSet ? `${lastSet.weight}` : "kg"}
          value={set.weight}
          onChange={(e) =>
            updateSet(exerciseId, set.id, "weight", e.target.value)
          }
        />
      </div>

      <div className="relative">
        <Input
          type="number"
          placeholder={lastSet ? `${lastSet.reps}` : "reps"}
          value={set.reps}
          onChange={(e) =>
            updateSet(exerciseId, set.id, "reps", e.target.value)
          }
        />
      </div>

      <button
        onClick={() => removeSet(exerciseId, set.id)}
        className="text-red-400 hover:text-red-300"
      >
        ✕
      </button>

    </div>

  );

}

export default memo(SetRow);