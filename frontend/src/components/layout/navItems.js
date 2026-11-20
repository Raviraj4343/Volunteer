import { Compass, PlusCircle, MessageCircle, UserRound, GraduationCap, Bell } from "lucide-react";

// `mobile: true` items appear in the bottom tab bar (max 4 for thumb reach).
export const NAV_ITEMS = [
  { to: "/home", label: "Explore", icon: Compass, mobile: true },
  { to: "/study", label: "Study mates", icon: GraduationCap },
  { to: "/create", label: "Create", icon: PlusCircle, mobile: true },
  { to: "/chats", label: "Chats", icon: MessageCircle, mobile: true },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: UserRound, mobile: true },
];
