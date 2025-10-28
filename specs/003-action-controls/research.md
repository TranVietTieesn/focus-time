# Research & Technical Decisions: Action Controls Enhancement

**Spec ID:** 003-action-controls  
**Last Updated:** 2025-10-28

---

## Research Overview

This document consolidates technical decisions, browser compatibility research, and best practices for implementing restart and fullscreen controls.

---

## 1. Fullscreen API Compatibility

### Decision: Use Native Fullscreen API

**Rationale:**
- Widely supported across modern browsers (>95%)
- No external dependencies
- Minimal performance overhead
- Full-screen experience required to hide taskbar/chrome

**Browser Support Matrix:**

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 15+ | ✅ Full | Standard Fullscreen API |
| Firefox | 10+ | ✅ Full | Standard Fullscreen API |
| Safari | 5.1+ | ✅ Full | Standard Fullscreen API |
| Edge | 12+ | ✅ Full | Standard Fullscreen API |
| iOS Safari | 16.4+ | ⚠️ Limited | User gesture required, no fullscreen API |
| Android Chrome | 25+ | ✅ Full | Full support on Android |

**Limitations:**
- iOS Safari: Cannot use `requestFullscreen()` (browser restriction)
  - Mitigation: Hide fullscreen button on iOS, document limitation
- iFrame context: Cannot request fullscreen from cross-origin iframe
  - Mitigation: Assume app runs in main context (no iFrame embedding)

**Recommended Approach:**
```javascript
// Feature detection
const isFullscreenAvailable = document.fullscreenEnabled;

if (!isFullscreenAvailable) {
  // Hide fullscreen button
  return null;
}

// Request fullscreen
document.documentElement.requestFullscreen().catch(err => {
  console.error('Fullscreen request denied:', err);
  // Gracefully handle (may be policy restriction)
});
```

---

## 2. Keyboard Shortcut Selection

### Decision: R = Restart, F = Fullscreen

**Rationale:**
- Mnemonic: R = Restart, F = Fullscreen
- No conflict with common browser shortcuts in focus context
- Single key (not Ctrl+) for accessibility

**Conflicts Analysis:**

| Shortcut | Browser Conflict | Recommendation | Notes |
|----------|------------------|-----------------|-------|
| R key | None | ✅ Safe | Not used by most browsers |
| F key | F11 (fullscreen toggle) | ⚠️ Conflict | Browser likely intercepts; acceptable alternative available |
| Ctrl+R | Refresh page | ❌ Conflict | Avoid |
| Ctrl+F | Find | ❌ Conflict | Avoid |

**Implementation:**
- Allow R and F keys to trigger actions
- If browser intercepts F key, provide alternative via button click
- Document shortcuts in help/tooltip

---

## 3. Icon Design & SVG Approach

### Decision: Inline SVG Icons (No External Library)

**Rationale:**
- Restart button: Circular arrow (↻) - universally recognized
- Fullscreen button: Expand icon (⛶) - standard UI convention
- Inline SVG: No additional dependencies, <1 KB per icon
- Consistent with VTea design system

**Restart Icon SVG:**
```svg
<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
  <path d="M21 3v5h-5" />
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
  <path d="M3 21v-5h5" />
</svg>
```

**Fullscreen Icon SVG:**
```svg
<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
</svg>
```

**Exit Fullscreen Icon:**
```svg
<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M8 3v4a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16v4a2 2 0 0 0 2 2h4m12 0h4a2 2 0 0 0 2-2v-4" />
</svg>
```

---

## 4. Accessibility Best Practices

### WCAG AA Compliance Strategy

**Color Contrast:**
- Inactive state: white/70% on gradient background → ~4.5:1 contrast ✅
- Hover state: white/90% on gradient background → ~5.5:1 contrast ✅
- Active state: primary color #4B6BFB on gradient background → ~5:1 contrast ✅

**Keyboard Navigation:**
- All buttons in natural Tab order
- Focus visible outline: 2px solid #4B6BFB (≥3:1 contrast)
- No focus trap; ESC exits fullscreen and returns focus to button

**Screen Reader Support:**
- ARIA labels: "Restart session", "Fullscreen mode"
- ARIA pressed: FullscreenButton has `aria-pressed="true"` when active
- ARIA live: Timer announcements continue during fullscreen (if needed)

**Touch Targets:**
- All buttons: ≥44×44px (WCAG 2.1 Level AA 2.5.5)
- Padding calculation: 8px padding + 28px icon = 44×44px minimum

---

## 5. Animation Performance

### Decision: CSS-Only Animations

**Rationale:**
- Hardware-accelerated
- Respects prefers-reduced-motion
- Zero JavaScript overhead

**Recommended Animations:**

**Button Hover State:**
```css
.action-button {
  transition: all 150ms ease-out;
  transform: scale(1);
}

.action-button:hover {
  transform: scale(1.05);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .action-button {
    transition: none;
  }
}
```

**Visual Confirmation (Restart Pulse):**
```css
@keyframes pulse-brief {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

.action-button.activated {
  animation: pulse-brief 200ms ease-in-out;
}
```

---

## 6. Mobile & Responsive Behavior

### iOS Considerations

**Fullscreen API:**
- Not available on iOS Safari (<16.4)
- Solution: Detect using `document.fullscreenEnabled`
- Hide fullscreen button on iOS; document in UX

**Testing:**
- [ ] iOS Safari 16.4+: Show button, test behavior
- [ ] iOS Safari <16.4: Hide button, show tooltip
- [ ] Android Chrome: Full support

**Touch Targets:**
- Restart button: 44×44px minimum
- Fullscreen button: 44×44px minimum
- Gap between buttons: 8-12px (easy to distinguish)

---

## 7. Restart Logic & Timer State

### Decision: Reset to Idle (Not Auto-Start)

**Rationale:**
- Respects user control (focus-first principle)
- Reversible action (user can undo by starting again)
- Safer than auto-start (no surprise resumption)

**Implementation:**
```typescript
const handleRestart = () => {
  const duration = 
    type === 'work' ? workMin :
    type === 'shortBreak' ? shortBreakMin :
    longBreakMin;
  
  // Reset to idle state
  start(type, minutesToSeconds(duration));
  // Timer now shows full duration, status is idle
};
```

**State Transition:**
- Before: `{status: 'running', remainingSec: 300, type: 'work'}`
- After restart: `{status: 'idle', remainingSec: 1500, type: 'work'}`

---

## 8. Browser Compatibility Detection

### Implementation Pattern

```typescript
// Check Fullscreen API availability
const checkFullscreenAvailable = (): boolean => {
  return !!(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
};

// Vendor-prefixed fullscreen request (for older Safari)
const requestFullscreen = async (element: Element) => {
  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) {
    return (element as any).webkitRequestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    return (element as any).mozRequestFullScreen();
  }
};
```

---

## 9. Performance Budget Impact

### Bundle Size Analysis

**New Code:**
- RestartButton component: ~2 KB
- FullscreenButton component: ~2.5 KB
- Icon SVGs: <1 KB each (2 icons)
- Event handlers: <0.5 KB
- Total: ~5 KB

**Current Bundle:**
- 59 KB (gzipped from Phase 2)
- After Phase 3: ~62 KB gzipped
- Budget: <150 KB
- Headroom: 88 KB ✅

**No performance regression expected.**

---

## 10. Testing Strategy

### Unit Tests

```typescript
// RestartButton.test.ts
describe('RestartButton', () => {
  test('calls onRestart when clicked', () => {
    const mock = jest.fn();
    render(<RestartButton onRestart={mock} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mock).toHaveBeenCalled();
  });
  
  test('has aria-label', () => {
    render(<RestartButton onRestart={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
  });
});

// FullscreenButton.test.ts
describe('FullscreenButton', () => {
  test('calls onToggle when clicked', () => {
    const mock = jest.fn();
    render(<FullscreenButton isFullscreen={false} onToggle={mock} isAvailable={true} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mock).toHaveBeenCalled();
  });
  
  test('hides when isAvailable is false', () => {
    const { container } = render(
      <FullscreenButton isFullscreen={false} onToggle={() => {}} isAvailable={false} />
    );
    expect(container.firstChild).toBeNull();
  });
});
```

### Integration Tests

```typescript
// ActionControls.integration.test.ts
describe('Action Controls Integration', () => {
  test('R key restarts timer', async () => {
    render(<FocusCard />);
    fireEvent.keyDown(window, { key: 'r' });
    expect(timerState.status).toBe('idle');
  });
  
  test('F key toggles fullscreen', async () => {
    render(<FocusCard />);
    fireEvent.keyDown(window, { key: 'f' });
    expect(document.fullscreenElement).not.toBeNull();
  });
});
```

---

## Summary of Decisions

| Decision | Choice | Rationale | Confidence |
|----------|--------|-----------|------------|
| **Fullscreen API** | Native (not custom) | Wide support, no dependencies | ✅ High |
| **Keyboard Shortcuts** | R & F keys | Mnemonic, no conflicts | ✅ High |
| **Icons** | Inline SVG | Minimal bundle impact | ✅ High |
| **Restart Behavior** | Idle state (not auto-start) | User control | ✅ High |
| **Animations** | CSS-only | Performance, accessibility | ✅ High |
| **iOS Handling** | Hide fullscreen button | Graceful degradation | ✅ High |
| **Touch Targets** | 44×44px minimum | WCAG AA compliance | ✅ High |
