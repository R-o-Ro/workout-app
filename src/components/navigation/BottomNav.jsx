import { NavLink } from "react-router-dom";
import useWorkout from "../../features/workout/hooks/useWorkout";

const navItems = [
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/history", label: "History", icon: "📋" },
  { to: "/workout", label: "Workout", icon: "🏋️" },
  { to: "/exercises", label: "Exercises", icon: "💪" },
  { to: "/measurements", label: "Measure", icon: "📏" },
];

function BottomNav() {

  const { isActive, elapsed, formatTime } = useWorkout();

  return (

    <div className="flex justify-around items-center h-full px-2">

      {navItems.map((item) => (

        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive: active }) =>
            `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors relative ${
              active
                ? "text-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`
          }
        >

          <div className="relative">

            <span className="text-xl">{item.icon}</span>

            {/* Active workout dot on Workout tab */}
            {item.to === "/workout" && isActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
            )}

          </div>

          {/* Show live timer under Workout tab when active */}
          {item.to === "/workout" && isActive ? (
            <span className="text-xs font-medium text-purple-400">
              {formatTime(elapsed)}
            </span>
          ) : (
            <span className="text-xs font-medium">{item.label}</span>
          )}

        </NavLink>

      ))}

    </div>

  );

}

export default BottomNav;