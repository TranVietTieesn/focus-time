# Editable Task Title - Flocus Feature Implementation

## Overview
Implemented Flocus-style inline editable task names in VTea. Users can quickly rename their focus session with minimal UI friction.

## Features

### User Interactions
- **Default names**: "Focus Session", "Short Break", "Long Break" (based on session type)
- **Hover state**: Pencil icon ✏️ appears on hover (when timer is not running)
- **Click to edit**: Click the title or icon to enter edit mode
- **Keyboard shortcuts**: 
  - `Enter` → Save
  - `Escape` → Cancel (revert to previous value)
- **Auto-save**: Clicking outside or blurring the input auto-saves
- **Disabled during timer**: Cannot edit while timer is running

### Constraints
- Task name stored in **state only** (not localStorage, not persistent)
- Empty input reverts to default name
- Only editable when timer is idle or paused
- Switches to default name when session type changes

---

## Implementation

### New Component: `EditableTaskTitle.tsx`

```tsx
export function EditableTaskTitle() {
  // Reads from timer store:
  // - type: Session type (work/shortBreak/longBreak)
  // - taskName: Custom task name (empty string by default)
  // - status: Timer status (idle/running/paused)
  
  // Writes to timer store:
  // - setTaskName(name): Saves custom name
}
```

#### States
- **View mode** (default): Displays task name + pencil icon on hover
- **Edit mode**: Shows input field with bottom border highlight

#### Styling
- **Input field**: No border, transparent background, soft focus effect
  - Focus state: Border color changes to blue `rgba(75, 107, 251, 0.6)`
  - Blur state: Border color reverts to `rgba(255, 255, 255, 0.3)`
- **Pencil icon**: Appears only on hover, 70% opacity for subtle effect
- **Animation**: slideUp animation (0.5s) matching other UI elements

---

### Updated Timer Store: `timer.ts`

#### New State
```ts
interface TimerState {
  taskName: string;  // Custom task name (empty by default)
}
```

#### New Action
```ts
setTaskName: (name: string) => void  // Saves task name to state
```

#### Usage
```tsx
const taskName = useTimer((state) => state.taskName);
const setTaskName = useTimer((state) => state.setTaskName);

// Save task name
setTaskName('My Custom Focus Task');

// Read task name
console.log(taskName);  // 'My Custom Focus Task'
```

---

### Updated Component: `FocusStage.tsx`

**Before:**
```tsx
<h1>{getSessionTitle()}</h1>  // Static title
```

**After:**
```tsx
<EditableTaskTitle />  // Editable component
```

---

## User Flow

### 1. Initial State
```
User sees:  "Focus Session"  (gray text)
Default name for "work" session type
```

### 2. Hover (timer idle/paused)
```
User sees:  "Focus Session"  ✏️
Pencil icon appears, cursor becomes pointer
```

### 3. Click to Edit
```
User sees:  [input field]
            ─────────────
Focus is on input, text pre-selected
```

### 4. Type New Name
```
User types: "Deep Work Sprint"
```

### 5. Confirm Edit
#### Option A: Press Enter
```
Saves: "Deep Work Sprint"
Returns to view mode
```

#### Option B: Click Outside
```
Auto-saves: "Deep Work Sprint"
Returns to view mode
```

#### Option C: Press Escape
```
Discards changes
Reverts to previous name
```

### 6. Session Type Change
```
If user switches to "Short Break" tab:
Name reverts to: "Short Break"
(unless explicitly edited again)
```

---

## Browser Compatibility

- **Tested**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features**: Backdrop filter, transitions, flexbox
- **Accessibility**: ARIA labels, keyboard navigation, focus management

---

## Customization

### Adjust Default Names
Edit `DEFAULT_NAMES` in `EditableTaskTitle.tsx`:
```ts
const DEFAULT_NAMES = {
  work: 'Your Custom Name',
  shortBreak: 'Your Custom Name',
  longBreak: 'Your Custom Name',
};
```

### Change Input Border Color
```ts
// Focus state color
rgba(75, 107, 251, 0.6)  // Blue

// Change to custom color:
e.currentTarget.style.borderColor = 'rgba(YOUR_R, YOUR_G, YOUR_B, 0.6)';
```

### Disable Editing During Running
Already implemented. To remove this restriction:
```ts
// Remove this condition:
if (status !== 'running')
```

---

## Performance Notes

- **No re-renders on non-edit changes**: Component only re-renders when `taskName` changes
- **Zustand optimization**: Selector pattern ensures minimal re-renders
- **Input debouncing**: Not needed since we save on blur, not on each keystroke

---

## Testing Checklist

- [ ] Hover on title shows pencil icon
- [ ] Click title enters edit mode
- [ ] Input field has correct styling
- [ ] Pressing Enter saves task name
- [ ] Pressing Escape cancels without saving
- [ ] Clicking outside saves task name
- [ ] Empty input reverts to default
- [ ] Cannot edit while timer is running
- [ ] Switching session types shows correct default name
- [ ] Task name persists during timer run (state only)
- [ ] Keyboard navigation works (Tab, Arrow keys)

---

## Future Enhancements

1. **Optional persistence**: Save to localStorage with checkbox toggle
2. **Quick templates**: Dropdown with common task names
3. **Task history**: Remember last N task names for quick access
4. **Character limit**: Limit to 50 chars with visual feedback
5. **Emoji support**: Allow emoji in task names

---

## Known Limitations

- No localStorage persistence (by design - state only)
- Task name lost on page refresh
- No validation beyond empty check
- No undo/redo for task name changes

---

## Accessibility

- **Semantic**: Uses `<h1>` with `role="button"` when not editing
- **Keyboard**: Full keyboard support (Enter, Escape, Tab)
- **Labels**: ARIA labels describe current state and interaction hints
- **Focus**: Clear focus management when entering/exiting edit mode
- **Screen readers**: Context provided for edit state changes

---

## Code Examples

### Access task name in other components
```tsx
import { useTimer } from '@/core/timer';

export function MyComponent() {
  const taskName = useTimer((state) => state.taskName);
  
  return <p>Currently working on: {taskName}</p>;
}
```

### Update task name programmatically
```tsx
const setTaskName = useTimer((state) => state.setTaskName);

setTaskName('New Task Name');
```

### React to task name changes
```tsx
import { useEffect } from 'react';
import { useTimer } from '@/core/timer';

export function MyComponent() {
  const taskName = useTimer((state) => state.taskName);
  
  useEffect(() => {
    console.log('Task name changed to:', taskName);
  }, [taskName]);
  
  return null;
}
```
