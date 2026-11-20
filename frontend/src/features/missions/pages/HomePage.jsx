import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Bell, List, Map as MapIcon, MapPin, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { LogoMark } from "@/components/common/Logo";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";
import { useMissions } from "../hooks/useMissions";
import { useMissionFilters } from "../hooks/useMissionFilters";
import { MissionCard, MissionCardSkeleton } from "../components/MissionCard";
import { CategoryChips, DateFilter, DistanceFilter, SearchBar } from "../components/MissionFilters";
import { MissionsMap } from "../components/MissionsMap";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function MobileHeader() {
  return (
    <header className="flex items-center justify-between px-4 pt-4 lg:hidden">
      <Link to="/home" aria-label="Volunteer home">
        <LogoMark />
      </Link>
      <div className="flex items-center gap-1">
        <Button asChild variant="ghost" size="icon" aria-label="Notifications">
          <Link to="/notifications" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
          </Link>
        </Button>
        <UserButton />
      </div>
    </header>
  );
}

export function HomePage() {
  const { user } = useUser();
  const location = useUserLocation();
  const { filters, setFilter, resetFilters, activeCount } = useMissionFilters();
  const { view, ...apiFilters } = filters;

  // Search typing is local; the URL (and the API call) update after a pause.
  const [search, setSearch] = useState(filters.q);
  const debouncedSearch = useDebouncedValue(search, 350);
  useEffect(() => setFilter("q", debouncedSearch), [debouncedSearch, setFilter]);

  const { data, isPending, isError, error, refetch, isFetching } = useMissions(apiFilters);
  const missions = data?.items ?? [];
  const isMap = view === "map";

  return (
    <div className="mx-auto max-w-7xl">
      <MobileHeader />

      <section className="px-4 pt-5 sm:px-6 lg:px-10 lg:pt-10">
        <p className="text-sm font-medium text-muted-foreground">
          {greeting()}, {user?.firstName || "there"} 👋
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">What will you do today?</h1>

        <div className="mt-5 space-y-3 lg:max-w-2xl">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mt-4">
          <CategoryChips value={filters.category} onChange={(v) => setFilter("category", v)} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-live="polite">
            <MapPin className="size-4 text-primary" />
            {isPending ? (
              "Finding missions…"
            ) : (
              <>
                <span className="font-semibold text-foreground">{missions.length}</span>
                {missions.length === 1 ? "mission" : "missions"} near {location.label}
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <DistanceFilter value={filters.distance} onChange={(v) => setFilter("distance", v)} />
            <DateFilter value={filters.date} onChange={(v) => setFilter("date", v)} />
          </div>
        </div>
      </section>

      <section className={cn("mt-5 transition-opacity", isFetching && !isPending && "opacity-60")} aria-busy={isFetching}>
        {isError ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : isPending ? (
          <div className="grid gap-x-6 gap-y-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-10 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <MissionCardSkeleton key={i} />
            ))}
          </div>
        ) : missions.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No missions match those filters"
            description="Try widening the distance or picking a different date. Or start one yourself — someone nearby is probably waiting for it."
            action={
              <div className="flex flex-col gap-2 sm:flex-row">
                {activeCount > 0 && (
                  <Button variant="outline" onClick={() => { setSearch(""); resetFilters(); }}>
                    Clear filters
                  </Button>
                )}
                <Button asChild>
                  <Link to="/create">Create a mission</Link>
                </Button>
              </div>
            }
          />
        ) : isMap ? (
          <MissionsMap
            missions={missions}
            center={location}
            className="h-[calc(100dvh-20rem)] min-h-[420px] border-y sm:mx-6 sm:rounded-3xl sm:border lg:mx-10 lg:h-[calc(100dvh-19rem)]"
          />
        ) : (
          <div className="grid gap-x-6 gap-y-8 px-4 pb-24 sm:grid-cols-2 sm:px-6 lg:px-10 xl:grid-cols-3">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </section>

      {/* Airbnb-style floating list/map switch */}
      {!isError && missions.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[450] flex justify-center lg:bottom-8 lg:pl-64">
          <Button
            onClick={() => setFilter("view", isMap ? "list" : "map")}
            className="pointer-events-auto h-11 bg-foreground px-5 text-background shadow-float hover:bg-foreground/90"
          >
            {isMap ? <List /> : <MapIcon />}
            {isMap ? "Show list" : "Show map"}
          </Button>
        </div>
      )}
    </div>
  );
}
