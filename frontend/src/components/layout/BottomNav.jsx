import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navItems";

export function BottomNav() {
  const items = NAV_ITEMS.filter((item) => item.mobile);

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-[500] border-t bg-background/95 pb-safe backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="size-6" strokeWidth={isActive ? 2.4 : 1.8} />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
