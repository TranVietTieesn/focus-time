/**
 * Stats Slice Interface
 * 
 * Defines the state and actions for daily statistics tracking.
 * Handles session completion recording and date-based reset logic.
 * 
 * @see data-model.md for detailed specifications
 */

import type { DailyStats, SessionCompletionInput } from './types';

/**
 * Stats slice state and actions
 */
export interface StatsSlice {
  // ============================================================================
  // State
  // ============================================================================
  
  /** Current date (ISO format: YYYY-MM-DD) */
  todayDate: string;
  
  /** Total focused time today in minutes */
  todayTotalMin: number;
  
  /** Number of completed sessions today */
  todaySessionsCount: number;
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  /**
   * Record a completed session and update daily stats
   * 
   * @param session - Session completion data
   * 
   * Preconditions:
   * - Called from timerSlice.complete()
   * 
   * Effects:
   * - Calls checkDateChange() first (auto-reset if midnight passed)
   * - Converts session.duration from seconds to minutes (rounded up)
   * - Increments todayTotalMin
   * - Increments todaySessionsCount
   * - Persists to localStorage (FT_TODAY_v1)
   * 
   * Example:
   * ```
   * addCompletedSession({
   *   type: "work",
   *   duration: 1500,        // 25 minutes in seconds
   *   taskId: "550e...",
   *   wasCompleted: true
   * });
   * ```
   */
  addCompletedSession: (session: SessionCompletionInput) => void;
  
  /**
   * Check if date has changed and reset stats if needed
   * 
   * Effects:
   * - Gets current date as ISO string (YYYY-MM-DD)
   * - If todayDate !== currentDate:
   *   - Sets todayDate = currentDate
   *   - Resets todayTotalMin = 0
   *   - Resets todaySessionsCount = 0
   *   - Persists to localStorage
   * 
   * Called:
   * - On app mount/load
   * - Before addCompletedSession()
   */
  checkDateChange: () => void;
  
  /**
   * Get current daily stats as object
   * 
   * @returns DailyStats object
   */
  getStats: () => DailyStats;
}

