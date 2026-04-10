import Modal from "../../../components/ui/Modal";
import ExerciseItem from "./ExerciseItem";

const exercises = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Shoulder Press",
  "Lat Pulldown"
];

function ExerciseLibrary({ open, onClose }) {

  return (
    <Modal open={open} onClose={onClose}>

      <h2 className="text-xl font-semibold mb-4">
        Select Exercise
      </h2>

      <div className="space-y-2">

        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise}
            name={exercise}
            onSelect={onClose}
          />
        ))}

      </div>

    </Modal>
  );
}

export default ExerciseLibrary;