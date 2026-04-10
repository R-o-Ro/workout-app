import { Card, CardHeader, CardContent } from "../../../../components/ui/Card";
import ExerciseHeader from "./ExerciseHeader";
import SetTable from "../sets/SetTable";
import AddSetButton from "../sets/AddSetButton";
import { memo } from "react";

function ExerciseBlock({ exercise, isFirst, isLast }) {

  return (

    <Card>

      <CardHeader>
        <ExerciseHeader
          exercise={exercise}
          isFirst={isFirst}
          isLast={isLast}
        />
      </CardHeader>

      <CardContent>

        <SetTable exercise={exercise} />

        <div className="mt-4">
          <AddSetButton exerciseId={exercise.id} />
        </div>

      </CardContent>

    </Card>

  );

}

export default memo(ExerciseBlock);