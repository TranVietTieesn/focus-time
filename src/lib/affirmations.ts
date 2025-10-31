/**
 * Affirmations Database
 * Curated one-line quotes ≤60 characters for immersive header
 * VTea UI Makeover: Emotional tone + brand identity
 */

export const AFFIRMATIONS = [
  'Your thoughts deserve a calm place.',
  'Focus is a gift to yourself.',
  'Deep work changes everything.',
  'One session at a time.',
  'Progress over perfection.',
  'Breathe. Think. Create.',
  'Silence is productivity.',
  'Trust the process.',
  'Small steps, big results.',
  'You are exactly where you need to be.',
  'Presence is power.',
  'What matters gets done here.',
  'Calm clarity leads.',
  'This moment is yours.',
  'Pure focus, pure progress.',
];

/**
 * Get a deterministic affirmation based on time of day
 * Changes roughly every 4 hours to reduce perceived repetition
 * while maintaining consistent choice during single session
 */
export function getTodayAffirmation(): string {
  const now = new Date();
  const hour = now.getHours();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  
  // Combine day and 4-hour block to create index
  const timeBlock = Math.floor(hour / 4);
  const index = (dayOfYear + timeBlock) % AFFIRMATIONS.length;
  
  return AFFIRMATIONS[index];
}

/**
 * Get affirmation by index (useful for testing or explicit selection)
 */
export function getAffirmationByIndex(index: number): string {
  return AFFIRMATIONS[index % AFFIRMATIONS.length];
}

/**
 * Get random affirmation (fallback for first render before time-based logic)
 */
export function getRandomAffirmation(): string {
  const index = Math.floor(Math.random() * AFFIRMATIONS.length);
  return AFFIRMATIONS[index];
}
