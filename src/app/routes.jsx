import Profile from "../pages/Profile";
import History from "../pages/History";
import Workout from "../pages/Workout";
import Exercises from "../pages/Exercises";
import Measurements from "../pages/Measurements";
import ExerciseDetail from "../pages/ExerciseDetail";
import { Navigate } from "react-router-dom";

export const routes = [
  { path: "/", element: <Navigate to="/profile" replace /> },
  { path: "/profile", element: <Profile /> },
  { path: "/history", element: <History /> },
  { path: "/workout", element: <Workout /> },
  { path: "/exercises", element: <Exercises /> },
  { path: "/exercises/:name", element: <ExerciseDetail /> },
  { path: "/measurements", element: <Measurements /> },
];