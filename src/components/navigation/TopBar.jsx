import { useLocation } from "react-router-dom";

const pageTitles = {
  "/profile":      "Profile",
  "/history":      "History",
  "/workout":      "Workout",
  "/exercises":    "Exercises",
  "/measurements": "Measurements",
};

function TopBar() {
  const { pathname } = useLocation();

  const title =
    pageTitles[pathname] ||
    Object.entries(pageTitles).find(([path]) =>
      pathname.startsWith(path)
    )?.[1] ||
    "FitTrack";

  return (
    <h1
      className="text-xl font-semibold tracking-tight"
      style={{ color: "var(--text-primary)" }}
    >
      {title}
    </h1>
  );
}

export default TopBar;