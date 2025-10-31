# Action Controls Enhancement Specification

**Project:** Focus Timer Hub  
**Spec ID:** 003-action-controls  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** 2025-10-28

---

## Overview

This feature completes the VTea UI's action control system by adding restart and fullscreen capabilities, visual indicators for editable elements, and improved control button layout inspired by the Flocus reference design. It enables users to quickly restart sessions, enter distraction-free fullscreen mode, and clearly identify interactive elements.

---

## User Stories & Requirements

### Story 1: Active User — Quick Session Restart

**As a** user in an active focus session  
**I want** to restart the current session with one click  
**So that** I can quickly begin a fresh session without manually stopping and starting

**Acceptance Criteria:**
- [ ] Restart button is visible and accessible during all timer states (idle, running, paused)
- [ ] Clicking restart immediately resets the timer to the full session duration
- [ ] Restart preserves the current mode (Focus/Short Break/Long Break)
- [ ] Visual confirmation appears when restart is triggered (brief animation or state change)
- [ ] Restart button has ≥44×44px touch target for mobile accessibility
- [ ] Keyboard shortcut available for restart action (e.g., R key)

---

### Story 2: Focused User — Distraction-Free Fullscreen Mode

**As a** user who wants minimal distractions  
**I want** to enter fullscreen mode during focus sessions  
**So that** I can eliminate all browser chrome and desktop distractions

**Acceptance Criteria:**
- [ ] Fullscreen button is visible and accessible at all times
- [ ] Clicking fullscreen enters browser fullscreen mode (native Fullscreen API)
- [ ] Fullscreen mode hides browser UI, taskbar, and other distractions
- [ ] Exit fullscreen is possible via button, ESC key, or browser controls
- [ ] Fullscreen state persists across timer mode changes
- [ ] If fullscreen is unavailable (browser restriction), button is hidden or disabled with tooltip
- [ ] Fullscreen button has ≥44×44px touch target for mobile accessibility

---

### Story 3: New User — Clear Visual Affordances

**As a** first-time user  
**I want** clear visual indicators for interactive elements  
**So that** I immediately understand what I can click or edit

**Acceptance Criteria:**
- [ ] Editable session title has a visual indicator (e.g., pencil icon) on hover/focus
- [ ] All action buttons have consistent icon design matching VTea design system
- [ ] Hover states provide clear feedback (color change, scale, glow)
- [ ] Icons use universally recognized symbols (restart = circular arrow, fullscreen = expand)
- [ ] Icon-only buttons have accessible tooltips describing the action
- [ ] Visual hierarchy ensures primary actions (Start/Pause) are more prominent than secondary (Restart/Fullscreen)

---

### Story 4: Keyboard User — Full Keyboard Control

**As a** keyboard-only user  
**I want** to access all action controls via keyboard  
**So that** I can use the timer without touching my mouse

**Acceptance Criteria:**
- [ ] All new buttons are keyboard accessible (Tab navigation)
- [ ] Keyboard shortcuts for restart (R) and fullscreen (F) are documented
- [ ] Shortcuts work in all timer states (idle, running, paused)
- [ ] Screen reader announces button purpose and current state
- [ ] Focus outlines are visible and WCAG AA compliant (≥3:1 contrast)
- [ ] Shortcut conflicts with browser defaults are avoided or handled gracefully

---

## Constitutional Compliance Check

**Required:** All features MUST align with Focus Timer Hub constitution before approval.

- [X] **Principle 1: Focus-first Experience**
  - Restart and fullscreen require single click/keypress
  - No confirmation modals for restart (immediate action)
  - Fullscreen enhances focus by removing distractions
  - [X] Compliant
  
- [X] **Principle 2: Simple and Consistent UI**
  - Uses existing VTea design tokens (colors, spacing, typography)
  - Icon design consistent with segmented mode switcher style
  - Button labels short and direct (icons with tooltips)
  - [X] Compliant
  
- [X] **Principle 3: Accessibility and Mobile-first**
  - All buttons ≥44×44px touch targets
  - Keyboard shortcuts and screen reader support
  - Works on mobile and desktop (fullscreen uses native API)
  - [X] Compliant
  
- [X] **Principle 4: Lightweight Performance**
  - No additional JS libraries (uses native Fullscreen API)
  - Icons are inline SVG or optimized assets
  - Animations are CSS-only, respect prefers-reduced-motion
  - [X] Compliant
  
- [X] **Principle 5: Clear and Maintainable Development Workflow**
  - Implementation plan is phased and incremental
  - Components are reusable and testable
  - [X] Compliant
  
- [X] **Principle 6: Local-first Secure Data Handling**
  - No data transmission; purely UI enhancement
  - Fullscreen state is session-only (not persisted)
  - [X] Compliant

---

## Design & UX

### User Interface

**Control Button Layout:**
- Primary action row: Start/Pause/Resume button (existing, maintained)
- Secondary action row: Restart icon button | Fullscreen icon button
- Spacing: 8-12px gap between icon buttons for clear touch targets
- Alignment: Centered horizontally below timer display

**Visual Design:**
- **Restart button:** Circular arrow icon (↻), neutral color (white/70% opacity)
- **Fullscreen button:** Expand/compress icon (⛶), neutral color (white/70% opacity)
- **Hover state:** Increase to white/90% opacity, subtle scale (1.05x)
- **Active state:** Brief pulse animation, change to primary color (#4B6BFB)
- **Button style:** Circular or rounded square (consistent with VTea glass morphism)

**Editable Title Indicator:**
- Pencil icon (✏) appears on hover/focus next to session title
- Icon color: white/50% opacity, increases to white/80% on hover
- Positioned to the right of the title text

### Interactions

- **Restart:**
  1. User clicks restart button or presses R key
  2. Timer immediately resets to full duration for current mode
  3. Timer state changes to idle (ready to start)
  4. Brief visual confirmation (button pulse or color flash)

- **Fullscreen:**
  1. User clicks fullscreen button or presses F key
  2. Browser enters fullscreen mode (native API)
  3. Button icon changes to "exit fullscreen" (⛶ → ⛗)
  4. ESC key or button click exits fullscreen
  5. If fullscreen blocked (e.g., must be user-initiated), show subtle error tooltip

- **Keyboard Navigation:**
  1. Tab cycles through all interactive elements (title, mode switcher, buttons)
  2. Enter/Space activates focused button
  3. R key restarts timer (any state)
  4. F key toggles fullscreen (any state)

### Accessibility Considerations

- Color contrast verified: WCAG AA (all icon buttons have ≥3:1 contrast against background)
- Keyboard navigation: Full support (Tab, Enter, Space, R, F, ESC)
- Mobile responsive: Touch targets ≥44×44px, buttons scale appropriately on small screens
- Screen reader support: aria-label on icon-only buttons, aria-pressed for fullscreen toggle
- Tooltips: Appear on hover/focus with 1-2 word description ("Restart session", "Fullscreen mode")

---

## Testing Strategy

- [ ] **Unit Tests:** 
  - Restart button resets timer to correct duration
  - Fullscreen API calls are triggered correctly
  - Keyboard shortcuts fire expected actions
  
- [ ] **Integration Tests:**
  - Restart during running session returns to idle state
  - Fullscreen mode persists across timer state changes
  - Pencil icon appears/disappears on title hover
  
- [ ] **Accessibility Tests:**
  - WCAG AA contrast verification (WebAIM Contrast Checker)
  - Keyboard-only navigation flow test
  - Screen reader announcement verification (NVDA/JAWS)
  - Touch target validation (≥44×44px)
  
- [ ] **Mobile Testing:**
  - iOS Safari: Fullscreen behavior (may have limitations)
  - Android Chrome: Fullscreen behavior
  - Touch targets work reliably on 320px width screens
  
- [ ] **Browser Compatibility:**
  - Fullscreen API support: Chrome, Firefox, Safari, Edge
  - Graceful degradation if fullscreen unavailable

---

## Rollout Plan

### Phase 1: Restart Button (1-2 days)
- Implement restart button UI (icon, positioning, styling)
- Add restart logic (reset timer to full duration, change to idle)
- Add keyboard shortcut (R key)
- Add ARIA label and tooltip
- Manual testing on desktop and mobile

### Phase 2: Fullscreen Button (1-2 days)
- Implement fullscreen button UI (icon, toggle state)
- Integrate native Fullscreen API
- Handle enter/exit fullscreen, ESC key
- Add keyboard shortcut (F key)
- Add ARIA attributes and tooltip
- Test browser compatibility and fallback behavior

### Phase 3: Visual Indicators & Polish (1 day)
- Add pencil icon to editable title (hover/focus state)
- Refine button hover/active animations
- Ensure consistent spacing and alignment
- Visual regression testing at breakpoints (320px, 768px, 1440px)

### Phase 4: Accessibility Audit (1 day)
- Full keyboard navigation flow test
- Screen reader testing (NVDA, JAWS, VoiceOver)
- WCAG AA contrast verification
- Touch target validation
- Fix any identified issues

### Rollback Plan
- If restart button causes state issues: Disable button via feature flag, rollback to previous commit
- If fullscreen breaks on specific browsers: Hide fullscreen button for affected browsers, document limitation
- All changes are isolated to FocusCard component, minimal risk of cascade failures

---

## Metrics & Success Criteria

- [ ] Users can restart a session in ≤1 interaction (click or keypress)
- [ ] Fullscreen mode is accessible in ≤1 interaction on supported browsers
- [ ] First-time users identify editable title within 5 seconds (visual indicator effective)
- [ ] Zero WCAG AA violations in automated accessibility scan (axe-core)
- [ ] All action buttons have ≥44×44px touch targets (manual measurement)
- [ ] Keyboard shortcuts work reliably in all timer states (manual testing)
- [ ] Fullscreen API compatibility ≥90% of target browsers (Chrome, Firefox, Safari, Edge latest versions)

---

## Open Questions / Risks

| Question | Impact | Notes |
|----------|--------|-------|
| Should restart require confirmation if >10 minutes remain? | Medium | Default: No confirmation (aligns with focus-first principle). User can undo by immediately starting again. |
| Should fullscreen auto-activate when timer starts? | Medium | Default: No, user-initiated only (respects user control). Could add as settings option in future. |
| How to handle fullscreen on iOS Safari limitations? | Low | iOS Safari has restrictions on fullscreen API. Fallback: Hide button or show "unavailable" tooltip on iOS. |
| Should we persist fullscreen preference across sessions? | Low | Default: No, session-only (privacy-preserving). User re-enables per session if desired. |

---

## Assumptions

1. **Restart behavior:** Restart always returns timer to idle state (not auto-start) to give user control
2. **Fullscreen persistence:** Fullscreen does NOT persist across page reloads (respects browser security)
3. **Icon design:** Using universal icon symbols (↻, ⛶) recognized across cultures
4. **Keyboard shortcuts:** R and F keys do not conflict with critical browser shortcuts
5. **Touch targets:** 44×44px minimum meets WCAG 2.1 Level AA for mobile (2.5.5 Target Size)
6. **Visual priority:** Restart and fullscreen are secondary actions, less prominent than Start/Pause
7. **No confirmation modals:** All actions are immediate and reversible (aligns with constitution)
8. **Browser support:** Fullscreen API is widely supported (>95% of modern browsers)

---

## Out of Scope (For Now)

- Additional action buttons (e.g., skip to next session, extend timer)
- Bottom action bar with multiple utility buttons (defer to future spec)
- Customizable keyboard shortcuts (use hardcoded R/F for simplicity)
- Restart confirmation modal (conflicts with focus-first principle)
- Fullscreen preference persistence (privacy consideration)
- Advanced fullscreen features (e.g., wake lock API)
- Undo/redo for restart action (too complex for MVP)

---

## Appendix: References

- **Related specs:** 
  - 001-focus-timer-hub (MVP baseline)
  - 002-vtea-ui-makeover (design system foundation)
- **Design reference:** Flocus app interface (inspiration for action control layout)
- **Technical references:**
  - MDN Fullscreen API: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  - WCAG 2.1 Level AA Target Size: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
