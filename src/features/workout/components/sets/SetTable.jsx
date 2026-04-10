import SetRow from "./SetRow";

function SetTable({ exercise }) {

  if (exercise.sets.length === 0) {
    return (
      <p className="text-gray-400 text-sm">No sets yet</p>
    );
  }

  return (

    <div className="space-y-2">

      <div className="grid grid-cols-4 text-sm text-gray-400 px-2">
        <span>Set</span>
        <span>Weight</span>
        <span>Reps</span>
        <span></span>
      </div>

      {exercise.sets.map((set, index) => (
        <SetRow
          key={set.id}
          set={set}
          setNumber={index + 1}
          exerciseId={exercise.id}
          exerciseName={exercise.name}
        />
      ))}

    </div>

  );

}

export default SetTable;