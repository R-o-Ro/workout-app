function AboutTab({ exercise }) {

  return (

    <div className="space-y-6">

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-300">Instructions</h2>
        {exercise.instructions.length === 0 ? (
          <p className="text-gray-400 text-sm">No instructions available.</p>
        ) : (
          <ol className="space-y-2">
            {exercise.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-purple-400 font-semibold shrink-0">
                  {i + 1}.
                </span>
                <span className="text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="space-y-3">

        <h2 className="text-sm font-semibold text-gray-300">Details</h2>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Body Part</span>
          <span>{exercise.bodyPart}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Category</span>
          <span>{exercise.category}</span>
        </div>

      </div>

    </div>

  );

}

export default AboutTab;