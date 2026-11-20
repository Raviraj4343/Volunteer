import { Link, NavLink } from "react-router";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./navItems";

export function Sidebar() {
  const { user } = useUser();
  const items = NAV_ITEMS.filter((item) => item.to !== "/create");

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background px-4 py-6 lg:flex">
      <Link to="/home" className="px-3" aria-label="Volunteer home">
        <Logo />
      </Link>

      <Button asChild size="lg" className="mx-1 mt-8">
        <Link to="/create">
          <Plus className="size-5" /> Create mission
        </Link>
      </Button>

      <nav aria-label="Main" className="mt-6 flex-1">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors",
                    isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <Icon className="size-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3 rounded-2xl border p-3">
        <UserButton />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user?.fullName || "Your account"}</p>
          <p className="truncate text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
    </aside>
  );
}
