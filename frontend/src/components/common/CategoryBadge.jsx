import { CATEGORIES } from "@/config/categories";
import { cn } from "@/lib/utils";

export function CategoryBadge({ category, className }) {
  const cat = CATEGORIES[category];
  if (!cat) return null;
  const Icon = cat.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", cat.className, className)}>
      <Icon className="size-3.5" />
      {cat.label}
    </span>
  );
}
