# Quickstart: Action Controls Implementation

**Spec ID:** 003-action-controls  
**Last Updated:** 2025-10-28

---

## Overview

This quickstart guides developers through implementing restart and fullscreen buttons for the Focus Timer Hub.

---

## Prerequisites

- Completed: VTea UI Makeover (002-vtea-ui-makeover)
- Familiarity with React, TypeScript, Zustand
- Understanding of WCAG AA accessibility standards

---

## Quick Setup

### 1. Component Structure

**Create two new components in `src/components/`:**

```typescript
// src/components/RestartButton.tsx
export function RestartButton({ onRestart, ariaLabel = "Restart session" }) {
  return (
    <button
      onClick={onRestart}
      aria-label={ariaLabel}
      title="Restart session (R)"
      className="action-button"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        {/* Circular arrow SVG */}
      </svg>
    </button>
  );
}

// src/components/FullscreenButton.tsx
export function FullscreenButton({ isFullscreen, onToggle, isAvailable, ariaLabel = "Fullscreen mode" }) {
  if (!isAvailable) return null; // Hide if not available
  
  return (
    <button
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={isFullscreen}
      title={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
      className="action-button"
    >
      <svg viewBox="0 0 24 24" width="24" height="24">
        {/* Expand/collapse icon SVG */}
      </svg>
    </button>
  );
}
```

### 2. Integrate into FocusCard

```typescript
// src/components/FocusCard.tsx
import { RestartButton } from './RestartButton';
import { FullscreenButton } from './FullscreenButton';

export function FocusCard() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handleRestart = () => {
    const duration = type === 'work' ? workMin : shortBreakMin; // Handle all modes
    start(type, minutesToSeconds(duration));
  };
  
  const handleFullscreenToggle = async () => {
    if (isFullscreen) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };
  
  return (
    <div className="focus-card">
      {/* Existing content */}
      <div className="action-row">
        <RestartButton onRestart={handleRestart} />
        <FullscreenButton 
          isFullscreen={isFullscreen}
          onToggle={handleFullscreenToggle}
          isAvailable={!!document.fullscreenEnabled}
        />
      </div>
    </div>
  );
}
```

### 3. Add Keyboard Shortcuts

```typescript
// In FocusCard or App component
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'r') {
      handleRestart();
    }
    if (e.key.toLowerCase() === 'f') {
      handleFullscreenToggle();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isFullscreen]);
```

### 4. Styling

```css
/* src/index.css or tailwind */

.action-button {
  @apply flex items-center justify-center;
  width: 44px;
  height: 44px;
  padding: 8px;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  transition: all 150ms ease-out;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
  
  &:focus-visible {
    outline: 2px solid #4B6BFB;
    outline-offset: 2px;
  }
  
  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .action-button {
    transition: none;
  }
  
  .action-button:hover {
    transform: none;
  }
}
```

---

## Testing Checklist

### Phase 1: Restart Button
- [ ] Click restart button resets timer
- [ ] R key restarts timer
- [ ] Button visible during idle/running/paused
- [ ] Touch target ≥44×44px
- [ ] Tooltip appears on hover

### Phase 2: Fullscreen Button
- [ ] Click enters fullscreen
- [ ] F key toggles fullscreen
- [ ] ESC exits fullscreen
- [ ] Button hides on iOS Safari <16.4
- [ ] Touch target ≥44×44px

### Phase 3: Visual Polish
- [ ] Hover animation works
- [ ] Restart shows pulse animation
- [ ] Consistent spacing with design
- [ ] Pencil icon on title hover

### Phase 4: Accessibility
- [ ] Keyboard-only navigation works
- [ ] Screen reader announces buttons
- [ ] Color contrast ≥3:1
- [ ] Focus outlines visible
- [ ] No axe-core violations

---

## Key References

- **Spec:** `specs/003-action-controls/spec.md`
- **Plan:** `specs/003-action-controls/plan.md`
- **Research:** `specs/003-action-controls/research.md`
- **Data Model:** `specs/003-action-controls/data-model.md`

---

## Implementation Timeline

- **Phase 1:** Restart (T301-T306) — 1-2 days
- **Phase 2:** Fullscreen (T307-T315) — 1-2 days
- **Phase 3:** Polish (T313-T316) — 1 day
- **Phase 4:** A11y Audit (T317-T321) — 1 day
- **Total:** ~1 week

---

## Common Pitfalls

1. **Forgetting browser detection:** Check `document.fullscreenEnabled` before using Fullscreen API
2. **Not handling async fullscreen:** Use `await` and `.catch()` for fullscreen requests
3. **Missing ARIA attributes:** Add `aria-label` and `aria-pressed` for a11y
4. **Touch targets too small:** Ensure buttons are ≥44×44px including padding
5. **ESC key interference:** Let browser handle ESC; sync state afterward

---

## Next: Run Tests

```bash
npm run build          # Verify no TypeScript errors
npm run test           # Run unit tests
npm run lint           # Check accessibility
npm run preview        # Visual QA
```

Start with Phase 1 implementation!
