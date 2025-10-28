/**
 * Timer Slice - Core timer engine with wall-clock delta calculation
 */

import type { StateCreator } from 'zustand';
import type { SessionType, TimerStatus } from '@/types';
import { now, getRemainingSeconds, minutesToSeconds } from '@/lib/time';

// Forward declaration for store type
type Store = ReturnType<typeof createTimerSlice> & {
  sessionsBeforeLongBreak: number;
  addCompletedSession: (session: any) => void;
};

export interface TimerSlice {
  // State
  status: TimerStatus;
  type: SessionType;
  remainingSec: number;
  initialDuration: number;
  currentSessionIndex: number;
  startTime: number | null;
  activeTaskId: string | null;

  // Actions
  start: (type: SessionType, durationSec: number, taskId?: string | null) => void;
  pause: () => void;
  resume: () => void;
  complete: () => void;
  tick: () => void;
  reset: () => void;
}

export const createTimerSlice: StateCreator<TimerSlice, [], [], TimerSlice> = (set, get) => {
  return {
    // Initial state
    status: 'idle',
    type: 'work',
    remainingSec: 0,
    initialDuration: 0,
    currentSessionIndex: 1,
    startTime: null,
    activeTaskId: null,

    // Actions
    start: (type, durationSec, taskId = null) => {
      if (get().status !== 'idle') {
        console.warn('Cannot start timer: already running or paused');
        return;
      }

      set({
        status: 'running',
        type,
        remainingSec: durationSec,
        initialDuration: durationSec,
        startTime: now(),
        activeTaskId: taskId,
      });
    },

    pause: () => {
      if (get().status !== 'running') {
        console.warn('Cannot pause timer: not running');
        return;
      }

      // Calculate current remaining time before pausing
      const state = get();
      const remaining = getRemainingSeconds(state.initialDuration, state.startTime!);
      
      set({
        status: 'paused',
        remainingSec: Math.ceil(remaining),
      });
    },

    resume: () => {
      if (get().status !== 'paused') {
        console.warn('Cannot resume timer: not paused');
        return;
      }

      const state = get();
      
      // Update start time to current time, treating remaining seconds as new duration
      set({
        status: 'running',
        initialDuration: state.remainingSec,
        startTime: now(),
      });
    },

    tick: () => {
      if (get().status !== 'running') return;

      const state = get();
      const remaining = getRemainingSeconds(state.initialDuration, state.startTime!);

      if (remaining <= 0) {
        get().complete();
      } else {
        set({ remainingSec: Math.ceil(remaining) });
      }
    },

    complete: () => {
      const state = get();
      
      if (state.status === 'idle') {
        console.warn('Cannot complete timer: already idle');
        return;
      }

      // Record session in stats (if work or break session completed)
      const store = get() as unknown as Store;
      const wasCompleted = state.remainingSec > 0 ? false : true;
      
      if (store.addCompletedSession) {
        store.addCompletedSession({
          type: state.type,
          duration: state.initialDuration,
          taskId: state.activeTaskId,
          wasCompleted,
        });
      }

      // Determine next session type
      let nextSessionIndex = state.currentSessionIndex;
      let autoStartType: SessionType | null = null;

      if (state.type === 'work') {
        nextSessionIndex = state.currentSessionIndex + 1;
        
        // Check if we should trigger long break
        const sessionsBeforeLongBreak = (store as any).sessionsBeforeLongBreak || 4;
        if (state.currentSessionIndex >= sessionsBeforeLongBreak) {
          autoStartType = 'longBreak';
          nextSessionIndex = 1; // Reset counter after long break
        } else {
          autoStartType = 'shortBreak';
        }
      }

      // Reset to idle state
      set({
        status: 'idle',
        remainingSec: 0,
        startTime: null,
        currentSessionIndex: nextSessionIndex,
      });

      // Auto-start break if applicable
      // Note: In a real implementation, this would trigger a toast/modal
      // for user to confirm or skip the break
      if (autoStartType && wasCompleted) {
        // TODO: Show "Break time!" toast with auto-start countdown
        console.log(`Work session complete. Next: ${autoStartType}`);
      }
    },

    reset: () => {
      set({
        status: 'idle',
        type: 'work',
        remainingSec: 0,
        initialDuration: 0,
        currentSessionIndex: 1,
        startTime: null,
        activeTaskId: null,
      });
    },
  };
};

