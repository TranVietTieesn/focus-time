/**
 * Time utility functions for accurate timer countdown
 * Uses wall-clock delta to handle background tab throttling
 */

/**
 * Get high-resolution timestamp
 */
export function now(): number {
  return performance.now();
}

/**
 * Calculate elapsed time in seconds from start timestamp
 */
export function getElapsedSeconds(startTime: number): number {
  return (now() - startTime) / 1000;
}

/**
 * Calculate remaining seconds given initial duration and start time
 */
export function getRemainingSeconds(initialDuration: number, startTime: number): number {
  const elapsed = getElapsedSeconds(startTime);
  return Math.max(0, initialDuration - elapsed);
}

/**
 * Format seconds as MM:SS
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Convert minutes to seconds
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

/**
 * Convert seconds to minutes (rounded up)
 */
export function secondsToMinutes(seconds: number): number {
  return Math.ceil(seconds / 60);
}

