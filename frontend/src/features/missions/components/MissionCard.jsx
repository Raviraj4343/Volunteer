import { Link } from "react-router";
import { MapPin, Siren } from "lucide-react";
import { AvatarStack } from "@/components/common/UserAvatar";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMissionDate } from "@/lib/format";
import { formatDistance } from "@/lib/geo";
import { cn } from "@/lib/utils";
import { MissionCover } from "./MissionCover";

export function SpotsLabel({ mission, className }) {
  const { spotsLeft, membersCount } = mission;
  return (
    <span className={cn("text-xs font-semibold text-muted-foreground", className)}>
      {membersCount} going ·{" "}
      {spotsLeft === 0 ? (
        <span className="text-destructive">Full</span>
      ) : spotsLeft <= 2 ? (
        <span className="text-warning">{spotsLeft} spot{spotsLeft > 1 ? "s" : ""} left</span>
      ) : (
        `${spotsLeft} spots left`
      )}
    </span>
  );
}

export function MissionCard({ mission }) {
  return (
    <Link
      to={`/missions/${mission.id}`}
      className="group block rounded-3xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
    >
      <MissionCover category={mission.category} className="aspect-[16/9] transition-transform duration-300 group-hover:scale-[1.01]">
        <div className="absolute top-3 left-3 flex gap-1.5">
          <CategoryBadge category={mission.category} className="bg-white/90 backdrop-blur" />
          {mission.urgent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white">
              <Siren className="size-3.5" /> Urgent
            </span>
          )}
        </div>
        {mission.isMember && (
          <span className="absolute top-3 right-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {mission.isHost ? "Hosting" : "Joined"}
          </span>
        )}
      </MissionCover>

      <div className="px-1 pt-3">
        <p className="text-[13px] font-semibold text-primary">{formatMissionDate(mission.startsAt)}</p>
        <h3 className="mt-0.5 line-clamp-2 text-base leading-snug font-bold group-hover:underline group-hover:underline-offset-2">
          {mission.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 truncate text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{mission.location.area}, {mission.location.city}</span>
          {mission.distanceKm != null && <span className="shrink-0">· {formatDistance(mission.distanceKm)}</span>}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <AvatarStack users={mission.membersPreview} total={mission.membersCount} max={3} />
          <SpotsLabel mission={mission} />
        </div>
      </div>
    </Link>
  );
}

export function MissionCardSkeleton() {
  return (
    <div aria-hidden>
      <Skeleton className="aspect-[16/9] rounded-2xl" />
      <div className="space-y-2 px-1 pt-3">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
