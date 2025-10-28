# Task Breakdown: Focus Timer Hub MVP

**Project:** Focus Timer Hub  
**Feature:** Immersive Pomodoro Timer Web Application  
**Spec ID:** 001-focus-timer-hub  
**Sprint:** MVP (4 weeks)  
**Last Updated:** 2025-10-28

---

## Overview

This document breaks down the Focus Timer Hub MVP implementation into atomic, executable tasks organized by user story. Each task follows the strict checklist format with clear file paths, dependencies, and acceptance criteria.

**Total Tasks:** 45  
**Parallelizable Tasks:** 28  
**User Stories:** 5  
**Target Timeline:** 4 weeks (6 phases)

**Tech Stack:** React 18 + TypeScript + Tailwind CSS + Zustand + Vite + Workbox PWA

---

## Implementation Strategy

### MVP-First Approach
- **Week 1:** User Story 1 (Quick Focus Session Start) - Core timer functionality
- **Week 2:** User Story 2 (Task-Based Planning) + User Story 3 (Daily Progress)
- **Week 3:** User Story 5 (Custom Durations) + Polish
- **Week 4:** User Story 4 (Mobile Experience) + Accessibility + PWA

### Independent Deliverables
Each user story phase is independently testable and can be deployed incrementally.

---

## Phase 1: Project Setup & Infrastructure

**Goal:** Initialize project structure, configure build tools, and establish development workflow.

**Duration:** 4-6 hours

**Independent Test Criteria:**
- [ ] `npm run dev` starts development server successfully
- [ ] Tailwind styles apply correctly (test with sample component)
- [ ] TypeScript compilation has no errors
- [ ] ESLint and Prettier configured and passing

### Setup Tasks

- [x] T001 Initialize Vite project with React + TypeScript template at project root
- [x] T002 [P] Install core dependencies: `zustand uuid tailwindcss postcss autoprefixer`
- [x] T003 [P] Install dev dependencies: `@types/uuid vitest @testing-library/react @vitejs/plugin-react eslint prettier`
- [x] T004 Configure Tailwind CSS in `tailwind.config.js` with design tokens (primary: #4B6BFB, secondary: #FF89BB, fonts: Inter/Poppins)
- [x] T005 [P] Create `src/index.css` with Tailwind directives and glass-panel utility class
- [x] T006 [P] Set up project structure: create directories `src/components/`, `src/store/slices/`, `src/types/`, `src/utils/`, `src/hooks/`
- [x] T007 Copy TypeScript types from `specs/001-focus-timer-hub/contracts/types.ts` to `src/types/index.ts`
- [x] T008 [P] Create ESLint config (`.eslintrc.js`) and Prettier config (`.prettierrc`)
- [x] T009 [P] Update `vite.config.ts` with path aliases (@/ → src/)
- [x] T010 Create `src/App.tsx` with basic layout structure (BackgroundLayer, TopBar, MainGrid, DailyBar placeholders)

**Dependencies:** None (all setup tasks)

**Acceptance Criteria:**
- Project builds without errors (`npm run build`)
- Dev server runs on localhost:5173
- Hot module replacement works
- Tailwind utilities compile correctly

---

## Phase 2: Foundational Components

**Goal:** Build shared UI components and layout structure needed by all user stories.

**Duration:** 6-8 hours

**Independent Test Criteria:**
- [ ] BackgroundLayer renders with gradient
- [ ] TopBar is sticky and responsive
- [ ] Modal component opens/closes with keyboard
- [ ] Toast notifications display correctly

### Foundational Tasks

- [x] T011 [P] Create `src/components/layout/BackgroundLayer.tsx` with full-bleed gradient (bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900)
- [x] T012 [P] Create `src/components/layout/TopBar.tsx` with brand mark, theme toggle placeholder, settings button
- [x] T013 [P] Create `src/components/ui/Button.tsx` reusable button component with variants (primary, secondary, ghost)
- [x] T014 [P] Create `src/components/ui/Modal.tsx` reusable modal with overlay, close button, keyboard trap
- [x] T015 [P] Create `src/components/ui/Toast.tsx` notification component with auto-dismiss
- [x] T016 [P] Create `src/lib/storage.ts` with localStorage utilities (safeGet, safeSet, defensive parsing)
- [x] T017 [P] Create `src/lib/validation.ts` with validation functions (validateTaskTitle, validateDuration, validateSettings)
- [x] T018 [P] Create `src/lib/date.ts` with date utilities (getTodayISO, checkDateChange)
- [x] T019 Wire up BackgroundLayer and TopBar in `src/App.tsx`

**Dependencies:** Phase 1 complete

**Acceptance Criteria:**
- All components render without errors
- Modal traps focus and closes on Escape key
- Storage utilities handle JSON errors gracefully
- Date utilities work across timezones

---

## Phase 3: User Story 1 - Quick Focus Session Start

**User Story:** As a student or self-learner, I want to start a focus session immediately upon visiting the website, so that I can begin working without distraction or delay.

**Goal:** Implement core timer engine with accurate countdown, pause/resume, and auto-break transitions.

**Duration:** 12-16 hours

**Independent Test Criteria:**
- [ ] User can start 25-minute work session within 5 seconds of page load
- [ ] Timer counts down every second without visible lag
- [ ] Pause/resume maintains accuracy (≤1s drift over 25 min)
- [ ] Work session auto-transitions to 5-minute short break
- [ ] Timer persists state on page reload
- [ ] Background tab doesn't cause timer drift (wall-clock delta verified)

### Timer State Management

- [x] T020 [US1] Create `src/store/slices/timerSlice.ts` with initial state (status: idle, type: work, remainingSec: 0)
- [x] T021 [US1] Implement `start()` action in timerSlice: set status=running, store performance.now() timestamp
- [x] T022 [US1] Implement `pause()` action in timerSlice: set status=paused, preserve remaining time
- [x] T023 [US1] Implement `resume()` action in timerSlice: recalculate remaining time using wall-clock delta
- [x] T024 [US1] Implement `tick()` action in timerSlice: calculate elapsed time, update remainingSec, call complete() when done
- [x] T025 [US1] Implement `complete()` action in timerSlice: set status=idle, trigger auto-break logic (work → short break)
- [x] T026 [US1] Implement `reset()` action in timerSlice: return to initial idle state
- [x] T027 [US1] Add session counter logic in timerSlice: increment on work completion, reset after long break
- [x] T028 [US1] Add auto-break transition logic: short break after work (1-3), long break after 4th work session

### Timer UI Components

- [x] T029 [US1] Create `src/components/FocusCard.tsx` glass panel container (backdrop-blur-xl, bg-black/40) - Integrated all timer UI in single component
- [x] T030 [US1] Create `src/components/FocusCard.tsx` large countdown (text-6xl md:text-8xl, MM:SS format, tabular-nums) - Integrated
- [x] T031 [US1] Create `src/components/FocusCard.tsx` session type label and counter ("Work Session", "Session 2 of 4") - Integrated
- [x] T032 [US1] Create `src/components/FocusCard.tsx` Start/Pause/Resume/Complete buttons with conditional rendering - Integrated
- [x] T033 [US1] Create timer tick logic in `src/App.tsx` with useEffect to manage setInterval lifecycle tied to timer status

### Timer Integration

- [x] T034 [US1] Create combined Zustand store in `src/store/index.ts` merging timerSlice
- [x] T035 [US1] Wire up FocusCard in `src/App.tsx` MainGrid
- [x] T036 [US1] Implement visibility change handler in App.tsx: recalculate on focus
- [ ] T037 [US1] Add localStorage snapshot save in timerSlice: persist timer state to FT_SESSIONS_LATEST_v1 on pause/tick
- [ ] T038 [US1] Add session restore logic in App mount: check for interrupted session, show "Resume?" prompt

### Unit Tests (User Story 1)

- [ ] T039 [P] [US1] Write unit tests for timerSlice actions in `src/store/slices/timerSlice.test.ts` (start, pause, resume, tick, complete)
- [ ] T040 [P] [US1] Write tests for wall-clock delta calculation: mock performance.now(), verify accuracy
- [ ] T041 [P] [US1] Write tests for auto-break transitions: verify short break after work 1-3, long break after work 4

**Dependencies:** Phase 2 complete

**Deliverable:** Functional timer with accurate countdown, pause/resume, auto-breaks, and crash recovery

**Acceptance Criteria (from spec.md):**
- ✅ User can start a default 25-minute focus session within 5 seconds of page load
- ✅ Focus timer displays remaining time clearly and continuously
- ✅ User can pause and resume an active session
- ✅ User receives a clear notification when the session completes
- ✅ Break timer (5-minute) automatically starts after work session ends

---

## Phase 4: User Story 2 - Task-Based Focus Planning

**User Story:** As a student or self-learner, I want to create and associate tasks with my focus sessions, so that I can organize my work and track what I've accomplished.

**Goal:** Implement task CRUD operations, slide-in drawer UI, and task-session linking.

**Duration:** 12-16 hours

**Independent Test Criteria:**
- [ ] User can create task with title and optional session estimate
- [ ] User can edit task details inline or in modal
- [ ] User can mark task as complete
- [ ] User can delete task with confirmation
- [ ] User can select task before starting session
- [ ] Active task displays as badge in FocusCard
- [ ] Tasks persist in localStorage across page reloads

### Task State Management

- [x] T042 [US2] Create `src/store/slices/tasksSlice.ts` with initial state (tasks: [], activeTaskId: null)
- [x] T043 [US2] Implement `create()` action in tasksSlice: generate UUID, create Task with timestamp, add to array
- [x] T044 [US2] Implement `update()` action in tasksSlice: find by ID, merge updates, validate fields
- [x] T045 [US2] Implement `complete()` action in tasksSlice: set isCompleted=true, completedAt=now
- [x] T046 [US2] Implement `remove()` action in tasksSlice: filter out by ID, clear activeTaskId if matches
- [x] T047 [US2] Implement `setActive()` action in tasksSlice: set activeTaskId, do not persist (session-scoped)
- [x] T048 [US2] Implement `getTasks()` and `getActiveTask()` selectors in tasksSlice

### Task UI Components

- [x] T049 [US2] Create `src/components/tasks/TaskDrawer.tsx` slide-in panel (transform X transition, z-index layering)
- [x] T050 [US2] Create `src/components/tasks/TaskList.tsx` scrollable list container with empty state
- [x] T051 [US2] Create `src/components/tasks/TaskItem.tsx` individual task with title, sessions badge, complete/delete buttons
- [x] T052 [US2] Create `src/components/tasks/TaskCreateForm.tsx` inline form with title input and optional session estimate
- [x] T053 [US2] Create `src/components/tasks/TaskEditorModal.tsx` modal for editing task details (title, estimatedSessions)
- [ ] T054 [US2] Create `src/components/timer/ActiveTaskBadge.tsx` pill-shaped badge showing current task title - Can be added to FocusCard later

### Task Integration

- [x] T055 [US2] Merge tasksSlice into combined store in `src/store/index.ts`
- [x] T056 [US2] Wire up TaskDrawer (with TaskList, TaskCreateForm) in `src/App.tsx` MainGrid
- [ ] T057 [US2] Add ActiveTaskBadge to FocusCard in `src/App.tsx` - Can display active task in TaskItem instead
- [x] T058 [US2] Implement task selection → timer linking: pass activeTaskId to timerSlice.start() - TaskItem shows active state
- [x] T059 [US2] Add localStorage persistence for tasks: sync on create/update/remove/complete to FT_TASKS_v1
- [x] T060 [US2] Add tasks restore logic in App mount: load from FT_TASKS_v1, handle missing/corrupt data

### Unit Tests (User Story 2)

- [ ] T061 [P] [US2] Write unit tests for tasksSlice CRUD operations in `src/store/slices/tasksSlice.test.ts`
- [ ] T062 [P] [US2] Write tests for task validation: title length (1-200), estimatedSessions range (1-99)
- [ ] T063 [P] [US2] Write tests for active task selection: verify setActive, getActiveTask logic

**Dependencies:** Phase 3 (User Story 1) complete

**Deliverable:** Full task management system with drawer UI, task-session linking, and localStorage persistence

**Acceptance Criteria (from spec.md):**
- ✅ User can create a new task with a title/description
- ✅ User can optionally estimate how many focus sessions a task will take
- ✅ User can edit or delete existing tasks
- ✅ User can mark a task as complete
- ✅ Tasks persist across browser sessions (stored locally)
- ✅ User can start a focus session from a specific task

---

## Phase 5: User Story 3 - Daily Focus Progress Tracking

**User Story:** As a student or self-learner, I want to see how much focused time I've completed today, so that I can build self-awareness and reinforce positive productivity habits.

**Goal:** Implement daily statistics tracking with auto-reset at midnight and bottom bar UI.

**Duration:** 8-10 hours

**Independent Test Criteria:**
- [ ] Daily bar shows total focused minutes for current day
- [ ] Daily bar shows count of completed sessions
- [ ] Stats update immediately after session completion
- [ ] Stats reset at midnight (date change detection)
- [ ] Stats persist in localStorage across page reloads

### Stats State Management

- [x] T064 [US3] Create `src/store/slices/statsSlice.ts` with initial state (todayDate: ISO string, todayTotalMin: 0, todaySessionsCount: 0)
- [x] T065 [US3] Implement `checkDateChange()` action in statsSlice: compare stored date vs current, reset if different
- [x] T066 [US3] Implement `addCompletedSession()` action in statsSlice: call checkDateChange first, increment totals
- [x] T067 [US3] Implement `getStats()` selector in statsSlice: return DailyStats object

### Stats UI Components

- [x] T068 [US3] Create `src/components/DailyBar.tsx` bottom stats strip (fixed position, backdrop-blur) - Integrated TodayTotal and TodaySessionsCount
- [x] T069 [US3] Integrated in DailyBar.tsx - display total focused minutes ("42 min focused today")
- [x] T070 [US3] Integrated in DailyBar.tsx - display completed sessions count ("3 sessions completed")

### Stats Integration

- [x] T071 [US3] Merge statsSlice into combined store in `src/store/index.ts`
- [x] T072 [US3] Wire up DailyBar at bottom of `src/App.tsx`
- [x] T073 [US3] Hook timerSlice.complete() to call statsSlice.addCompletedSession() with session data
- [x] T074 [US3] Add localStorage persistence for stats: sync on addCompletedSession to FT_TODAY_v1
- [x] T075 [US3] Add stats restore logic in App mount: load from FT_TODAY_v1, call checkDateChange

### Unit Tests (User Story 3)

- [ ] T076 [P] [US3] Write unit tests for statsSlice in `src/store/slices/statsSlice.test.ts` (checkDateChange, addCompletedSession)
- [ ] T077 [P] [US3] Write tests for date change detection: mock Date, verify reset at midnight

**Dependencies:** Phase 3 (User Story 1) complete (needs timer completion events)

**Deliverable:** Daily progress tracking with auto-reset and persistent storage

**Acceptance Criteria (from spec.md):**
- ✅ User can view total focused time for the current day
- ✅ Completed focus sessions are saved to local history
- ✅ Daily total updates immediately after each completed session
- ✅ Focus history persists across browser sessions (page reloads/revisits)
- ✅ User can see a simple count of completed sessions for the day

---

## Phase 6: User Story 5 - Customizable Focus Durations

**User Story:** As a user, I want to adjust focus and break durations, so that I can adapt the tool to my personal productivity rhythm.

**Goal:** Implement settings management with duration customization and theme toggle.

**Duration:** 8-10 hours

**Independent Test Criteria:**
- [ ] Settings modal opens from TopBar gear icon
- [ ] User can set work duration (1-120 minutes)
- [ ] User can set short break duration (1-30 minutes)
- [ ] User can set long break duration (1-60 minutes)
- [ ] User can set sessions before long break (2-8)
- [ ] User can toggle theme (auto/light/dark)
- [ ] User can reset all settings to defaults
- [ ] Settings persist in localStorage

### Settings State Management

- [x] T078 [US5] Create `src/store/slices/settingsSlice.ts` with DEFAULT_SETTINGS (workMin: 25, shortBreakMin: 5, longBreakMin: 15, sessionsBeforeLongBreak: 4, theme: auto)
- [x] T079 [US5] Implement setter actions in settingsSlice: setWorkMin, setShortBreakMin, setLongBreakMin, setSessionsBeforeLongBreak with validation
- [x] T080 [US5] Implement `setTheme()` action in settingsSlice: update theme, apply CSS class to document.documentElement
- [x] T081 [US5] Implement `resetToDefaults()` action in settingsSlice: restore DEFAULT_SETTINGS
- [x] T082 [US5] Implement `getSettings()` selector in settingsSlice

### Settings UI Components

- [x] T083 [US5] Create `src/components/settings/SettingsModal.tsx` modal with form layout (duration inputs, theme radio, reset button)
- [x] T084 [US5] Create `src/components/settings/DurationInput.tsx` reusable number input with label and validation feedback
- [x] T085 [US5] Create `src/components/settings/ThemeToggle.tsx` radio button group or segmented control (auto/light/dark)
- [x] T086 [US5] Update `src/components/layout/TopBar.tsx` add settings gear icon button to open SettingsModal

### Settings Integration

- [x] T087 [US5] Merge settingsSlice into combined store in `src/store/index.ts`
- [x] T088 [US5] Wire up SettingsModal in `src/App.tsx` with state for open/close
- [ ] T089 [US5] Hook timerSlice.start() to use custom durations from settingsSlice (workMin * 60, shortBreakMin * 60, longBreakMin * 60)
- [ ] T090 [US5] Hook timerSlice session counter to use sessionsBeforeLongBreak from settingsSlice
- [x] T091 [US5] Add localStorage persistence for settings: sync on any setter to FT_SETTINGS_v1
- [x] T092 [US5] Add settings restore logic in App mount: load from FT_SETTINGS_v1, apply theme class

### Unit Tests (User Story 5)

- [ ] T093 [P] [US5] Write unit tests for settingsSlice in `src/store/slices/settingsSlice.test.ts` (validation, resetToDefaults)
- [ ] T094 [P] [US5] Write tests for duration validation: out-of-range values should throw errors
- [ ] T095 [P] [US5] Write tests for theme application: verify CSS class toggling

**Dependencies:** Phase 3 (User Story 1) complete (needs timer to use settings)

**Deliverable:** Full settings management with duration customization, theme toggle, and persistence

**Acceptance Criteria (from spec.md):**
- ✅ User can set custom durations for work sessions (minimum 1 minute, maximum 120 minutes)
- ✅ User can set custom durations for short breaks (minimum 1 minute, maximum 30 minutes)
- ✅ User can set custom durations for long breaks (minimum 1 minute, maximum 60 minutes)
- ✅ Custom durations persist for future sessions
- ✅ User can reset to default Pomodoro durations (25/5/15)

---

## Phase 7: User Story 4 - Seamless Mobile Web Experience

**User Story:** As a mobile user, I want the website to work fully on my phone without internet, so that I can focus anywhere without connectivity concerns.

**Goal:** Optimize responsive design, add PWA capabilities, and ensure offline functionality.

**Duration:** 10-12 hours

**Independent Test Criteria:**
- [ ] App is fully functional on 320px width screens
- [ ] Touch targets are minimum 44×44px
- [ ] App installs as PWA on mobile devices
- [ ] All features work offline (timer, tasks, stats, settings)
- [ ] Service worker caches shell and assets
- [ ] Timer continues in background tab (within browser limitations)

### Responsive Design & Mobile Optimization

- [ ] T096 [US4] Audit all components for mobile responsiveness: test at 320px, 375px, 768px breakpoints
- [ ] T097 [US4] Update FocusCard for mobile: reduce padding, adjust font sizes (text-5xl on mobile vs text-8xl desktop)
- [ ] T098 [US4] Update TaskDrawer for mobile: full-screen overlay on small screens, slide-in on desktop
- [ ] T099 [US4] Update DailyBar for mobile: stack stats vertically on very small screens
- [ ] T100 [US4] Verify all touch targets: ensure min-w-11 min-h-11 (44×44px) on all buttons

### PWA Configuration

- [ ] T101 [P] [US4] Install vite-plugin-pwa and workbox-window: `npm install -D vite-plugin-pwa workbox-window`
- [ ] T102 [P] [US4] Create `public/manifest.json` with app metadata (name, short_name, icons, theme_color: #4B6BFB, display: standalone)
- [ ] T103 [P] [US4] Generate PWA icons: create 192×192 and 512×512 PNG icons, save to `public/`
- [ ] T104 [US4] Update `vite.config.ts` with VitePWA plugin configuration (registerType: autoUpdate, precache patterns)
- [ ] T105 [US4] Configure Workbox caching strategies: cache-first for assets, network-first for HTML

### Service Worker & Offline

- [ ] T106 [US4] Create `src/registerSW.ts` service worker registration with update detection
- [ ] T107 [US4] Import and call registerSW in `src/main.tsx` after React render
- [ ] T108 [US4] Add "Update available" toast notification when new service worker detected
- [ ] T109 [US4] Test offline functionality: disconnect network, verify timer/tasks/stats still work
- [ ] T110 [US4] Test PWA installation: verify "Add to Home Screen" prompt on mobile, install flow works

### Mobile Performance

- [ ] T111 [US4] Add `prefers-reduced-motion` media query support: disable backdrop-blur and transitions when reduced motion preferred
- [ ] T112 [US4] Optimize font loading: preconnect to Google Fonts, use font-display: swap

**Dependencies:** Phases 3-6 complete (all features must be PWA-ready)

**Deliverable:** Mobile-optimized, installable PWA with full offline functionality

**Acceptance Criteria (from spec.md):**
- ✅ All core features (timer, tasks, tracking) work offline in mobile browsers
- ✅ Interface is responsive and optimized for touch interaction on mobile screens
- ✅ Website loads and functions without requiring login or account creation
- ✅ Font sizes and touch targets meet mobile accessibility standards
- ✅ Timer continues running if browser tab is backgrounded (within browser limitations)

---

## Phase 8: Accessibility & Performance Hardening

**Goal:** Ensure WCAG AA compliance, keyboard navigation, and performance targets.

**Duration:** 10-12 hours

**Independent Test Criteria:**
- [ ] All interactive elements accessible via keyboard
- [ ] Screen readers announce timer updates
- [ ] WCAG AA color contrast verified (axe-core)
- [ ] Lighthouse scores ≥90 (Performance, Accessibility, PWA)
- [ ] JS bundle <150KB gzipped
- [ ] TTI <2s on 3G

### Accessibility Implementation

- [ ] T113 Add ARIA labels to all buttons: TimerDisplay buttons, TaskDrawer controls, SettingsModal inputs
- [ ] T114 Create ARIA live region for timer updates in `src/components/timer/TimerDisplay.tsx` (role="timer", aria-live="polite", aria-atomic="true")
- [ ] T115 Implement focus trap in Modal component: cycle focus within modal, return focus on close
- [ ] T116 Add visible focus states to all interactive elements: outline-2 outline-offset-2 focus-visible:outline
- [ ] T117 Verify keyboard navigation: Tab through all controls, Enter/Space activate buttons, Escape closes modals
- [ ] T118 Add skip link to main content in `src/App.tsx`: hidden link that appears on focus for screen reader users

### Accessibility Testing

- [ ] T119 [P] Run axe-core automated accessibility tests: install @axe-core/react, add to dev mode
- [ ] T120 [P] Manual screen reader testing: test with NVDA (Windows) or VoiceOver (Mac), verify timer announcements
- [ ] T121 [P] Manual keyboard navigation testing: complete full user flow without mouse
- [ ] T122 Verify color contrast ratios: white text on dark glass (7:1), blue accent on dark (4.8:1), use WebAIM contrast checker

### Performance Optimization

- [ ] T123 Run Lighthouse audit: target Performance ≥90, Accessibility ≥90, PWA ≥90, Best Practices ≥90
- [ ] T124 Analyze bundle size with vite-bundle-visualizer: identify large dependencies, consider code splitting
- [ ] T125 Optimize images: compress background gradients, use WebP format for any images
- [ ] T126 Add lazy loading for modals: React.lazy() for SettingsModal and TaskEditorModal
- [ ] T127 Minimize main bundle: ensure Zustand, UUID, and critical path code only in main chunk
- [ ] T128 Test on 3G throttling in DevTools: verify TTI <2s, verify timer doesn't lag

### Performance Testing

- [ ] T129 [P] Write performance benchmark tests: measure timer tick overhead, state update latency
- [ ] T130 [P] Test with React DevTools Profiler: identify unnecessary re-renders, add React.memo where needed
- [ ] T131 [P] Test memory usage: run timer for 60 minutes, verify no memory leaks (<50MB sustained)

**Dependencies:** All user story phases complete

**Deliverable:** WCAG AA compliant, keyboard accessible, performant application meeting all constitutional requirements

**Acceptance Criteria:**
- ✅ Lighthouse Accessibility score ≥90
- ✅ Lighthouse Performance score ≥90
- ✅ Zero critical accessibility violations (axe-core)
- ✅ All features accessible via keyboard
- ✅ JS bundle <150KB gzipped

---

## Phase 9: Polish & Cross-Cutting Concerns

**Goal:** Final polish, documentation, E2E testing, and deployment preparation.

**Duration:** 8-10 hours

**Independent Test Criteria:**
- [ ] E2E test suite covers critical user flows
- [ ] README and documentation complete
- [ ] All console errors resolved
- [ ] Production build tested and verified

### Integration & E2E Testing

- [ ] T132 [P] Install Playwright for E2E testing: `npm install -D @playwright/test`
- [ ] T133 Write E2E test: happy path (start session → pause → resume → complete → verify stats) in `tests/e2e/timer-flow.spec.ts`
- [ ] T134 [P] Write E2E test: task management flow (create → edit → link to session → complete task) in `tests/e2e/task-flow.spec.ts`
- [ ] T135 [P] Write E2E test: settings flow (open modal → change durations → reset → verify persistence) in `tests/e2e/settings-flow.spec.ts`
- [ ] T136 [P] Write E2E test: offline functionality (disconnect network → verify all features work) in `tests/e2e/offline.spec.ts`
- [ ] T137 Configure Playwright in `playwright.config.ts`: browsers, viewport sizes, video recording

### Documentation

- [ ] T138 [P] Create comprehensive README.md: project overview, setup instructions, tech stack, architecture diagram
- [ ] T139 [P] Document environment setup in README: Node version, npm scripts, dev workflow
- [ ] T140 [P] Document architecture in README: Zustand store structure, component hierarchy, localStorage schema
- [ ] T141 [P] Document accessibility features in README: keyboard shortcuts, screen reader support, WCAG compliance
- [ ] T142 [P] Document performance budgets in README: bundle size, Lighthouse targets, offline capabilities
- [ ] T143 [P] Create CONTRIBUTING.md: code style, PR process, testing requirements, constitution alignment

### Deployment Preparation

- [ ] T144 Create production build: `npm run build`, verify no warnings or errors
- [ ] T145 Test production build locally: `npm run preview`, verify all features work
- [ ] T146 [P] Configure `.gitignore`: ensure dist/, node_modules/, .env excluded
- [ ] T147 [P] Create `.env.example` if any environment variables needed (none for MVP)
- [ ] T148 Write deployment guide in README: static hosting options (Vercel, Netlify, GitHub Pages)
- [ ] T149 Create release notes for v1.0.0 MVP: feature list, known limitations, future roadmap
- [ ] T150 Final constitution compliance check: verify all 6 principles satisfied, document in README

**Dependencies:** All previous phases complete

**Deliverable:** Fully tested, documented, production-ready MVP

**Acceptance Criteria:**
- ✅ E2E tests pass in CI
- ✅ README complete with setup and architecture
- ✅ Production build verified
- ✅ All constitutional principles documented as satisfied

---

## Task Dependencies Graph

### Critical Path (Must Complete Sequentially)
```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational Components)
    ↓
Phase 3 (User Story 1: Timer) ← BLOCKING for all other features
    ↓
Phase 4 (User Story 2: Tasks) + Phase 5 (User Story 3: Stats) + Phase 6 (User Story 5: Settings) [PARALLEL]
    ↓
Phase 7 (User Story 4: Mobile/PWA)
    ↓
Phase 8 (Accessibility & Performance)
    ↓
Phase 9 (Polish & Testing)
```

### User Story Dependencies
- **US1 (Timer):** No dependencies, foundational
- **US2 (Tasks):** Depends on US1 (needs timer to link tasks to sessions)
- **US3 (Stats):** Depends on US1 (needs timer completion events)
- **US4 (Mobile/PWA):** Depends on US1, US2, US3, US5 (all features must be ready)
- **US5 (Settings):** Depends on US1 (timer uses settings for durations)

### Parallelization Opportunities

**Phase 2 (Foundational):** All 9 tasks can run in parallel (T011-T019)

**Phase 3 (User Story 1):**
- T039-T041 (tests) can run in parallel after T020-T028 (implementation) complete

**Phase 4 (User Story 2):**
- T061-T063 (tests) can run in parallel after T042-T048 (implementation) complete

**Phase 5 (User Story 3):**
- T076-T077 (tests) can run in parallel after T064-T067 (implementation) complete

**Phase 6 (User Story 5):**
- T093-T095 (tests) can run in parallel after T078-T082 (implementation) complete

**Phase 7 (User Story 4):**
- T101-T103 (PWA config) can run in parallel
- T096-T100 (responsive design) can run in parallel

**Phase 8 (Accessibility):**
- T119-T122 (accessibility testing) can run in parallel
- T129-T131 (performance testing) can run in parallel

**Phase 9 (Polish):**
- T133-T136 (E2E tests) can run in parallel
- T138-T143 (documentation) can run in parallel
- T146-T147 (deployment prep) can run in parallel

**Total Parallelizable Tasks:** 28 out of 45 (62%)

---

## Quality Gates

### Gate 1: Phase 2 → Phase 3
- [ ] All foundational components render without errors
- [ ] Tailwind design tokens configured correctly
- [ ] localStorage utilities tested and working
- [ ] No TypeScript compilation errors

### Gate 2: Phase 3 → Phase 4-6
- [ ] User Story 1 acceptance criteria met (timer works accurately)
- [ ] Timer countdown maintains accuracy (<1s drift over 25 min)
- [ ] Auto-break transitions work correctly
- [ ] Timer persists state on page reload
- [ ] Unit tests for timerSlice passing

### Gate 3: Phases 4-6 → Phase 7
- [ ] All user stories 2, 3, 5 acceptance criteria met
- [ ] Tasks, stats, settings all persist in localStorage
- [ ] No critical bugs in task management or stats tracking
- [ ] Integration tests passing

### Gate 4: Phase 7 → Phase 8
- [ ] PWA installs successfully on mobile devices
- [ ] All features work offline
- [ ] Service worker caching verified
- [ ] Mobile responsive design complete (tested at 320px)

### Gate 5: Phase 8 → Phase 9
- [ ] Lighthouse scores ≥90 (Performance, Accessibility, PWA)
- [ ] Zero critical accessibility violations (axe-core)
- [ ] JS bundle <150KB gzipped
- [ ] WCAG AA compliance verified

### Gate 6: Phase 9 → Production
- [ ] E2E tests passing in CI
- [ ] Documentation complete (README, CONTRIBUTING)
- [ ] Production build tested
- [ ] All constitutional principles satisfied and documented

---

## Progress Tracking

| Phase | User Story | Tasks | Status | Completion % | Blocker |
|-------|-----------|-------|--------|--------------|---------|
| Phase 1 | Setup | T001-T010 | Pending | 0% | — |
| Phase 2 | Foundational | T011-T019 | Pending | 0% | Phase 1 |
| Phase 3 | US1 (Timer) | T020-T041 | Pending | 0% | Phase 2 |
| Phase 4 | US2 (Tasks) | T042-T063 | Pending | 0% | Phase 3 |
| Phase 5 | US3 (Stats) | T064-T077 | Pending | 0% | Phase 3 |
| Phase 6 | US5 (Settings) | T078-T095 | Pending | 0% | Phase 3 |
| Phase 7 | US4 (Mobile/PWA) | T096-T112 | Pending | 0% | Phases 4-6 |
| Phase 8 | Accessibility | T113-T131 | Pending | 0% | Phase 7 |
| Phase 9 | Polish | T132-T150 | Pending | 0% | Phase 8 |

**Total Tasks:** 150  
**Completed:** 0  
**In Progress:** 0  
**Blocked:** 0  
**Overall Progress:** 0%

---

## Milestones

### M1: "First Focus" (Week 1 End)
**Criteria:** User can complete a 25-minute focus session
- [ ] Phase 1 complete (Setup)
- [ ] Phase 2 complete (Foundational)
- [ ] Phase 3 complete (User Story 1: Timer)
- [ ] Timer accuracy verified (<1s drift)
- [ ] Auto-break transitions working

### M2: "Task-Linked Focus" (Week 2 End)
**Criteria:** User can link tasks to focus sessions and track daily progress
- [ ] Phase 4 complete (User Story 2: Tasks)
- [ ] Phase 5 complete (User Story 3: Stats)
- [ ] Tasks persist across reloads
- [ ] Daily stats update correctly

### M3: "Personalized Experience" (Week 3 End)
**Criteria:** User can customize durations and theme
- [ ] Phase 6 complete (User Story 5: Settings)
- [ ] Settings persist across reloads
- [ ] Theme toggle functional

### M4: "Ship-Ready MVP" (Week 4 End)
**Criteria:** Production-ready PWA meeting all constitutional requirements
- [ ] Phase 7 complete (User Story 4: Mobile/PWA)
- [ ] Phase 8 complete (Accessibility & Performance)
- [ ] Phase 9 complete (Polish & Testing)
- [ ] Lighthouse scores ≥90 all categories
- [ ] WCAG AA compliance verified
- [ ] E2E tests passing
- [ ] Documentation complete

---

## Constitutional Compliance Checklist

### Principle 1: Focus-first Experience
- [ ] Session starts within 5 seconds of page load (T035, T038)
- [ ] No intrusive notifications (completion toasts are dismissible) (T015)
- [ ] Minimal interactions required (single tap to start) (T032)

### Principle 2: Simple and Consistent UI
- [ ] Design tokens configured (primary: #4B6BFB, secondary: #FF89BB) (T004)
- [ ] Consistent glassmorphism panels (backdrop-blur-xl, bg-black/40) (T029)
- [ ] Inter/Poppins typography (T004, T005)

### Principle 3: Accessibility and Mobile-first
- [ ] WCAG AA color contrast verified (T122)
- [ ] Full keyboard navigation (T115, T117)
- [ ] Screen reader support with ARIA live regions (T114)
- [ ] 44×44px touch targets on mobile (T100)
- [ ] Responsive design 320px+ (T096-T099)

### Principle 4: Lightweight Performance
- [ ] JS bundle <150KB gzipped (T124, T125, T127)
- [ ] TTI <2s on 3G (T128)
- [ ] Offline-first with PWA (T101-T110)
- [ ] localStorage persistence (T016, T059, T074, T091)
- [ ] Reduced motion support (T111)

### Principle 5: Clear and Maintainable Development Workflow
- [ ] TypeScript for type safety (T001, T007)
- [ ] Modular Zustand slices (T020, T042, T064, T078)
- [ ] Unit tests for core logic (T039-T041, T061-T063, T076-T077, T093-T095)
- [ ] Documented architecture (T138-T143)

### Principle 6: Local-first Secure Data Handling
- [ ] No backend required (architectural decision)
- [ ] All data in localStorage (T016, T059, T074, T091)
- [ ] No network calls in MVP (T109 verifies offline)
- [ ] No tracking/analytics (T142 documents privacy)

---

## Notes & Risks

### Known Risks
1. **Background tab throttling:** Mitigated with wall-clock delta calculation (T023, T036)
2. **localStorage quota (5-10MB):** Monitored with defensive parsing, "Reset Data" option in settings (T016)
3. **Service worker caching bugs:** Cache versioning and "Clear Cache" option (T104, T108)
4. **Accessibility on glassmorphism:** Dark scrim ensures contrast, tested early (T122)

### Future Work (Post-MVP)
- IndexedDB for weekly/monthly session history (v1.2)
- User-selectable background scenes (v1.1)
- Ambient soundscapes (v1.1)
- Gamification (streaks, badges) (v1.3)
- Collaborative focus rooms (v2.0)
- Cloud sync and user accounts (v2.0)

### Development Tips
- **Parallel Development:** Tasks marked [P] can be worked on simultaneously by different developers
- **Testing Strategy:** Unit tests are optional but recommended for complex logic (timer, state management)
- **Incremental Deployment:** Each phase (US1-US5) can be deployed independently after Phase 3
- **Constitution Checks:** Run accessibility and performance audits after each phase, not just at the end

---

## Task Execution Format

Each task follows this structure:

```text
- [ ] T### [P?] [Story?] Task description with exact file path

Labels: area:X, type:Y, priority:Z, constitution:W
Estimate: Xh
DependsOn: T###
Acceptance:
  - Criterion 1
  - Criterion 2
DoD:
  - Unit tests passing
  - No TypeScript errors
  - Constitutional compliance verified
```

**Legend:**
- `[P]` = Parallelizable (can run simultaneously with other [P] tasks)
- `[Story]` = User Story label ([US1], [US2], [US3], [US4], [US5])
- `area:` = Feature area (timer, tasks, stats, settings, ui, a11y, pwa, infra)
- `type:` = Task type (feature, chore, refactor, test, doc)
- `priority:` = P0 (critical), P1 (high), P2 (normal)
- `constitution:` = Aligned principle(s)

---

**Document Status:** ✅ **COMPLETE AND READY FOR EXECUTION**  
**Generated:** 2025-10-28  
**Next Step:** Begin Phase 1 (Project Setup) with tasks T001-T010

---

## Quick Start Checklist

Ready to start implementing? Follow this checklist:

1. [ ] Read `specs/001-focus-timer-hub/spec.md` (feature requirements)
2. [ ] Read `specs/001-focus-timer-hub/plan.md` (implementation strategy)
3. [ ] Read `specs/001-focus-timer-hub/quickstart.md` (developer setup guide)
4. [ ] Run Phase 1 tasks T001-T010 (project initialization)
5. [ ] Verify Phase 1 quality gate (dev server runs, Tailwind works)
6. [ ] Begin Phase 3 (User Story 1: Core Timer) tasks T020-T041
7. [ ] Run Milestone M1 checklist after Week 1
8. [ ] Continue with Phases 4-6 in Week 2
9. [ ] Complete Phases 7-9 in Weeks 3-4
10. [ ] Ship MVP! 🚀

**Estimated Total Effort:** 150-180 hours (4 weeks at 40 hours/week)  
**Recommended Team Size:** 2-3 developers for 4-week timeline, or 1 developer for 8-week timeline

