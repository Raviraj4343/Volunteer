import { Link } from "react-router";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Logo } from "@/components/common/Logo";

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" aria-label="Volunteer home">
          <Logo inverted />
        </Link>
        <div className="max-w-md">
          <p className="text-4xl font-bold leading-tight">“We cleaned 2 tonnes of plastic from Ulsoor Lake with 40 strangers. Now they’re friends.”</p>
          <p className="mt-6 font-medium text-primary-foreground/80">Ananya Iyer · Mission host, Bengaluru</p>
        </div>
        <p className="text-sm text-primary-foreground/70">12,400+ missions completed across 40 cities</p>
        <div aria-hidden className="absolute -right-24 -bottom-24 size-96 rounded-full bg-white/5" />
        <div aria-hidden className="absolute -right-8 top-24 size-40 rounded-full bg-white/5" />
      </aside>

      <main className="flex flex-col items-center justify-center px-4 py-10 sm:px-6">
        <Link to="/" className="mb-8 lg:hidden" aria-label="Volunteer home">
          <Logo />
        </Link>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex w-full max-w-[400px] justify-center">{children}</div>
      </main>
    </div>
  );
}

export function SignInPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to find missions near you">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </AuthShell>
  );
}

export function SignUpPage() {
  return (
    <AuthShell title="Join Volunteer" subtitle="It takes less than a minute">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </AuthShell>
  );
}
