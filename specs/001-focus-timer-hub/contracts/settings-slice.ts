/**
 * Settings Slice Interface
 * 
 * Defines the state and actions for user settings management.
 * Handles timer durations, theme preferences, and defaults.
 * 
 * @see data-model.md for detailed specifications
 */

import type { Theme, UserSettings } from './types';

/**
 * Settings slice state and actions
 */
export interface SettingsSlice {
  // ============================================================================
  // State
  // ============================================================================
  
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
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  /**
   * Set work session duration
   * 
   * @param value - Duration in minutes (1-120)
   * 
   * Preconditions:
   * - value must be integer 1-120
   * 
   * Effects:
   * - Sets workMin
   * - Persists to localStorage (FT_SETTINGS_v1)
   * 
   * Throws:
   * - Error if validation fails
   */
  setWorkMin: (value: number) => void;
  
  /**
   * Set short break duration
   * 
   * @param value - Duration in minutes (1-30)
   * 
   * Preconditions:
   * - value must be integer 1-30
   * 
   * Effects:
   * - Sets shortBreakMin
   * - Persists to localStorage
   */
  setShortBreakMin: (value: number) => void;
  
  /**
   * Set long break duration
   * 
   * @param value - Duration in minutes (1-60)
   * 
   * Preconditions:
   * - value must be integer 1-60
   * 
   * Effects:
   * - Sets longBreakMin
   * - Persists to localStorage
   */
  setLongBreakMin: (value: number) => void;
  
  /**
   * Set sessions before long break
   * 
   * @param value - Number of sessions (2-8)
   * 
   * Preconditions:
   * - value must be integer 2-8
   * 
   * Effects:
   * - Sets sessionsBeforeLongBreak
   * - Persists to localStorage
   */
  setSessionsBeforeLongBreak: (value: number) => void;
  
  /**
   * Set UI theme
   * 
   * @param theme - Theme value ("auto" | "light" | "dark")
   * 
   * Preconditions:
   * - theme must be valid Theme enum value
   * 
   * Effects:
   * - Sets theme
   * - Applies CSS class to <html> element
   * - Persists to localStorage
   */
  setTheme: (theme: Theme) => void;
  
  /**
   * Reset all settings to default values
   * 
   * Effects:
   * - Resets workMin=25, shortBreakMin=5, longBreakMin=15
   * - Resets sessionsBeforeLongBreak=4, theme="auto"
   * - Persists to localStorage
   */
  resetToDefaults: () => void;
  
  /**
   * Get current settings as object
   * 
   * @returns UserSettings object
   */
  getSettings: () => UserSettings;
}

