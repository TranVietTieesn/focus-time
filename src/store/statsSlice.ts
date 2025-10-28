/**
 * Stats Slice - Daily progress tracking with auto-reset at midnight
 */

import type { StateCreator } from 'zustand';
import type { DailyStats, SessionCompletionInput } from '@/types';
import { STORAGE_KEYS } from '@/types';
import { safeGet, safeSet } from '@/lib/storage';
import { getTodayISO, hasDateChanged } from '@/lib/date';
import { secondsToMinutes } from '@/lib/time';

export interface StatsSlice {
  // State
  todayDate: string;
  todayTotalMin: number;
  todaySessionsCount: number;

  // Actions
  addCompletedSession: (session: SessionCompletionInput) => void;
  checkDateChange: () => void;
  getStats: () => DailyStats;
}

export const createStatsSlice: StateCreator<StatsSlice> = (set, get) => {
  // Load initial stats from localStorage
  const today = getTodayISO();
  const stored = safeGet<DailyStats>(STORAGE_KEYS.TODAY, {
    date: today,
    totalMin: 0,
    sessionsCount: 0,
  });

  // Check if date has changed since last visit
  const initialStats = hasDateChanged(stored.date)
    ? { date: today, totalMin: 0, sessionsCount: 0 }
    : stored;

  // Persist initial state if date changed
  if (hasDateChanged(stored.date)) {
    safeSet(STORAGE_KEYS.TODAY, initialStats);
  }

  // Helper to persist stats
  const persistStats = () => {
    const stats = get().getStats();
    safeSet(STORAGE_KEYS.TODAY, stats);
  };

  return {
    // Initial state
    todayDate: initialStats.date,
    todayTotalMin: initialStats.totalMin,
    todaySessionsCount: initialStats.sessionsCount,

    // Actions
    checkDateChange: () => {
      const currentDate = getTodayISO();
      const storedDate = get().todayDate;

      if (currentDate !== storedDate) {
        // Date has changed, reset stats
        set({
          todayDate: currentDate,
          todayTotalMin: 0,
          todaySessionsCount: 0,
        });
        persistStats();
      }
    },

    addCompletedSession: (session) => {
      // Check date change first
      get().checkDateChange();

      // Convert duration from seconds to minutes
      const minutes = secondsToMinutes(session.duration);

      // Increment stats
      set((state) => ({
        todayTotalMin: state.todayTotalMin + minutes,
        todaySessionsCount: state.todaySessionsCount + 1,
      }));

      persistStats();
    },

    getStats: () => ({
      date: get().todayDate,
      totalMin: get().todayTotalMin,
      sessionsCount: get().todaySessionsCount,
    }),
  };
};

