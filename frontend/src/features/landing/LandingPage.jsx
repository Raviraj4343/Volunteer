import { Link } from "react-router";
import { ArrowRight, MapPin, MessageCircle, ShieldCheck, Star, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { CategoryBadge } from "@/components/common/CategoryBadge";
import { AvatarStack } from "@/components/common/UserAvatar";
import { CATEGORY_LIST } from "@/config/categories";
import { MissionCover } from "@/features/missions/components/MissionCover";

const PREVIEW_MISSIONS = [
  {
    category: "volunteer",
    title: "Ulsoor Lake shoreline cleanup",
    meta: "Sat · 7:00 AM · Halasuru",
    going: 14,
    people: [{ id: "a", name: "Ananya Iyer" }, { id: "b", name: "Karthik Rao" }, { id: "c", name: "Meera Pillai" }],
  },
  {
    category: "study",
    title: "DSA prep group — graphs & DP",
    meta: "Tomorrow · 6:30 PM · Indiranagar",
    going: 3,
    people: [{ id: "d", name: "Rohan Mehta" }, { id: "e", name: "Aditya Joshi" }],
  },
  {
    category: "help",
    title: "Groceries for an elderly couple",
    meta: "Today · 5:00 PM · Jayanagar",
    going: 1,
    people: [{ id: "f", name: "Divya Menon" }],
  },
];

const STEPS = [
  { icon: MapPin, title: "Find a mission nearby", text: "Browse cleanups, study groups, events and people who need a hand — sorted by distance." },
  { icon: UsersRound, title: "Join in one tap", text: "See who's going, what to bring, and exactly where to meet. No forms, no fuss." },
  { icon: MessageCircle, title: "Coordinate in the group chat", text: "Every mission gets its own chat, so plans stay in one place." },
];

function PreviewCard({ mission, className }) {
  return (
    <div className={`w-64 rounded-3xl bg-background p-2.5 shadow-float ${className}`}>
      <MissionCover category={mission.category} className="h-28">
        <CategoryBadge category={mission.category} className="absolute top-2.5 left-2.5 bg-white/90" />
      </MissionCover>
      <div className="px-1.5 pt-3 pb-1.5">
        <p className="text-xs font-semibold text-primary">{mission.meta}</p>
        <p className="mt-0.5 text-sm leading-snug font-bold">{mission.title}</p>
        <div className="mt-2.5 flex items-center justify-between">
          <AvatarStack users={mission.people} size="size-6" />
          <span className="text-xs font-semibold text-muted-foreground">{mission.going} going</span>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost">
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/sign-up">Get started</Link>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary">
            <span className="size-2 rounded-full bg-primary" /> 1,200+ missions this week in Bengaluru
          </span>
          <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-extrabold sm:text-6xl">
            Find your people.
            <br />
            <span className="text-primary">Do some good.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Volunteer connects you with people nearby for study sessions, lake cleanups, community events — or simply
            helping a neighbour who needs it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 px-7 text-base">
              <Link to="/sign-up">
                Find missions near me <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-13 px-7 text-base">
              <Link to="/sign-in">I have an account</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <AvatarStack
              users={[
                { id: "1", name: "Priya Nair" },
                { id: "2", name: "Arjun Reddy" },
                { id: "3", name: "Sneha Kulkarni" },
                { id: "4", name: "Vikram Singh" },
              ]}
            />
            <span>
              <span className="font-semibold text-foreground">48,000+</span> people helping across 40 cities
            </span>
          </div>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-md" aria-hidden>
          <div className="absolute inset-6 rounded-[3rem] bg-primary-soft" />
          <PreviewCard mission={PREVIEW_MISSIONS[0]} className="absolute top-0 left-0 -rotate-3 sm:left-2" />
          <PreviewCard mission={PREVIEW_MISSIONS[1]} className="absolute top-24 right-0 rotate-2 sm:right-2" />
          <PreviewCard mission={PREVIEW_MISSIONS[2]} className="absolute bottom-0 left-8 -rotate-1" />
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Four ways to show up</h2>
          <p className="mt-2 text-muted-foreground">Big or small, every mission starts with someone nearby.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_LIST.map(({ id, label, description, icon: Icon, className }) => (
              <div key={id} className="rounded-3xl bg-background p-6">
                <div className={`flex size-12 items-center justify-center rounded-2xl ${className}`}>
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{label}</h3>
                <p className="mt-1 text-[15px] text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-bold">How it works</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  {i + 1}
                </span>
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-1.5 text-[15px] text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 rounded-[2rem] bg-foreground p-8 text-background sm:p-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Safety is built in</h2>
            <p className="mt-3 text-background/70">
              Reliability ratings show who shows up. Report or block anyone in two taps. Every report is reviewed by a
              real person within 24 hours.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              [Star, "Reliability ratings after every mission"],
              [ShieldCheck, "Verified sign-in with Google or email"],
              [MessageCircle, "Chats stay inside the app — no need to share your number"],
            ].map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-3 font-medium">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/10">
                  <Icon className="size-5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Someone nearby needs you today.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">Join free. Find your first mission in under a minute.</p>
        <Button asChild size="lg" className="mt-8 h-13 px-8 text-base">
          <Link to="/sign-up">Get started — it's free</Link>
        </Button>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <Logo />
          <p>© {new Date().getFullYear()} Volunteer · Made with care in India</p>
        </div>
      </footer>
    </div>
  );
}
