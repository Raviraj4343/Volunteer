import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Ellipsis,
  Flag,
  LogOut,
  MapPin,
  MessageCircle,
  Navigation,
  Share2,
  ShieldCheck,
  Siren,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import { ErrorState } from "@/components/common/ErrorState";
import { UserAvatar } from "@/components/common/UserAvatar";
import { ReportDialog } from "@/features/safety/ReportDialog";
import { BlockUserDialog } from "@/features/safety/BlockUserDialog";
import { useUserLocation } from "@/hooks/useUserLocation";
import { formatDuration, formatMissionDate } from "@/lib/format";
import { formatDistance } from "@/lib/geo";
import { useJoinMission, useLeaveMission, useMission } from "../hooks/useMissions";
import { MissionCover } from "../components/MissionCover";
import { MissionsMap } from "../components/MissionsMap";

function InfoRow({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="py-6">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

function CapacityBar({ mission }) {
  const pct = Math.min(100, Math.round((mission.membersCount / mission.spotsTotal) * 100));
  return (
    <div className="mt-2 h-1.5 w-full max-w-60 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** The one primary action for this screen: Join → Open chat. */
function PrimaryAction({ mission, onJoin, isJoining, className }) {
  if (mission.isMember) {
    return (
      <Button asChild size="lg" className={className}>
        <Link to={`/chats/${mission.id}`}>
          <MessageCircle className="size-5" /> Open group chat
        </Link>
      </Button>
    );
  }
  if (mission.spotsLeft === 0) {
    return (
      <Button size="lg" disabled className={className}>
        Mission is full
      </Button>
    );
  }
  return (
    <Button size="lg" onClick={onJoin} disabled={isJoining} className={className}>
      {isJoining ? "Joining…" : "Join mission"}
    </Button>
  );
}

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-10 lg:pt-10" aria-hidden>
      <Skeleton className="aspect-[16/9] rounded-3xl sm:aspect-[21/8]" />
      <div className="mt-6 space-y-3 lg:max-w-2xl">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-5 w-1/2" />
        <div className="space-y-5 pt-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="size-11 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3.5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MissionDetailsPage() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const userLocation = useUserLocation();
  const { data: mission, isPending, isError, error, refetch } = useMission(missionId);
  const join = useJoinMission();
  const leave = useLeaveMission();

  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/home"));

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: mission.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied", { description: "Share it with friends who might want to join." });
      }
    } catch {
      // user cancelled the share sheet
    }
  };

  const topBar = (
    <div className="sticky top-0 z-[400] flex items-center justify-between bg-background/90 px-2 py-2 backdrop-blur-md sm:px-4 lg:static lg:mx-auto lg:max-w-6xl lg:bg-transparent lg:px-8 lg:pt-6 lg:backdrop-blur-none">
      <Button variant="ghost" size="icon" onClick={goBack} aria-label="Go back">
        <ChevronLeft className="size-6" />
      </Button>
      {mission && (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={share} aria-label="Share mission">
            <Share2 className="size-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More options">
                <Ellipsis className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {mission.isMember && !mission.isHost && (
                <>
                  <DropdownMenuItem onSelect={() => setLeaveOpen(true)}>
                    <LogOut /> Leave mission
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem variant="destructive" onSelect={() => setReportOpen(true)}>
                <Flag /> Report mission
              </DropdownMenuItem>
              {!mission.isHost && (
                <DropdownMenuItem variant="destructive" onSelect={() => setBlockOpen(true)}>
                  <Ban /> Block {mission.host.name.split(" ")[0]}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );

  if (isPending) {
    return (
      <>
        {topBar}
        <DetailsSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <>
        {topBar}
        <ErrorState
          error={error}
          title={error?.status === 404 ? "Mission not found" : undefined}
          onRetry={error?.status === 404 ? undefined : refetch}
        />
      </>
    );
  }

  const { host, location } = mission;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

  return (
    <div className="pb-28 lg:pb-16">
      {topBar}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <MissionCover category={mission.category} className="aspect-[16/9] rounded-3xl sm:aspect-[21/8]">
          {mission.urgent && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5 text-sm font-semibold text-white">
              <Siren className="size-4" /> Urgent help needed
            </span>
          )}
        </MissionCover>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-12">
          <article>
            <header className="pt-6">
              <CategoryBadge category={mission.category} />
              <h1 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">{mission.title}</h1>
              <div className="mt-4 flex items-center gap-3">
                <UserAvatar user={host} className="size-10" />
                <div>
                  <p className="text-[15px] font-semibold">
                    Hosted by {mission.isHost ? "you" : host.name}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="size-3.5 fill-warning text-warning" />
                    {host.reliability.toFixed(1)} reliability
                    {host.city && <span>· {host.city}</span>}
                  </p>
                </div>
              </div>
            </header>

            <Separator className="mt-6" />

            <div className="space-y-5 py-6">
              <InfoRow
                icon={CalendarDays}
                title={formatMissionDate(mission.startsAt)}
                subtitle={`Takes about ${formatDuration(mission.durationHours)}`}
              />
              <InfoRow
                icon={MapPin}
                title={location.name}
                subtitle={`${location.area}, ${location.city}${mission.distanceKm != null ? ` · ${formatDistance(mission.distanceKm)}` : ""}`}
              />
              <InfoRow
                icon={Users}
                title={`${mission.membersCount} of ${mission.spotsTotal} people joined`}
                subtitle={mission.spotsLeft ? `${mission.spotsLeft} spots left` : "No spots left"}
              >
                <CapacityBar mission={mission} />
              </InfoRow>
            </div>

            <Separator />

            <Section title="About this mission">
              <p className="text-[15px] leading-relaxed whitespace-pre-line text-foreground/85">{mission.description}</p>
              {mission.study && (
                <dl className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-muted p-4 text-sm">
                  {[
                    ["Subject", mission.study.subject],
                    ["Exam", mission.study.exam],
                    ["Level", mission.study.level],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {mission.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {mission.tags.map((tag) => (
                    <span key={tag} className="rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Section>

            {mission.requirements.length > 0 && (
              <>
                <Separator />
                <Section title="What to bring">
                  <ul className="space-y-3">
                    {mission.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3 text-[15px]">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </Section>
              </>
            )}

            <Separator />

            <Section title={`Who's going (${mission.membersCount})`}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {mission.members.map((member) => (
                  <li key={member.id} className="flex items-center gap-3 rounded-2xl border p-3">
                    <UserAvatar user={member} className="size-11" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{member.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{member.bio || member.city}</p>
                    </div>
                    {member.id === host.id && (
                      <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">Host</span>
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            <Separator />

            <Section title="Where you'll meet">
              <MissionsMap
                missions={[mission]}
                center={location}
                showUser={false}
                interactive={false}
                className="h-56 rounded-3xl border"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{location.name}, {location.city}</p>
                <Button asChild variant="outline" size="sm">
                  <a href={directionsUrl} target="_blank" rel="noreferrer">
                    <Navigation /> Directions
                  </a>
                </Button>
              </div>
            </Section>

            <p className="flex items-start gap-2 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              Meet in public places, share your plans with someone you trust, and report anything that feels off.
            </p>
          </article>

          {/* Desktop: sticky action card */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 mt-6 rounded-3xl border p-6 shadow-card">
              <p className="text-sm font-semibold text-primary">{formatMissionDate(mission.startsAt)}</p>
              <p className="mt-1 text-lg font-bold">{location.area}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {mission.membersCount} of {mission.spotsTotal} joined
              </p>
              <CapacityBar mission={mission} />
              <PrimaryAction
                mission={mission}
                onJoin={() => join.mutate(mission.id)}
                isJoining={join.isPending}
                className="mt-6 w-full"
              />
              {mission.isMember && !mission.isHost && (
                <Button variant="ghost" className="mt-2 w-full text-muted-foreground" onClick={() => setLeaveOpen(true)}>
                  Leave mission
                </Button>
              )}
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {mission.isMember ? "You'll get reminders before it starts." : "Free to join · you can leave anytime"}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile: action bar above the tab bar */}
      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-[450] border-t bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{formatMissionDate(mission.startsAt)}</p>
            <p className="text-xs text-muted-foreground">
              {mission.spotsLeft ? `${mission.spotsLeft} spots left` : "Full"} · Free
            </p>
          </div>
          <PrimaryAction mission={mission} onJoin={() => join.mutate(mission.id)} isJoining={join.isPending} />
        </div>
      </div>

      <ReportDialog open={reportOpen} onOpenChange={setReportOpen} targetType="mission" targetId={mission.id} />
      <BlockUserDialog open={blockOpen} onOpenChange={setBlockOpen} user={host} onBlocked={() => navigate("/home")} />

      <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave this mission?</DialogTitle>
            <DialogDescription>
              {host.name.split(" ")[0]} is counting on you. Leaving often affects your reliability rating — please only leave if you can't make it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setLeaveOpen(false)}>
              Stay
            </Button>
            <Button
              variant="destructive"
              disabled={leave.isPending}
              onClick={() => leave.mutate(mission.id, { onSuccess: () => setLeaveOpen(false) })}
            >
              {leave.isPending ? "Leaving…" : "Leave mission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
