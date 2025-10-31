# VTea UI Makeover - Implementation Plan

**Project:** Focus Timer Hub  
**Plan Version:** 1.0  
**Created:** 2025-10-28  
**Owner:** Engineering Team  
**Spec ID:** 002-vtea-ui-makeover

---

## Objective

Transform the existing Focus Timer Hub MVP into a visually immersive, modern focus experience modeled after Flocus/LifeAt while maintaining all constitutional principles and performance targets. This is a **UI/UX enhancement layer only**—core timer logic, state management, task persistence, and data schemas remain completely unchanged.

**Concrete Outcome:** A production-ready UI refresh featuring Inter typography, immersive CSS gradient backgrounds with optional WebP imagery, glass morphism surfaces, segmented mode switcher, auto-hiding task drawer, and comprehensive WCAG AA accessibility—all while preserving the sub-2-second load time and ≤150KB bundle size.

---

## Constitution Alignment

### Applicable Principles

- [x] **Principle 1: Focus-first Experience** — Enhanced immersive background, timer as primary visual anchor, task drawer auto-hides during sessions, no new distractions introduced
- [x] **Principle 2: Simple and Consistent UI** — Comprehensive design system with finalized color tokens, typography system, and interaction patterns; maintains existing UI patterns
- [x] **Principle 3: Accessibility and Mobile-first** — Enhanced WCAG AA compliance (Lighthouse ≥95), full keyboard navigation, comprehensive ARIA support, ≥44×44px touch targets, responsive 320px-1440px+
- [x] **Principle 4: Lightweight Performance** — Maintains ≤150KB bundle, LCP <2s on 3G; CSS gradient foundation (zero cost) with progressive WebP enhancement (≤80KB); no new network dependencies
- [x] **Principle 5: Clear and Maintainable Development Workflow** — Follows Spec Driven Development; phased implementation (5 phases); UI-only changes for clear rollback path; design tokens documented in contracts
- [x] **Principle 6: Local-first Secure Data Handling** — No changes to data storage or persistence; all assets bundled locally; maintains privacy-by-design; no tracking

---

## Technical Context

### Tech Stack (Unchanged from MVP)

**Frontend Framework:**
- **React 18+** with **TypeScript** (existing)
- **Vite** build tool (existing)
- **Tailwind CSS 3+** (existing - configuration updated)

**State Management:**
- **Zustand** slices (existing - UI enhancements only, no state structure changes)
  - `timerSlice` — Visual-only changes (mode colors, status display)
  - `tasksSlice` — UI enhancements (drawer behavior, filtering)
  - `settingsSlice` — Add validation hints in UI
  - `statsSlice` — No changes

**New Design Dependencies:**
- **Inter font family** (Google Fonts CDN or bundled subset: weights 400, 600, 700)
- **WebP background image** (optional, ≤80KB) - static asset in `/public`
- **Glass morphism CSS** (backdrop-filter: blur(16px)) - CSS only, no new libraries

### Architecture Pattern (UI Layer Only)

**Component Enhancements (Existing Components Modified):**

```
<App> (No structural changes)
  <BackgroundLayer />                    // ENHANCED: CSS gradient + progressive WebP
  <TopBar>                               // ENHANCED: "VTea" branding, tagline
    <BrandMark />                        // MODIFIED: "VTea" text + tagline
    <InspirationalQuote />               // NEW: Top-right quote
    <ThemeToggle />                      // STYLE UPDATE
    <SettingsButton />                   // STYLE UPDATE
  </TopBar>
  <MainGrid>                             // STYLE UPDATE: enhanced spacing
    <FocusCard>                          // ENHANCED: glass morphism, hierarchy
      <FocusTitle />                     // NEW: Inline editable title above timer
      <ModeSwitcher />                   // NEW: Segmented control (Focus/Short/Long Break)
      <TimerDisplay />                   // ENHANCED: 90px mobile / 120px desktop
      <PrimaryControls />                // ENHANCED: Primary button + compact icons
      <ActiveTaskBadge />                // STYLE UPDATE
    </FocusCard>
    <TaskDrawer>                         // ENHANCED: Auto-hide, mobile/desktop layouts
      <DrawerToggle />                   // NEW: Small toggle when collapsed
      <TaskList />                       // ENHANCED: "Hide completed" filter
      <TaskCreateForm />                 // STYLE UPDATE
      <TaskEditorModal />                // STYLE UPDATE
    </TaskDrawer>
  </MainGrid>
  <DailyBar>                             // STYLE UPDATE
    <TodayTotal />                       // STYLE UPDATE
    <TodaySessionsCount />               // STYLE UPDATE
  </DailyBar>
  <Toaster />                            // STYLE UPDATE
  <SettingsModal />                      // ENHANCED: Inline validation, reset confirm
</App>
```

### Design System (Finalized in Clarification)

**Typography System (Inter):**
```typescript
// Font Family: Inter (from Google Fonts or bundled)
// Weights loaded: 400 (Regular), 600 (Semi-Bold), 700 (Bold)

const typography = {
  timer: {
    family: 'Inter',
    weight: 700,
    desktop: '120px',
    mobile: '90px',
    lineHeight: 1.0,
    letterSpacing: '-0.02em'
  },
  title: {
    family: 'Inter',
    weight: 600,
    size: '24-32px', // Responsive
    lineHeight: 1.2
  },
  body: {
    family: 'Inter',
    weight: 400,
    size: '16px',
    lineHeight: 1.5
  },
  label: {
    size: '14-16px',
    lineHeight: 1.5
  },
  helper: {
    size: '12-14px'
  }
}
```

**Color System:**
```typescript
const colors = {
  // Mode Colors
  primary: '#4B6BFB',       // Focus Mode
  secondary: '#FF89BB',     // Short Break
  success: '#10B981',       // Long Break
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Glass Morphism Surfaces
  glass: {
    background: 'rgba(255, 255, 255, 0.08-0.12)',
    backdropFilter: 'blur(16px)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  },
  
  // Text Colors (on dark backgrounds)
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',    // 90% opacity
    secondary: 'rgba(255, 255, 255, 0.7)',  // 70% opacity
    tertiary: 'rgba(255, 255, 255, 0.5)'    // 50% opacity
  },
  
  // Interactive States
  states: {
    hover: '+10% opacity',
    active: '-10% opacity',
    disabled: '40-50% opacity',
    focus: 'rgba(255, 255, 255, 0.8)'      // 2px solid outline
  }
}
```

**Branding & Copy (Final):**
```typescript
const branding = {
  logo: 'VTea',
  tagline: 'focus & chill',
  inspirationalQuote: 'Your thoughts deserve a calm place.'
}
```

**Spacing & Layout:**
```typescript
const spacing = {
  touchTarget: '44px',          // Minimum touch target (WCAG AA)
  primaryButton: '48px',        // Primary action buttons
  focusRing: '2px',             // Focus indicator width
  focusOffset: '2px',           // Focus indicator offset
  buttonGap: '16-24px',         // Spacing between controls
  cardPadding: {
    mobile: '24px',
    desktop: '32px'
  }
}
```

**Background System:**
```typescript
const background = {
  gradient: {
    // CSS gradient (instant, zero bundle cost)
    base: 'radial-gradient(circle at center, ...)',
    fallback: 'linear-gradient(to bottom, ...)'
  },
  image: {
    // Progressive WebP enhancement (optional, ≤80KB)
    format: 'WebP with JPEG fallback',
    maxSize: '80KB',
    loading: 'progressive (after gradient displays)'
  },
  overlay: {
    // Ensures text readability (WCAG AA 4.5:1)
    type: 'Radial + Linear gradient',
    opacity: '40-60%',
    color: 'dark (black or navy)'
  }
}
```

**Accessibility Specifications:**
```typescript
const accessibility = {
  contrast: {
    bodyText: '4.5:1',          // WCAG AA
    largeText: '3:1',           // ≥24px or ≥19px bold
    uiElements: '3:1',
    focusIndicator: '3:1'
  },
  touchTargets: {
    minimum: '44×44px',
    spacing: '8px'
  },
  keyboard: {
    tabOrder: 'Logical (top-to-bottom, left-to-right)',
    focusTrap: 'Modals only',
    escKey: 'Closes modals/drawers, returns focus',
    activation: 'Enter and Space'
  },
  ariaLive: {
    region: 'aria-live="polite"',
    announcements: [
      'Timer started',
      'Timer paused',
      'Timer resumed',
      '5 minutes remaining',
      'Session complete'
    ]
  },
  motionPreference: {
    drawerAnimation: 'Disabled if prefers-reduced-motion',
    transitions: 'Instant instead of smooth',
    timerCountdown: 'Always animated (essential feedback)'
  }
}
```

### Performance Budgets (Maintained from MVP)

```typescript
const performanceTargets = {
  bundle: {
    jsGzipped: '≤150KB',
    backgroundImage: '≤80KB',
    totalAssets: '≤250KB'
  },
  timing: {
    LCP: '<2s on 3G',
    FCP: '<1.5s on 3G',
    TTI: '<2s on 3G'
  },
  lighthouse: {
    performance: '≥90',
    accessibility: '≥95',
    pwa: '≥90'
  }
}
```

---

## Scope

### In Scope (UI Enhancement Deliverables)

1. **Branding & Layout**
   - Replace header with "VTea" logo and "focus & chill" tagline
   - Add inspirational quote at top-right (desktop) / below timer (mobile)
   - No structural changes to app layout

2. **Immersive Background System**
   - CSS gradient foundation (radial or linear)
   - Optional progressive WebP image (≤80KB)
   - Radial + linear overlay (40-60% opacity) for text contrast
   - Fallback strategy for slow connections

3. **Typography Upgrade**
   - Load Inter font family (weights 400, 600, 700)
   - Apply Inter to all text elements
   - Scale timer to 90px (mobile) / 120px (desktop)
   - Update all font sizes per design system

4. **Color System Implementation**
   - Apply Primary #4B6BFB, Secondary #FF89BB, Success #10B981
   - Implement glass morphism on surfaces (8-12% white + blur(16px))
   - Update text colors to 90%/70%/50% opacity hierarchy
   - Apply semantic colors (error, warning, info)

5. **Focus Title Component (New)**
   - Inline editable text above timer
   - Auto-fill from active task if available
   - Fallback to "Untitled Session" when empty
   - Save on blur or Enter key (no modal)

6. **Mode Switcher Component (New)**
   - Segmented control: Focus | Short Break | Long Break
   - Pill-style buttons with rounded ends
   - Active=filled color, Inactive=outline, Disabled=50% opacity
   - ARIA: aria-pressed="true"/"false"
   - Touch targets ≥44×44px

7. **Action Controls Redesign**
   - Primary button: Start/Pause/Resume (48×48px minimum)
   - Compact icons: Restart + Fullscreen (44×44px touch target)
   - Horizontal layout with 16-24px gaps
   - Clear hover/active/disabled states

8. **Task Drawer Enhancement**
   - Auto-collapse when timer starts
   - Toggle button remains visible (small, non-intrusive)
   - Manual reopen persists until user closes
   - "Hide completed tasks" toggle filter
   - Mobile: bottom sheet; Desktop: left side-sheet
   - Smooth slide animation (disabled if prefers-reduced-motion)

9. **Settings Modal Polish**
   - Inline validation hints: "Min: 1, Max: 120 minutes"
   - Real-time validation on blur/change
   - "Reset to Defaults" with non-blocking confirmation
   - Improved glass morphism styling

10. **Accessibility Comprehensive Upgrade**
    - Full keyboard navigation with logical tab order
    - Modal focus trap (ESC closes, returns focus)
    - ARIA live announcements (timer status, 5min warning)
    - All icon buttons have aria-label
    - Focus indicators: 2px solid, ≥3:1 contrast
    - Touch targets validated ≥44×44px
    - Screen reader testing with NVDA, JAWS, VoiceOver, TalkBack

11. **Responsive Design Validation**
    - Breakpoints: 320px, 480px, 768px, 1024px, 1440px+
    - Typography scales responsively
    - Drawer position adapts (bottom sheet mobile, side panel desktop)
    - Safe area support (notches, punch-holes)
    - Orientation change handling

12. **Performance Optimization**
    - Optimize background assets (WebP compression)
    - Font loading strategy (font-display: swap)
    - Verify bundle size ≤150KB
    - Validate LCP <2s on 3G
    - Lighthouse Performance ≥90, Accessibility ≥95

### Out of Scope (Explicitly Excluded)

**No Changes To:**
- Timer logic or state management (`timerSlice` behavior)
- Task management logic (`tasksSlice` CRUD operations)
- Settings persistence or validation logic
- Stats calculation or date reset logic
- Data schemas or localStorage structure
- PWA service worker or offline capabilities

**Deferred Features (Not in This Release):**
- Multiple background scenes or scene switcher
- Dynamic inspirational quotes (static text only)
- Ambient sounds or music
- Haptic feedback
- Custom theme builder (predefined theme only)
- Animations beyond drawer slide-in
- Gamification elements
- Advanced analytics or charts
- User accounts or cloud sync

---

## Key Milestones

| Milestone | Target Date | Duration | Status | Deliverables |
|-----------|-------------|----------|--------|--------------|
| Phase 1: Brand + Background + Timer Hierarchy | Week 1 | 3-4 days | Pending | Immersive layout, Inter typography, CSS gradient, branding |
| Phase 2: Focus Title + Mode Switcher + Controls | Week 2 | 3-4 days | Pending | Inline title, segmented control, redesigned buttons |
| Phase 3: Task Drawer Auto-hide + Filtering | Week 3 | 3-4 days | Pending | Auto-collapse, toggle, "Hide completed", responsive layouts |
| Phase 4: Settings + Accessibility Audit | Week 4 | 4-5 days | Pending | Validation, ARIA, keyboard nav, screen reader testing |
| Phase 5: Responsiveness + Performance | Week 5 | 3-4 days | Pending | Breakpoint validation, asset optimization, Lighthouse audits |

---

## Success Metrics

### Performance Targets (Maintained from MVP)

- [x] **Lighthouse Performance Score:** ≥90
- [x] **Lighthouse Accessibility Score:** ≥95 (upgraded from 90)
- [x] **Lighthouse PWA Score:** ≥90
- [x] **LCP (Largest Contentful Paint):** <2s on 3G
- [x] **FCP (First Contentful Paint):** <1.5s on 3G
- [x] **TTI (Time to Interactive):** <2s on 3G
- [x] **JavaScript Bundle Size:** ≤150KB gzipped (no regression)
- [x] **Background Assets:** ≤80KB for WebP images

### User Experience Targets

- [x] **Session Start Time:** ≤2 interactions (no regression from MVP)
- [x] **Timer Readability:** 100% of users can read timer in usability testing (5/5)
- [x] **Mode Switcher Clarity:** 90% understand three-mode pattern without explanation (9/10)
- [x] **Task Drawer Usefulness:** 80% notice and appreciate auto-hide behavior (4/5)
- [x] **Offline Functionality:** 100% feature parity offline (no regression)
- [x] **Mobile Usability:** Fully functional at 320px width

### Accessibility Targets (Enhanced)

- [x] **WCAG AA Compliance:** Zero violations in axe-core automated scan
- [x] **Keyboard Navigation:** 100% of features accessible via keyboard
- [x] **Screen Reader Compatibility:** Full functionality on NVDA, JAWS, VoiceOver, TalkBack
- [x] **Touch Targets:** 100% of interactive elements ≥44×44px on mobile
- [x] **Color Contrast:** All text meets WCAG AA ratios (4.5:1 body, 3:1 large)
- [x] **Focus Indicators:** All focusable elements have visible 2px outline with ≥3:1 contrast

### Responsiveness Targets

- [x] **Minimum Screen Width:** Fully functional at 320px
- [x] **Breakpoint Testing:** Perfect layout at 320px, 375px, 768px, 1024px, 1440px
- [x] **Orientation Support:** Smooth adaptation on portrait/landscape switch
- [x] **Safe Area Handling:** Content respects notches and punch-holes

### Behavioral Targets

- [x] **Auto-hide Success:** Task drawer auto-collapses when timer starts 100% of time
- [x] **Drawer Toggle:** Manual reopen works with single interaction
- [x] **Settings Validation:** Invalid inputs caught with clear error messages 100% of time
- [x] **Reset Confirmation:** "Reset to defaults" prevents accidental data loss with prompt

---

## Dependencies & Risks

### External Dependencies

**Fonts:**
- **Inter font family** (Google Fonts CDN or bundled subset)
  - Weights: 400, 600, 700
  - Format: WOFF2 (modern browsers)
  - Loading strategy: `font-display: swap` (non-blocking)
  - Fallback: System fonts (-apple-system, Segoe UI, Roboto)

**Background Assets (Optional):**
- **WebP background image** (≤80KB)
  - Source: Custom designed or curated from license-free library
  - Fallback: JPEG format for older browsers
  - Always backed by CSS gradient (zero-cost fallback)

**Browser Support (Same as MVP):**
- Chrome 60+, Safari 12+, Firefox 60+ (ES6+, CSS Grid/Flexbox)
- `backdrop-filter` support (Chrome 76+, Safari 9+)
  - Graceful degradation: Solid backgrounds on older browsers

**Build Tools (Unchanged):**
- Vite (5.0+), TypeScript (5.3+), Tailwind CSS (3.4+), React (18.3+)

### Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| **backdrop-filter performance on low-end mobile** | Medium | Medium | Test on mid-tier Android devices early; reduce blur radius from 16px to 8px if necessary; provide solid fallback on older browsers |
| **Inter font loading delay (FOIT/FOUT)** | Low | Medium | Use `font-display: swap` for instant text rendering; subset font to include only Latin characters; consider self-hosting for better control |
| **Background WebP image increases bundle size** | Medium | Low | Make image optional (CSS gradient always works); compress aggressively; use progressive loading after gradient displays; stay under 80KB budget |
| **Glass morphism reduces contrast below WCAG AA** | High | Medium | Test contrast ratios early with automated tools; increase overlay opacity if needed; ensure 40-60% dark overlay always applied |
| **Auto-hiding drawer confuses users** | Low | Low | Provide clear toggle button; test with usability participants (n=5); add subtle animation cue when drawer collapses |
| **Modal focus trap breaks keyboard navigation** | Medium | Low | Test exhaustively with Tab/Shift+Tab; ensure ESC always works; return focus to trigger element reliably |
| **Responsive breakpoints break layout on edge cases** | Low | Medium | Test on real devices at 320px, 375px, 768px, 1024px; use CSS Grid/Flexbox with min-width constraints; avoid fixed pixel widths |
| **Performance regression from new styles** | High | Medium | Run Lighthouse audits after each phase; optimize CSS delivery; remove unused Tailwind classes; code-split if needed |
| **ARIA announcements too verbose or missing** | Medium | Medium | Test with real screen readers (NVDA, VoiceOver); limit announcements to critical events only; use aria-live="polite" not "assertive" |

---

## Phased Implementation Order

### Phase 1: Brand + Background + Timer Hierarchy (Week 1: 3-4 days)

**Objective:** Establish immersive foundation with branding, background system, and dominant timer display.

**Deliverables:**
1. "VTea" branding in TopBar (logo text + tagline)
2. Inspirational quote component (top-right desktop, below timer mobile)
3. CSS gradient background system (radial or linear)
4. Optional progressive WebP background image (≤80KB)
5. Radial + linear overlay (40-60% opacity) for text contrast
6. Inter font family loaded (weights 400, 600, 700) with font-display: swap
7. Timer typography scaled to 90px (mobile) / 120px (desktop)
8. Safe area support for notched devices (padding-top: env(safe-area-inset-top))

**Acceptance Criteria:**
- [x] Immersive background displays instantly (CSS gradient)
- [x] WebP image loads progressively without blocking render
- [x] Timer is visually dominant and clearly readable (contrast ≥4.5:1)
- [x] "VTea" branding visible at top-left
- [x] Inspirational quote visible and non-intrusive
- [x] Page load time remains <2s on 3G (no regression)

**Tasks:**
1. Update `BackgroundLayer.tsx`:
   - Add CSS gradient as base layer (inline style or Tailwind classes)
   - Add progressive WebP `<img>` with loading="lazy"
   - Add radial + linear overlay divs (z-index layering)
   - Test fallback on browsers without backdrop-filter

2. Update `TopBar.tsx`:
   - Replace "Focus Timer Hub" with "VTea"
   - Add tagline text "focus & chill" (smaller font, lower opacity)
   - Update typography to Inter 600, 20-24px

3. Create `InspirationalQuote.tsx`:
   - Display static text: "Your thoughts deserve a calm place."
   - Position: absolute top-right (desktop), static below timer (mobile)
   - Typography: Inter 400, 14-16px, italic, 60% opacity
   - Responsive: hide on screens <375px if needed

4. Update `tailwind.config.ts`:
   - Add Inter font family to `fontFamily`
   - Add color tokens (primary #4B6BFB, secondary #FF89BB, success #10B981)
   - Add glass morphism utilities (bg-white/10, backdrop-blur-md)

5. Update `TimerDisplay.tsx`:
   - Apply Inter 700, 90px (mobile) / 120px (desktop)
   - Ensure line-height: 1.0, letter-spacing: -0.02em
   - Add text-shadow for depth if needed (subtle)

6. Load Inter font:
   - Add Google Fonts link in `index.html` OR
   - Bundle WOFF2 files in `/public/fonts` (preferred for offline PWA)
   - Add `font-display: swap` in CSS

7. Test safe areas:
   - Add `padding-top: env(safe-area-inset-top)` to TopBar
   - Test on iPhone with notch (Safari DevTools)

8. Verify performance:
   - Run Lighthouse: Performance ≥90, LCP <2s
   - Check bundle size: ≤150KB gzipped

**Phase 1 Checkpoint:** Immersive background loads fast, timer is clearly readable, branding established.

---

### Phase 2: Focus Title + Mode Switcher + Action Controls (Week 2: 3-4 days)

**Objective:** Add interactive controls for mode selection and session naming with clear visual hierarchy.

**Deliverables:**
1. `FocusTitle` component (inline editable text above timer)
2. `ModeSwitcher` component (segmented control: Focus | Short Break | Long Break)
3. Redesigned `PrimaryControls` (primary button + compact icons)
4. ARIA implementation for mode switcher (aria-pressed)
5. Touch target validation (≥44×44px)

**Acceptance Criteria:**
- [x] Focus title editable inline (tap to edit on mobile, click on desktop)
- [x] Focus title auto-fills from active task
- [x] Focus title defaults to "Untitled Session" when empty
- [x] Mode switcher displays three clear options
- [x] Active mode visually distinct (filled background)
- [x] Touch targets ≥44×44px on all buttons
- [x] aria-pressed correctly indicates selected mode
- [x] Primary button larger and more prominent than icon buttons

**Tasks:**
1. Create `FocusTitle.tsx`:
   - Inline contenteditable or input field
   - Typography: Inter 600, 24-32px (responsive)
   - Connect to Zustand: read activeTask title or use "Untitled Session"
   - Save title on blur or Enter key (store in timerSlice or local state)
   - Add aria-label="Edit session title"

2. Create `ModeSwitcher.tsx`:
   - Three `<button>` elements in horizontal row
   - Rounded pill shape (border-radius: 999px or 50%)
   - Active state: filled background (primary/secondary/success color)
   - Inactive state: outline (1px border white 30% opacity)
   - Hover: background white 5% opacity
   - Disabled: 50% opacity (during running timer)
   - ARIA: aria-pressed="true" for active, "false" for inactive
   - Connect to timerSlice: read current type, dispatch mode change

3. Update `PrimaryControls.tsx`:
   - Primary button: Start/Pause/Resume (48×48px touch target)
   - Compact icons: Restart (circular arrow), Fullscreen (expand arrows)
   - Icon size: 32×32px visible, 44×44px touch target (padding)
   - Layout: Horizontal flex row, gap 16-24px
   - Tooltips on hover for icon buttons
   - ARIA: aria-label for icon buttons ("Restart timer", "Enter fullscreen")

4. Style updates:
   - Apply glass morphism to mode switcher container
   - Ensure primary button has high contrast (white text on primary color)
   - Add focus-visible styles (2px solid outline, white 80% opacity)

5. Keyboard navigation:
   - Tab order: Focus Title → Mode Switcher → Primary Button → Restart → Fullscreen
   - Enter/Space activates all buttons
   - Test with keyboard only (no mouse)

6. Touch target validation:
   - Measure all interactive elements in Chrome DevTools
   - Ensure min-width and min-height ≥44px
   - Add padding if visual size is smaller than touch target

**Phase 2 Checkpoint:** Timer is clearly the primary visual element with intuitive controls; mode selection is obvious.

---

### Phase 3: Task Drawer Auto-hide + Filtering (Week 3: 3-4 days)

**Objective:** Minimize distractions by auto-hiding task drawer during sessions and providing filtering options.

**Deliverables:**
1. Auto-collapse logic (drawer closes when timer starts)
2. `DrawerToggle` button (small, persistent when drawer closed)
3. "Hide completed tasks" toggle filter in drawer
4. Mobile: bottom sheet layout
5. Desktop: left side-sheet layout
6. Smooth slide animation (disabled if prefers-reduced-motion)

**Acceptance Criteria:**
- [x] Drawer auto-collapses when timer starts
- [x] Toggle button remains visible when drawer closed
- [x] Manual reopen persists until user closes
- [x] "Hide completed" filter works correctly
- [x] Drawer position adapts to screen size (bottom on mobile, left on desktop)
- [x] Animation respects prefers-reduced-motion

**Tasks:**
1. Update `TaskDrawer.tsx`:
   - Add `isOpen` state (default: true when timer idle)
   - Connect to timerSlice: auto-close when status changes to "running"
   - Add `userOpenedManually` flag to persist manual reopen during session
   - Slide-in animation: transform translateX (desktop) or translateY (mobile)
   - Transition duration: 200-300ms ease-in-out
   - Disable animation if `prefers-reduced-motion: reduce`

2. Create `DrawerToggle.tsx`:
   - Small button (44×44px touch target, 32×32px icon)
   - Icon: chevron or hamburger menu
   - Position: fixed left (desktop) or bottom (mobile)
   - Visibility: shown when drawer is closed
   - onClick: toggle drawer open/close, set userOpenedManually=true

3. Add "Hide completed" filter:
   - Toggle switch at top of TaskList
   - Filter tasks array: tasks.filter(t => !t.isCompleted)
   - Show count: "5 tasks completed - Show"
   - State persists during session (local component state or Zustand)

4. Responsive layout:
   - Mobile (<768px): Bottom sheet, slides up from bottom
   - Desktop (≥768px): Left side-sheet, slides in from left
   - Use CSS media queries or Tailwind responsive utilities

5. Drawer backdrop:
   - Semi-transparent overlay when drawer open on mobile (optional)
   - Click backdrop to close drawer
   - No backdrop on desktop (drawer is side panel)

6. Test animations:
   - Enable prefers-reduced-motion in browser DevTools
   - Verify drawer shows/hides instantly (no transition)
   - Re-enable motion, verify smooth 200-300ms slide

**Phase 3 Checkpoint:** Task drawer auto-hides during sessions and reduces visual clutter without disrupting workflow.

---

### Phase 4: Settings Modal Polish + Accessibility Audit (Week 4: 4-5 days)

**Objective:** Enhance settings UX and achieve comprehensive WCAG AA compliance with full accessibility support.

**Deliverables:**
1. Inline validation hints in SettingsModal
2. "Reset to Defaults" with non-blocking confirmation
3. Full keyboard navigation (logical tab order)
4. Modal focus trap (Tab cycles within modal, ESC closes)
5. ARIA live region for timer announcements
6. ARIA labels for all icon buttons
7. Screen reader testing (NVDA, VoiceOver)
8. Automated accessibility audit (axe-core, Lighthouse)

**Acceptance Criteria:**
- [x] Settings inputs show inline validation hints ("Min: 1, Max: 120")
- [x] Invalid inputs caught with clear error messages before save
- [x] "Reset to Defaults" shows non-blocking confirmation prompt
- [x] All features accessible via keyboard only
- [x] Modal focus trap works correctly (Tab, Shift+Tab, ESC)
- [x] ARIA live announcements for timer status changes
- [x] All icon buttons have descriptive aria-label
- [x] Screen reader announces timer updates correctly
- [x] Zero WCAG AA violations in axe-core scan
- [x] Lighthouse Accessibility score ≥95

**Tasks:**
1. Update `SettingsModal.tsx`:
   - Add inline hints below each input: "Min: 1, Max: 120 minutes"
   - Real-time validation on blur or input change
   - Error state: red border, error message below input
   - Valid state: subtle green indicator or checkmark
   - "Reset to Defaults" confirmation: tooltip bubble or inline prompt
   - Confirmation: "Are you sure? This will reset all durations." + [Cancel] [Reset]

2. Implement modal focus trap:
   - Use `react-focus-trap` or manual implementation
   - On modal open: focus first input field
   - Tab cycles through modal elements only
   - ESC key closes modal and returns focus to trigger button
   - Clicking backdrop closes modal

3. Add ARIA live region for timer:
   - Create hidden div with aria-live="polite" aria-atomic="true"
   - Update text content on timer events:
     - "Timer started" (on start)
     - "Timer paused" (on pause)
     - "Timer resumed" (on resume)
     - "5 minutes remaining" (at 5:00 mark)
     - "Session complete" (at 0:00)
   - Connect to timerSlice state changes

4. Add aria-label to icon buttons:
   - Restart button: aria-label="Restart timer"
   - Fullscreen button: aria-label="Enter fullscreen"
   - Drawer toggle: aria-label="Toggle task list"
   - Theme toggle: aria-label="Toggle theme"
   - Settings button: aria-label="Open settings"

5. Keyboard navigation audit:
   - Document tab order: Branding → Mode Switcher → Focus Title → Timer Controls → Task Toggle → Settings → Task List
   - Test with keyboard only (hide mouse cursor)
   - Verify no keyboard traps
   - Ensure all interactive elements focusable

6. Focus-visible styles:
   - Add 2px solid outline, white at 80% opacity, 2px offset
   - Apply to all interactive elements (buttons, inputs, links)
   - Test contrast ratio ≥3:1 against background
   - Use `:focus-visible` pseudo-class (not `:focus`)

7. Screen reader testing:
   - NVDA (Windows): Test all features, verify announcements
   - VoiceOver (macOS/iOS): Test navigation and announcements
   - TalkBack (Android): Test mobile experience
   - Verify timer status announced at correct times

8. Automated accessibility audit:
   - Install @axe-core/react or run Lighthouse
   - Scan all screens (dashboard, settings modal, task drawer)
   - Fix all critical and serious violations
   - Aim for zero violations

9. Color contrast validation:
   - Use WebAIM Contrast Checker or browser DevTools
   - Verify all text: 4.5:1 (body), 3:1 (large text)
   - Verify UI elements: 3:1
   - Adjust opacity if needed

**Phase 4 Checkpoint:** App passes automated accessibility audit and manual keyboard/screen reader testing; WCAG AA compliant.

---

### Phase 5: Responsiveness + Performance Hardening (Week 5: 3-4 days)

**Objective:** Validate responsive design across all breakpoints and optimize performance to meet targets.

**Deliverables:**
1. Responsive layout validation (320px - 1440px+)
2. Typography scaling across breakpoints
3. Background asset optimization (WebP compression)
4. Bundle size verification (≤150KB gzipped)
5. Lighthouse audits (Performance ≥90, Accessibility ≥95)
6. Mobile UX validation (orientation, safe areas)
7. Visual regression testing (screenshot comparison)

**Acceptance Criteria:**
- [x] Layout works perfectly at 320px, 375px, 768px, 1024px, 1440px
- [x] Typography scales appropriately (no overflow, no tiny text)
- [x] Background assets ≤80KB total
- [x] Bundle size ≤150KB gzipped
- [x] LCP <2s on 3G
- [x] Lighthouse Performance ≥90, Accessibility ≥95
- [x] Orientation changes handled smoothly
- [x] Safe areas respected on notched devices
- [x] No visual regressions from MVP baseline

**Tasks:**
1. Responsive breakpoint testing:
   - Test on Chrome DevTools device emulator: 320px, 375px, 390px, 414px, 768px, 1024px, 1440px
   - Test on real devices: iPhone SE, iPhone 14, iPad, Android mid-tier
   - Verify no horizontal scrolling at any breakpoint
   - Check typography readability (min 16px body text)

2. Typography scaling:
   - Timer: 90px (mobile) → 100px (tablet) → 120px (desktop)
   - Focus Title: 24px (mobile) → 28px (tablet) → 32px (desktop)
   - Body text: 16px (all breakpoints)
   - Use Tailwind responsive utilities (text-6xl md:text-8xl lg:text-9xl)

3. Background asset optimization:
   - Compress WebP image using tools (Squoosh, ImageOptim)
   - Target: ≤80KB file size
   - Test progressive loading (gradual reveal)
   - Verify JPEG fallback works on older browsers

4. Font optimization:
   - Subset Inter font to Latin characters only
   - Use woff2 format (best compression)
   - Preload font file: `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>`
   - Verify font-display: swap is applied

5. Bundle size analysis:
   - Run Vite build with `vite-bundle-visualizer`
   - Identify large dependencies
   - Code-split if needed (dynamic imports for modals)
   - Remove unused Tailwind classes (purge config)
   - Target: ≤150KB gzipped JS

6. Lighthouse audits:
   - Run Lighthouse in Incognito mode (no extensions)
   - Throttle to 3G connection
   - Run 3 times, take average score
   - Performance target: ≥90
   - Accessibility target: ≥95
   - PWA target: ≥90 (no regression)

7. Orientation testing:
   - Test portrait → landscape switch on mobile
   - Verify layout adapts smoothly
   - Check for content overflow or cutoff
   - Test on iOS Safari and Android Chrome

8. Safe area validation:
   - Test on iPhone with notch (DevTools or real device)
   - Verify padding-top: env(safe-area-inset-top) applied
   - Test on Android with punch-hole camera
   - Ensure no UI elements hidden behind notch/camera

9. Visual regression testing:
   - Take screenshots of MVP baseline at key breakpoints
   - Take screenshots of VTea UI at same breakpoints
   - Compare side-by-side (manual or automated with Percy/Chromatic)
   - Verify intentional changes, flag unintentional regressions

10. Performance profiling:
    - Use Chrome DevTools Performance tab
    - Record 6s interaction (start timer, pause, open drawer)
    - Check for long tasks (>50ms)
    - Verify smooth 60fps animations
    - Optimize if needed (debounce, memoization)

**Phase 5 Checkpoint:** Lighthouse scores meet targets, layout works perfectly on mobile, production-ready immersive UI with performance stability.

---

## Rollback & Escalation Strategy

### Performance Regression Mitigation

**If bundle size exceeds 150KB:**
1. Remove WebP background image (fall back to CSS gradient only)
2. Reduce backdrop-filter blur from 16px to 8px (less GPU cost)
3. Code-split SettingsModal and TaskEditorModal (dynamic imports)
4. Subset Inter font to exclude unused weights

**If LCP exceeds 2s on 3G:**
1. Remove background image loading (CSS gradient only)
2. Inline critical CSS (above-the-fold styles)
3. Defer non-critical fonts (load after first render)
4. Reduce initial React bundle size (lazy load components)

**If glass morphism causes performance issues on low-end devices:**
1. Detect device capability (GPU benchmark or user agent)
2. Disable backdrop-filter on low-end devices (solid backgrounds)
3. Add setting toggle: "High performance mode" (disables blur)

### Accessibility Violation Escalation

**If Lighthouse Accessibility score <95:**
1. Run axe-core detailed scan to identify specific violations
2. Prioritize critical and serious issues (color contrast, ARIA, keyboard)
3. Fix issues in order of impact (blocking vs. minor)
4. Re-run Lighthouse after each fix

**If screen reader testing reveals issues:**
1. Document specific issue (e.g., "Timer status not announced")
2. Add or fix ARIA attributes (aria-live, aria-label)
3. Re-test with same screen reader to verify fix
4. Test with multiple screen readers (NVDA, VoiceOver, JAWS)

### Full Rollback Plan

**If visual changes cause critical issues:**
1. **Feature flag approach:**
   - Add environment variable: `ENABLE_VTEA_UI=false`
   - Wrap all VTea UI components in conditional: `{ENABLE_VTEA_UI ? <VTeaUI /> : <MVPUI />}`
   - Deploy with flag disabled, enable gradually (canary)

2. **Git revert approach:**
   - Revert to commit before Phase 1 started
   - Preserve data migration changes (none in this case)
   - Redeploy MVP styles immediately

3. **Partial rollback:**
   - Disable specific features (e.g., glass morphism, background image)
   - Keep safe enhancements (typography, colors, ARIA improvements)
   - Deploy partial rollback within hours

**Escalation Threshold:**
- Lighthouse Performance drops below 80
- Lighthouse Accessibility drops below 90
- Critical user complaints about readability or usability
- Bundle size exceeds 200KB (critical budget violation)

---

## Testing Strategy

### Visual Regression Testing

**Tools:** Manual comparison or automated (Percy, Chromatic)

**Baseline Screenshots (MVP):**
- Dashboard idle (320px, 768px, 1440px)
- Dashboard running timer (320px, 768px, 1440px)
- Settings modal open (768px, 1440px)
- Task drawer open (768px, 1440px)

**VTea UI Screenshots:**
- Same screens, same breakpoints
- Compare side-by-side for unintentional changes

**Manual Testing:**
- Verify intentional changes (immersive background, Inter typography, mode switcher)
- Flag any unexpected layout shifts or content cutoff
- Check for visual glitches (z-index issues, overlap, blur artifacts)

### Accessibility Testing

**Automated Tools:**
- axe-core (React plugin or browser extension)
- Lighthouse Accessibility audit
- WAVE browser extension

**Manual Keyboard Testing:**
- Tab through all interactive elements (no mouse)
- Verify focus-visible outlines on all elements
- Test modal focus trap (Tab, Shift+Tab, ESC)
- Verify no keyboard traps

**Screen Reader Testing:**
- NVDA (Windows): Full feature walkthrough
- VoiceOver (macOS): Full feature walkthrough
- TalkBack (Android): Mobile experience
- JAWS (Windows): Optional, if available

**Test Scenarios:**
1. Start a focus session (verify timer announcement)
2. Pause and resume (verify announcements)
3. Switch modes (verify mode change announced)
4. Open/close task drawer (verify state change announced)
5. Open/close settings modal (verify focus trap)
6. Edit focus title (verify label announced)

### Performance Testing

**Tools:**
- Lighthouse (Chrome DevTools)
- WebPageTest (3G throttled)
- Chrome DevTools Performance tab

**Test Scenarios:**
1. Cold load (clear cache): Measure LCP, FCP, TTI
2. Warm load (cache hit): Verify service worker caching works
3. Throttled 3G: Verify <2s TTI
4. Low-end device: Test on mid-tier Android phone

**Metrics to Track:**
- Bundle size (before/after each phase)
- LCP (should remain <2s)
- FCP (should remain <1.5s)
- TTI (should remain <2s)
- Lighthouse Performance score (target ≥90)
- Lighthouse Accessibility score (target ≥95)

### Cross-Browser Testing

**Desktop:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Mobile:**
- iOS Safari (iPhone SE, iPhone 14)
- Android Chrome (mid-tier device)
- Samsung Internet (optional)

**Test Cases:**
- Visual layout at key breakpoints
- Drawer slide animation (smooth or instant if prefers-reduced-motion)
- Glass morphism rendering (backdrop-filter or solid fallback)
- Font loading (FOIT/FOUT with font-display: swap)
- Touch target sizes (≥44×44px)

### User Acceptance Testing

**Participants:** 5 users (mix of desktop and mobile)

**Test Scenarios:**
1. **First Impression:** Show app cold, measure time to first session start
   - Target: ≤2 interactions
   - Measure: Actual clicks/taps to start

2. **Hierarchy Clarity:** Ask "What is the most important element on screen?"
   - Expected: "The timer" or "The countdown"
   - Measure: % who identify timer correctly (target: 100%)

3. **Mode Switcher Usability:** Ask "How do you switch to a break mode?"
   - Expected: Click/tap one of the three mode buttons
   - Measure: % who understand without explanation (target: 90%)

4. **Drawer Behavior:** Start timer, observe reaction to drawer auto-hiding
   - Expected: Positive reaction or no reaction (non-intrusive)
   - Measure: % who notice and appreciate (target: 80%)

5. **Overall Feedback:** Open-ended questions
   - "What do you like about the design?"
   - "Is anything confusing or distracting?"
   - "Would you use this app regularly?"

---

## Next Steps

### Immediate Actions (Week 1 - Phase 1)

1. **Review and Approve Plan**
   - Engineering team reviews plan
   - Stakeholders approve scope and timeline
   - Mark plan as **APPROVED** for implementation

2. **Generate Phase 0 Research Document** (if needed)
   - Research best practices for Inter font loading
   - Research WebP compression tools and workflows
   - Research backdrop-filter performance on low-end devices
   - Document findings in `specs/002-vtea-ui-makeover/research.md`

3. **Generate Phase 1 Design Artifacts**
   - Create `specs/002-vtea-ui-makeover/data-model.md` (note: no data model changes, document UI state only)
   - Create `specs/002-vtea-ui-makeover/contracts/design-tokens.ts` (color, typography, spacing tokens)
   - Create `specs/002-vtea-ui-makeover/quickstart.md` (setup instructions for UI development)

4. **Update Agent Context**
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType cursor-agent`
   - Add Inter font, glass morphism, VTea branding to agent context
   - Preserve existing MVP context (React, Zustand, Tailwind)

5. **Begin Phase 1 Implementation**
   - Create feature branch (already on `002-vtea-ui-makeover`)
   - Start with BackgroundLayer component updates
   - Daily commits with descriptive messages
   - Run Lighthouse after each major change

### Week 2-5 Actions

- Follow phased implementation order (Phases 2-5)
- Run `/speckit.tasks` to generate detailed task breakdown for each phase
- Conduct daily stand-ups (or async updates) to track progress
- Run Lighthouse audits at end of each phase
- Update `plan.md` with actual completion dates
- Document any deviations or learnings in plan notes

### Post-Implementation Actions

- Conduct user acceptance testing (n=5 participants)
- Generate release notes highlighting UI improvements
- Update README with new screenshots (before/after)
- Deploy to production with monitoring (error tracking, performance)
- Gather user feedback via in-app survey or support channels
- Plan next iteration (002-vtea-ui-makeover-v2) based on feedback

---

## Appendix: Technology Justifications

### Why Inter Font?

- **Designed for UI:** Inter was specifically designed for user interfaces with excellent legibility at all sizes
- **Variable font:** Supports all weights (100-900) in single file (not using variable version for MVP, but option for future)
- **Open source:** SIL Open Font License, free to use and bundle
- **Wide adoption:** Used by GitHub, Mozilla, and many modern web apps
- **Performance:** Subset to Latin characters reduces file size to ~50KB for 3 weights

### Why CSS Gradient Foundation?

- **Zero bundle cost:** CSS gradients add no additional bytes
- **Instant render:** No network request, displays immediately
- **Reliable:** Always works, no 404 or slow loading
- **Flexible:** Easy to change colors via Tailwind config
- **Progressive enhancement:** WebP image enhances experience without blocking

### Why Glass Morphism?

- **Modern aesthetic:** Matches Flocus/LifeAt inspiration (Gen Z appeal)
- **Depth perception:** Creates visual hierarchy without heavy shadows
- **Brand alignment:** Supports "focus & chill" vibe with soft, calming visuals
- **Performance:** backdrop-filter is GPU-accelerated on modern browsers
- **Graceful degradation:** Falls back to solid backgrounds on older browsers

### Why Segmented Control for Mode Switcher?

- **Familiar pattern:** Widely used in iOS and modern web apps
- **Clear affordance:** Users understand it's a selector without explanation
- **Accessibility:** Easy to implement with ARIA (aria-pressed)
- **Touch-friendly:** Large targets, easy to tap on mobile
- **Visual clarity:** Active state is obvious (filled vs. outline)

### Why Auto-hide Task Drawer?

- **Reduces distraction:** Hidden drawer keeps focus on timer during sessions
- **User control:** Manual reopen available if user needs task list
- **Tested pattern:** Similar to Flocus behavior (drawer collapses during sessions)
- **Responsive:** Bottom sheet on mobile (thumb-friendly), side panel on desktop
- **Accessibility:** Announced to screen readers, keyboard accessible

---

## Design Artifacts Reference

### Directory Structure

```
specs/002-vtea-ui-makeover/
├── spec.md                          # Feature specification (v1.2, Clarified)
├── plan.md                          # This implementation plan (v1.0)
├── research.md                      # Phase 0 research findings (to be created)
├── data-model.md                    # UI state documentation (to be created)
├── quickstart.md                    # Setup and development guide (to be created)
├── contracts/
│   ├── design-tokens.ts             # Color, typography, spacing tokens
│   └── component-interfaces.ts      # TypeScript interfaces for new components
├── checklists/
│   └── requirements.md              # Specification quality checklist (exists)
└── tasks.md                         # Detailed task breakdown (to be generated via /speckit.tasks)
```

### Contract Files (To Be Created)

**`contracts/design-tokens.ts`:**
- Export color palette constants (#4B6BFB, #FF89BB, etc.)
- Export typography scale (font sizes, weights, line heights)
- Export spacing values (touch targets, gaps, padding)
- Export glass morphism CSS values (opacity, blur, shadow)

**`contracts/component-interfaces.ts`:**
- `FocusTitleProps` interface
- `ModeSwitcherProps` interface
- `DrawerToggleProps` interface
- ARIA attribute type definitions

---

## Approval

**Plan Status:** 🟡 **PENDING REVIEW**

**Approvers:**
- [ ] Engineering Lead (technical feasibility)
- [ ] Product Owner (scope and priorities)
- [ ] Design Lead (visual consistency)
- [ ] Accessibility Lead (WCAG AA compliance)

**Once Approved:**
- Update status to: ✅ **APPROVED** for implementation
- Run `/speckit.tasks SPEC_ID: 002-vtea-ui-makeover` to generate Phase 1 task breakdown
- Begin Phase 1 implementation

---

**Document Version History:**
- v1.0 (2025-10-28): Initial implementation plan created based on clarified spec v1.2

---

## Notes

**Key Constraints:**
- UI changes only (no logic, state, or data model modifications)
- Performance budget strictly enforced (≤150KB bundle, LCP <2s)
- Accessibility non-negotiable (WCAG AA, Lighthouse ≥95)
- Rollback path must be clear (feature flag or git revert)

**Success Definition:**
This plan is successful when:
1. All 5 phases complete with acceptance criteria met
2. Lighthouse scores: Performance ≥90, Accessibility ≥95
3. Zero critical WCAG AA violations
4. User acceptance testing confirms improved focus experience (80%+ positive feedback)
5. No regressions in core timer, task, or stats functionality
