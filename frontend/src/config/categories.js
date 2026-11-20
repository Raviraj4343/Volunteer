import { GraduationCap, Sprout, PartyPopper, HandHeart } from "lucide-react";

// Single source of truth for mission categories (labels, icons, colours).
export const CATEGORIES = {
  study: {
    id: "study",
    label: "Study",
    description: "Find study partners and groups",
    icon: GraduationCap,
    color: "var(--cat-study)",
    className: "bg-cat-study-soft text-cat-study",
  },
  volunteer: {
    id: "volunteer",
    label: "Volunteer",
    description: "Cleanups, drives and local causes",
    icon: Sprout,
    color: "var(--cat-volunteer)",
    className: "bg-cat-volunteer-soft text-cat-volunteer",
  },
  event: {
    id: "event",
    label: "Event",
    description: "Organise meetups and community events",
    icon: PartyPopper,
    color: "var(--cat-event)",
    className: "bg-cat-event-soft text-cat-event",
  },
  help: {
    id: "help",
    label: "Help needed",
    description: "Someone nearby needs a hand",
    icon: HandHeart,
    color: "var(--cat-help)",
    className: "bg-cat-help-soft text-cat-help",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
