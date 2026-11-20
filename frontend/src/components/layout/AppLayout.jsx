import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { ScrollToTop } from "./ScrollToTop";

export function AppLayout() {
  return (
    <div className="min-h-dvh lg:pl-64">
      <ScrollToTop />
      <Sidebar />
      {/* Bottom padding leaves room for the mobile tab bar */}
      <main className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
