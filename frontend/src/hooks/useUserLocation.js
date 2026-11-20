import { DEFAULT_LOCATION } from "@/config/site";

// For now everyone "lives" in Indiranagar so the seeded missions make sense.
// When the backend is ready, swap this for navigator.geolocation + the
// user's saved home area from their profile.
export function useUserLocation() {
  return DEFAULT_LOCATION;
}
