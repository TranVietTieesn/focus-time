# Action Controls Enhancement Implementation Plan

**Project:** Focus Timer Hub  
**Spec ID:** 003-action-controls  
**Plan Version:** 1.0  
**Created:** 2025-10-28

---

## Objective

Implement restart and fullscreen action controls with visual affordances and keyboard shortcuts to enable users to quickly manage focus sessions without intrusive interruptions. This completes the Flocus-inspired UI with single-interaction access to critical session management features.

---

## Constitution Alignment

### Applicable Principles

- [X] **Principle 1: Focus-first Experience** 
  - Single-click restart and fullscreen (minimal interaction)
  - No confirmation modals or interruptions
  - Fullscreen eliminates browser chrome distractions
  - ✅ Aligned
  
- [X] **Principle 2: Simple and Consistent UI**
  - Uses existing VTea design tokens and color system
  - Icon-based buttons with clear visual hierarchy
  - Consistent with segmented mode switcher pattern
  - ✅ Aligned
  
- [X] **Principle 3: Accessibility and Mobile-first**
  - All buttons ≥44×44px touch targets
  - Full keyboard navigation (Tab, Enter, R, F, ESC)
  - Screen reader announcements (aria-label, aria-pressed)
  - WCAG AA color contrast verified
  - ✅ Aligned
  
- [X] **Principle 4: Lightweight Performance**
  - No new external dependencies (native Fullscreen API)
  - Icons inline SVG or optimized assets
  - CSS-only animations, respects prefers-reduced-motion
  - Bundle size impact: <5 KB
  - ✅ Aligned
  
- [X] **Principle 5: Clear and Maintainable Development Workflow**
  - Phased implementation (4 phases, clear milestones)
  - Components isolated in FocusCard, reusable patterns
  - Test coverage for each phase
  - ✅ Aligned
  
- [X] **Principle 6: Local-first Secure Data Handling**
  - No data transmission; purely UI enhancement
  - Fullscreen state session-only (not persisted)
  - No analytics or tracking
  - ✅ Aligned

---

## Technical Context

### Tech Baseline (from VTea UI Makeover)

- **Frontend Stack:** React 18.3.1, TypeScript 5.9.3, Tailwind CSS 3.4.18
- **State Management:** Zustand (timerSlice)
- **Design System:** 
  - Colors: Primary #4B6BFB, Secondary #FF89BB, Success #10B981
  - Typography: Inter 400/600/700
  - Glass morphism: bg-white/10, backdrop-blur-16px
  - Touch targets: ≥44×44px
  - Focus outlines: 2px with ≥3:1 contrast
- **Accessibility:** WCAG AA (Lighthouse ≥95)
- **Performance:** <150 KB gzipped bundle (currently ~59 KB)

### Architecture

**Component Hierarchy:**
```
App
└── FocusCard (main container)
    ├── FocusTitle (inline editable)
    ├── ModeSwitcher (segmented control)
    ├── TimerDisplay (large typography)
    └── ActionControls (NEW)
        ├── PrimaryButton (Start/Pause/Resume)
        ├── RestartButton (NEW - icon)
        └── FullscreenButton (NEW - icon)
```

**Data Flow:**
- Timer state: Zustand `timerSlice` (remainingSec, type, status)
- Restart action: `resetTimer()` → idle state, reload duration
- Fullscreen state: Local React state
- Keyboard shortcuts: Window-level keydown listener

---

## Scope

### In Scope
1. Restart button (circular arrow icon)
2. Fullscreen button (expand icon)
3. Visual indicators (pencil on title)
4. Keyboard shortcuts (R, F keys)
5. Full accessibility (WCAG AA)

### Out of Scope
- Customizable keyboard shortcuts
- Restart confirmation modal
- Fullscreen preference persistence
- Additional action buttons

---

## Implementation Phases

### Phase 1: Restart Button (1-2 days)
- [ ] T301: Create RestartButton component
- [ ] T302: Implement timer reset logic
- [ ] T303: Add R key handler
- [ ] T304: ARIA labels and tooltip
- [ ] T305: Styling and animations
- [ ] T306: Testing

### Phase 2: Fullscreen Button (1-2 days)
- [ ] T307: Create FullscreenButton component
- [ ] T308: Fullscreen API integration
- [ ] T309: F key handler and ESC exit
- [ ] T310: Browser compatibility check
- [ ] T311: ARIA attributes
- [ ] T312: Testing

### Phase 3: Visual Polish (1 day)
- [ ] T313: Pencil icon on title
- [ ] T314: Button hover/active animations
- [ ] T315: Spacing and alignment
- [ ] T316: Visual regression testing

### Phase 4: Accessibility Audit (1 day)
- [ ] T317: Keyboard navigation flow
- [ ] T318: Screen reader testing
- [ ] T319: Color contrast verification
- [ ] T320: Touch target validation
- [ ] T321: Fix any A11y issues

---

## Key Milestones

| Milestone | Target Date | Duration | Status |
|-----------|-------------|----------|--------|
| Phase 1: Restart Button | 2025-10-30 | 2 days | Pending |
| Phase 2: Fullscreen Button | 2025-11-01 | 2 days | Pending |
| Phase 3: Visual Polish | 2025-11-02 | 1 day | Pending |
| Phase 4: A11y Audit | 2025-11-03 | 1 day | Pending |
| **Total Estimated Duration** | **2025-11-03** | **~1 week** | **On Track** |

---

## Success Metrics

- [ ] Users restart sessions in ≤1 interaction
- [ ] Zero WCAG AA violations
- [ ] All buttons have ≥44×44px touch targets
- [ ] Keyboard shortcuts work in all states
- [ ] Bundle size <65 KB gzipped
- [ ] Lighthouse Accessibility ≥95

---

## Dependencies & Risks

### External Dependencies
- Native Fullscreen API (graceful degradation)
- Zustand timer state (existing)

### Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Fullscreen unavailable (iOS Safari) | Medium | Hide button with tooltip; test early |
| Keyboard shortcut conflicts | Low | Verify R/F don't conflict with browser |
| Restart causes state issues | Medium | Comprehensive testing in Phase 1 |
| A11y regression | Medium | Run axe-core in Phase 4 |

---

## Next Steps

1. **Approve Plan**
2. **Begin Phase 1: Restart Button**
3. **Complete each phase with testing**
4. **Final accessibility audit**
5. **Merge to main**
