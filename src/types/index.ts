/**
 * Core Type Definitions for Focus Timer
 * Minimal set - timer only, no persistence
 */

export type SessionType = 'work' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';

export const DEFAULT_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
} as const;

