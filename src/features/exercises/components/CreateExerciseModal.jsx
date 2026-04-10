import { useState } from "react";
import Modal from "../../../components/ui/Modal";

const BODY_PARTS = [
  "Arms", "Back", "Cardio", "Chest", "Core",
  "Full Body", "Legs", "Shoulders", "Other"
];

const CATEGORIES = [
  "Barbell", "Bodyweight", "Cable", "Dumbbell",
  "Machine", "Kettlebell", "Band", "Equipment", "Other"
];

function CreateExerciseModal({ open, onClose, onCreate }) {

  const [name, setName] = useState("");
  const [bodyPart, setBodyPart] = useState("Other");
  const [category, setCategory] = useState("Other");
  const [instructions, setInstructions] = useState("");

  function handleSave() {
    if (!name.trim()) return;

    const exercise = {
      name: name.trim(),
      bodyPart,
      category,
      isCustom: true,
      instructions: instructions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    };

    onCreate(exercise);
    handleClose();
  }

  function handleClose() {
    setName("");
    setBodyPart("Other");
    setCategory("Other");
    setInstructions("");
    onClose();
  }

  return (

    <Modal open={open} onClose={handleClose}>

      <div className="space-y-4">

        <h2 className="text-xl font-semibold">Create Exercise</h2>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Exercise Name</label>
          <input
            type="text"
            placeholder="e.g. Cable Lateral Raise"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm outline-none"
          />
        </div>

        {/* Body Part */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Body Part</label>
          <select
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            className="w-full bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm outline-none"
          >
            {BODY_PARTS.map((bp) => (
              <option key={bp} value={bp}>{bp}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Instructions */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">
            Instructions (optional, one step per line)
          </label>
          <textarea
            placeholder={"Step 1\nStep 2\nStep 3"}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
            className="w-full bg-neutral-800 text-white rounded-lg px-4 py-2 text-sm outline-none resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-gray-300 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium disabled:opacity-40"
          >
            Create
          </button>
        </div>

      </div>

    </Modal>

  );

}

export default CreateExerciseModal;