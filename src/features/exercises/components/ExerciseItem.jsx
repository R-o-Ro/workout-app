import useWorkout from "../../workout/hooks/useWorkout";

function ExerciseItem({ name, onSelect }) {

  const { addExercise } = useWorkout();

  function handleClick() {
    addExercise(name);
    onSelect();
  }

  return (

    <button
      onClick={handleClick}
      className="w-full text-left p-3 rounded-lg hover:bg-neutral-800"
    >
      {name}
    </button>

  );

}

export default ExerciseItem;