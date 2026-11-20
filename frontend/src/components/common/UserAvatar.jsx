import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, initials } from "@/lib/utils";

// Deterministic soft colour per person so initials avatars feel varied.
const PALETTE = [
  "bg-cat-study-soft text-cat-study",
  "bg-cat-volunteer-soft text-cat-volunteer",
  "bg-cat-event-soft text-cat-event",
  "bg-cat-help-soft text-cat-help",
  "bg-primary-soft text-primary",
];

function colorFor(seed = "") {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function UserAvatar({ user, className }) {
  return (
    <Avatar className={className}>
      {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
      <AvatarFallback className={colorFor(user?.id)}>{initials(user?.name)}</AvatarFallback>
    </Avatar>
  );
}

export function AvatarStack({ users = [], total, max = 4, size = "size-7", className }) {
  const shown = users.slice(0, max);
  const extra = (total ?? users.length) - shown.length;
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2">
        {shown.map((u) => (
          <UserAvatar key={u.id} user={u} className={cn(size, "ring-2 ring-background text-[10px]")} />
        ))}
      </div>
      {extra > 0 && <span className="ml-2 text-xs font-semibold text-muted-foreground">+{extra}</span>}
    </div>
  );
}
