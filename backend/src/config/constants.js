/**
 * config/constants.js — shared enums and limits, so the same values are used
 * in models/, validators/ and services/ (and match the frontend).
 *
 * Connects to: models/*.js (enum fields), validators/*.js (z.enum), services/*.js.
 * These values are COMPLETE — they mirror frontend/src/config.
 */

export const MISSION_CATEGORIES = ["study", "volunteer", "event", "help"];
export const MISSION_STATUSES = ["upcoming", "ongoing", "completed", "cancelled"];
export const DATE_FILTERS = ["any", "today", "week", "weekend"];
export const DISTANCE_FILTERS_KM = ["2", "5", "10", "25", "any"];

export const STUDY_LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export const TIME_SLOTS = ["morning", "afternoon", "evening", "night"];

export const REPORT_TARGETS = ["mission", "user", "message"];
export const REPORT_REASONS = ["spam", "unsafe", "fake", "harassment", "other"];
export const REPORT_STATUSES = ["open", "reviewing", "actioned", "dismissed"];

export const NOTIFICATION_TYPES = [
  "mission_joined",
  "mission_left",
  "mission_updated",
  "mission_cancelled",
  "mission_reminder",
  "new_message",
  "rating_received",
  "badge_earned",
  "study_match",
];

export const USER_ROLES = ["user", "admin"];

export const PAGINATION = { DEFAULT_LIMIT: 20, MAX_LIMIT: 50 };
export const CHAT = { MAX_MESSAGE_LENGTH: 2000, HISTORY_PAGE_SIZE: 30 };

// How many minutes before/after start a member may check in.
export const CHECK_IN_WINDOW_MINUTES = { BEFORE: 30, AFTER: 120 };
