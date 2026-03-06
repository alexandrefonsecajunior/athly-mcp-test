import { NavLink } from "react-router-dom";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/Badge";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/plan", label: "Plano", icon: "📅" },
  { to: "/training-plan", label: "Calendario", icon: "📆" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-[var(--color-border-dark)] bg-[var(--color-surface-card)] backdrop-blur-sm md:flex">
      {/* Logo Header */}
      <div className="relative flex h-16 items-center gap-3 border-b border-[var(--color-border-dark)] px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <img
          src="/src/assets/icons/main.png"
          alt="Athly"
          className="w-15 h-15"
        />
        <GradientText variant="neon">
          <span className="text-xl font-bold">Athly</span>
        </GradientText>
        <Badge variant="neon" size="sm" className="ml-auto">
          TEST
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "gradient-primary text-white shadow-[var(--shadow-neon)] scale-[1.02]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-dark)] hover:text-[var(--color-text-primary)] hover:scale-[1.02]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-xl transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                >
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
