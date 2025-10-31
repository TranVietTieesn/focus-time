/**
 * Core Type Definitions for Focus Timer Hub
 * 
 * This file defines all core data types used across the application.
 * These types are referenced by Zustand slices, components, and utilities.
 * 
 * @see data-model.md for detailed specifications
 */

// ============================================================================
// Enums
// ============================================================================

/**
 * Type of session (work or break)
 */
export type SessionType = "work" | "shortBreak" | "longBreak";

/**
 * Current status of the timer
 */
export type TimerStatus = "idle" | "running" | "paused";

/**
 * UI theme preference
 */
export type Theme = "auto" | "light" | "dark";

// ============================================================================
// Core Entities
// ============================================================================

/**
 * Task entity representing a user-created task
 * 
 * Validation Rules:
 * - id: Must be valid UUID v4
 * - title: 1-200 characters (trimmed)
 * - estimatedSessions: If provided, integer 1-99
 * - isCompleted: Boolean (default: false)
 * - createdAt: Auto-generated timestamp
 * - completedAt: Null until task completed
 */
export interface Task {
  /** Unique identifier (UUID v4) */
  id: string;
  
  /** Task title (max 200 characters) */
  title: string;
  
  /** Optional estimate of focus sessions needed (1-99) */
  estimatedSessions: number | null;
  
  /** Whether task is marked as complete */
  isCompleted: boolean;
  
  /** Creation timestamp (Unix ms) */
  createdAt: number;
  
  /** Completion timestamp (Unix ms), null if not completed */
  completedAt: number | null;
}

/**
 * Focus session entity (for future session history tracking)
 * 
 * Note: Not stored in localStorage for MVP (only daily aggregates).
 * Full session history deferred to v1.2 with IndexedDB.
 */
export interface FocusSession {
  /** Unique identifier (UUID v4) */
  id: string;
  
  /** Reference to associated Task (nullable) */
  taskId: string | null;
  
  /** Type of session */
  type: SessionType;
  
  /** Session duration in seconds */
  duration: number;
  
  /** Start timestamp (Unix ms) */
  startedAt: number;
  
  /** Completion timestamp (Unix ms) */
  completedAt: number;
  
  /** Whether session was completed (true) or interrupted (false) */
  wasCompleted: boolean;
}

/**
 * User settings for timer durations and UI preferences
 * 
 * Validation Rules:
 * - workMin: 1-120 minutes
 * - shortBreakMin: 1-30 minutes
 * - longBreakMin: 1-60 minutes
 * - sessionsBeforeLongBreak: 2-8 sessions
 */
export interface UserSettings {
  /** Work session duration in minutes (default: 25) */
  workMin: number;
  
  /** Short break duration in minutes (default: 5) */
  shortBreakMin: number;
  
  /** Long break duration in minutes (default: 15) */
  longBreakMin: number;
  
  /** Number of work sessions before long break (default: 4) */
  sessionsBeforeLongBreak: number;
  
  /** UI theme preference (default: "auto") */
  theme: Theme;
}

/**
 * Daily statistics (resets at midnight local time)
 */
export interface DailyStats {
  /** Current date (ISO format: YYYY-MM-DD) */
  date: string;
  
  /** Total focused time today in minutes */
  totalMin: number;
  
  /** Number of completed sessions today */
  sessionsCount: number;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Input type for creating a new task
 */
export type TaskCreateInput = Pick<Task, 'title'> & {
  estimatedSessions?: number | null;
};

/**
 * Input type for updating an existing task
 */
export type TaskUpdateInput = Partial<Omit<Task, 'id' | 'createdAt'>>;

/**
 * Input type for recording a completed session
 */
export type SessionCompletionInput = {
  type: SessionType;
  duration: number;
  taskId: string | null;
  wasCompleted: boolean;
};

/**
 * Snapshot of timer state for crash recovery
 */
export interface TimerSnapshot {
  type: SessionType;
  remainingSec: number;
  startTime: number;
  taskId: string | null;
}

// ============================================================================
// Validation Constants
// ============================================================================

/**
 * Validation boundaries for task fields
 */
export const TASK_VALIDATION = {
  TITLE_MIN: 1,
  TITLE_MAX: 200,
  SESSIONS_MIN: 1,
  SESSIONS_MAX: 99,
} as const;

/**
 * Validation boundaries for settings fields
 */
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

/**
 * Default settings values
 */
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

/**
 * localStorage key names (versioned for future migrations)
 */
export const STORAGE_KEYS = {
  SETTINGS: 'FT_SETTINGS_v1',
  TASKS: 'FT_TASKS_v1',
  TODAY: 'FT_TODAY_v1',
  SESSION_SNAPSHOT: 'FT_SESSIONS_LATEST_v1',
} as const;

