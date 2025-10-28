/**
 * Date utility functions for timezone-safe date handling
 */

/**
 * Get current date as ISO string (YYYY-MM-DD)
 * Uses local timezone
 */
export function getTodayISO(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Check if stored date is different from today
 * Returns true if date has changed (midnight passed)
 */
export function hasDateChanged(storedDate: string): boolean {
  const today = getTodayISO();
  return storedDate !== today;
}

/**
 * Format minutes as hours and minutes
 * Example: 75 -> "1h 15m"
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

