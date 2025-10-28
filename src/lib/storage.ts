/**
 * localStorage utility functions with defensive parsing
 */

/**
 * Safely parse JSON from localStorage with fallback
 */
export function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage key: ${key}`, error);
    return fallback;
  }
}

/**
 * Safely set JSON to localStorage with error handling
 */
export function safeSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to set localStorage key: ${key}`, error);
    // Check if quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
    }
    return false;
  }
}

/**
 * Remove item from localStorage
 */
export function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage key: ${key}`, error);
  }
}

/**
 * Clear all Focus Timer Hub data from localStorage
 */
export function clearAll(): void {
  const keys = Object.keys(localStorage);
  const ftKeys = keys.filter(key => key.startsWith('FT_'));
  ftKeys.forEach(key => safeRemove(key));
}

