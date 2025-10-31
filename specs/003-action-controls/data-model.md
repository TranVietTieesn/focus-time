# Data Model: Action Controls Enhancement

**Spec ID:** 003-action-controls  
**Last Updated:** 2025-10-28

---

## Overview

This feature enhances the existing timer UI with restart and fullscreen controls. No new persistent data entities are required—only session-level state for fullscreen toggle.

---

## Entity: FullscreenState

**Purpose:** Track whether the app is currently in fullscreen mode

**Fields:**
```typescript
{
  isFullscreen: boolean;        // true if fullscreen mode active
  requestedAt: timestamp;       // when fullscreen was requested (for analytics)
  exitMethod?: 'button' | 'esc' | 'browser'; // how user exited (optional)
}
```

**Lifecycle:**
- Initialize: `false` (not fullscreen)
- Toggle: User clicks fullscreen button or presses F key
- Exit: User presses ESC, clicks button again, or browser exit
- Persistence: Session-only (not saved to localStorage)

**Validation Rules:**
- `isFullscreen`: boolean (required)
- `requestedAt`: valid timestamp or undefined
- `exitMethod`: one of ['button', 'esc', 'browser'] or undefined

---

## State Relationships

### From Existing Timer State

**Read (no changes to existing entities):**
```typescript
{
  status: 'idle' | 'running' | 'paused';    // timer state
  remainingSec: number;                      // timer duration
  type: 'work' | 'shortBreak' | 'longBreak'; // session mode
  workMin: number;                           // work duration in minutes
  shortBreakMin: number;                     // short break duration
  longBreakMin: number;                      // long break duration
}
```

**Write (restart action):**
- Call: `start(type, durationSec)` with `type` = current type, `durationSec` = workMin/breakMin
- Result: Timer resets to full duration, status → 'idle'

### New Session State

**Fullscreen Toggle:**
```typescript
const [isFullscreen, setIsFullscreen] = useState(false);

// Toggle on F key or button click
const toggleFullscreen = async () => {
  if (isFullscreen) {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setIsFullscreen(false);
  } else {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } catch (error) {
      console.error('Fullscreen failed:', error);
      // Gracefully handle if fullscreen denied
    }
  }
};
```

---

## Keyboard Shortcut Mapping

No persistent state needed for shortcuts; handled at window level.

**Event Handler:**
```typescript
window.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    // Restart: reset timer to full duration
    handleRestart();
  }
  if (e.key === 'f' || e.key === 'F') {
    // Fullscreen: toggle fullscreen mode
    handleFullscreenToggle();
  }
  if (e.key === 'Escape' && isFullscreen) {
    // Already handled by browser; just sync state
    setIsFullscreen(false);
  }
});
```

---

## No Schema Changes Required

✅ **No database modifications**  
✅ **No API changes**  
✅ **No localStorage schema updates**  
✅ **No Redux/Zustand store changes**  

**Reasoning:**
- Restart action uses existing `start()` and timer reset logic
- Fullscreen state is session-only (no persistence)
- Keyboard shortcuts are event-driven (no state storage)

---

## Component Props

### RestartButton

```typescript
interface RestartButtonProps {
  onRestart: () => void;        // Callback when restart clicked
  disabled?: boolean;           // Disable button if needed
  ariaLabel?: string;           // Custom aria label (default: "Restart session")
}
```

### FullscreenButton

```typescript
interface FullscreenButtonProps {
  isFullscreen: boolean;        // Current fullscreen state
  onToggle: () => void;         // Callback when toggle clicked
  isAvailable: boolean;         // Fullscreen API available
  disabled?: boolean;           // Disable if unavailable
  ariaLabel?: string;           // Custom aria label
}
```

---

## Summary

**New Entities:** None (session state only)  
**Modified Entities:** None  
**Persistence Impact:** None (session-only state)  
**Schema Changes:** None  
**API Changes:** None  

This is a **pure UI enhancement** with no data model modifications.
