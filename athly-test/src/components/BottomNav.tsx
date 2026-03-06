import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Home", icon: "🏠" },
  { to: "/plan", label: "Plano", icon: "📅" },
  { to: "/training-plan", label: "Calendario", icon: "📆" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border-dark)] bg-[var(--color-surface-card)]/95 backdrop-blur-lg md:hidden">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-card opacity-30" />
        <div className="relative flex justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex flex-col items-center gap-1 px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-[var(--color-primary-neon)]"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full gradient-primary animate-pulse-glow" />
                  )}
                  <span
                    className={`text-2xl transition-all ${
                      isActive
                        ? 'scale-110 drop-shadow-[0_0_8px_var(--color-primary-neon)]'
                        : 'group-hover:scale-110'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className={isActive ? 'text-gradient font-bold' : ''}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-[var(--color-primary-neon)] animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
