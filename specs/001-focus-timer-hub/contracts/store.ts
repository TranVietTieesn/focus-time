/**
 * Combined Store Interface
 * 
 * Defines the complete Zustand store interface combining all slices.
 * This is the main store contract that components will interact with.
 * 
 * @see data-model.md for detailed specifications
 */

import type { TimerSlice } from './timer-slice';
import type { TasksSlice } from './tasks-slice';
import type { SettingsSlice } from './settings-slice';
import type { StatsSlice } from './stats-slice';

/**
 * Combined store interface
 * 
 * Merges all slice interfaces into a single store.
 * Components use this via the useStore() hook.
 * 
 * Usage:
 * ```typescript
 * import { useStore } from '@/store';
 * 
 * function TimerDisplay() {
 *   const { remainingSec, status, start, pause } = useStore();
 *   // ...
 * }
 * ```
 */
export type FocusTimerStore = TimerSlice & TasksSlice & SettingsSlice & StatsSlice;

/**
 * Store slice creator function type
 * 
 * Each slice exports a creator function that follows this pattern.
 * 
 * Example:
 * ```typescript
 * export const createTimerSlice: SliceCreator<TimerSlice> = (set, get) => ({
 *   status: "idle",
 *   type: "work",
 *   // ... state and actions
 * });
 * ```
 */
export type SliceCreator<T> = (
  set: (partial: Partial<FocusTimerStore>) => void,
  get: () => FocusTimerStore
) => T;

