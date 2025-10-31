/**
 * Combined Zustand Store
 * Merges all slices into a single store
 */

import { create } from 'zustand';
import { createTimerSlice, type TimerSlice } from './timerSlice';
import { createTasksSlice, type TasksSlice } from './tasksSlice';
import { createSettingsSlice, type SettingsSlice } from './settingsSlice';
import { createStatsSlice, type StatsSlice } from './statsSlice';

// Combined store type
export type FocusTimerStore = TimerSlice & TasksSlice & SettingsSlice & StatsSlice;

// Create the combined store
export const useStore = create<FocusTimerStore>()((...a) => ({
  ...createTimerSlice(...a),
  ...createTasksSlice(...a),
  ...createSettingsSlice(...a),
  ...createStatsSlice(...a),
}));

// Export individual slice types for convenience
export type { TimerSlice, TasksSlice, SettingsSlice, StatsSlice };

