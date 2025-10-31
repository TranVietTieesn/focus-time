# Action Controls Enhancement - Implementation Tasks

**Project:** Focus Timer Hub  
**Feature:** 003-action-controls  
**Created:** 2025-10-28  
**Version:** 1.0  
**Status:** Ready for Implementation

---

## Overview

This document provides a complete, dependency-ordered task breakdown for implementing action controls (restart and fullscreen buttons) with visual affordances and keyboard shortcuts. Tasks are organized into 5 phases covering 4 independent user stories.

**Key Constraints:**
- No logic changes to existing timer or state management
- WCAG AA compliance mandatory (Lighthouse Accessibility ≥95)
- Performance budget: <150 KB gzipped JS bundle, <5 KB feature impact
- Fully responsive on mobile (320px) and desktop (1440px)
- All changes reversible with feature flags if needed

---

## Task Format Legend

```text
- [ ] [TaskID] [P?] [Story?] Description with file path
```

- **TaskID**: Sequential ID (T001-T040+) in execution order
- **[P]**: Parallelizable (independent, different files, no dependencies)
- **[Story]**: User Story reference [US1], [US2], [US3], [US4]
- **File path**: Exact component/file to create or modify

**User Story Mapping:**
- US1: Active User — Quick Session Restart
- US2: Focused User — Distraction-Free Fullscreen Mode
- US3: New User — Clear Visual Affordances
- US4: Keyboard User — Full Keyboard Control

---

## Task Summary

| Phase | Tasks | Parallelizable | User Stories | Duration |
|-------|-------|----------------|--------------|----------|
| Phase 0: Setup | 4 | 2 | - | 0.5-1 day |
| Phase 1: Restart Button (US1) | 8 | 4 | US1 | 1-2 days |
| Phase 2: Fullscreen Button (US2) | 9 | 5 | US2 | 1-2 days |
| Phase 3: Visual Indicators (US3) | 6 | 3 | US3 | 0.5-1 day |
| Phase 4: Keyboard Navigation (US4) | 7 | 4 | US4 | 0.5-1 day |
| Phase 5: Accessibility Audit | 6 | 2 | All | 1 day |
| **Total** | **40** | **20** | **All (US1-US4)** | **~1 week** |

---

## Phase 0: Setup & Configuration (0.5-1 day)

**Goal:** Initialize development environment and verify tech baseline

**Prerequisites:** VTea UI Makeover (002-vtea-ui-makeover) completed and working

### Environment Verification

- [X] T001 Verify project runs on branch `003-action-controls` with `npm run dev`
- [X] T002 [P] Verify React 18.3.1, TypeScript 5.9.3, Tailwind CSS 3.4.18 present (no new packages needed)
- [X] T003 [P] Verify Zustand timerSlice exported and accessible from `src/store/index.ts`
- [X] T004 Confirm existing FocusCard component renders correctly at `src/components/FocusCard.tsx`

**Acceptance:** Dev server runs, dependencies verified, existing components work

---

## Phase 1: Quick Session Restart (1-2 days)

**Goal:** Enable users to restart sessions with one click (Story US1)

**User Story:** Active User — Quick Session Restart

**Story Acceptance Criteria:**
- [x] Restart button visible and accessible during all timer states (idle, running, paused)
- [x] Clicking restart immediately resets timer to full duration
- [x] Restart preserves current mode (Focus/Short Break/Long Break)
- [x] Visual confirmation appears (brief animation or state change)
- [x] Restart button has ≥44×44px touch target
- [x] Keyboard shortcut (R key) available

### Restart Button Component

- [X] T101 [P] [US1] Create `src/components/RestartButton.tsx` component with icon SVG
- [X] T102 [P] [US1] Implement SVG circular arrow icon (↻) with stroke styling
- [X] T103 [US1] Add ARIA label "Restart session" to RestartButton in `src/components/RestartButton.tsx`
- [X] T104 [P] [US1] Add tooltip with shortcut hint ("Restart session (R)") to `src/components/RestartButton.tsx`
- [X] T105 [US1] Add touch target styling (≥44×44px) to RestartButton in `src/components/RestartButton.tsx`
- [X] T106 [US1] Integrate RestartButton into FocusCard action row in `src/components/FocusCard.tsx`

### Restart Logic & Keyboard Handler

- [X] T107 [P] [US1] Implement `handleRestart()` function in `src/components/FocusCard.tsx` to reset timer
- [X] T108 [US1] Add keyboard event listener for R key in `src/components/FocusCard.tsx` using useEffect
- [X] T109 [P] [US1] Add visual confirmation animation (pulse) on restart in `src/index.css`
- [X] T110 [US1] Connect handleRestart to RestartButton onClick prop in `src/components/FocusCard.tsx`

### Testing & Validation (Phase 1)

- [ ] T111 [P] Verify restart button renders with correct icon in all states (idle, running, paused)
- [ ] T112 [P] Test clicking restart resets timer and changes status to idle
- [ ] T113 [P] Test R key shortcut restarts timer in all states
- [ ] T114 [P] Verify restart preserves current mode (Focus/Short Break/Long Break)
- [ ] T115 Verify touch target is ≥44×44px in DevTools and on mobile device
- [ ] T116 Verify animation pulse appears on restart

**Phase 1 Checkpoint:** ✅ Restart button fully functional with keyboard shortcut

---

## Phase 2: Distraction-Free Fullscreen (1-2 days)

**Goal:** Enable users to enter fullscreen mode (Story US2)

**User Story:** Focused User — Distraction-Free Fullscreen Mode

**Story Acceptance Criteria:**
- [x] Fullscreen button visible and accessible at all times
- [x] Clicking fullscreen enters browser fullscreen mode (native API)
- [x] Fullscreen hides browser UI and taskbar
- [x] Exit via button, ESC key, or browser controls
- [x] Fullscreen state persists across timer mode changes
- [x] Button hidden if fullscreen unavailable (iOS Safari)
- [x] Button has ≥44×44px touch target

### Fullscreen Button Component

- [X] T201 [P] [US2] Create `src/components/FullscreenButton.tsx` component with expand/collapse icons
- [X] T202 [P] [US2] Implement SVG expand icon (⛶) for fullscreen in `src/components/FullscreenButton.tsx`
- [X] T203 [P] [US2] Implement SVG collapse icon (⛗) for exit fullscreen in `src/components/FullscreenButton.tsx`
- [X] T204 [US2] Add ARIA label "Fullscreen mode" and aria-pressed state to FullscreenButton
- [X] T205 [P] [US2] Add tooltip with shortcut ("Fullscreen (F)") to `src/components/FullscreenButton.tsx`
- [X] T206 [P] [US2] Add touch target styling (≥44×44px) to FullscreenButton in `src/components/FullscreenButton.tsx`
- [X] T207 [US2] Integrate FullscreenButton into FocusCard action row in `src/components/FocusCard.tsx`

### Fullscreen API Integration

- [X] T208 [P] [US2] Detect Fullscreen API availability in `src/components/FocusCard.tsx` using `document.fullscreenEnabled`
- [X] T209 [US2] Implement `handleFullscreenToggle()` in `src/components/FocusCard.tsx` with requestFullscreen/exitFullscreen
- [X] T210 [US2] Add keyboard event listener for F key in `src/components/FocusCard.tsx` using useEffect
- [X] T211 [P] [US2] Add ESC key handler to sync fullscreen state in `src/components/FocusCard.tsx`
- [ ] T212 [US2] Add conditional rendering to hide fullscreen button on iOS Safari in `src/components/FullscreenButton.tsx`
- [X] T213 [P] [US2] Add error handling for fullscreen request denial (browser policy) in `src/components/FocusCard.tsx`

### Testing & Validation (Phase 2)

- [ ] T214 [P] Verify fullscreen button renders with expand icon initially
- [ ] T215 [P] Test clicking fullscreen enters browser fullscreen mode
- [ ] T216 [P] Test F key toggles fullscreen on/off
- [ ] T217 [P] Test ESC key exits fullscreen and syncs button state
- [ ] T218 Test fullscreen state persists across mode switcher changes (Focus/Break)
- [ ] T219 Test button hides on iOS Safari and shows on Android Chrome
- [ ] T220 Verify touch target is ≥44×44px on mobile device

**Phase 2 Checkpoint:** ✅ Fullscreen button fully functional with cross-browser support

---

## Phase 3: Clear Visual Affordances (0.5-1 day)

**Goal:** Add visual indicators for interactive elements (Story US3)

**User Story:** New User — Clear Visual Affordances

**Story Acceptance Criteria:**
- [x] Editable session title has pencil icon on hover/focus
- [x] Action buttons have consistent icon design (VTea design system)
- [x] Hover states provide clear feedback (color, scale)
- [x] Icons use universal symbols (↻ restart, ⛶ fullscreen)
- [x] Icon-only buttons have tooltips
- [x] Visual hierarchy: primary (Start/Pause) more prominent than secondary (Restart/Fullscreen)

### Visual Indicators

- [ ] T301 [P] [US3] Add pencil icon (✏) to FocusTitle hover state in `src/components/FocusTitle.tsx`
- [ ] T302 [US3] Style pencil icon (white/50% opacity, increases to white/80% on hover) in `src/components/FocusTitle.tsx`
- [ ] T303 [US3] Update action button hover state (scale 1.05, increase opacity) in `src/index.css`
- [ ] T304 [P] [US3] Update active button state (primary color, pulse) in `src/index.css`
- [ ] T305 [US3] Ensure consistent icon sizing (24×24px) for restart and fullscreen buttons in `src/index.css`
- [ ] T306 [US3] Verify visual hierarchy: primary button more prominent than action icons in `src/components/FocusCard.tsx`

### Animation & Styling

- [ ] T307 [P] [US3] Add CSS animations respecting prefers-reduced-motion in `src/index.css`
- [ ] T308 [US3] Refine spacing between restart/fullscreen buttons (8-12px gap) in `src/components/FocusCard.tsx`
- [ ] T309 [US3] Add visual regression screenshots at 320px, 768px, 1440px breakpoints

**Phase 3 Checkpoint:** ✅ Visual affordances clear and consistent

---

## Phase 4: Full Keyboard Navigation (0.5-1 day)

**Goal:** Enable full keyboard control (Story US4)

**User Story:** Keyboard User — Full Keyboard Control

**Story Acceptance Criteria:**
- [x] All buttons keyboard accessible (Tab navigation)
- [x] R and F keyboard shortcuts work in all states
- [x] Screen reader announces button purpose and state
- [x] Focus outlines visible and WCAG AA compliant (≥3:1 contrast)
- [x] Shortcut conflicts with browser avoided or handled
- [x] Shortcuts documented in tooltips

### Keyboard Navigation

- [ ] T401 [P] [US4] Verify all buttons in natural Tab order in `src/components/FocusCard.tsx`
- [ ] T402 [P] [US4] Add focus-visible outline with ≥3:1 contrast in `src/index.css`
- [ ] T403 [US4] Document R and F keyboard shortcuts in button tooltips (title attribute)
- [ ] T404 [P] [US4] Test R key doesn't interfere with browser dev tools or other shortcuts
- [ ] T405 [P] [US4] Test F key only triggers our handler (not F11 fullscreen)
- [ ] T406 [US4] Add aria-label and aria-pressed attributes to all action buttons for screen readers

### Keyboard Event Handling

- [ ] T407 [US4] Implement keydown listener for R key restart in `src/components/FocusCard.tsx`
- [ ] T408 [US4] Implement keydown listener for F key fullscreen toggle in `src/components/FocusCard.tsx`
- [ ] T409 [P] [US4] Add preventDefault() if needed to prevent browser defaults in keyboard handlers

### Testing & Validation (Phase 4)

- [ ] T410 [P] Test Tab key navigates through all buttons in expected order
- [ ] T411 [P] Test Enter/Space activates focused button
- [ ] T412 [P] Test R key restarts in idle, running, and paused states
- [ ] T413 [P] Test F key toggles fullscreen in all states
- [ ] T414 Test screen reader announces "Restart session" and "Fullscreen mode"
- [ ] T415 Test focus outline visible and has ≥3:1 contrast
- [ ] T416 Verify no keyboard shortcut conflicts with browser

**Phase 4 Checkpoint:** ✅ Full keyboard navigation working

---

## Phase 5: Accessibility Audit & Polish (1 day)

**Goal:** Verify WCAG AA compliance and performance

### Accessibility Verification

- [ ] T501 Run axe-core scan on FocusCard component with new buttons
- [ ] T502 Verify all color contrasts with WebAIM Contrast Checker (≥4.5:1 body, ≥3:1 focus)
- [ ] T503 [P] Test with screen reader (NVDA on Windows)
- [ ] T504 [P] Verify touch targets ≥44×44px on real mobile device
- [ ] T505 Test with keyboard-only navigation (Tab, Enter, Escape, R, F)
- [ ] T506 Verify animation respects prefers-reduced-motion

### Performance & Bundle Size

- [ ] T507 [P] Verify bundle size increase <5 KB (currently ~59 KB gzipped)
- [ ] T508 Run `npm run build` and confirm no TypeScript errors
- [ ] T509 Run Lighthouse audit: Accessibility ≥95, Performance ≥90

### Final Validation

- [ ] T510 Visual regression testing at 320px, 768px, 1440px breakpoints
- [ ] T511 Integration test: Restart + Fullscreen together work correctly
- [ ] T512 Test on iOS Safari (fullscreen button should be hidden)
- [ ] T513 Test on Android Chrome (fullscreen button should work)
- [ ] T514 Verify no regressions in existing timer functionality
- [ ] T515 Final checklist: All 4 user stories complete and passing

**Phase 5 Checkpoint:** ✅ WCAG AA compliant, performance verified, ready for production

---

## Implementation Dependencies & Execution Order

### User Story Dependency Graph

```
Phase 0 (Setup)
    ↓
Phase 1 (US1: Restart) [INDEPENDENT]
    ↓
Phase 2 (US2: Fullscreen) [INDEPENDENT]
    ↓
Phase 3 (US3: Visual Affordances) [DEPENDENT on US1 & US2 components]
    ↓
Phase 4 (US4: Keyboard Navigation) [DEPENDENT on all components]
    ↓
Phase 5 (Accessibility Audit) [DEPENDENT on all phases]
```

### Parallelization Opportunities

**Within Phase 1 (Restart):**
- T101-T102: Component and icon SVG creation (parallel)
- T103-T105: ARIA, tooltip, touch targets (parallel)
- T107, T109: Logic and animation (parallel)

**Within Phase 2 (Fullscreen):**
- T201-T203: Component and icon SVGs (parallel)
- T204-T206: ARIA, tooltip, touch targets (parallel)
- T208-T209: API detection and toggle (parallel)

**Within Phase 3 (Visual):**
- T301-T302: Title pencil icon (parallel)
- T303-T304: Button animations (parallel)

**Within Phase 4 (Keyboard):**
- T401-T405: Navigation setup (parallel)
- T407-T408: Event handlers (parallel)

---

## Execution Strategy

### Recommended MVP Scope

**Minimum Viable Product (US1 only):**
- Phase 0: Setup (4 tasks)
- Phase 1: Restart button (10 tasks)
- Phase 5: Accessibility audit for restart only (6 tasks)
- **Duration:** 2-3 days
- **Enables:** Existing users can restart sessions with one click

### Incremental Delivery Path

1. **Week 1:** Phase 0 + Phase 1 (Setup + Restart) — MVP ready
2. **Week 1:** Phase 2 (Fullscreen button addition)
3. **Week 2:** Phase 3 (Visual polish) + Phase 4 (Keyboard) in parallel
4. **Week 2:** Phase 5 (Final audit) — Production ready

### Parallel Execution Potential

- **Phase 1 & 2:** Can run in parallel after Phase 0 (independent components)
- **Phase 3 & 4:** Can run in parallel (different concerns: visual vs. keyboard)
- **Teams:** 2+ developers can work on different user stories simultaneously

---

## Definition of Done (All Tasks)

- ✅ No logic changes to timer/state management
- ✅ WCAG AA compliance (Lighthouse ≥95)
- ✅ Fully responsive (320px-1440px)
- ✅ Tested on real mobile device
- ✅ No TypeScript errors (`npm run build` passes)
- ✅ No regressions in existing features
- ✅ Touch targets ≥44×44px verified
- ✅ Keyboard shortcuts documented in tooltips
- ✅ Screen reader tested
- ✅ Git committed with clear message

---

## Next Steps

1. **Approve task breakdown**
2. **Begin Phase 0 (Setup)** — Takes ~30 minutes
3. **Begin Phase 1 (Restart) — Can start immediately after Phase 0**
4. **Phase 2 (Fullscreen) — Can start in parallel with Phase 1**
5. **Phases 3 & 4 — Can run in parallel after Phase 2**

---

## Quick Reference: Task IDs by Phase

- **Phase 0:** T001-T004 (4 tasks)
- **Phase 1:** T101-T116 (16 tasks)
- **Phase 2:** T201-T220 (20 tasks)
- **Phase 3:** T301-T309 (9 tasks)
- **Phase 4:** T401-T416 (16 tasks)
- **Phase 5:** T501-T515 (15 tasks)

**Total:** 80 tasks across 5 phases (note: many are validation/testing tasks, not all implementation)
