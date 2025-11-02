/**
 * Pure Timer Logic - Event-driven state management (no persistence)
 */

import { create } from 'zustand';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';

export type TimerEvent =
  | { type: 'started'; sessionType: SessionType; duration: number }
  | { type: 'paused'; remaining: number }
  | { type: 'resumed'; remaining: number }
  | { type: 'completed' }
  | { type: 'reset' };

export interface TimerState {
  // State
  status: TimerStatus;
  type: SessionType;
  remainingSec: number;
  initialDuration: number;
  startTime: number | null;
  lastEvent: TimerEvent | null;
  taskName: string;

  // Actions
  start: (type: SessionType, durationSec: number) => void;
  pause: () => void;
  resume: () => void;
  complete: () => void;
  tick: () => void;
  reset: () => void;
  setTaskName: (name: string) => void;
}

// Helper: get current wall-clock time in ms
const now = () => Date.now();

// Helper: calculate remaining seconds based on wall-clock time
const getRemainingSeconds = (initialDuration: number, startTime: number): number => {
  const elapsed = (now() - startTime) / 1000;
  return Math.max(0, initialDuration - elapsed);
};

export const useTimer = create<TimerState>((set, get) => ({
  // Initial state
  status: 'idle',
  type: 'work',
  remainingSec: 0,
  initialDuration: 0,
  startTime: null,
  lastEvent: null,
  taskName: '',

  // Actions
  start: (type, durationSec) => {
    const state = get();
    if (state.status !== 'idle') {
      console.warn('Cannot start: timer already running or paused');
      return;
    }

    const event: TimerEvent = {
      type: 'started',
      sessionType: type,
      duration: durationSec,
    };

    set({
      status: 'running',
      type,
      remainingSec: durationSec,
      initialDuration: durationSec,
      startTime: now(),
      lastEvent: event,
    });
  },

  pause: () => {
    const state = get();
    if (state.status !== 'running') {
      console.warn('Cannot pause: timer not running');
      return;
    }

    const remaining = getRemainingSeconds(state.initialDuration, state.startTime!);
    const event: TimerEvent = {
      type: 'paused',
      remaining: Math.ceil(remaining),
    };

    set({
      status: 'paused',
      remainingSec: Math.ceil(remaining),
      lastEvent: event,
    });
  },

  resume: () => {
    const state = get();
    if (state.status !== 'paused') {
      console.warn('Cannot resume: timer not paused');
      return;
    }

    const event: TimerEvent = {
      type: 'resumed',
      remaining: state.remainingSec,
    };

    set({
      status: 'running',
      initialDuration: state.remainingSec,
      startTime: now(),
      lastEvent: event,
    });
  },

  tick: () => {
    const state = get();
    if (state.status !== 'running') return;

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
      console.warn('Cannot complete: timer already idle');
      return;
    }

    const event: TimerEvent = { type: 'completed' };

    set({
      status: 'idle',
      remainingSec: 0,
      startTime: null,
      lastEvent: event,
    });
  },

  reset: () => {
    const event: TimerEvent = { type: 'reset' };

    set({
      status: 'idle',
      type: 'work',
      remainingSec: 0,
      initialDuration: 0,
      startTime: null,
      lastEvent: event,
    });
  },

  setTaskName: (name: string) => {
    set({ taskName: name });
  },
}));
