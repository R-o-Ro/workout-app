import { NavLink } from "react-router-dom";
import { User, ClipboardList, Dumbbell, BookOpen, Ruler } from "lucide-react";
import useWorkout from "../../features/workout/hooks/useWorkout";

const navItems = [
  { to: "/profile",      label: "Profile",   Icon: User },
  { to: "/history",      label: "History",   Icon: ClipboardList },
  { to: "/workout",      label: "Workout",   Icon: Dumbbell },
  { to: "/exercises",    label: "Exercises", Icon: BookOpen },
  { to: "/measurements", label: "Measure",   Icon: Ruler },
];

function SideNav() {
  const { isActive, elapsed, formatTime } = useWorkout();

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--bg-surface)", borderRight: "1px solid var(--border)" }}>

      {/* Logo */}
      <div className="px-6 py-6 mb-2">
        <div className="flex items-center gap-2.5">
          <Dumbbell size={18} style={{ color: "var(--purple-light)" }} />
          <span className="font-bold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>FitTrack</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {/* eslint-disable-next-line no-unused-vars */}
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive: active }) => ({
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.15s",
              background: active ? "var(--purple-dim)" : "transparent",
              color: active ? "var(--purple-light)" : "var(--text-secondary)",
              textDecoration: "none",
            })}
          >
            {({ isActive: active }) => (
              <>
                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                <span className="flex-1">
                  {to === "/workout" && isActive
                    ? formatTime(elapsed)
                    : label}
                </span>
                {to === "/workout" && isActive && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--purple-light)" }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>FitTrack v1.0</p>
      </div>

    </div>
  );
}

export default SideNav;