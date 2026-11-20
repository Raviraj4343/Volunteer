import { SEED_USERS, buildSeedMissions } from "./seed";

// A tiny localStorage-backed "database" so mock changes (joins, new
// missions, reports) survive page reloads during development.

const STORAGE_KEY = "volunteer.mockdb.v1";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 2; // reseed after 2 days so dates stay fresh

function freshDb() {
  return {
    seededAt: Date.now(),
    users: SEED_USERS,
    missions: buildSeedMissions(),
    reports: [],
    blocked: [],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.seededAt < MAX_AGE_MS) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return freshDb();
}

export const db = load();

export function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // storage full or unavailable — keep working in memory
  }
}

export function resetDb() {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(db, freshDb());
}
