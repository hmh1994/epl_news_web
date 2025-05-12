import { parseISO, isToday, isTomorrow, format } from "date-fns";

// Helper function to format date display
export function formatMatchDate(dateString: string) {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "EEEE, d MMMM yyyy");
  }
}
// Helper function to format time
export function formatMatchTime(dateString: string) {
  const date = parseISO(dateString);
  return format(date, "HH:mm");
}
