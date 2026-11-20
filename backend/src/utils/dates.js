/**
 * utils/dates.js — converts the frontend's date filter ("today" | "week" |
 * "weekend" | "any") into a { $gte, $lte } range for MongoDB.
 *
 * Connects to: services/mission.service.js (buildMissionFilter),
 * config/constants.js (DATE_FILTERS).
 * Reference implementation of the same logic (in the browser):
 *   frontend/src/services/api/mock/adapter.js → matchesDate()
 */

export function dateRangeFor(filter, now = new Date()) {
  // TODO:
  //   "today"   → start of today … end of today
  //   "week"    → now … end of this week (Sunday 23:59)
  //   "weekend" → next Saturday 00:00 … Sunday 23:59 (or today if it's already the weekend)
  //   "any"     → { $gte: now } (only upcoming missions)
  //   return an object you can drop straight into a query: { startsAt: { $gte, $lte } }
  // HINT: Plain Date methods are enough: setHours(0,0,0,0), getDay() (0 = Sunday).
  //       Or install date-fns (same library the frontend uses): startOfDay, endOfWeek, nextSaturday.
  //       Timezones: servers usually run in UTC; users are in IST (UTC+5:30). Search
  //       "javascript date timezone IST" when "today" looks off by a few hours.
}
