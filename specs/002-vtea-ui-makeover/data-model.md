# VTea UI Makeover - Data Model

**Project:** Focus Timer Hub  
**Feature:** 002-vtea-ui-makeover  
**Created:** 2025-10-28  
**Phase:** 1 (Design)

---

## Overview

**Important:** The VTea UI Makeover is a **UI-only enhancement layer**. This feature makes **zero changes** to the data model, state schema, or persistence layer established in the MVP (001-focus-timer-hub).

This document exists to:
1. Confirm that existing data structures remain unchanged
2. Document new UI-only state (ephemeral, not persisted)
3. Reference the MVP data model for context

---

## Existing Data Model (Unchanged)

The following data structures from the MVP **remain exactly as they are**:

### Task Entity (from MVP)

```typescript
interface Task {
  id: string;                        // UUID
  title: string;                     // Max 200 chars
  estimatedSessions: number | null;  // Optional estimate
  isCompleted: boolean;              // Completion status
  createdAt: number;                 // Timestamp (Unix epoch ms)
  completedAt: number | null;        // Timestamp when completed
}
```

**Storage:** localStorage key `FT_TASKS_v1` (JSON array)

**No Changes:** All CRUD operations, validation, and persistence logic remain unchanged.

---

### FocusSession Entity (from MVP)

```typescript
interface FocusSession {
  id: string;                        // UUID
  taskId: string | null;             // Reference to Task (nullable)
  type: 'work' | 'shortBreak' | 'longBreak';
  duration: number;                  // Minutes
  startedAt: number;                 // Timestamp (Unix epoch ms)
  completedAt: number;               // Timestamp (Unix epoch ms)
  wasCompleted: boolean;             // True if full duration elapsed
}
```

**Storage:** localStorage key `FT_TODAY_v1` (aggregated into daily stats)

**No Changes:** Session tracking, completion logic, and stats aggregation remain unchanged.

---

### UserSettings Entity (from MVP)

```typescript
interface UserSettings {
  workMin: number;                   // Default: 25
  shortBreakMin: number;             // Default: 5
  longBreakMin: number;              // Default: 15
  sessionsBeforeLongBreak: number;   // Default: 4
  theme: 'auto' | 'light' | 'dark';  // Theme preference
}
```

**Storage:** localStorage key `FT_SETTINGS_v1` (JSON object)

**No Changes:** Settings structure, validation, and persistence remain unchanged.

---

### DailyStats Entity (from MVP)

```typescript
interface DailyStats {
  todayDate: string;                 // ISO date (YYYY-MM-DD)
  todayTotalMin: number;             // Total focused minutes today
  todaySessionsCount: number;        // Count of completed sessions today
}
```

**Storage:** localStorage key `FT_TODAY_v1` (JSON object)

**No Changes:** Stats calculation, date reset logic, and persistence remain unchanged.

---

## New UI-Only State (Ephemeral, Not Persisted)

The following state is **NEW** for the VTea UI Makeover but is **NOT persisted** to localStorage. This is ephemeral UI state only.

### FocusTitle State (Component-Level)

```typescript
interface FocusTitleState {
  title: string;                     // Current session title
  isEditing: boolean;                // True when user is editing title
}
```

**Location:** React component state in `FocusTitle.tsx`

**Behavior:**
- Auto-fills from `tasksSlice.activeTask.title` if available
- Falls back to "Untitled Session" if no active task
- Saved to component state on blur or Enter key
- **NOT persisted** to localStorage (resets on page reload)

**Rationale:** Session titles are ephemeral; not part of core data model. Future enhancement could persist to timerSlice if desired.

---

### TaskDrawer UI State (Component-Level)

```typescript
interface TaskDrawerState {
  isOpen: boolean;                   // Drawer open/closed
  userOpenedManually: boolean;       // User manually reopened during session
  hideCompleted: boolean;            // Filter completed tasks
}
```

**Location:** React component state in `TaskDrawer.tsx` or Zustand UI slice (optional)

**Behavior:**
- `isOpen` defaults to true when timer is idle
- Auto-closes when timer starts (unless `userOpenedManually` is true)
- `hideCompleted` filters task list display only (tasks not deleted)
- **NOT persisted** to localStorage (resets on page reload)

**Rationale:** Drawer state is transient UI preference, not core data.

---

### ModeSwitcher UI State (Derived from timerSlice)

```typescript
// No new state - reads existing timerSlice.type
type SessionType = 'work' | 'shortBreak' | 'longBreak';
```

**Location:** Zustand `timerSlice.type` (existing)

**Behavior:**
- Mode switcher displays current `timerSlice.type` value
- Clicking mode button updates `timerSlice.type` (existing action)
- **No new state added** - uses existing timer state

**Rationale:** Mode selection is already part of timer logic; UI only visualizes it.

---

## State Management (Zustand Slices)

**No changes** to Zustand slice structure or persistence logic. The following slices remain unchanged:

### timerSlice (Unchanged)

```typescript
interface TimerSlice {
  status: 'idle' | 'running' | 'paused';
  type: 'work' | 'shortBreak' | 'longBreak';
  remainingSec: number;
  currentSessionIndex: number;
  startTime: number | null;
  // Actions (unchanged)
  start: (type, durationSec) => void;
  pause: () => void;
  resume: () => void;
  complete: () => void;
  tick: () => void;
}
```

**UI Enhancements:**
- Mode switcher visualizes `type` with color-coded buttons
- Timer display shows `remainingSec` with upgraded typography (90-120px)
- No logic changes

---

### tasksSlice (Unchanged)

```typescript
interface TasksSlice {
  tasks: Task[];
  activeTaskId: string | null;
  // Actions (unchanged)
  create: (title, estimatedSessions?) => Task;
  update: (id, fields) => void;
  complete: (id) => void;
  remove: (id) => void;
  setActive: (id | null) => void;
}
```

**UI Enhancements:**
- Task drawer filters by `isCompleted` (UI-only filter)
- Focus title auto-fills from `activeTask.title`
- No logic changes

---

### settingsSlice (Unchanged)

```typescript
interface SettingsSlice {
  workMin: number;
  shortBreakMin: number;
  longBreakMin: number;
  sessionsBeforeLongBreak: number;
  theme: 'auto' | 'light' | 'dark';
  // Actions (unchanged)
  setWorkMin: (v) => void;
  setShortBreakMin: (v) => void;
  setLongBreakMin: (v) => void;
  setSessionsBeforeLongBreak: (v) => void;
  setTheme: (v) => void;
  resetToDefaults: () => void;
}
```

**UI Enhancements:**
- Settings modal shows inline validation hints
- "Reset to Defaults" has non-blocking confirmation
- No logic changes

---

### statsSlice (Unchanged)

```typescript
interface StatsSlice {
  todayDate: string;
  todayTotalMin: number;
  todaySessionsCount: number;
  // Actions (unchanged)
  addCompletedSession: (session) => void;
  recomputeToday: () => void;
}
```

**UI Enhancements:**
- Daily bar shows stats with updated typography
- No logic changes

---

## Persistence Strategy (Unchanged)

**localStorage Keys:**
- `FT_SETTINGS_v1`: Settings object (JSON)
- `FT_TASKS_v1`: Task[] array (JSON)
- `FT_TODAY_v1`: DailyStats object (JSON)
- `FT_SESSIONS_LATEST_v1`: Last in-progress session snapshot

**No new keys added.** All VTea UI state is ephemeral (component state) and not persisted.

**Write-through policy, defensive parsing, and migration strategy remain unchanged.**

---

## Data Flow Diagram (UI Enhancements Only)

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interaction                        │
│  (Edit Focus Title, Switch Mode, Toggle Drawer, etc.)       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              React Components (UI Layer)                     │
│  FocusTitle, ModeSwitcher, TaskDrawer, SettingsModal        │
│  - New components read existing Zustand state                │
│  - Component-level state for ephemeral UI (not persisted)   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Zustand Store (Global State - Unchanged)           │
│  timerSlice, tasksSlice, settingsSlice, statsSlice          │
│  - No new slices added                                       │
│  - No changes to existing slice structure                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                localStorage API (Unchanged)                  │
│  Keys: FT_SETTINGS_v1, FT_TASKS_v1, FT_TODAY_v1,            │
│        FT_SESSIONS_LATEST_v1                                 │
│  - No new keys added                                         │
│  - No schema changes                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Validation Rules (Unchanged)

**Task Title:**
- Min: 1 character (required)
- Max: 200 characters
- Whitespace trimmed

**Duration Settings:**
- Work: 1-120 minutes
- Short Break: 1-30 minutes
- Long Break: 1-60 minutes
- Sessions Before Long Break: 2-8

**All validation logic from MVP remains unchanged.**

---

## Edge Cases (Unchanged)

**Date Change Detection:** DailyStats reset at midnight (checked on app mount)

**Crash Recovery:** Last in-progress session restored from `FT_SESSIONS_LATEST_v1`

**localStorage Quota:** Warning shown if quota exceeded (graceful degradation)

**All edge case handling from MVP remains unchanged.**

---

## Summary

**No Data Model Changes:**
- Zero changes to Task, FocusSession, UserSettings, or DailyStats entities
- Zero changes to Zustand slice structure or persistence logic
- Zero changes to localStorage keys or schema

**New Ephemeral UI State:**
- Focus title (component state, not persisted)
- Task drawer open/closed (component state, not persisted)
- Hide completed filter (component state, not persisted)

**This feature is purely a visual refresh.** All data architecture, state management, and persistence from the MVP remain intact.

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-28  
**Status:** Complete  
**Next:** Generate contracts/design-tokens.ts

