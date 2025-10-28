# Data Model: Focus Timer Hub

**Feature:** 001-focus-timer-hub  
**Version:** 1.0  
**Date:** 2025-10-28

---

## Overview

This document defines all data entities, their relationships, validation rules, and state transitions for the Focus Timer Hub MVP. All types are defined in TypeScript for type-safe development.

---

## Core Entities

### 1. Task

Represents a user-created task that can be associated with focus sessions.

**TypeScript Interface:**
```typescript
interface Task {
  id: string;                    // UUID v4
  title: string;                 // Max 200 characters
  estimatedSessions: number | null; // Optional, min 1, max 99
  isCompleted: boolean;          // Default: false
  createdAt: number;             // Unix timestamp (ms)
  completedAt: number | null;    // Unix timestamp (ms) or null
}
```

**Validation Rules:**
- `id`: Must be valid UUID v4 format
- `title`: Required, 1-200 characters, trimmed
- `estimatedSessions`: If provided, must be integer 1-99
- `isCompleted`: Boolean, defaults to false
- `createdAt`: Auto-generated on creation
- `completedAt`: Null until task completed

**Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete React tutorial",
  "estimatedSessions": 4,
  "isCompleted": false,
  "createdAt": 1698451200000,
  "completedAt": null
}
```

---

### 2. FocusSession

Represents a completed (or interrupted) focus or break session.

**TypeScript Interface:**
```typescript
interface FocusSession {
  id: string;                    // UUID v4
  taskId: string | null;         // Reference to Task.id (nullable)
  type: SessionType;             // "work" | "shortBreak" | "longBreak"
  duration: number;              // Duration in seconds
  startedAt: number;             // Unix timestamp (ms)
  completedAt: number;           // Unix timestamp (ms)
  wasCompleted: boolean;         // true if finished, false if interrupted
}

type SessionType = "work" | "shortBreak" | "longBreak";
```

**Validation Rules:**
- `id`: Must be valid UUID v4 format
- `taskId`: Must reference existing Task.id or be null
- `type`: Must be one of the enum values
- `duration`: Integer, 60-7200 seconds (1 min - 2 hours)
- `startedAt`: Must be <= `completedAt`
- `wasCompleted`: true if user finished full duration, false if paused/abandoned

**Example:**
```json
{
  "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "taskId": "550e8400-e29b-41d4-a716-446655440000",
  "type": "work",
  "duration": 1500,
  "startedAt": 1698451200000,
  "completedAt": 1698452700000,
  "wasCompleted": true
}
```

**Note:** Sessions are NOT stored in MVP (only daily aggregates). Full session history deferred to v1.2 with IndexedDB.

---

### 3. UserSettings

User-customizable preferences for timer durations and UI theme.

**TypeScript Interface:**
```typescript
interface UserSettings {
  workMin: number;               // Default: 25
  shortBreakMin: number;         // Default: 5
  longBreakMin: number;          // Default: 15
  sessionsBeforeLongBreak: number; // Default: 4
  theme: Theme;                  // Default: "auto"
}

type Theme = "auto" | "light" | "dark";
```

**Validation Rules:**
- `workMin`: Integer, 1-120 minutes
- `shortBreakMin`: Integer, 1-30 minutes
- `longBreakMin`: Integer, 1-60 minutes
- `sessionsBeforeLongBreak`: Integer, 2-8 sessions
- `theme`: Must be one of the enum values

**Default Values:**
```json
{
  "workMin": 25,
  "shortBreakMin": 5,
  "longBreakMin": 15,
  "sessionsBeforeLongBreak": 4,
  "theme": "auto"
}
```

---

### 4. DailyStats

Aggregated statistics for the current day (resets at midnight local time).

**TypeScript Interface:**
```typescript
interface DailyStats {
  date: string;                  // ISO date string (YYYY-MM-DD)
  totalMin: number;              // Total focused minutes today
  sessionsCount: number;         // Number of completed sessions
}
```

**Validation Rules:**
- `date`: Must be valid ISO date format (YYYY-MM-DD)
- `totalMin`: Non-negative integer (minutes)
- `sessionsCount`: Non-negative integer

**Example:**
```json
{
  "date": "2025-10-28",
  "totalMin": 75,
  "sessionsCount": 3
}
```

**Reset Logic:**
```typescript
// Check on app mount and before incrementing stats
function checkDateChange(current: DailyStats): DailyStats {
  const today = new Date().toISOString().split('T')[0];
  
  if (current.date !== today) {
    return { date: today, totalMin: 0, sessionsCount: 0 };
  }
  
  return current;
}
```

---

### 5. TimerState (Runtime State, Not Persisted)

Represents the current state of the timer (in-memory only, Zustand store).

**TypeScript Interface:**
```typescript
interface TimerState {
  status: TimerStatus;           // "idle" | "running" | "paused"
  type: SessionType;             // "work" | "shortBreak" | "longBreak"
  remainingSec: number;          // Seconds remaining in current session
  initialDuration: number;       // Original duration in seconds
  currentSessionIndex: number;   // Current session in cycle (1..N)
  startTime: number | null;      // High-resolution timestamp (performance.now())
  activeTaskId: string | null;   // Task associated with current session
}

type TimerStatus = "idle" | "running" | "paused";
```

**State Transitions:**

```
┌──────┐  start()   ┌─────────┐  pause()   ┌────────┐
│ idle ├───────────>│ running ├───────────>│ paused │
└───┬──┘            └────┬────┘            └───┬────┘
    │                    │                     │
    │                    │ complete()          │ resume()
    │                    v                     │
    │               ┌────────┐                 │
    └───────────────┤  idle  │<────────────────┘
                    └────────┘
```

**Validation Rules:**
- `status`: Must be one of enum values
- `remainingSec`: Non-negative integer, ≤ `initialDuration`
- `currentSessionIndex`: Positive integer, resets after long break
- `startTime`: Must be valid timestamp or null when idle

---

## State Management (Zustand Slices)

### timerSlice

**State:**
```typescript
interface TimerSlice {
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
```

**Actions Specification:**

**`start(type, durationSec, taskId?)`**
- Preconditions: `status === "idle"`
- Effects:
  - Set `status = "running"`
  - Set `type = type`
  - Set `remainingSec = durationSec`
  - Set `initialDuration = durationSec`
  - Set `startTime = performance.now()`
  - Set `activeTaskId = taskId ?? null`
  - Start 1-second interval timer
- Postconditions: Timer is running

**`pause()`**
- Preconditions: `status === "running"`
- Effects:
  - Set `status = "paused"`
  - Stop interval timer
  - Keep `remainingSec` and `startTime` for resume
- Postconditions: Timer is paused, can be resumed

**`resume()`**
- Preconditions: `status === "paused"`
- Effects:
  - Set `status = "running"`
  - Recalculate `remainingSec` based on elapsed time
  - Update `startTime = performance.now()`
  - Restart interval timer
- Postconditions: Timer is running from paused state

**`complete()`**
- Preconditions: `status === "running" || status === "paused"`
- Effects:
  - Set `status = "idle"`
  - Stop interval timer
  - Record session in `statsSlice.addCompletedSession()`
  - Increment `currentSessionIndex` (if work session)
  - Reset after long break (if `currentSessionIndex >= sessionsBeforeLongBreak`)
  - Trigger auto-start of break (if work session)
  - Show completion notification
- Postconditions: Session recorded, ready for next session

**`tick()`**
- Preconditions: `status === "running"`
- Effects:
  - Calculate elapsed time: `(performance.now() - startTime) / 1000`
  - Update `remainingSec = initialDuration - elapsed`
  - If `remainingSec <= 0`: call `complete()`
- Postconditions: UI displays updated countdown

**`reset()`**
- Preconditions: Any
- Effects:
  - Set `status = "idle"`
  - Set `remainingSec = 0`
  - Set `currentSessionIndex = 1`
  - Clear `startTime` and `activeTaskId`
- Postconditions: Timer reset to initial state

---

### tasksSlice

**State:**
```typescript
interface TasksSlice {
  // State
  tasks: Task[];
  activeTaskId: string | null;
  
  // Actions
  create: (title: string, estimatedSessions?: number | null) => Task;
  update: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  complete: (id: string) => void;
  remove: (id: string) => void;
  setActive: (id: string | null) => void;
  getTasks: () => Task[];
  getActiveTask: () => Task | null;
}
```

**Actions Specification:**

**`create(title, estimatedSessions?)`**
- Preconditions: `title` is 1-200 characters
- Effects:
  - Generate new UUID for `id`
  - Create Task with `isCompleted = false`, `createdAt = Date.now()`
  - Add to `tasks` array
  - Persist to localStorage
- Postconditions: Task exists in store and localStorage
- Returns: Created Task object

**`update(id, updates)`**
- Preconditions: Task with `id` exists
- Effects:
  - Find task by `id`
  - Apply `updates` (merge with existing fields)
  - Persist to localStorage
- Postconditions: Task fields updated
- Throws: Error if task not found

**`complete(id)`**
- Preconditions: Task with `id` exists, `isCompleted = false`
- Effects:
  - Set `isCompleted = true`
  - Set `completedAt = Date.now()`
  - Persist to localStorage
- Postconditions: Task marked complete

**`remove(id)`**
- Preconditions: Task with `id` exists
- Effects:
  - Remove task from `tasks` array
  - If `activeTaskId === id`, set `activeTaskId = null`
  - Persist to localStorage
- Postconditions: Task no longer exists

**`setActive(id)`**
- Preconditions: If `id` is not null, task must exist
- Effects:
  - Set `activeTaskId = id`
  - Do NOT persist (active task is session-scoped)
- Postconditions: Active task selected

---

### settingsSlice

**State:**
```typescript
interface SettingsSlice {
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
```

**Actions Specification:**

**`setWorkMin(value)`**
- Preconditions: `value` is integer 1-120
- Effects:
  - Set `workMin = value`
  - Persist to localStorage
- Throws: Error if validation fails

**`setShortBreakMin(value)`**
- Preconditions: `value` is integer 1-30
- Effects:
  - Set `shortBreakMin = value`
  - Persist to localStorage

**`setLongBreakMin(value)`**
- Preconditions: `value` is integer 1-60
- Effects:
  - Set `longBreakMin = value`
  - Persist to localStorage

**`setSessionsBeforeLongBreak(value)`**
- Preconditions: `value` is integer 2-8
- Effects:
  - Set `sessionsBeforeLongBreak = value`
  - Persist to localStorage

**`setTheme(theme)`**
- Preconditions: `theme` is one of "auto" | "light" | "dark"
- Effects:
  - Set `theme = theme`
  - Apply CSS class to `<html>` element
  - Persist to localStorage

**`resetToDefaults()`**
- Preconditions: None
- Effects:
  - Set all settings to default values
  - Persist to localStorage
- Postconditions: Settings restored to defaults

---

### statsSlice

**State:**
```typescript
interface StatsSlice {
  // State
  todayDate: string;             // ISO date (YYYY-MM-DD)
  todayTotalMin: number;
  todaySessionsCount: number;
  
  // Actions
  addCompletedSession: (session: {
    type: SessionType;
    duration: number;            // seconds
    taskId: string | null;
    wasCompleted: boolean;
  }) => void;
  checkDateChange: () => void;
  getStats: () => DailyStats;
}
```

**Actions Specification:**

**`addCompletedSession(session)`**
- Preconditions: Session completed (from `timerSlice.complete()`)
- Effects:
  - Call `checkDateChange()` first
  - Convert `duration` to minutes (round up)
  - Increment `todayTotalMin += minutes`
  - Increment `todaySessionsCount += 1`
  - Persist to localStorage
- Postconditions: Daily stats updated

**`checkDateChange()`**
- Preconditions: None
- Effects:
  - Get current date as ISO string
  - If `todayDate !== currentDate`:
    - Set `todayDate = currentDate`
    - Set `todayTotalMin = 0`
    - Set `todaySessionsCount = 0`
    - Persist to localStorage
- Postconditions: Stats reset if date changed

---

## Persistence Schema (localStorage)

### Key-Value Pairs

**`FT_SETTINGS_v1`** (UserSettings)
```json
{
  "workMin": 25,
  "shortBreakMin": 5,
  "longBreakMin": 15,
  "sessionsBeforeLongBreak": 4,
  "theme": "auto"
}
```

**`FT_TASKS_v1`** (Task[])
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete React tutorial",
    "estimatedSessions": 4,
    "isCompleted": false,
    "createdAt": 1698451200000,
    "completedAt": null
  }
]
```

**`FT_TODAY_v1`** (DailyStats)
```json
{
  "date": "2025-10-28",
  "totalMin": 75,
  "sessionsCount": 3
}
```

**`FT_SESSIONS_LATEST_v1`** (Session snapshot for crash recovery)
```json
{
  "type": "work",
  "remainingSec": 720,
  "startTime": 1698451200000,
  "taskId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Data Flow Diagrams

### Session Completion Flow

```
User clicks "Complete" or Timer reaches 0
                │
                ▼
       timerSlice.complete()
                │
                ├─> Stop interval timer
                ├─> Set status = "idle"
                │
                ├─> statsSlice.addCompletedSession({
                │     type: "work",
                │     duration: 1500,
                │     taskId: "550e...",
                │     wasCompleted: true
                │   })
                │         │
                │         ├─> checkDateChange() (reset if midnight passed)
                │         ├─> Increment todayTotalMin += 25
                │         ├─> Increment todaySessionsCount += 1
                │         └─> Persist to FT_TODAY_v1
                │
                ├─> Increment currentSessionIndex
                │
                ├─> Check: currentSessionIndex >= sessionsBeforeLongBreak?
                │     ├─ Yes → Auto-start long break (15 min)
                │     └─ No  → Auto-start short break (5 min)
                │
                ├─> Show toast: "Work session complete! Starting break..."
                │
                └─> Optional: navigator.vibrate(200)
```

### Task Creation Flow

```
User enters task title and clicks "Add"
                │
                ▼
       tasksSlice.create("Complete tutorial", 4)
                │
                ├─> Validate title (1-200 chars)
                ├─> Generate UUID: "550e8400-..."
                ├─> Create Task object:
                │     {
                │       id: "550e8400-...",
                │       title: "Complete tutorial",
                │       estimatedSessions: 4,
                │       isCompleted: false,
                │       createdAt: Date.now(),
                │       completedAt: null
                │     }
                │
                ├─> Add to tasks[] array
                │
                └─> Persist to FT_TASKS_v1
                      │
                      └─> localStorage.setItem(
                            "FT_TASKS_v1",
                            JSON.stringify(tasks)
                          )
```

---

## Migration Strategy (Future Versions)

### Version 1 → Version 2 Example

**Scenario:** Add `priority` field to Task entity

**Migration Function:**
```typescript
function migrateTasksV1toV2(): void {
  // 1. Check if old key exists
  const v1Data = localStorage.getItem('FT_TASKS_v1');
  if (!v1Data) return; // No data to migrate
  
  // 2. Parse old data
  const v1Tasks: TaskV1[] = JSON.parse(v1Data);
  
  // 3. Transform to new schema
  const v2Tasks: TaskV2[] = v1Tasks.map(task => ({
    ...task,
    priority: 'medium', // Add default value
  }));
  
  // 4. Write to new key
  localStorage.setItem('FT_TASKS_v2', JSON.stringify(v2Tasks));
  
  // 5. Delete old key
  localStorage.removeItem('FT_TASKS_v1');
  
  console.log('Migrated tasks from v1 to v2');
}
```

**Run migration on app mount:**
```typescript
// main.tsx
useEffect(() => {
  migrateTasksV1toV2();
  migrateSettingsV1toV2();
  // ... other migrations
}, []);
```

---

## Validation Utilities

### Task Validation

```typescript
const TASK_TITLE_MIN = 1;
const TASK_TITLE_MAX = 200;
const TASK_SESSIONS_MIN = 1;
const TASK_SESSIONS_MAX = 99;

function validateTaskTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed.length < TASK_TITLE_MIN) {
    throw new Error('Task title cannot be empty');
  }
  if (trimmed.length > TASK_TITLE_MAX) {
    throw new Error(`Task title cannot exceed ${TASK_TITLE_MAX} characters`);
  }
  return trimmed;
}

function validateEstimatedSessions(value: number | null): number | null {
  if (value === null) return null;
  
  if (!Number.isInteger(value) || value < TASK_SESSIONS_MIN || value > TASK_SESSIONS_MAX) {
    throw new Error(`Estimated sessions must be between ${TASK_SESSIONS_MIN} and ${TASK_SESSIONS_MAX}`);
  }
  
  return value;
}
```

### Settings Validation

```typescript
const WORK_MIN = 1, WORK_MAX = 120;
const SHORT_BREAK_MIN = 1, SHORT_BREAK_MAX = 30;
const LONG_BREAK_MIN = 1, LONG_BREAK_MAX = 60;
const SESSIONS_MIN = 2, SESSIONS_MAX = 8;

function validateDuration(value: number, min: number, max: number, label: string): number {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${label} must be between ${min} and ${max} minutes`);
  }
  return value;
}

function validateTheme(theme: string): Theme {
  if (!['auto', 'light', 'dark'].includes(theme)) {
    throw new Error('Invalid theme value');
  }
  return theme as Theme;
}
```

---

## Type Exports (src/types/index.ts)

```typescript
// Core entities
export type { Task, FocusSession, UserSettings, DailyStats };

// Enums
export type { SessionType, TimerStatus, Theme };

// State slices
export type { TimerSlice, TasksSlice, SettingsSlice, StatsSlice };

// Utility types
export type TaskCreateInput = Pick<Task, 'title'> & {
  estimatedSessions?: number | null;
};

export type TaskUpdateInput = Partial<Omit<Task, 'id' | 'createdAt'>>;

export type SessionCompletionInput = {
  type: SessionType;
  duration: number;
  taskId: string | null;
  wasCompleted: boolean;
};
```

---

## Next Steps

1. ✅ Data model defined with TypeScript interfaces
2. → Generate contracts (state interfaces) in `contracts/` directory
3. → Implement Zustand slices using these interfaces
4. → Write unit tests for validation functions

---

**Document Status:** ✅ **COMPLETE**  
**Last Updated:** 2025-10-28

