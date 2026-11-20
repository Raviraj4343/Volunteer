import { Route, Routes } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute, PublicOnlyRoute } from "@/features/auth/RouteGuards";
import { SignInPage, SignUpPage } from "@/features/auth/AuthPages";
import { LandingPage } from "@/features/landing/LandingPage";
import { HomePage } from "@/features/missions/pages/HomePage";
import { MissionDetailsPage } from "@/features/missions/pages/MissionDetailsPage";
import { ComingSoonPage } from "@/pages/ComingSoonPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/missions/:missionId" element={<MissionDetailsPage />} />
          <Route path="/create" element={<ComingSoonPage title="Create a mission" />} />
          <Route path="/study" element={<ComingSoonPage title="Find study mates" />} />
          <Route path="/chats/*" element={<ComingSoonPage title="Chats" />} />
          <Route path="/notifications" element={<ComingSoonPage title="Notifications" />} />
          <Route path="/profile/*" element={<ComingSoonPage title="Profile" />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
