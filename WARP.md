# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview prod build: `npm run preview`
- Lint: `npm run lint`
- Format: `npm run format`
- Typecheck: `npm run typecheck`
- Tests (Vitest):
  - All tests: `npm run test`
  - Watch: `npm run test:watch`
  - Single file: `npm run test -- src/store/timerSlice.test.ts`
  - Filter by name: `npm run test -- -t "starts timer"`
  - For DOM/component tests (jsdom): `npm run test -- --environment jsdom`

## Architecture overview

- Stack: React 18 + TypeScript, Vite, Tailwind CSS, Zustand, Vitest/RTL, VitePWA/Workbox.
- Entry/UI shell: `src/main.tsx` mounts `src/App.tsx`. App composes background, top bar, focus card, daily bar; lazy-loads `components/tasks/TaskDrawer` and `components/settings/SettingsModal` for performance. Accessibility includes a skip link, focus-ring styles, and ARIA patterns.
- State management: single Zustand store (`src/store/index.ts`) composed from slices:
  - `timerSlice` — timer engine with wall-clock delta; actions: `start/pause/resume/tick/complete/reset/restoreSession/clearSnapshot`. On completion it records a session via `addCompletedSession` from `statsSlice` and advances work/break flow.
  - `tasksSlice` — CRUD with validation and `uuid`, manages `activeTaskId` (session-scoped, not persisted).
  - `settingsSlice` — user durations and theme (`auto|light|dark`), applies theme by toggling `document.documentElement.classList` and persists settings.
  - `statsSlice` — daily totals with auto-reset at date change; increments totals on session completion.
- Persistence (localStorage via `src/lib/storage.ts`): versioned keys from `src/types/index.ts`:
  - `FT_SETTINGS_v1`, `FT_TASKS_v1`, `FT_TODAY_v1`, `FT_SESSIONS_LATEST_v1` (snapshot for crash/restore).
- Core utilities:
  - `src/lib/time.ts` — `now()`, `getRemainingSeconds()`, conversions; used by timer tick to avoid drift.
  - `src/lib/date.ts` — `getTodayISO()`, `hasDateChanged()` for daily resets.
  - `src/lib/validation.ts` — input validation for tasks and settings (bounds in `SETTINGS_VALIDATION`, `TASK_VALIDATION`).
- Styling/design system: Tailwind with tokens in `tailwind.config.ts` (primary/secondary palettes, fonts Inter/Poppins, timer font sizes, blur tokens). Global styles in `src/index.css` include reduced-motion handling.
- PWA/build:
  - `vite.config.ts` sets alias `@ -src`, splits vendor/store chunks, and configures `VitePWA` with auto-update SW, Workbox runtime caching for Google Fonts, `manifest.webmanifest` in `public/`, and dev SW enabled.
  - TS strict mode and path aliasing in `tsconfig.json`.

## Minimalist Header Standard (VTea Affirmation Header)

**The header is purely emotional identity—zero navigation, zero interactions:**

1. **Two-Element Structure Only:**
   - Left: VTea wordmark (Inter 600, 18–24px, clamp for responsive scaling)
   - Right: Rotating affirmation (Inter 400, 14–16px, ≤60 characters, right-aligned)
   - **No containers, backgrounds, bars, or shadows** (fully transparent)
   - **No navigation links, menus, or icon buttons** (zero interaction)

2. **Opacity Behavior (Fade on Focus):**
   - Idle/Paused state: 60% opacity (present but soft)
   - Running session: 30% opacity (barely visible, minimal distraction)
   - Transition: 500ms ease (smooth fade, honors prefers-reduced-motion)
   - `pointerEvents: 'none'` — purely presentational, non-interactive

3. **Affirmation System:**
   - Database: `src/lib/affirmations.ts` (curated 15 quotes, ≤60 chars each)
   - Rotation: Deterministic by time-of-day + day-of-year (changes ~4-hourly)
   - Consistency: Same affirmation throughout single session (no mid-session changes)
   - No network calls; all affirmations bundled locally

4. **Typography Specifications:**
   - Font family: Inter (400 for affirmation, 600 for wordmark)
   - Scaling: clamp(18px, 2.5vw, 24px) for wordmark; clamp(12px, 1.5vw, 16px) for affirmation
   - Line-height: 1.2 (wordmark), 1.5 (affirmation)
   - Letter-spacing: 0.05em (wordmark); 0 (affirmation)
   - Color: white 100% (wordmark), white 90% (affirmation)
   - No italics, no decorative styling

5. **Layout Constraints:**
   - Position: `fixed top-0 left-0 right-0 z-20`
   - Padding: 16px (mobile), 32px (desktop) horizontal; responsive vertical
   - Max-width for affirmation: 60 characters to prevent text wrapping
   - Flex layout: space-between (wordmark left, affirmation right)
   - Safe area support: Respects viewport notches on mobile

6. **Accessibility (WCAG AA):**
   - `aria-hidden="true"` — header is decorative, not semantic
   - Color contrast: 4.5:1 against dark overlay (WCAG AA compliant)
   - Focus ring: Not applicable (no focusable elements)
   - Screen readers: Header skipped entirely (purely emotional)

7. **Performance Constraints:**
   - Render cost: **<2% of frame budget** (<0.33ms per 60fps frame)
   - Pure CSS positioning (no layout calculations)
   - No animations beyond opacity transition (GPU-accelerated)
   - No state changes beyond opacity (single re-render on mount)
   - Bundle impact: +2KB (affirmations.ts) + minimal React overhead

8. **Prohibition List (Forbidden):**
   - ❌ Navigation links or menu items
   - ❌ Icon buttons or interactive elements
   - ❌ Background color or backdrop blur
   - ❌ Border, shadow, or visual container
   - ❌ Dropdown menus or tooltips
   - ❌ Settings or preferences control
   - ❌ Logo image assets (typography only)
   - ❌ Animated background or gradient
   - ❌ Multiple rows or stacked layout

---

## Immersive UI Layout Standard (VTea UI Makeover)

**All layouts MUST follow the immersive, full-bleed design pattern:**

1. **Full-Viewport Coverage (100vw × 100vh):**
   - App container: `fixed inset-0 w-screen h-screen overflow-hidden`
   - No horizontal/vertical scroll at any breakpoint
   - No containers with max-width/padding that constrain full-bleed backgrounds

2. **Background Layer (z-0):**
   - CSS gradient foundation (instant render, zero-cost)
   - Optional progressive WebP image ≤80KB
   - Radial + linear dark overlay (40–60% opacity) for text contrast (min 4.5:1)
   - All background assets bundled locally; no external network dependencies

3. **Visual Hierarchy (z-stacking):**
   - **z-0:** Background (immersive layer)
   - **z-10:** Main content (timer + controls, centered absolutely)
   - **z-20:** Branding/quote/secondary elements
   - **z-25:** Task drawer (overlay side-sheet)
   - **z-30:** Floating headers/controls (buttons, branding)
   - **z-50:** Modals, dialogs, overlays

4. **Primary Content Area (z-10, centered):**
   - Main element: `fixed inset-0 flex flex-col items-center justify-center`
   - Centered timer (≥90px mobile, ≥120px desktop) as dominant visual anchor
   - Focus title above timer (24–32px, editable inline)
   - Mode switcher and controls below (segmented pills + action buttons)
   - Glass morphism card wrapper optional but recommended (blur(16px) + 8–12% white opacity)

5. **Component-Level Constraints:**
   - **No card-based or containerized UI** in focus mode (prohibition)
   - All interactive elements: touch targets ≥44×44px; spacing ≥8px
   - Typography: Inter font (400/600/700); line-height 1.0 (timer), 1.2 (headings), 1.5 (body)
   - Colors: Primary #4B6BFB (Focus), Secondary #FF89BB (Break), Long Break #10B981
   - Text: white 90% (primary), 70% (secondary), 50% (tertiary)
   - State transitions honor `prefers-reduced-motion` (no non-essential animations)

6. **Comment Requirements (Code-Level):**
   - All components must declare Visual Priority: PRIMARY / SECONDARY / TERTIARY
   - PRIMARY: timer, main controls (high contrast, largest size)
   - SECONDARY: mode switcher, action icons (medium contrast, supporting)
   - TERTIARY: branding, quotes, backgrounds (low contrast, non-intrusive)
   - Example: `/* Visual Priority: PRIMARY (dominant timer display) */`

7. **Performance Constraints:**
   - Total gzipped JS bundle ≤150KB (must not regress)
   - Layout render time <16ms/frame (60fps)
   - LCP (Largest Contentful Paint) <2s on 3G (Core Web Vital)
   - Background assets optimized: CSS gradients preferred; images ≤80KB total
   - Font: Inter subset (400/600/700) with font-display: swap (non-blocking)

8. **Accessibility (WCAG AA):**
   - Focus indicators: 2px white at 80% opacity, ≥3:1 contrast
   - Keyboard: Tab/Shift+Tab navigation; ESC closes modals/drawers; focus trap in modals
   - Screen reader: aria-live="polite" for timer state; aria-label for all icon buttons
   - Color contrast: 4.5:1 body text, 3:1 large text, 3:1 UI elements

## Repo conventions and docs to honor

- Read `README.md` for Quick Start, Testing, Deployment and performance/accessibility targets.
- The project is governed by 6 principles in `.specify/memory/constitution.md` (focus-first, simple UI, accessibility/mobile, performance, maintainability, local-first privacy). Keep proposals and edits aligned.
- Specs and contracts under `specs/001-focus-timer-hub/` define requirements and TypeScript interfaces; keep store/types consistent with these.
- `CONTRIBUTING.md` defines the pre-PR gates: `npm run typecheck`, `npm run lint`, `npm run build`, plus manual a11y checks.
- Cursor rules exist at `.cursor/rules/specify-rules.mdc` (currently sparse). Consider centralizing key commands and recent changes there as they evolve.
- **VTea UI Makeover Spec:** See `specs/002-vtea-ui-makeover/spec.md` for complete design system, component behaviors, and acceptance criteria.





