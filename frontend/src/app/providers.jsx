import { useState } from "react";
import { useNavigate } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { ApiAuthBridge } from "@/features/auth/ApiAuthBridge";
import { clerkAppearance } from "@/features/auth/clerkAppearance";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (count, error) => error?.status >= 500 && count < 2,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function AppProviders({ clerkKey, children }) {
  const navigate = useNavigate();
  const [queryClient] = useState(createQueryClient);

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/home"
      signUpFallbackRedirectUrl="/home"
      afterSignOutUrl="/"
      appearance={clerkAppearance}
    >
      <QueryClientProvider client={queryClient}>
        <ApiAuthBridge />
        {children}
        <Toaster />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
