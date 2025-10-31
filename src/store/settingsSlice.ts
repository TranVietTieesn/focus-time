/**
 * Settings Slice - User preferences for timer durations and theme
 */

import type { StateCreator } from 'zustand';
import type { Theme, UserSettings } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/types';
import { safeGet, safeSet } from '@/lib/storage';
import {
  validateWorkDuration,
  validateShortBreakDuration,
  validateLongBreakDuration,
  validateSessionsBeforeLongBreak,
} from '@/lib/validation';

export interface SettingsSlice {
  // State
  workMin: number;
  shortBreakMin: number;
  longBreakMin: number;
  sessionsBeforeLongBreak: number;
  theme: Theme;

  // Actions
  setWorkMin: (value: number) => void;
  setShortBreakMin: (value: number) => void;
  setLongBreakMin: (value: number) => void;
  setSessionsBeforeLongBreak: (value: number) => void;
  setTheme: (theme: Theme) => void;
  resetToDefaults: () => void;
  getSettings: () => UserSettings;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set, get) => {
  // Load initial settings from localStorage
  const stored = safeGet<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  // Helper to persist settings
  const persistSettings = (updates: Partial<UserSettings>) => {
    const current = get().getSettings();
    const newSettings = { ...current, ...updates };
    safeSet(STORAGE_KEYS.SETTINGS, newSettings);
  };

  // Apply theme on load
  const applyTheme = (theme: Theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto mode: use system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Apply theme on initialization
  applyTheme(stored.theme);

  return {
    // Initial state from localStorage or defaults
    workMin: stored.workMin,
    shortBreakMin: stored.shortBreakMin,
    longBreakMin: stored.longBreakMin,
    sessionsBeforeLongBreak: stored.sessionsBeforeLongBreak,
    theme: stored.theme,

    // Actions
    setWorkMin: (value) => {
      const validated = validateWorkDuration(value);
      set({ workMin: validated });
      persistSettings({ workMin: validated });
    },

    setShortBreakMin: (value) => {
      const validated = validateShortBreakDuration(value);
      set({ shortBreakMin: validated });
      persistSettings({ shortBreakMin: validated });
    },

    setLongBreakMin: (value) => {
      const validated = validateLongBreakDuration(value);
      set({ longBreakMin: validated });
      persistSettings({ longBreakMin: validated });
    },

    setSessionsBeforeLongBreak: (value) => {
      const validated = validateSessionsBeforeLongBreak(value);
      set({ sessionsBeforeLongBreak: validated });
      persistSettings({ sessionsBeforeLongBreak: validated });
    },

    setTheme: (theme) => {
      set({ theme });
      applyTheme(theme);
      persistSettings({ theme });
    },

    resetToDefaults: () => {
      set({
        workMin: DEFAULT_SETTINGS.workMin,
        shortBreakMin: DEFAULT_SETTINGS.shortBreakMin,
        longBreakMin: DEFAULT_SETTINGS.longBreakMin,
        sessionsBeforeLongBreak: DEFAULT_SETTINGS.sessionsBeforeLongBreak,
        theme: DEFAULT_SETTINGS.theme,
      });
      applyTheme(DEFAULT_SETTINGS.theme);
      safeSet(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    },

    getSettings: () => ({
      workMin: get().workMin,
      shortBreakMin: get().shortBreakMin,
      longBreakMin: get().longBreakMin,
      sessionsBeforeLongBreak: get().sessionsBeforeLongBreak,
      theme: get().theme,
    }),
  };
};

