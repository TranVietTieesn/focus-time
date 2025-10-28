# VTea UI Makeover Specification

**Project:** Focus Timer Hub  
**Spec ID:** 002-vtea-ui-makeover  
**Version:** 1.1  
**Status:** Draft  
**Last Updated:** 2025-10-28

---

## Overview

VTea UI Makeover is a visual refresh of the Focus Timer Hub MVP that elevates the user experience to match modern focus app standards (Flocus, LifeAt) while maintaining the core constitutional principles of performance, accessibility, and local-first architecture. The update transforms the functional MVP into an immersive, cinematic focus environment that reduces visual noise, improves hierarchy, and creates a calming atmosphere conducive to deep work. All enhancements prioritize clarity, mobile-first design, and instant usability without compromising the sub-2-second load time or offline functionality.

This is a UI/UX enhancement layer—core timer logic, task management, and data persistence remain unchanged.

---

## User Stories & Requirements

### Story 1: First-Time User — Instant Immersive Experience

**As a** first-time visitor  
**I want** to immediately feel immersed in a beautiful, calming focus environment  
**So that** I'm motivated to start a focus session and return regularly

**Acceptance Criteria:**
- [ ] Full-bleed background (image or gradient) displays immediately on page load
- [ ] Background visuals do not compromise text readability (overlay/contrast layer applied)
- [ ] Page remains fast: initial load completes in under 2 seconds on 3G connection
- [ ] Background assets are optimized: total size ≤150KB for compressed bundle
- [ ] "VTea" branding is visible at top-left with optional tagline ("focus & chill")
- [ ] Optional inspirational one-liner appears at top-right (non-intrusive, readable)

### Story 2: Active User — Clear Visual Hierarchy During Sessions

**As an** active focus session user  
**I want** the timer to be the primary visual anchor with minimal distractions  
**So that** I can maintain concentration without cognitive overload

**Acceptance Criteria:**
- [ ] Timer display is large and center-aligned (≥90px font on mobile, ≥120px on desktop)
- [ ] Timer uses high-contrast colors with subtle drop shadow for depth
- [ ] Editable focus title appears above timer (inline edit, no modal required)
- [ ] Focus title defaults to "Untitled Session" when empty
- [ ] If an active task is selected, focus title auto-fills with task name
- [ ] Non-essential UI elements (task drawer, settings) are visually de-emphasized during active sessions

### Story 3: Mode Switcher User — Clear Session Type Selection

**As a** user switching between work and break modes  
**I want** a clear, touch-friendly mode selector  
**So that** I can easily transition between Focus, Short Break, and Long Break

**Acceptance Criteria:**
- [ ] Mode switcher displays three options: Focus, Short Break, Long Break
- [ ] Switcher uses segmented control pattern (pill-style buttons)
- [ ] Active mode has distinct visual state (filled background, higher contrast)
- [ ] Hover states provide clear affordance for interaction
- [ ] Disabled states are visually distinct (reduced opacity when timer is running)
- [ ] Touch targets meet 44×44px minimum on mobile devices
- [ ] Mode changes maintain existing timer logic (no behavior changes)

### Story 4: Mobile User — Responsive Immersive Layout

**As a** mobile user  
**I want** the immersive experience to work perfectly on my phone  
**So that** I can focus anywhere with a beautiful interface

**Acceptance Criteria:**
- [ ] Layout is fully responsive down to 320px screen width
- [ ] Background scales appropriately on all screen sizes and orientations
- [ ] Timer and controls remain readable and accessible on small screens
- [ ] Touch targets meet 44×44px minimum for all interactive elements
- [ ] Font sizes scale appropriately (responsive typography)
- [ ] No horizontal scrolling at any supported breakpoint
- [ ] Interface respects safe areas on notched devices (iOS, Android)

### Story 5: Active User — Auto-Hiding Task Drawer

**As a** user in an active focus session  
**I want** the task list to hide automatically when I start the timer  
**So that** I can minimize distractions and focus on the current task

**Acceptance Criteria:**
- [ ] Task drawer auto-collapses when timer starts
- [ ] Drawer can be manually reopened via toggle button/icon
- [ ] Toggle button is small and non-intrusive during active sessions
- [ ] Drawer state persists: if manually opened during session, stays open
- [ ] "Hide completed tasks" option available in drawer to reduce visual clutter
- [ ] Completed tasks can be toggled on/off without losing data
- [ ] Drawer animations respect prefers-reduced-motion user preference

### Story 6: Settings User — Polished Configuration Experience

**As a** user adjusting timer settings  
**I want** clear validation feedback and easy reset options  
**So that** I can customize durations without confusion

**Acceptance Criteria:**
- [ ] Settings modal displays current durations clearly
- [ ] Min/max validation hints appear inline (e.g., "1-120 minutes")
- [ ] Invalid inputs are caught before save with clear error messages
- [ ] "Reset to defaults" button includes non-blocking confirmation (e.g., tooltip or small prompt)
- [ ] Confirmation prevents accidental resets while being quick to dismiss
- [ ] Settings modal maintains keyboard accessibility (focus trap, ESC closes, focus returns)
- [ ] All form inputs have visible focus indicators

### Story 7: Keyboard User — Full Keyboard Navigation

**As a** keyboard-only user  
**I want** to navigate and control all features without a mouse  
**So that** I can use the app efficiently and accessibly

**Acceptance Criteria:**
- [ ] All interactive elements are keyboard accessible via Tab/Shift+Tab
- [ ] Focus indicators are clearly visible on all focusable elements
- [ ] Logical tab order follows visual hierarchy (top to bottom, left to right)
- [ ] Modal dialogs trap focus and return focus to trigger on close
- [ ] ESC key closes modals and drawers
- [ ] Enter/Space activates buttons and controls
- [ ] No keyboard traps prevent navigation out of any component

### Story 8: Screen Reader User — Clear Announcements

**As a** screen reader user  
**I want** timer status changes announced clearly  
**So that** I'm aware of session progress without visual cues

**Acceptance Criteria:**
- [ ] Timer status changes announced via aria-live (polite level)
- [ ] Announcements include: "Timer started", "Timer paused", "5 minutes remaining", "Session complete"
- [ ] Focus title changes announced when user selects new task
- [ ] Mode changes announced when user switches between Focus/Break modes
- [ ] All interactive controls have descriptive ARIA labels
- [ ] Icon-only buttons have accessible names (aria-label or sr-only text)

---

## Constitutional Compliance Check

**Required:** All features MUST align with Focus Timer Hub constitution before approval.

- [x] **Principle 1: Focus-first Experience**
  - Timer remains the primary visual element with clear hierarchy
  - Task drawer auto-hides during active sessions to reduce distraction
  - No new intrusive notifications or pop-ups introduced
  - Immersive background enhances focus atmosphere
  - [x] Compliant

- [x] **Principle 2: Simple and Consistent UI**
  - Mode switcher uses familiar segmented control pattern
  - Action controls remain minimal (Start/Pause + Restart + Fullscreen)
  - Visual refresh maintains existing UI patterns from MVP
  - Settings modal preserves simple form structure
  - [x] Compliant

- [x] **Principle 3: Accessibility and Mobile-first**
  - All WCAG AA requirements maintained and enhanced
  - Touch targets ≥44×44px on all interactive elements
  - Keyboard navigation and screen reader support improved
  - Responsive design supports 320px minimum width
  - Respects prefers-reduced-motion for animations
  - [x] Compliant

- [x] **Principle 4: Lightweight Performance**
  - Background assets optimized to stay within ≤150KB gzipped bundle
  - No new network dependencies introduced
  - Page load time remains under 2 seconds on 3G
  - Offline functionality preserved (PWA capabilities intact)
  - [x] Compliant

- [x] **Principle 5: Clear and Maintainable Development Workflow**
  - UI changes are scoped to visual layer only
  - Core timer logic and state management unchanged
  - Changes can be implemented incrementally
  - Clear rollback path (revert to MVP styles)
  - [x] Compliant

- [x] **Principle 6: Local-first Secure Data Handling**
  - No changes to data storage or persistence
  - No new external resources requiring network access
  - All assets bundled and served locally
  - Privacy-by-design principles maintained
  - [x] Compliant

---

## Design & UX

### Visual Hierarchy

**Primary Elements (Highest Priority):**
1. **Timer Display:** Large, center-aligned countdown (90-120px font)
2. **Focus Title:** Editable session name above timer (24-32px font)
3. **Primary Action Button:** Start/Pause/Resume (prominent, high contrast)

**Secondary Elements (Supporting Priority):**
1. **Mode Switcher:** Segmented control for Focus/Short Break/Long Break
2. **Compact Controls:** Restart and Fullscreen icons (smaller, lower contrast)
3. **Task Drawer Toggle:** Small icon/button to reveal task list

**Tertiary Elements (Background Priority):**
1. **Branding:** "VTea" text at top-left with optional tagline
2. **Inspirational Quote:** Optional one-liner at top-right
3. **Background Layer:** Full-bleed image/gradient with overlay

### Immersive Background System

**Requirements:**
- Full viewport coverage (100vw × 100vh)
- Subtle overlay for text contrast (dark semi-transparent layer or gradient)
- Background must not interfere with readability (minimum 4.5:1 contrast for body text)
- Assets optimized: use modern formats (WebP with JPEG fallback) or CSS gradients
- Background can be static gradient (no animation required to respect reduced-motion)

**Contrast Strategy:**
- Apply 40-60% opacity dark overlay on background images
- Use gradient overlays (e.g., radial gradient from center) to focus attention on timer
- Ensure all text elements have sufficient contrast regardless of background

### Mode Switcher Design

**Layout:**
- Horizontal row of three buttons
- Rounded pill shape (fully rounded ends)
- Buttons grouped together with minimal gap (1-2px)

**States:**
- **Active:** Filled background, high contrast text, no border
- **Inactive:** Transparent/outlined, medium contrast text
- **Hover:** Subtle background color shift, smooth transition
- **Disabled:** Reduced opacity (50-60%), cursor not-allowed

**Accessibility:**
- Each button has clear label (no icon-only)
- Active state indicated via ARIA (aria-pressed or aria-selected)
- Focus indicators visible on keyboard navigation

### Action Controls Layout

**Primary Button:**
- Large touch target (minimum 48×48px)
- Clear label: "Start" / "Pause" / "Resume"
- High contrast color (accent color from theme)

**Compact Icons:**
- Restart icon (circular arrow)
- Fullscreen icon (expand arrows)
- Smaller size (32×32px visible area, 44×44px touch target)
- Medium contrast (not competing with primary button)
- Tooltips on hover to clarify function

**Layout:**
- Horizontal row: [Primary Button] [Restart Icon] [Fullscreen Icon]
- Centered below timer
- Adequate spacing between elements (16-24px gap)

### Task Drawer Behavior

**Auto-Hide Logic:**
- Drawer visible when timer is idle
- Drawer auto-collapses when timer starts (smooth slide-out animation)
- Small toggle button/icon remains visible to reopen drawer
- If user manually reopens during session, drawer stays open until manually closed

**Completed Task Hiding:**
- "Hide completed" toggle at top of task list
- When enabled, completed tasks disappear from view (not deleted)
- Completed count still visible (e.g., "5 tasks completed today - Show")
- When disabled, completed tasks reappear with strikethrough or check mark

**Visual Design:**
- Drawer slides in from side (left on desktop, bottom on mobile)
- Semi-transparent backdrop when drawer is open (optional)
- Drawer content scrollable if task list exceeds viewport height

### Settings Modal Polish

**Layout:**
- Modal centered on screen
- Clear title: "Timer Settings"
- Form fields grouped by type (Work, Short Break, Long Break)
- Each field shows current value and validation range
- Footer with "Reset to Defaults" and "Save" buttons

**Validation Feedback:**
- Inline hints below each input: "Min: 1, Max: 120 minutes"
- Real-time validation on blur or input change
- Error states highlighted in red with specific message
- Valid states confirmed with subtle green indicator

**Reset Confirmation:**
- "Reset to Defaults" button triggers small confirmation
- Confirmation style: tooltip bubble or inline prompt (non-blocking, no modal-within-modal)
- "Are you sure? This will reset all durations." with [Cancel] [Reset] options
- Clicking outside or ESC dismisses confirmation

### Accessibility Enhancements

**Color Contrast:**
- All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Interactive elements meet 3:1 contrast against background
- Focus indicators meet 3:1 contrast

**Keyboard Navigation:**
- Tab order: Branding → Mode Switcher → Focus Title → Timer Controls → Task Toggle → Settings
- Focus trap in modals (Tab cycles within modal, ESC closes and returns focus)
- Visible focus outlines on all interactive elements (2px solid, high contrast color)

**Screen Reader Support:**
- Timer status announced via aria-live="polite" region
- Mode changes announced when user switches modes
- Task drawer state changes announced ("Task list opened" / "Task list closed")
- All icon buttons have aria-label descriptors

**Motion Preferences:**
- Drawer slide animations disabled if prefers-reduced-motion
- Mode switcher transitions disabled if prefers-reduced-motion
- Timer countdown remains smooth (essential feedback)

### Responsive Breakpoints

**Mobile Small (320px - 480px):**
- Single column layout
- Timer font: 90px
- Mode switcher stacked vertically or compact horizontal
- Task drawer: full-width bottom sheet

**Mobile Large (481px - 768px):**
- Single column layout
- Timer font: 100px
- Mode switcher horizontal
- Task drawer: side sheet (slides from left)

**Tablet (769px - 1024px):**
- Timer font: 110px
- More generous spacing
- Task drawer: side panel (persistent or slide-in)

**Desktop (1025px+):**
- Timer font: 120px
- Optimal spacing and layout
- Task drawer: side panel or modal overlay
- Background fully visible with ample margins

---

## Testing Strategy

### Visual Regression Testing
- [ ] Compare screenshots of MVP vs. VTea makeover at key breakpoints (320px, 375px, 768px, 1024px, 1440px)
- [ ] Verify background images load correctly and maintain aspect ratio
- [ ] Confirm timer remains readable against all background variations

### Accessibility Testing
- [ ] **Automated WCAG AA verification:** Run axe-core or Lighthouse accessibility audit
- [ ] **Color contrast check:** Use automated tools to verify all text/background combinations meet 4.5:1 (body) or 3:1 (large text)
- [ ] **Keyboard navigation:** Manually test full keyboard flow from landing to settings and back
- [ ] **Screen reader testing:** Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- [ ] **Focus indicators:** Verify visible focus states on all interactive elements
- [ ] **Reduced motion:** Enable prefers-reduced-motion and verify animations are disabled

### Mobile Testing
- [ ] **Touch targets:** Verify all interactive elements ≥44×44px on real devices
- [ ] **Responsive layout:** Test on real devices at 320px, 375px, 390px, 414px widths
- [ ] **Safe areas:** Test on iPhone with notch and Android with punch-hole camera
- [ ] **Orientation changes:** Verify layout adapts smoothly on portrait/landscape switch
- [ ] **Drawer behavior:** Test auto-hide/show on session start/stop
- [ ] **Offline functionality:** Verify all features work in airplane mode (PWA)

### Performance Testing
- [ ] **Lighthouse Performance:** Target score ≥90 on 3G throttled connection
- [ ] **Bundle size:** Verify total compressed bundle ≤150KB (measure before/after)
- [ ] **Load time:** Measure time to interactive (TTI) under 2 seconds on 3G
- [ ] **Background asset size:** Verify background images optimized (WebP format, appropriate resolution)
- [ ] **Animation performance:** Monitor CPU/GPU usage during drawer animations

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Firefox (desktop & mobile)
- [ ] Edge (desktop)
- [ ] Samsung Internet (Android)

### User Testing
- [ ] **First impression:** Show to 5 users cold, measure time to first session start (target: ≤2 interactions)
- [ ] **Hierarchy clarity:** Ask users to identify primary element (should be timer)
- [ ] **Mode switcher usability:** Observe if users understand three-mode pattern without explanation
- [ ] **Drawer behavior:** Verify users notice and appreciate auto-hide during sessions

---

## Rollout Plan

### Phase 1: Foundation & Branding (Week 1)
- Replace header with "VTea" branding
- Implement full-bleed background system (gradient or optimized image)
- Add contrast overlay for text readability
- Upgrade timer typography (size, weight, spacing)
- Test background on multiple screen sizes

**Success Checkpoint:** Immersive background loads fast and timer remains clearly readable

### Phase 2: Visual Hierarchy & Controls (Week 2)
- Implement editable focus title above timer
- Build mode switcher component (segmented control pattern)
- Redesign action controls (primary button + compact icons)
- Add fullscreen control
- Ensure all touch targets ≥44×44px

**Success Checkpoint:** Timer is clearly the primary visual element with intuitive controls

### Phase 3: Task Drawer Enhancement (Week 3)
- Implement auto-hide behavior on timer start
- Add task drawer toggle button
- Build "Hide completed tasks" feature
- Add smooth slide animations with reduced-motion support
- Test drawer behavior across devices

**Success Checkpoint:** Task drawer auto-hides during sessions and reduces visual clutter

### Phase 4: Settings & Accessibility Polish (Week 4)
- Enhance settings modal with inline validation
- Add "Reset to defaults" with confirmation
- Implement comprehensive keyboard navigation
- Add screen reader announcements (aria-live)
- Audit and fix all WCAG AA violations
- Test with real screen readers

**Success Checkpoint:** App passes automated accessibility audit and manual keyboard/screen reader testing

### Phase 5: Responsive & Performance (Week 5)
- Optimize background assets (WebP, compression)
- Verify responsive layout at all breakpoints (320px - 1440px+)
- Test on real devices (iOS, Android)
- Measure and optimize bundle size
- Run Lighthouse audits (target: Performance ≥90, Accessibility ≥95)

**Success Checkpoint:** Lighthouse scores meet targets and layout works perfectly on mobile

### Rollback Plan
- **Visual issues:** Revert to MVP styles via feature flag or quick branch merge
- **Performance regression:** Remove background image, fall back to gradient
- **Accessibility regressions:** Disable problematic animations, restore previous focus styles
- **Critical failures:** Full rollback to 001-focus-timer-hub branch styles

---

## Metrics & Success Criteria

### User Experience Metrics
- [ ] **First-time session start:** Users can start a focus session in ≤2 interactions on both mobile and desktop
- [ ] **Timer readability:** 100% of users can read timer display in usability testing (5/5 participants)
- [ ] **Mode switcher clarity:** 90% of users understand three-mode pattern without explanation (9/10 participants)
- [ ] **Task drawer usefulness:** 80% of users notice and appreciate auto-hide behavior (4/5 participants)

### Performance Metrics
- [ ] **Lighthouse Performance:** Score ≥90 on 3G throttled connection (mid-tier device)
- [ ] **Initial load time:** Page interactive in under 2 seconds on 3G
- [ ] **Bundle size:** Total compressed bundle ≤150KB (no regression from MVP target)
- [ ] **Background assets:** Optimized to <80KB for images or use pure CSS gradients

### Accessibility Metrics
- [ ] **Lighthouse Accessibility:** Score ≥95 (target: 100)
- [ ] **WCAG AA compliance:** Zero violations in automated axe-core scan on key screens
- [ ] **Keyboard navigation:** 100% of features accessible via keyboard (manual verification)
- [ ] **Screen reader compatibility:** Full functionality on NVDA, JAWS, VoiceOver, TalkBack
- [ ] **Touch targets:** 100% of interactive elements ≥44×44px on mobile devices
- [ ] **Color contrast:** All text meets WCAG AA ratios (4.5:1 for body, 3:1 for large)

### Responsiveness Metrics
- [ ] **Minimum screen width:** Fully functional at 320px width
- [ ] **Breakpoint testing:** Perfect layout at 320px, 375px, 768px, 1024px, 1440px
- [ ] **Orientation support:** Smooth adaptation on portrait/landscape switch
- [ ] **Safe area handling:** Content respects notches and punch-holes on modern devices

### Behavior Metrics
- [ ] **Auto-hide success:** Task drawer auto-collapses when timer starts 100% of the time
- [ ] **Drawer toggle:** Users can manually reopen drawer during session with single interaction
- [ ] **Settings validation:** Invalid inputs caught with clear error messages 100% of the time
- [ ] **Reset confirmation:** "Reset to defaults" prevents accidental data loss with non-blocking prompt

---

## Open Questions / Risks

| Question | Impact | Resolution |
|----------|--------|------------|
| Should background be static gradient or curated image? | Medium | **Default:** Start with optimized gradient (zero bundle cost), add optional curated image pack later if performance allows. Gradient ensures fast load and consistent branding. |
| What happens to background on very slow connections? | Low | **Strategy:** Use CSS gradient as instant fallback, progressively load image if available. App remains functional with gradient-only. |
| Should inspirational quote rotate daily or be static? | Low | **Default:** Static quote for MVP ("Focus & Chill" tagline). Dynamic quotes require quote library (adds bundle size) - defer to future phase. |
| How should focus title editing work on mobile? | Medium | **Default:** Tap to edit (inline editable text), mobile keyboard appears automatically. Save on blur or Enter key. No modal required. |
| Should task drawer position differ on mobile vs. desktop? | Medium | **Default:** Bottom sheet on mobile (thumb-friendly), side panel on desktop (utilizes horizontal space). Tested in usability rounds. |
| What if user has 50+ tasks and "Hide completed" is off? | Low | **Strategy:** Drawer content is scrollable. Add "Show only active" filter by default. Completed tasks archived after 24 hours in future phase. |
| Should fullscreen mode be browser fullscreen or maximize layout? | Low | **Default:** Browser fullscreen API (true fullscreen). Provides most immersive experience. Fallback to maximized layout if API denied. |

---

## Assumptions

1. **No behavior changes:** Core timer logic, task management, and data persistence remain exactly as in MVP—only visual layer changes
2. **Modern browser support:** Same target as MVP (Chrome 60+, Safari 12+, Firefox 60+) with ES6+ and CSS Grid/Flexbox support
3. **Existing assets reusable:** Current component structure supports visual enhancements without major refactoring
4. **Performance budget:** 150KB gzipped bundle target from MVP still applies; background optimization critical
5. **Single focus session type:** Focus title applies to current session only; no cross-session title persistence needed
6. **Branding flexibility:** "VTea" name and tagline can be updated later; structure supports easy text swap
7. **No new external dependencies:** All UI enhancements use existing styling framework/approach from MVP
8. **Accessibility baseline:** MVP already has basic accessibility; this spec enhances and audits existing patterns
9. **No analytics required:** Success metrics measured via manual testing and Lighthouse audits (no tracking scripts)
10. **English language only:** Inspirational text and UI labels remain English (internationalization deferred)

---

## Out of Scope (Explicitly Deferred)

### Features NOT Included in This Update
- **Background scene switcher:** Multiple curated backgrounds or time-of-day themes
- **Ambient sounds or music:** Audio features deferred to future phase
- **Animations beyond drawer:** No animated timer effects, particle systems, or decorative animations
- **Gamification elements:** No streaks, achievements, or progress badges
- **Advanced analytics:** No weekly/monthly charts, no session history graphs
- **User accounts or sync:** Still local-first, single-device only
- **Custom theme builder:** User cannot customize colors or create themes (predefined theme only)
- **Social features:** No sharing, no leaderboards, no collaborative sessions
- **AI-generated quotes:** Inspirational text is static, not dynamically generated
- **Haptic feedback:** No vibration patterns on mobile (defer until user preference settings exist)

### Technical Constraints
- **No framework changes:** Maintains existing tech stack from MVP (no new libraries for UI)
- **No build process changes:** Optimization within existing bundling setup
- **No new APIs:** No integration with external services (weather, quotes, images)

---

## Appendix: References

- **Constitution:** `.specify/memory/constitution.md`
- **Base MVP Spec:** `specs/001-focus-timer-hub/spec.md`
- **Problem Statement:** See VERSION 1.1 notes at top of this document
- **Design Inspiration:** Flocus, LifeAt (immersive focus apps for Gen Z)
- **Accessibility Standards:** WCAG 2.1 Level AA guidelines
- **Performance Benchmark:** Lighthouse auditing with 3G throttling

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-28 | Initial draft based on UI makeover requirements | AI Spec Generation |
| 1.1 | 2025-10-28 | Enhanced accessibility section, added performance metrics, clarified immersive background strategy | AI Spec Generation |

