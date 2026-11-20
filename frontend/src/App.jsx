import { AppProviders } from "@/app/providers";
import { AppRoutes } from "@/app/routes";
import { MissingClerkKey } from "@/features/auth/MissingClerkKey";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const hasValidKey = CLERK_KEY && !CLERK_KEY.includes("xxxx");

export default function App() {
  if (!hasValidKey) return <MissingClerkKey />;

  return (
    <AppProviders clerkKey={CLERK_KEY}>
      <AppRoutes />
    </AppProviders>
  );
}
