import { useAuth, useUser } from "@clerk/clerk-react";
import { setApiSession } from "@/services/api";

// Hands the Clerk session to the API client so every request is
// authenticated (Bearer token for the real backend, user info for the mock).
// Runs during render on purpose, so it's set before child queries fire.
export function ApiAuthBridge() {
  const { getToken } = useAuth();
  const { user } = useUser();

  setApiSession({
    getToken,
    user: user
      ? { id: user.id, name: user.fullName || user.username || "You", avatarUrl: user.imageUrl }
      : null,
  });

  return null;
}
