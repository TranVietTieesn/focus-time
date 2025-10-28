/**
 * Core Type Definitions for Focus Timer Hub
 * Copied from specs/001-focus-timer-hub/contracts/types.ts
 */

// ============================================================================
// Enums
// ============================================================================

export type SessionType = "work" | "shortBreak" | "longBreak";
export type TimerStatus = "idle" | "running" | "paused";
export type Theme = "auto" | "light" | "dark";

// ============================================================================
// Core Entities
// ============================================================================

export interface Task {
  id: string;
  title: string;
  estimatedSessions: number | null;
  isCompleted: boolean;
  createdAt: number;
  completedAt: number | null;
}

export interface FocusSession {
  id: string;
  taskId: string | null;
  type: SessionType;
  duration: number;
  startedAt: number;
  completedAt: number;
  wasCompleted: boolean;
}

export interface UserSettings {
  workMin: number;
  shortBreakMin: number;
  longBreakMin: number;
  sessionsBeforeLongBreak: number;
  theme: Theme;
}

export interface DailyStats {
  date: string;
  totalMin: number;
  sessionsCount: number;
}

// ============================================================================
// Utility Types
// ============================================================================

export type TaskCreateInput = Pick<Task, 'title'> & {
  estimatedSessions?: number | null;
};

export type TaskUpdateInput = Partial<Omit<Task, 'id' | 'createdAt'>>;

export type SessionCompletionInput = {
  type: SessionType;
  duration: number;
  taskId: string | null;
  wasCompleted: boolean;
};

export interface TimerSnapshot {
  type: SessionType;
  remainingSec: number;
  startTime: number;
  taskId: string | null;
}

// ============================================================================
// Validation Constants
// ============================================================================

export const TASK_VALIDATION = {
  TITLE_MIN: 1,
  TITLE_MAX: 200,
  SESSIONS_MIN: 1,
  SESSIONS_MAX: 99,
} as const;

export const SETTINGS_VALIDATION = {
  WORK_MIN: 1,
  WORK_MAX: 120,
  SHORT_BREAK_MIN: 1,
  SHORT_BREAK_MAX: 30,
  LONG_BREAK_MIN: 1,
  LONG_BREAK_MAX: 60,
  SESSIONS_MIN: 2,
  SESSIONS_MAX: 8,
} as const;

export const DEFAULT_SETTINGS: UserSettings = {
  workMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  sessionsBeforeLongBreak: 4,
  theme: "auto",
} as const;

// ============================================================================
// localStorage Keys
// ============================================================================

export const STORAGE_KEYS = {
  SETTINGS: 'FT_SETTINGS_v1',
  TASKS: 'FT_TASKS_v1',
  TODAY: 'FT_TODAY_v1',
  SESSION_SNAPSHOT: 'FT_SESSIONS_LATEST_v1',
} as const;

