import { KeyRound } from "lucide-react";
import { Logo } from "@/components/common/Logo";

// Shown in development when VITE_CLERK_PUBLISHABLE_KEY isn't configured.
export function MissingClerkKey() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-background p-8 shadow-card">
        <Logo />
        <div className="mt-8 flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <KeyRound className="size-6" />
        </div>
        <h1 className="mt-4 text-xl font-bold">Add your Clerk key to get started</h1>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            Create a free app at{" "}
            <a className="font-semibold text-primary underline-offset-4 hover:underline" href="https://dashboard.clerk.com" target="_blank" rel="noreferrer">
              dashboard.clerk.com
            </a>{" "}
            and enable Email + Google.
          </li>
          <li>
            Copy the <span className="font-semibold text-foreground">Publishable key</span>.
          </li>
          <li>
            Paste it into <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">frontend/.env</code>:
          </li>
        </ol>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-foreground p-4 text-sm text-background">VITE_CLERK_PUBLISHABLE_KEY=pk_test_…</pre>
        <p className="mt-4 text-sm text-muted-foreground">Then restart the dev server.</p>
      </div>
    </main>
  );
}
