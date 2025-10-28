/**
 * Timer Slice Interface
 * 
 * Defines the state and actions for the timer management slice.
 * Handles countdown logic, session types, and state transitions.
 * 
 * @see data-model.md for detailed specifications
 */

import type { SessionType, TimerStatus } from './types';

/**
 * Timer slice state and actions
 */
export interface TimerSlice {
  // ============================================================================
  // State
  // ============================================================================
  
  /** Current timer status */
  status: TimerStatus;
  
  /** Current session type */
  type: SessionType;
  
  /** Seconds remaining in current session */
  remainingSec: number;
  
  /** Original session duration in seconds (for calculating progress) */
  initialDuration: number;
  
  /** Current session number in Pomodoro cycle (1..N) */
  currentSessionIndex: number;
  
  /** High-resolution start timestamp (performance.now() or null when idle) */
  startTime: number | null;
  
  /** Task ID associated with current session (nullable) */
  activeTaskId: string | null;
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  /**
   * Start a new timer session
   * 
   * @param type - Type of session (work, shortBreak, longBreak)
   * @param durationSec - Duration in seconds
   * @param taskId - Optional task ID to associate with session
   * 
   * Preconditions:
   * - status must be "idle"
   * 
   * Effects:
   * - Sets status to "running"
   * - Sets type and duration
   * - Records startTime
   * - Starts 1-second tick interval
   */
  start: (type: SessionType, durationSec: number, taskId?: string | null) => void;
  
  /**
   * Pause the current running session
   * 
   * Preconditions:
   * - status must be "running"
   * 
   * Effects:
   * - Sets status to "paused"
   * - Stops tick interval
   * - Preserves remainingSec for resume
   */
  pause: () => void;
  
  /**
   * Resume a paused session
   * 
   * Preconditions:
   * - status must be "paused"
   * 
   * Effects:
   * - Sets status to "running"
   * - Recalculates remainingSec based on elapsed time
   * - Updates startTime
   * - Restarts tick interval
   */
  resume: () => void;
  
  /**
   * Complete the current session (manual or automatic at 0:00)
   * 
   * Preconditions:
   * - status must be "running" or "paused"
   * 
   * Effects:
   * - Sets status to "idle"
   * - Stops tick interval
   * - Records session in statsSlice
   * - Increments currentSessionIndex (if work session)
   * - Auto-starts next break session
   * - Shows completion notification
   */
  complete: () => void;
  
  /**
   * Update timer countdown (called every 1 second)
   * 
   * Preconditions:
   * - status must be "running"
   * 
   * Effects:
   * - Calculates elapsed time from startTime
   * - Updates remainingSec
   * - Calls complete() if remainingSec <= 0
   */
  tick: () => void;
  
  /**
   * Reset timer to initial idle state
   * 
   * Effects:
   * - Sets status to "idle"
   * - Clears all timing state
   * - Resets currentSessionIndex to 1
   */
  reset: () => void;
}

