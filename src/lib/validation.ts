/**
 * Validation utility functions for user input
 */

import { TASK_VALIDATION, SETTINGS_VALIDATION } from '@/types';

/**
 * Validate and sanitize task title
 * Throws error if invalid
 */
export function validateTaskTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed.length < TASK_VALIDATION.TITLE_MIN) {
    throw new Error('Task title cannot be empty');
  }
  if (trimmed.length > TASK_VALIDATION.TITLE_MAX) {
    throw new Error(`Task title cannot exceed ${TASK_VALIDATION.TITLE_MAX} characters`);
  }
  return trimmed;
}

/**
 * Validate estimated sessions
 * Returns null for invalid values
 */
export function validateEstimatedSessions(value: number | null): number | null {
  if (value === null) return null;
  
  if (!Number.isInteger(value) || value < TASK_VALIDATION.SESSIONS_MIN || value > TASK_VALIDATION.SESSIONS_MAX) {
    throw new Error(`Estimated sessions must be between ${TASK_VALIDATION.SESSIONS_MIN} and ${TASK_VALIDATION.SESSIONS_MAX}`);
  }
  
  return value;
}

/**
 * Validate duration setting
 */
export function validateDuration(value: number, min: number, max: number, label: string): number {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${label} must be between ${min} and ${max} minutes`);
  }
  return value;
}

/**
 * Validate work duration
 */
export function validateWorkDuration(value: number): number {
  return validateDuration(
    value,
    SETTINGS_VALIDATION.WORK_MIN,
    SETTINGS_VALIDATION.WORK_MAX,
    'Work duration'
  );
}

/**
 * Validate short break duration
 */
export function validateShortBreakDuration(value: number): number {
  return validateDuration(
    value,
    SETTINGS_VALIDATION.SHORT_BREAK_MIN,
    SETTINGS_VALIDATION.SHORT_BREAK_MAX,
    'Short break duration'
  );
}

/**
 * Validate long break duration
 */
export function validateLongBreakDuration(value: number): number {
  return validateDuration(
    value,
    SETTINGS_VALIDATION.LONG_BREAK_MIN,
    SETTINGS_VALIDATION.LONG_BREAK_MAX,
    'Long break duration'
  );
}

/**
 * Validate sessions before long break
 */
export function validateSessionsBeforeLongBreak(value: number): number {
  return validateDuration(
    value,
    SETTINGS_VALIDATION.SESSIONS_MIN,
    SETTINGS_VALIDATION.SESSIONS_MAX,
    'Sessions before long break'
  );
}

