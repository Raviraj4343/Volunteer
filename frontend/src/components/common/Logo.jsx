import { cn } from "@/lib/utils";

export function LogoMark({ className, inverted = false }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" fill={inverted ? "#fff" : "var(--primary)"} />
      <path
        d="M16 24s-7-4.4-7-9.5A3.9 3.9 0 0 1 16 12a3.9 3.9 0 0 1 7 2.5C23 19.6 16 24 16 24Z"
        fill={inverted ? "var(--primary)" : "#fff"}
      />
    </svg>
  );
}

export function Logo({ className, inverted = false }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark inverted={inverted} />
      <span className={cn("text-lg font-extrabold tracking-tight", inverted ? "text-white" : "text-foreground")}>
        Volunteer
      </span>
    </span>
  );
}
