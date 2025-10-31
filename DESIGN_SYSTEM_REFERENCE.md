# VTea Design System Reference — Visual Priority & Z-Stacking

**Version:** 1.0  
**Last Updated:** 2025-10-31  
**Purpose:** Developer guide for maintaining immersive layout standards

---

## Visual Priority Classification

Every component must declare its Visual Priority in JSDoc comments. This ensures clear hierarchy and prevents visual competition.

### **PRIMARY** (Unmissable, Dominant)
**Characteristics:**
- Largest font size / highest contrast
- Center-aligned or most prominent position
- No competing visual elements should approach this scale
- Examples: Timer display, primary action buttons (Start/Pause)

**Components:**
- `FocusCard` — timer container (z-10)
- `FocusTitle` — session title (z-10)
- Primary action button (Start/Pause/Resume) — z-10

**Code Template:**
```tsx
/**
 * MyComponent - Description
 * Visual Priority: PRIMARY (unmissable anchor element)
 */
```

### **SECONDARY** (Supporting, Clear)
**Characteristics:**
- Medium contrast / moderate size
- Directly beneath or beside primary element
- Clear relationship to primary element
- Supports user decision-making without distraction

**Components:**
- `ModeSwitcher` — mode selection (z-10)
- `RestartButton` — compact restart icon (z-10)
- `FullscreenButton` — compact fullscreen toggle (z-10)
- Break action buttons (z-10)

**Code Template:**
```tsx
/**
 * MyComponent - Description
 * Visual Priority: SECONDARY (supporting element, below primary)
 */
```

### **TERTIARY** (Background, Non-Intrusive)
**Characteristics:**
- Low contrast / small size
- Floating in background or absolute-positioned
- Does not interfere with primary interaction
- Optional visual enhancement

**Components:**
- `BrandingHeader` — "VTea" logo + tagline (z-30)
- `InspirationalQuote` — floating quote (z-20)
- `BackgroundLayer` — gradient + overlay (z-0)
- Settings/Tasks buttons in header (z-30)

**Code Template:**
```tsx
/**
 * MyComponent - Description
 * Visual Priority: TERTIARY (background/floating element)
 */
```

---

## Z-Stacking Hierarchy

The app uses a strict 7-layer z-stacking system to maintain clear visual depth and interaction ordering.

### **z-0: Immersive Background**
- CSS gradient foundation (radial + linear)
- Dark overlay (40–60% opacity)
- Optional progressive WebP image (≤80KB)
- **Fixed to viewport**, does not scroll
- **Should never be clicked/interactive**

**Example:**
```tsx
<div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
  {/* Background gradient + overlay */}
</div>
```

### **z-10: Main Content Area**
- Centered flex container: `fixed inset-0 flex flex-col items-center justify-center`
- Contains: Timer, Focus Title, Mode Switcher, Action Controls
- All PRIMARY elements live here
- Users spend 100% of focus time viewing this layer

**Example:**
```tsx
<main className="fixed inset-0 flex flex-col items-center justify-center z-10">
  <FocusCard /> {/* PRIMARY: timer + controls */}
</main>
```

### **z-20: Floating Secondary Elements**
- `InspirationalQuote` — top-right, desktop only
- Supporting text and subtle visual enhancement
- Does not obstruct main content
- **Respects safe areas on notched devices**

**Example:**
```tsx
<div className="absolute top-12 right-6 z-20">
  Your thoughts deserve a calm place.
</div>
```

### **z-25: Task Drawer (Overlay)**
- Side sheet (desktop: left, mobile: bottom)
- Slides over main content on demand
- Sits above main content but below modals
- Auto-hides during active session
- **Should include a scrim/backdrop if open**

**Example:**
```tsx
<aside className="fixed left-0 top-0 bottom-0 z-25 w-72">
  {/* Task list content */}
</aside>
```

### **z-30: Floating Headers & Controls**
- `BrandingHeader` — absolute positioned top-left/right
- Settings button, Tasks toggle button
- Always visible, non-blocking
- Uses hover states for affordance
- **Small touch targets (32px icon + 44px touch area)**

**Example:**
```tsx
<div className="absolute top-4 left-4 z-30 flex gap-2">
  <h1>VTea</h1>
  <span>focus & chill</span>
</div>
```

### **z-50: Modal Dialogs & Full Overlays**
- `SettingsModal` — centered dialog with backdrop
- `ResumeSessionPrompt` — session recovery dialog
- Blocks interaction with lower layers
- **Implements focus trap (Tab cycles within modal)**
- **ESC key closes modal and returns focus to trigger**

**Example:**
```tsx
{isSettingsOpen && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <SettingsModal /> {/* Modal content */}
  </div>
)}
```

---

## Complete Z-Stacking Reference

```
Layer  z-Index  Component                    Fixed/Absolute   Interactive
────────────────────────────────────────────────────────────────────────────
Back   z-0      BackgroundLayer             Fixed (inset-0)  No
       z-10     Main (Timer + Controls)     Fixed (inset-0)  Yes
       z-20     InspirationalQuote          Absolute         No
       z-25     TaskDrawer                  Fixed/Absolute   Yes
Front  z-30     BrandingHeader + Buttons    Absolute         Yes
       z-50     Modals (Settings, Resume)   Fixed (inset-0)  Yes
```

---

## Component Reference Table

| Component | Priority | Z-Index | Position | Size | Opacity | Interaction |
|-----------|----------|---------|----------|------|---------|-------------|
| BackgroundLayer | TERTIARY | z-0 | fixed inset-0 | 100vw×100vh | 40–60% | No |
| FocusCard (timer) | PRIMARY | z-10 | flex center | 90–120px | 100% | Yes (display) |
| FocusTitle | PRIMARY | z-10 | flex center | 24–32px | 90% | Yes (edit) |
| ModeSwitcher | SECONDARY | z-10 | flex center | 44px min-h | 100% | Yes (select) |
| RestartButton | SECONDARY | z-10 | flex center | 44px | 80% | Yes |
| FullscreenButton | SECONDARY | z-10 | flex center | 44px | 80% | Yes |
| BrandingHeader | TERTIARY | z-30 | absolute TL/TR | 20–24px | 90%/70% | Yes (buttons) |
| InspirationalQuote | TERTIARY | z-20 | absolute TR | 14px | 60% | No |
| TaskDrawer | SECONDARY | z-25 | fixed/absolute | 288px (72×4) | 100% | Yes |
| SettingsModal | SECONDARY | z-50 | fixed center | 448px max-w | 100% | Yes |
| ResumePrompt | SECONDARY | z-50 | fixed center | 448px max-w | 100% | Yes |

---

## Color System by Visual Priority

### **PRIMARY Text (Timer, Focus Title)**
- Color: white 100% opacity (`rgba(255, 255, 255, 1.0)`)
- Contrast: 4.5:1 against dark overlay
- Font: Inter 700 (timer), 600 (title)
- Use case: Unmissable content that must be readable in all lighting

### **SECONDARY Text (Mode labels, Button labels)**
- Color: white 90% opacity (`rgba(255, 255, 255, 0.9)`)
- Contrast: 4.5:1 against dark overlay
- Font: Inter 600 (labels), 400 (descriptions)
- Use case: Interactive elements and supporting text

### **TERTIARY Text (Branding, Quote, Hints)**
- Color: white 70% opacity (`rgba(255, 255, 255, 0.7)`)
- Contrast: 4.5:1 against dark overlay (WCAG AA body text minimum)
- Font: Inter 400 (regular), 600 (branding)
- Use case: Floating elements, secondary information

### **HELPER Text (Timestamps, Validation)**
- Color: white 50% opacity (`rgba(255, 255, 255, 0.5)`)
- Contrast: 3:1 against dark overlay (large text minimum)
- Font: Inter 400, 12–14px
- Use case: Non-critical information, placeholders

---

## Typography System

### **Font Family**
- **All text:** Inter (sans-serif)
- **Fallback:** system-ui, sans-serif
- **Load strategy:** font-display: swap (non-blocking)
- **Weights loaded:** 400 (Regular), 600 (Semi-Bold), 700 (Bold)

### **Font Sizes by Context**

| Context | Mobile | Desktop | Font Weight | Line Height |
|---------|--------|---------|-------------|------------|
| Timer | ≥90px | ≥120px | 700 | 1.0 |
| Focus Title | 24px | 32px | 600 | 1.2 |
| Mode Label | 14px | 16px | 600 | 1.2 |
| Button Text | 14px | 16px | 600 | 1.2 |
| Body/Description | 14px | 16px | 400 | 1.5 |
| Branding (VTea) | 18px | 22px | 600 | 1.2 |
| Tagline | 12px | 14px | 400 | 1.2 |
| Quote | 12px | 14px | 400 italic | 1.6 |
| Helper/Hint | 12px | 14px | 400 | 1.5 |

### **Letter Spacing**
- **Timer:** -0.02em (tight numerals)
- **All other text:** 0 (default)

---

## State Styling Rules

### **Active States**
- Mode button: Filled with mode color (#4B6BFB, #FF89BB, #10B981)
- Button text: white 100% opacity
- Other elements: slight opacity increase

### **Hover States** (Desktop)
- Interactive elements: +10% opacity or slight color lighten
- Transitions: 150–200ms ease-out
- **Respect reduced-motion:** disable on `prefers-reduced-motion: reduce`

### **Disabled States**
- Opacity: 40–50% of base color
- Cursor: `not-allowed`
- Example: Mode switcher disabled during active session

### **Focus States** (Keyboard)
- Focus ring: 2px solid white at 80% opacity
- Offset: 2px from element edge
- Contrast: ≥3:1 against background
- Animation: None (instant state change respects reduced-motion)

---

## Performance Constraints by Layer

### **z-0 (Background)**
- CSS gradient: **0ms render time** (instant)
- Optional image: **≤80KB compressed**
- Total background assets: **≤80KB gzipped**

### **z-10 (Main Content)**
- Flex layout render: **<4ms** (60fps = 16.67ms budget)
- Timer digit rendering: **sub-ms** (tabular-nums + font-weight: 700)
- Touch target sizing: **calculated client-side** (<1ms)

### **z-20 & z-30 (Floating Elements)**
- Absolute positioning: **sub-ms** (no layout recalc)
- Text rendering: **inherited from base typography**

### **z-25 & z-50 (Overlays)**
- Drawer animation: **300ms slide** (optional; instant if reduced-motion)
- Modal backdrop: **instant opacity change**
- Focus trap management: **event-listener only** (<1ms)

### **Overall Bundle Budget**
- Total JS gzipped: **≤150KB** (must not regress from MVP)
- CSS (Tailwind output): **included in total**
- Fonts (Inter subset): **~20–30KB** (already budgeted)

---

## Accessibility Checklist by Layer

### **z-0 (Background)**
- ✅ Does not contain focusable elements
- ✅ Marked `aria-hidden="true"` if decorative

### **z-10 (Main Content)**
- ✅ Timer role: `role="timer"` + `aria-live="polite"` + `aria-atomic="true"`
- ✅ All buttons have descriptive labels (text or aria-label)
- ✅ Focus indicators visible (2px white ring, 2px offset)
- ✅ Keyboard accessible: Tab order top-to-bottom, left-to-right

### **z-20 & z-30 (Floating Elements)**
- ✅ Floating branding: not focusable or low in tab order
- ✅ Control buttons: aria-label + visible focus ring
- ✅ Quote: aria-hidden="true" (decorative)

### **z-25 (Task Drawer)**
- ✅ Focus trap: Tab cycles within drawer when open
- ✅ Close button: ESC key + focus return to trigger
- ✅ Landmark: `<aside role="complementary">` or similar

### **z-50 (Modals)**
- ✅ Focus trap: Tab/Shift+Tab cycles within modal
- ✅ Backdrop: `aria-hidden="true"` to prevent screen reader interaction
- ✅ Close behavior: ESC returns focus to trigger button
- ✅ Announcement: aria-label on modal + aria-modal="true"

---

## Common Mistakes to Avoid

### ❌ **Visual Priority Errors**
- Timer text smaller than mode switcher
- Multiple elements competing for visual dominance
- Tertiary elements using primary opacity (>80%)

### ❌ **Z-Stacking Violations**
- Task drawer using z-40 instead of z-25
- Modal appearing behind drawer or other content
- Background layer with z-index > 0

### ❌ **Typography Inconsistency**
- Using Poppins instead of Inter for any UI text
- Letter-spacing added to body text (should be 0)
- Line-height not matching spec (1.0/1.2/1.5 only)

### ❌ **Accessibility Failures**
- Color-only state indication (no text or icon change)
- Focus ring below 2px or lower than 3:1 contrast
- Modal without focus trap (Tab cycles out of modal)
- Icon buttons without aria-label

### ❌ **Performance Regressions**
- Animated background gradient (use static CSS)
- Multiple WebP images instead of one ≤80KB
- Large unoptimized typography files
- Layout calculations during rapid scroll/animation

---

## Implementation Example

```tsx
/**
 * ExampleComponent - Demo timer display
 * Visual Priority: PRIMARY (dominant visual anchor)
 */

export function ExampleComponent() {
  return (
    <div className="text-center flex flex-col items-center">
      {/* PRIMARY: Timer display */}
      <div
        className="text-timer-desktop font-bold tabular-nums"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          color: 'rgba(255, 255, 255, 1.0)',
        }}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        25:00
      </div>

      {/* SECONDARY: Mode switcher below */}
      <div className="mt-8" role="group" aria-label="Session type">
        {/* Mode buttons go here */}
      </div>
    </div>
  );
}
```

---

## Summary

**Visual Priority** ensures components know their role and don't fight for attention.  
**Z-Stacking** creates depth and interaction order.  
Together, they enforce immersive, distraction-free design at every level.

Use this guide when:
- Creating new components
- Reviewing pull requests
- Debugging visual hierarchy issues
- Ensuring accessibility compliance
- Optimizing performance

---

**Reference Guide Complete** ✨
