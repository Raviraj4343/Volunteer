import { CATEGORIES } from "@/config/categories";
import { cn } from "@/lib/utils";

// Illustrated cover generated from the category — consistent, fast,
// and never broken like hot-linked photos can be.
export function MissionCover({ category, className, children }) {
  const cat = CATEGORIES[category] ?? CATEGORIES.volunteer;
  const Icon = cat.icon;

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        background: `linear-gradient(135deg, var(--cat-${cat.id}-soft) 0%, color-mix(in oklab, ${cat.color} 24%, white) 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -top-10 -left-10 size-40 rounded-full opacity-40"
        style={{ background: `color-mix(in oklab, ${cat.color} 12%, white)` }}
      />
      <div
        aria-hidden
        className="absolute -right-6 -bottom-12 size-44 rounded-full opacity-60"
        style={{ background: `color-mix(in oklab, ${cat.color} 30%, white)` }}
      />
      <Icon
        aria-hidden
        className="absolute right-5 bottom-4 size-16 opacity-90"
        strokeWidth={1.4}
        style={{ color: cat.color }}
      />
      {children}
    </div>
  );
}
