import Button from "../../../../components/ui/Button";
import useWorkout from "../../hooks/useWorkout";

function AddSetButton({ exerciseId }) {

  const { addSet } = useWorkout();

  return (

    <Button
      variant="secondary"
      onClick={() => addSet(exerciseId)}
    >
      + Add Set
    </Button>

  );

}

export default AddSetButton;