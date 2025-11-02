# Editable Task Title - Visual Demo

## UI States

### State 1: Default (View Mode, Timer Idle)
```
┌─────────────────────────────────┐
│                                 │
│     Focus Session               │
│                                 │
│  (Pencil icon NOT visible)      │
│                                 │
└─────────────────────────────────┘
```
- Default name displayed
- No interaction hint

---

### State 2: Hover (View Mode, Timer Idle)
```
┌─────────────────────────────────┐
│                                 │
│     Focus Session  ✏️            │
│                                 │
│  (Pencil icon VISIBLE)          │
│  (Cursor changes to pointer)    │
│                                 │
└─────────────────────────────────┘
```
- Pencil icon appears (opacity: 0.7)
- Text is still displayed
- Cursor indicates clickable

---

### State 3: Entering Edit Mode (Click)
```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────────┐│
│  │ Focus Session               ││
│  │ ═════════════════════════════││
│  │ (INPUT FOCUSED)             ││
│  └─────────────────────────────┘│
│                                 │
│  Bottom border: blue active     │
│  Text pre-selected              │
│                                 │
└─────────────────────────────────┘
```
- Input field appears
- Previous text selected (ready for replacement)
- Bottom border highlighted in blue

---

### State 4: Editing (User Types)
```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────────┐│
│  │ Deep Work Sprint            ││
│  │ ═════════════════════════════││
│  │ (USER TYPING)               ││
│  └─────────────────────────────┘│
│                                 │
│  Typing in progress             │
│  Border: blue (active)          │
│                                 │
└─────────────────────────────────┘
```
- User replaces with new name
- Focus maintained on input

---

### State 5: Saving (Press Enter or Click Outside)
```
┌─────────────────────────────────┐
│                                 │
│     Deep Work Sprint            │
│                                 │
│  (Pencil icon NOT visible)      │
│  (Exit edit mode)               │
│                                 │
└─────────────────────────────────┘
```
- Returns to view mode
- New name is displayed
- Task saved in state

---

### State 6: Error Recovery (Press Escape)
```
┌─────────────────────────────────┐
│                                 │
│     Focus Session               │
│                                 │
│  (Edited text discarded)        │
│  (Reverted to previous)         │
│                                 │
└─────────────────────────────────┘
```
- Escape key cancels
- Reverts to previous value
- Returns to view mode

---

### State 7: Empty Input (Delete All Text)
```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │ ═════════════════════════════││
│  │ placeholder: "Focus Session"││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```
- Empty input shows placeholder
- On blur: reverts to default name

---

### State 8: Timer Running (Read-Only)
```
┌─────────────────────────────────┐
│                                 │
│     Deep Work Sprint            │
│                                 │
│  (Pencil icon NEVER appears)    │
│  (Click does nothing)           │
│  (Locked state)                 │
│                                 │
└─────────────────────────────────┘
```
- Cannot edit while running
- Pencil icon hidden
- Title is read-only

---

### State 9: Session Type Change (Short Break)
```
BEFORE:
┌─────────────────────────────────┐
│     Deep Work Sprint            │
└─────────────────────────────────┘

USER CLICKS "Short Break" TAB

AFTER:
┌─────────────────────────────────┐
│     Short Break                 │
└─────────────────────────────────┘
```
- Custom name reverted to default
- Shows correct default for new session type

---

## Interaction Flow Diagram

```
┌─────────────────────────┐
│   View Mode (Default)   │
│  "Focus Session"        │
│                         │
│ No pencil icon visible  │
└────────┬────────────────┘
         │
         │ Hover
         ↓
┌─────────────────────────┐
│   View Mode (Hover)     │
│  "Focus Session"  ✏️     │
│                         │
│ Pencil icon visible     │
└────────┬────────────────┘
         │
         │ Click title/icon
         ↓
┌─────────────────────────┐
│   Edit Mode             │
│  [input field]          │
│  ═════════════════      │
│                         │
│ Text pre-selected       │
└────┬────────────────┬───┘
     │                │
  Enter/            Escape
  Blur              
     │                │
     ↓                ↓
 ┌──────┐      ┌───────────┐
 │ Save │      │  Cancel   │
 │      │      │  (Revert) │
 └──┬───┘      └─────┬─────┘
    │                │
    └────────┬───────┘
             │
             ↓
    ┌──────────────────┐
    │ View Mode (Saved)│
    │  "New Name"      │
    └──────────────────┘
```

---

## Visual Styling Reference

### Typography
- Font: System default (inherited)
- Size: 2xl (text-2xl)
- Weight: Semibold (font-semibold)
- Color: White (text-white)
- Letter spacing: 0.025em

### Glow Effects
- Text shadow: `var(--glow-text-sm)`
  ```css
  0 0 10px rgba(255, 255, 255, 0.3),
  0 0 20px rgba(255, 255, 255, 0.2)
  ```

### Input Field (Edit Mode)
- Background: Transparent (`bg-transparent`)
- Border: Bottom only
  - Inactive: `rgba(255, 255, 255, 0.3)`
  - Focus: `rgba(75, 107, 251, 0.6)` (Blue)
  - Padding bottom: 4px
  - Transition: 0.2s ease-out

### Pencil Icon
- Symbol: ✏️
- Opacity: 0.7 (semi-transparent)
- Size: 0.85em (slightly smaller than text)
- Transition: 0.2s ease-out

### Animations
- Entry: `slideUp 0.5s ease-in-out 0.1s backwards`
- Hover: Smooth opacity transition
- Focus: Border color transition

---

## Color Reference

### Typography & Glow
```
Text color:     #ffffff (white)
Text glow:      rgba(255, 255, 255, 0.3-0.2)
```

### Input Border States
```
Default:        rgba(255, 255, 255, 0.3)  (light gray)
Focus:          rgba(75, 107, 251, 0.6)   (blue)
Hover (blur):   rgba(255, 255, 255, 0.3)  (light gray)
```

### Pencil Icon
```
Color:          text-white (inherits)
Opacity:        0.7 (semi-transparent)
Background:     transparent
```

---

## Responsive Behavior

### Desktop (1024px+)
- Full functionality
- Hover effects work as expected
- Icon appears smoothly on hover

### Tablet (768px - 1023px)
- Full functionality
- Touch-friendly target area
- Hover effects may feel less responsive

### Mobile (< 768px)
- Full functionality
- No persistent hover state
- Icon visible after tap/click
- Vertical keyboard appears on focus

---

## State Persistence

### What Persists
- ✅ Custom task name (during session)
- ✅ Task name across pause/resume

### What Does NOT Persist
- ❌ Task name after page refresh
- ❌ Task name across browser sessions
- ❌ Task name in localStorage (by design)

---

## Accessibility Features

### Semantic HTML
```tsx
// View mode: Semantic heading + button role
<h1 role="button" tabIndex={0}>
  Focus Session ✏️
</h1>

// Edit mode: Standard input
<input type="text" placeholder="Focus Session" />
```

### Keyboard Navigation
| Key | Action |
|-----|--------|
| Click | Enter edit mode |
| Tab | Focus input, then blur (saves) |
| Enter | Save and exit edit mode |
| Escape | Cancel and revert |
| Arrow Keys | Move cursor in input |

### Screen Reader Support
```
View mode:   "Task name: Focus Session. Click to edit"
Hover:       "Task name: Focus Session. Click to edit"
Edit mode:   Input field with focus announcement
```

---

## Examples

### Before Implementation
```tsx
// Static title
<h1>Focus Session</h1>
```

### After Implementation
```tsx
// Editable title
<EditableTaskTitle />
```

### Result
- Users can customize their focus session name
- Minimal UI friction
- Matches Flocus aesthetic
- State-based (no persistence overhead)
