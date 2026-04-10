import { WorkoutProvider } from "../features/workout/context/WorkoutContext";

export default function Providers({ children }) {
  return (
    <WorkoutProvider>
      {children}
    </WorkoutProvider>
  );
}