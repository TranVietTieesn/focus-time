/**
 * Inspirational quotes for focus sessions
 */

export const quotes = [
  'Focus is the gateway to success.',
  'Every moment of focus is a victory.',
  'Concentration is the key to mastery.',
  'Deep work creates deep value.',
  'One task at a time, one victory at a time.',
  'Your mind is powerful when focused.',
  'Focus today, accomplish tomorrow.',
  'Eliminate distractions, amplify results.',
  'Presence is the greatest power.',
  'Attention is the rarest currency.',
  'Stay focused, stay sharp.',
  'Your future self thanks you for this focus.',
  'One hour of focus beats ten hours distracted.',
  'Focus is a superpower.',
  'Silence the noise, amplify your work.',
];

/**
 * Get a random quote
 */
export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
