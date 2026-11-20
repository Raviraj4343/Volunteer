import { format, isToday, isTomorrow, isThisYear, formatDistanceToNowStrict } from "date-fns";

export function formatMissionDate(iso) {
  const date = new Date(iso);
  const time = format(date, "h:mm a");
  if (isToday(date)) return `Today · ${time}`;
  if (isTomorrow(date)) return `Tomorrow · ${time}`;
  return `${format(date, isThisYear(date) ? "EEE, d MMM" : "d MMM yyyy")} · ${time}`;
}

export function formatDuration(hours) {
  if (!hours) return "";
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  return Number.isInteger(hours) ? `${hours} hr${hours > 1 ? "s" : ""}` : `${hours} hrs`;
}

export function timeAgo(iso) {
  return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
}
