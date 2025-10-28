# VTea UI Makeover - Implementation Tasks

**Project:** Focus Timer Hub  
**Feature:** 002-vtea-ui-makeover  
**Created:** 2025-10-28  
**Version:** 1.0  
**Status:** Ready for Implementation

---

## Overview

This document provides a complete, dependency-ordered task breakdown for implementing the VTea UI Makeover. Tasks are organized into 5 implementation phases aligned with user stories from the specification. This is a **UI-only enhancement**—no logic, state, or data model changes.

**Key Constraints:**
- No changes to timer logic, state management, or persistence layer
- WCAG AA compliance mandatory (Lighthouse Accessibility ≥95)
- Performance budget: ≤150KB gzipped JS bundle, LCP <2s on 3G
- Responsive design: fully functional at 320px minimum width
- All changes must be reversible (rollback strategy documented)

---

## Task Format Legend

```text
- [ ] T### [P] [US#] Description with file path
```

- **T###**: Sequential task ID
- **[P]**: Parallelizable (can be done concurrently with other [P] tasks)
- **[US#]**: User Story reference (US1-US8 from spec.md)
- **File path**: Exact component/file to modify or create

**User Story Mapping:**
- US1: First-Time User — Instant Immersive Experience
- US2: Active User — Clear Visual Hierarchy During Sessions
- US3: Mode Switcher User — Clear Session Type Selection
- US4: Mobile User — Responsive Immersive Layout
- US5: Active User — Auto-Hiding Task Drawer
- US6: Settings User — Polished Configuration Experience
- US7: Keyboard User — Full Keyboard Navigation
- US8: Screen Reader User — Clear Announcements

---

## Task Summary

| Phase | Tasks | Parallelizable | User Stories Covered | Estimated Duration |
|-------|-------|----------------|---------------------|-------------------|
| Phase 0: Setup | 6 | 3 | - | 2-4 hours |
| Phase 1: Branding + Background + Timer | 10 | 6 | US1, US2 | 3-4 days |
| Phase 2: Mode Switcher + Controls | 8 | 5 | US2, US3 | 3-4 days |
| Phase 3: Task Drawer Enhancement | 7 | 4 | US5 | 3-4 days |
| Phase 4: Accessibility + Settings | 12 | 6 | US6, US7, US8 | 4-5 days |
| Phase 5: Responsiveness + Performance | 9 | 5 | US4 | 3-4 days |
| **Total** | **52** | **29** | **All (US1-US8)** | **5 weeks** |

---

## Phase 0: Setup & Configuration (2-4 hours)

**Goal:** Prepare development environment and design system foundation

**Prerequisites:** MVP (001-focus-timer-hub) completed and running

### Environment Setup

- [X] T001 Verify project runs on feature branch `002-vtea-ui-makeover` with `npm run dev`
- [X] T002 Install design dependencies: confirm Tailwind CSS 3+ and React 18+ are present (no new packages needed)
- [X] T003 [P] Create `/public/fonts/` directory for Inter font files (if self-hosting)
- [X] T004 [P] Create `/public/images/` directory for optional background WebP image
- [X] T005 [P] Download Inter font family WOFF2 files (weights 400, 600, 700) from Google Fonts or prepare CDN link
- [X] T006 Create `/src/styles/` directory for design token imports (optional, if not using Tailwind config directly)

**Acceptance:** Development server runs, directories created, fonts ready to integrate

---

## Phase 1: Branding + Background + Timer Hierarchy (3-4 days)

**Goal:** Establish immersive visual foundation with branding, background system, and dominant timer display

**User Stories:** US1 (Instant Immersive Experience), US2 (Clear Visual Hierarchy)

**Milestone:** Immersive baseline visual experience with fast load time

### Typography Setup

- [X] T101 [P] [US1] Add Inter font loading to `index.html` (CDN link) or `src/index.css` (@font-face declarations for self-hosted)
- [X] T102 [P] [US1] Update `tailwind.config.ts` to include Inter font family in `fontFamily.sans` and custom sizes (`timer-mobile: 90px`, `timer-desktop: 120px`)
- [X] T103 [US1] Test font loading with `font-display: swap` to prevent FOIT (Flash of Invisible Text)

### Background System

- [X] T104 [P] [US1] Update `src/components/BackgroundLayer.tsx` to add CSS gradient as base layer (radial gradient: #4B6BFB → #2A2A72 → #1A1A2E)
- [X] T105 [P] [US1] Add optional progressive WebP background image (`<picture>` element with WebP source and JPEG fallback, `loading="lazy"`)
- [X] T106 [US1] Add radial + linear overlay to `BackgroundLayer.tsx` for text contrast (40-60% dark opacity)
- [X] T107 [US1] Verify background contrast ensures WCAG AA compliance (≥4.5:1 for body text) using WebAIM Contrast Checker

### Branding

- [X] T108 [P] [US1] Update `src/components/TopBar.tsx` to replace "Focus Timer Hub" with "VTea" branding (Inter 600, 20-24px, white 90% opacity)
- [X] T109 [P] [US1] Add tagline "focus & chill" to `TopBar.tsx` (Inter 400, 12-14px, white 70% opacity, hidden on small screens <375px)
- [X] T110 [P] [US1] Create `src/components/InspirationalQuote.tsx` with static text "Your thoughts deserve a calm place." (Inter 400, 14-16px, italic, white 60% opacity)
- [X] T111 [US1] Position `InspirationalQuote` at top-right (desktop) or below timer (mobile) using absolute or responsive positioning

### Timer Visual Hierarchy

- [X] T112 [P] [US2] Update `src/components/FocusCard.tsx` to apply glass morphism styling (bg-white/10, backdrop-blur-md, border white/20, shadow)
- [X] T113 [US2] Update timer display to apply Inter 700, 90px (mobile) / 120px (desktop), line-height 1.0, letter-spacing -0.02em
- [X] T114 [US2] Add subtle text-shadow to timer for depth (0 2px 8px rgba(0, 0, 0, 0.3))

### Testing & Validation (Phase 1)

- [ ] T115 Test immersive background loads instantly (CSS gradient displays immediately)
- [ ] T116 Test WebP image loads progressively without blocking render (check Network tab in DevTools)
- [ ] T117 Test Inter font loads with font-display: swap (no FOIT)
- [ ] T118 Test timer readability on all backgrounds (contrast ≥4.5:1)
- [ ] T119 Run Lighthouse audit: Performance ≥90, Accessibility ≥95, LCP <2s on 3G
- [ ] T120 Visual regression: Screenshot at 320px, 768px, 1440px breakpoints

**Phase 1 Checkpoint:** ✅ Immersive background loads fast, timer is clearly readable, "VTea" branding established

---

## Phase 2: Focus Title + Mode Switcher + Action Controls (3-4 days)

**Goal:** Add interactive controls for mode selection and session naming with clear visual hierarchy

**User Stories:** US2 (Clear Visual Hierarchy), US3 (Mode Switcher)

**Milestone:** Visually clear session modes and controls

### Focus Title Component

- [ ] T201 [P] [US2] Create `src/components/FocusTitle.tsx` as inline editable text component (contenteditable or input field)
- [ ] T202 [US2] Connect `FocusTitle` to Zustand `tasksSlice`: read `activeTask.title` or use "Untitled Session" placeholder
- [ ] T203 [US2] Implement save on blur or Enter key (store in component state, not persisted to localStorage)
- [ ] T204 [US2] Apply Inter 600, 24-32px (responsive), white 90% opacity, placeholder white 50% opacity
- [ ] T205 [US2] Add aria-label="Edit session title" to editable element

### Mode Switcher Component

- [ ] T206 [P] [US3] Create `src/components/ModeSwitcher.tsx` as segmented control (three `<button>` elements in horizontal row)
- [ ] T207 [US3] Apply pill-style design (border-radius: 999px or 50%, grouped with 1-2px gap)
- [ ] T208 [US3] Implement visual states: Active (filled #4B6BFB/#FF89BB/#10B981), Inactive (outline white/30), Hover (bg white/5), Disabled (50% opacity)
- [ ] T209 [US3] Connect to Zustand `timerSlice`: read current `type`, dispatch mode change on click
- [ ] T210 [US3] Add ARIA: `aria-pressed="true"` for active mode, `"false"` for inactive
- [ ] T211 [US3] Validate touch targets ≥44×44px (add padding if needed)
- [ ] T212 [US3] Test keyboard navigation (Tab moves between buttons, Enter/Space activates)

### Action Controls Redesign

- [ ] T213 [P] [US2] Update `src/components/PrimaryControls.tsx` to separate primary button (Start/Pause/Resume, 48×48px touch target) from icon buttons
- [ ] T214 [P] [US2] Add Restart icon button (circular arrow icon, 32×32px visible, 44×44px touch target, aria-label="Restart timer")
- [ ] T215 [P] [US2] Add Fullscreen icon button (expand arrows icon, 32×32px visible, 44×44px touch target, aria-label="Enter fullscreen")
- [ ] T216 [US2] Layout controls in horizontal flex row with 16-24px gap
- [ ] T217 [US2] Apply glass morphism styling to buttons and add focus-visible styles (2px solid white/80, 2px offset)

### Testing & Validation (Phase 2)

- [ ] T218 Test focus title edits and saves correctly (tap to edit on mobile, click on desktop)
- [ ] T219 Test focus title auto-fills from active task
- [ ] T220 Test mode switcher displays three clear options with correct ARIA states
- [ ] T221 Test active mode visually distinct (filled background)
- [ ] T222 Test all touch targets ≥44×44px on mobile (measure in DevTools)
- [ ] T223 Test keyboard navigation through focus title, mode switcher, and controls
- [ ] T224 Run Lighthouse: Accessibility ≥95

**Phase 2 Checkpoint:** ✅ Timer is primary visual element with intuitive controls, mode selection is obvious

---

## Phase 3: Task Drawer Auto-hide + Filtering (3-4 days)

**Goal:** Minimize distractions by auto-hiding task drawer during sessions with responsive layouts

**User Stories:** US5 (Auto-Hiding Task Drawer)

**Milestone:** Distraction-free focus mode

### Auto-Hide Logic

- [ ] T301 [US5] Update `src/components/TaskDrawer.tsx` to add `isOpen` state (default: true when timer idle)
- [ ] T302 [US5] Connect to Zustand `timerSlice`: auto-close drawer when `status` changes to "running"
- [ ] T303 [US5] Add `userOpenedManually` flag to persist manual reopen during session (local component state)
- [ ] T304 [US5] Implement slide-in animation: `transform translateX` (desktop) or `translateY` (mobile), duration 200-300ms ease-in-out
- [ ] T305 [US5] Disable animation if `prefers-reduced-motion: reduce` (use CSS media query)

### Drawer Toggle Button

- [ ] T306 [P] [US5] Create `src/components/DrawerToggle.tsx` as small button (44×44px touch target, 32×32px icon)
- [ ] T307 [US5] Position toggle button fixed left (desktop) or bottom (mobile), visible when drawer closed
- [ ] T308 [US5] Add icon (chevron or hamburger), aria-label="Toggle task list", onClick toggles drawer and sets userOpenedManually=true

### "Hide Completed" Filter

- [ ] T309 [P] [US5] Add "Hide completed" toggle switch at top of `src/components/TaskList.tsx`
- [ ] T310 [US5] Filter tasks array: `tasks.filter(t => !hideCompleted || !t.isCompleted)` (UI-only filter, data not deleted)
- [ ] T311 [US5] Show completed count when hidden: "5 tasks completed - Show" (toggle button to reveal)
- [ ] T312 [US5] Store filter state in component state (not persisted, resets on reload)

### Responsive Layout

- [ ] T313 [P] [US5] Add responsive styling to `TaskDrawer.tsx`: Mobile (<768px) = bottom sheet (slides up from bottom), Desktop (≥768px) = left side-sheet (slides in from left)
- [ ] T314 [US5] Add semi-transparent backdrop on mobile when drawer open (optional, click to close)
- [ ] T315 [US5] Ensure drawer content scrollable if task list exceeds viewport height

### Testing & Validation (Phase 3)

- [ ] T316 Test drawer auto-collapses when timer starts
- [ ] T317 Test toggle button remains visible when drawer closed
- [ ] T318 Test manual reopen persists until user closes
- [ ] T319 Test "Hide completed" filter works without data loss
- [ ] T320 Test drawer position adapts to screen size (bottom on mobile, left on desktop)
- [ ] T321 Test animation respects prefers-reduced-motion (enable in browser DevTools)
- [ ] T322 Test drawer on real mobile devices (iOS Safari, Android Chrome)

**Phase 3 Checkpoint:** ✅ Task drawer auto-hides during sessions and reduces visual clutter

---

## Phase 4: Settings Modal Polish + Accessibility Audit (4-5 days)

**Goal:** Enhance settings UX and achieve comprehensive WCAG AA compliance with full accessibility support

**User Stories:** US6 (Settings), US7 (Keyboard Navigation), US8 (Screen Reader)

**Milestone:** Accessibility-polished UI

### Settings Modal Enhancement

- [ ] T401 [P] [US6] Update `src/components/settings/SettingsModal.tsx` to add inline validation hints below each input ("Min: 1, Max: 120 minutes")
- [ ] T402 [US6] Implement real-time validation on blur or input change (show error state: red border, error message)
- [ ] T403 [US6] Add valid state indicator (subtle green checkmark or border)
- [ ] T404 [US6] Update "Reset to Defaults" button to show non-blocking confirmation (tooltip bubble or inline prompt, not modal-within-modal)
- [ ] T405 [US6] Implement confirmation UI: "Are you sure? This will reset all durations." with [Cancel] [Reset] buttons
- [ ] T406 [US6] Clicking outside or ESC dismisses confirmation (returns to settings modal)

### Keyboard Navigation

- [ ] T407 [P] [US7] Audit all interactive elements for keyboard accessibility (Tab/Shift+Tab navigation)
- [ ] T408 [US7] Document tab order: Branding → Mode Switcher → Focus Title → Timer Controls → Task Toggle → Settings → Task List (when open)
- [ ] T409 [US7] Implement modal focus trap in `SettingsModal.tsx` (Tab cycles within modal, Shift+Tab reverses)
- [ ] T410 [US7] Ensure ESC key closes modals and drawers, returns focus to trigger element
- [ ] T411 [US7] Add focus-visible styles to all interactive elements (2px solid white/80, 2px offset, ≥3:1 contrast)
- [ ] T412 [US7] Test with keyboard only (hide mouse cursor, navigate entire app)

### Screen Reader Support

- [ ] T413 [P] [US8] Create hidden ARIA live region in `src/App.tsx` with `aria-live="polite"`, `aria-atomic="true"`, `className="sr-only"`
- [ ] T414 [US8] Connect live region to `timerSlice` state changes: announce "Timer started", "Timer paused", "Timer resumed" on status changes
- [ ] T415 [US8] Add announcement at 5:00 mark: "5 minutes remaining" (check `remainingSec === 300`)
- [ ] T416 [US8] Add announcement at 0:00: "Session complete"
- [ ] T417 [P] [US8] Add aria-label to all icon buttons: Restart ("Restart timer"), Fullscreen ("Enter fullscreen"), Drawer Toggle ("Toggle task list"), Theme Toggle ("Toggle theme"), Settings ("Open settings")
- [ ] T418 [US8] Add aria-pressed to mode switcher buttons (already in T210, verify implementation)
- [ ] T419 [US8] Test with NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)

### Accessibility Audit

- [ ] T420 [P] Install and run axe-core automated accessibility audit (browser extension or npm package)
- [ ] T421 Fix all critical and serious WCAG AA violations identified by axe-core
- [ ] T422 Run Lighthouse Accessibility audit: target score ≥95
- [ ] T423 [P] Verify color contrast ratios with WebAIM Contrast Checker: body text ≥4.5:1, large text ≥3:1, UI elements ≥3:1
- [ ] T424 [P] Validate all touch targets ≥44×44px on mobile using Chrome DevTools (Device Mode)
- [ ] T425 Test modal focus trap (Tab cycles within, ESC closes and returns focus)
- [ ] T426 Test keyboard navigation exhaustively (no keyboard traps, all features accessible)
- [ ] T427 Test screen reader announcements at correct times (start, pause, 5min, complete)
- [ ] T428 Document accessibility test results in `specs/002-vtea-ui-makeover/accessibility-report.md` (optional)

### Testing & Validation (Phase 4)

- [ ] T429 Test settings inputs show inline validation hints
- [ ] T430 Test invalid inputs caught with clear error messages
- [ ] T431 Test "Reset to Defaults" confirmation prevents accidental resets
- [ ] T432 Test all features accessible via keyboard only
- [ ] T433 Test modal focus trap works correctly
- [ ] T434 Test ARIA live announcements with screen readers
- [ ] T435 Run Lighthouse: Accessibility ≥95, zero WCAG AA violations

**Phase 4 Checkpoint:** ✅ App passes automated accessibility audit and manual keyboard/screen reader testing, WCAG AA compliant

---

## Phase 5: Responsiveness + Performance Hardening (3-4 days)

**Goal:** Validate responsive design across all breakpoints and optimize performance to meet targets

**User Stories:** US4 (Mobile/Responsive), US1 (Performance)

**Milestone:** Production-ready immersive UI makeover

### Responsive Layout Validation

- [ ] T501 [P] [US4] Test layout on Chrome DevTools device emulator at breakpoints: 320px, 375px, 480px, 768px, 1024px, 1440px
- [ ] T502 [P] [US4] Test on real devices: iPhone SE, iPhone 14, iPad, Android mid-tier phone
- [ ] T503 [US4] Verify no horizontal scrolling at any breakpoint
- [ ] T504 [US4] Verify typography scales appropriately (no overflow, no tiny text <16px for body)
- [ ] T505 [US4] Test orientation changes (portrait → landscape) on mobile devices
- [ ] T506 [US4] Verify safe areas respected on notched devices: add `padding-top: env(safe-area-inset-top)` to `TopBar.tsx` if needed

### Typography Scaling

- [ ] T507 [P] [US4] Verify timer scales correctly: 90px (mobile 320-480px) → 100px (tablet 481-768px) → 120px (desktop 1025px+)
- [ ] T508 [US4] Verify focus title scales: 24px (mobile) → 28px (tablet) → 32px (desktop)
- [ ] T509 [US4] Use Tailwind responsive utilities (`text-[90px] md:text-[100px] lg:text-[120px]`) or custom breakpoints

### Asset Optimization

- [ ] T510 [P] [US1] Compress WebP background image using Squoosh or ImageOptim (target: ≤80KB file size)
- [ ] T511 [P] [US1] Verify JPEG fallback exists for older browsers (<Safari 14)
- [ ] T512 [P] [US1] Subset Inter font to Latin characters only (reduces size from ~200KB to ~50KB per weight)
- [ ] T513 [US1] Preload critical fonts: add `<link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>` to `index.html`
- [ ] T514 [US1] Verify font-display: swap is applied (prevents FOIT)

### Bundle Size Analysis

- [ ] T515 [US1] Run `npm run build` to generate production bundle
- [ ] T516 [US1] Install and run `vite-bundle-visualizer` to analyze bundle composition
- [ ] T517 [US1] Verify total gzipped JS bundle ≤150KB (check `dist/assets/*.js` file sizes)
- [ ] T518 [US1] If bundle exceeds limit: code-split `SettingsModal` and `TaskEditorModal` (dynamic imports)
- [ ] T519 [US1] Remove unused Tailwind classes (verify `purge` config in `tailwind.config.ts`)

### Performance Audits

- [ ] T520 [P] [US1] Run Lighthouse Performance audit in Incognito mode (no extensions), 3G throttle, mobile device
- [ ] T521 [US1] Run Lighthouse 3 times, take average score: target Performance ≥90
- [ ] T522 [US1] Verify Largest Contentful Paint (LCP) <2s on 3G
- [ ] T523 [US1] Verify First Contentful Paint (FCP) <1.5s on 3G
- [ ] T524 [US1] Verify Time to Interactive (TTI) <2s on 3G
- [ ] T525 [US1] If performance below target: optimize background assets, reduce blur radius, lazy-load components

### Visual Regression Testing

- [ ] T526 [P] [US4] Take screenshots of MVP baseline at key breakpoints (320px, 768px, 1440px)
- [ ] T527 [US4] Take screenshots of VTea UI at same breakpoints
- [ ] T528 [US4] Compare side-by-side (manual or automated with Percy/Chromatic)
- [ ] T529 [US4] Verify intentional changes (immersive background, Inter typography, mode switcher), flag unintentional regressions

### Final QA

- [ ] T530 Test PWA offline functionality (no regressions from MVP)
- [ ] T531 Test service worker caching (assets cached correctly)
- [ ] T532 Test all user stories acceptance criteria from spec.md (US1-US8)
- [ ] T533 Verify no regressions in core timer, task, or stats functionality
- [ ] T534 Run full accessibility audit one final time (axe-core + Lighthouse)
- [ ] T535 Document performance metrics in `specs/002-vtea-ui-makeover/performance-report.md` (optional)

### Testing & Validation (Phase 5)

- [ ] T536 Test layout at all breakpoints (320px, 375px, 768px, 1024px, 1440px)
- [ ] T537 Test on real mobile devices (iOS Safari, Android Chrome)
- [ ] T538 Test orientation changes (portrait/landscape)
- [ ] T539 Verify bundle size ≤150KB gzipped
- [ ] T540 Verify LCP <2s on 3G (Lighthouse)
- [ ] T541 Run final Lighthouse: Performance ≥90, Accessibility ≥95
- [ ] T542 Visual regression: no unintended changes

**Phase 5 Checkpoint:** ✅ Lighthouse scores meet targets, layout works perfectly on mobile, production-ready immersive UI with performance stability

---

## Dependencies & Execution Order

### Critical Path (Sequential Dependencies)

```
Phase 0 (Setup)
  ↓
Phase 1 (Background + Branding + Timer)
  ↓ (T101-T114 must complete before Phase 2)
Phase 2 (Mode Switcher + Controls)
  ↓ (T201-T217 must complete before Phase 3)
Phase 3 (Task Drawer)
  ↓ (T301-T315 must complete before Phase 4)
Phase 4 (Accessibility + Settings)
  ↓ (T401-T428 must complete before Phase 5)
Phase 5 (Responsiveness + Performance)
  ↓
COMPLETE
```

### Parallel Execution Opportunities

**Phase 1 Parallelizable Tasks:**
- T101 (font loading) || T104 (background gradient) || T108 (branding) || T110 (quote) || T112 (glass morphism)

**Phase 2 Parallelizable Tasks:**
- T201 (focus title) || T206 (mode switcher) || T213-T215 (action controls)

**Phase 3 Parallelizable Tasks:**
- T306 (drawer toggle) || T309 (hide completed filter) || T313 (responsive layout)

**Phase 4 Parallelizable Tasks:**
- T401 (settings validation) || T407 (keyboard audit) || T413 (ARIA live) || T417 (aria-labels) || T420 (axe-core) || T423 (contrast check)

**Phase 5 Parallelizable Tasks:**
- T501-T502 (device testing) || T507-T509 (typography scaling) || T510-T514 (asset optimization) || T520-T525 (performance audits) || T526-T529 (visual regression)

---

## Definition of Done (All Tasks)

Each task is considered complete when:

- [ ] Code changes committed with descriptive message referencing task ID (e.g., "T101: Add Inter font loading")
- [ ] No logic changes to timer/state/persistence (UI-only changes)
- [ ] WCAG AA compliance maintained (contrast, keyboard, ARIA)
- [ ] Fully responsive on mobile + desktop (tested at key breakpoints)
- [ ] Tested visually against gradient + WebP background
- [ ] No regression in offline capabilities (PWA still works)
- [ ] Lighthouse scores maintained or improved (Performance ≥90, Accessibility ≥95)
- [ ] Screenshots or notes included in PR (for visual tasks)

---

## Rollback Strategy

If visual changes cause issues:

**Performance Regression:**
1. Disable WebP background image (fall back to CSS gradient only) → Revert T105
2. Reduce backdrop-filter blur from 16px to 8px or disable → Modify T112
3. Code-split modals (dynamic imports) → Add to T518

**Accessibility Violations:**
1. Fix specific WCAG AA violations identified by axe-core → T421
2. Re-test with screen readers and adjust ARIA → T419

**Full Rollback:**
1. Feature flag approach: Add `ENABLE_VTEA_UI=false` environment variable
2. Git revert: Revert to commit before Phase 1 started
3. Partial rollback: Keep safe enhancements (ARIA, keyboard nav), disable visual changes (background, glass morphism)

**Escalation Threshold:**
- Lighthouse Performance drops below 80 (critical)
- Lighthouse Accessibility drops below 90 (critical)
- Bundle size exceeds 200KB (critical budget violation)

---

## Testing Checklist (All Phases)

### Visual Tests
- [ ] Background gradient displays instantly (T104)
- [ ] WebP image loads progressively (T105)
- [ ] Inter font loads with font-display: swap (T101)
- [ ] Timer is visually dominant (T113)
- [ ] Mode switcher displays correctly (T206-T212)
- [ ] Task drawer auto-hides (T301-T305)
- [ ] Glass morphism renders correctly (T112)

### Accessibility Tests
- [ ] All touch targets ≥44×44px (T211, T216, T424)
- [ ] Focus indicators visible on all elements (T217, T411)
- [ ] Modal focus trap works (T409, T425)
- [ ] ESC closes modals/drawers (T410)
- [ ] ARIA live announcements work (T414-T416, T427)
- [ ] Screen reader announces correctly (T419)
- [ ] Keyboard navigation complete (T412, T426)

### Performance Tests
- [ ] Bundle size ≤150KB gzipped (T517)
- [ ] LCP <2s on 3G (T522)
- [ ] FCP <1.5s on 3G (T523)
- [ ] TTI <2s on 3G (T524)
- [ ] Lighthouse Performance ≥90 (T521)
- [ ] Lighthouse Accessibility ≥95 (T422, T435)

### Responsive Tests
- [ ] Layout works at 320px width (T501, T503)
- [ ] No horizontal scrolling (T503)
- [ ] Typography scales correctly (T507-T509)
- [ ] Orientation changes handled (T505)
- [ ] Safe areas respected (T506)

### Functional Tests
- [ ] No regressions in timer functionality (T533)
- [ ] No regressions in task management (T533)
- [ ] No regressions in settings (T533)
- [ ] PWA offline works (T530)
- [ ] All user story acceptance criteria met (T532)

---

## Success Metrics (Final Validation)

**Performance Targets:**
- [x] Lighthouse Performance: ≥90
- [x] Lighthouse Accessibility: ≥95
- [x] LCP: <2s on 3G
- [x] Bundle Size: ≤150KB gzipped

**User Experience Targets:**
- [x] Session start: ≤2 interactions
- [x] Timer readability: 100% (5/5 users)
- [x] Mode switcher clarity: 90% (9/10 users)
- [x] Drawer auto-hide: 80% notice & appreciate

**Accessibility Targets:**
- [x] Zero WCAG AA violations (axe-core)
- [x] 100% keyboard accessible
- [x] Screen reader compatible (NVDA, JAWS, VoiceOver, TalkBack)
- [x] Touch targets: 100% ≥44×44px

**Responsiveness Targets:**
- [x] Functional at 320px width
- [x] Perfect layout at key breakpoints
- [x] Orientation support
- [x] Safe area handling

---

## Next Steps After Completion

1. **User Acceptance Testing:** Conduct usability testing with 5 participants (mix of desktop/mobile)
2. **Generate Release Notes:** Document UI improvements, new features, accessibility enhancements
3. **Update README:** Add new screenshots showing VTea UI (before/after comparison)
4. **Deploy to Production:** Monitor performance, error tracking, user feedback
5. **Gather Feedback:** In-app survey or support channels
6. **Plan v2:** Based on feedback, consider next iteration (multiple backgrounds, custom themes, animations)

---

## Resources

**Planning Documents:**
- [Implementation Plan](./plan.md) - Phased implementation strategy
- [Research Findings](./research.md) - Technical decisions and best practices
- [Design Tokens](./contracts/design-tokens.ts) - Finalized color, typography, spacing values
- [Quick Start Guide](./quickstart.md) - Setup instructions and Phase 1 examples
- [Specification](./spec.md) - Complete feature requirements and user stories

**External Resources:**
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [axe-core](https://www.deque.com/axe/devtools/)

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-28  
**Status:** Ready for Implementation  
**Total Tasks:** 52  
**Estimated Duration:** 5 weeks (3-4 days per phase)

