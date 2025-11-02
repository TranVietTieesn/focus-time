# Editable Task Title - Quick Start Guide

## 🚀 What's New

Your VTea timer now has **inline-editable task titles** like Flocus:

- **Hover** → See pencil icon ✏️
- **Click** → Edit the task name
- **Enter/Blur** → Auto-save
- **Escape** → Cancel changes

---

## 👤 User Guide

### How to Change Task Name

1. **Hover over the title**
   ```
   "Focus Session"  ✏️  ← Pencil icon appears
   ```

2. **Click to edit**
   ```
   [Focus Session________]  ← Input field shows
   ═════════════════════════
   ```

3. **Type your task name**
   ```
   [Deep Work Sprint_____]
   ═════════════════════════
   ```

4. **Press Enter or click outside**
   ```
   "Deep Work Sprint"  ✏️  ← Saved!
   ```

### Keyboard Shortcuts
- `Enter` - Save changes
- `Escape` - Cancel changes
- `Tab` - Move to next element (saves automatically)

### Restrictions
- ❌ Cannot edit while timer is running
- ❌ Task name resets when you switch session types
- ⚠️ Changes lost on page refresh (state-only, not saved)

---

## 💻 Developer Guide

### Files Changed
| File | Change |
|------|--------|
| `src/components/EditableTaskTitle.tsx` | NEW component |
| `src/core/timer.ts` | Added `taskName` state |
| `src/components/FocusStage.tsx` | Replaced static title |

### Access Task Name
```tsx
import { useTimer } from '@/core/timer';

function MyComponent() {
  const taskName = useTimer((state) => state.taskName);
  return <p>Task: {taskName}</p>;
}
```

### Update Task Name
```tsx
const setTaskName = useTimer((state) => state.setTaskName);
setTaskName('New Task Name');
```

### React to Changes
```tsx
import { useEffect } from 'react';
import { useTimer } from '@/core/timer';

function MyComponent() {
  const taskName = useTimer((state) => state.taskName);
  
  useEffect(() => {
    console.log('Task changed:', taskName);
  }, [taskName]);
}
```

---

## 🎨 UI Details

### Component Structure
```tsx
<EditableTaskTitle />
│
├─ View Mode (default)
│  ├─ Title: "Focus Session"
│  └─ Pencil icon (hover only)
│
└─ Edit Mode (on click)
   ├─ Input field
   ├─ Bottom border (blue on focus)
   └─ Auto-save on blur/Enter
```

### Styling
- **Border**: Only bottom border, no box
- **Focus color**: Blue `rgba(75, 107, 251, 0.6)`
- **Icon opacity**: 70% (semi-transparent)
- **Animation**: slideUp 0.5s

### Default Names
| Session Type | Default Name |
|--------------|--------------|
| work | "Focus Session" |
| shortBreak | "Short Break" |
| longBreak | "Long Break" |

---

## 🧪 Testing

### Manual Testing Checklist
```
[ ] Pencil icon appears on hover
[ ] Click title enters edit mode
[ ] Text is pre-selected in input
[ ] Enter key saves
[ ] Escape key cancels
[ ] Blur (click outside) saves
[ ] Empty input reverts to default
[ ] Cannot edit while timer running
[ ] Correct default on session type change
[ ] Input field has blue border on focus
```

### Expected Behavior
```
INITIAL STATE:
  Display: "Focus Session"
  Can edit: Yes
  Icon visible: No

HOVER:
  Icon visible: Yes
  Opacity: 70%
  Cursor: pointer

CLICK:
  Input shown: Yes
  Text selected: Yes
  Border: blue
  Cursor: in input

PRESS ENTER:
  Saved: Yes
  Mode: View
  New name displayed: Yes

PRESS ESCAPE:
  Saved: No
  Reverted: Yes
  Mode: View

TIMER RUNNING:
  Can edit: No
  Icon visible: No
  Locked: Yes
```

---

## 📝 State Management

### Zustand Store (timer.ts)
```tsx
interface TimerState {
  taskName: string;           // Custom task name
  setTaskName(name): void;    // Update task name
}

// Usage
useTimer((state) => state.taskName);
useTimer((state) => state.setTaskName);
```

### Props
- None (uses Zustand store directly)

### Events
- `onClick` - Enter edit mode
- `onBlur` - Save and exit edit mode
- `onKeyDown: Enter` - Save
- `onKeyDown: Escape` - Cancel

---

## 🐛 Troubleshooting

### Pencil Icon Not Showing
- **Cause**: Timer is running (by design)
- **Solution**: Pause the timer first

### Changes Not Saving
- **Cause**: Didn't press Enter or click outside
- **Solution**: Press Enter or click elsewhere to trigger blur event

### Name Keeps Resetting
- **Cause**: Page refresh (state-only, no persistence)
- **Solution**: This is by design. Use localStorage if you want persistence.

### Cursor Stuck in Input
- **Cause**: Focus not released properly
- **Solution**: Press Escape or click outside to blur

---

## ✅ Features

### ✨ Implemented
- ✅ Hover to show pencil icon
- ✅ Click to edit
- ✅ Inline input with bottom border
- ✅ Enter to save
- ✅ Escape to cancel
- ✅ Auto-save on blur
- ✅ Empty input reverts to default
- ✅ Disabled during timer running
- ✅ Keyboard navigation
- ✅ Accessibility support (ARIA labels)

### 🚧 Future Enhancements
- localStorage persistence (optional)
- Task history dropdown
- Character limit with counter
- Emoji support
- Undo/redo

---

## 📚 Documentation Files

For more details, see:
- `EDITABLE_TASK_TITLE.md` - Complete feature documentation
- `CHANGELOG_EDITABLE_TASK.md` - Technical changelog
- `FEATURE_DEMO_EDITABLE_TASK.md` - Visual demonstration

---

## 🎯 Summary

| Aspect | Detail |
|--------|--------|
| **Feature** | Inline-editable task title |
| **Inspiration** | Flocus app |
| **Default Names** | "Focus Session", "Short Break", "Long Break" |
| **Storage** | State only (no persistence) |
| **Edit Trigger** | Hover + Click |
| **Save Trigger** | Enter / Blur |
| **Cancel Trigger** | Escape |
| **Restriction** | Cannot edit while timer running |
| **UI Style** | No borders, bottom border on focus |
| **Icon** | ✏️ emoji, 70% opacity |
| **Animation** | slideUp 0.5s ease-in-out |

---

## 🔗 Related Code

### Component Entry Point
```tsx
// src/components/FocusStage.tsx
import { EditableTaskTitle } from './EditableTaskTitle';

export function FocusStage() {
  return (
    <div>
      <ModeSwitcher />
      <EditableTaskTitle />  {/* ← Here */}
      <TimerDisplay />
    </div>
  );
}
```

### State Access
```tsx
// src/core/timer.ts
export const useTimer = create<TimerState>((set, get) => ({
  taskName: '',                      // ← Initial state
  setTaskName: (name) => set({ taskName: name }), // ← Action
}));
```

---

## 🎁 Use Cases

1. **Personal Focus Sessions**
   ```
   "Deep Work Sprint" (instead of "Focus Session")
   ```

2. **Specific Tasks**
   ```
   "Finish project report" (custom task tracking)
   ```

3. **Team Pomodoros**
   ```
   "Code review - Auth module"
   ```

4. **Quick Notes**
   ```
   "1:1 with Sarah"
   ```

---

End of Quick Start Guide. Happy focusing! 🎯
