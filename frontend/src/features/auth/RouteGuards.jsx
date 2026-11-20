import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { FullScreenLoader } from "@/components/common/FullScreenLoader";

export function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) return <FullScreenLoader />;
  if (!isSignedIn) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/sign-in?redirect_url=${redirect}`} replace />;
  }
  return <Outlet />;
}

// Landing page: signed-in users go straight to the app.
export function PublicOnlyRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <FullScreenLoader />;
  if (isSignedIn) return <Navigate to="/home" replace />;
  return <Outlet />;
}
