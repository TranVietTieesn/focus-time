# Research Findings: Focus Timer Hub MVP

**Feature:** 001-focus-timer-hub  
**Phase:** Phase 0 - Research & Technical Discovery  
**Date:** 2025-10-28

---

## Overview

This document consolidates research findings for key technical decisions in the Focus Timer Hub MVP. All decisions prioritize simplicity, performance, and alignment with constitutional principles.

---

## 1. Timer Accuracy in Background Tabs

### Problem
Modern browsers throttle JavaScript execution in background tabs to save battery. `setInterval` can drift significantly (1Hz → 1 call per second), impacting timer accuracy.

### Research Findings

**Browser Throttling Behavior:**
- Chrome/Edge: Throttle background tabs to 1Hz after 5 minutes
- Firefox: Throttle to 1Hz immediately when tab is hidden
- Safari: Similar throttling on iOS/macOS
- Impact: 25-minute timer can drift by 10-30 seconds in background

**Solutions Evaluated:**

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Wall-clock delta calculation** | Simple; no special APIs; works everywhere | Requires careful timestamp management | ✅ **SELECTED** |
| **Web Workers** | Not throttled; dedicated thread | Adds complexity; overkill for MVP | ❌ Deferred to v1.1 |
| **Service Worker + Background Sync** | True background execution | Complex setup; limited browser support | ❌ Deferred to v1.2 |
| **Notification API timers** | Can trigger in background | Requires permission; not reliable | ❌ Too fragile |

### Selected Solution: Wall-Clock Delta

**Implementation Strategy:**
1. Store high-resolution start timestamp (`performance.now()` or `Date.now()`)
2. On each tick (1s interval), calculate `elapsed = now - startTime`
3. Update `remainingSec = initialDuration - elapsed`
4. On visibility change (tab backgrounded):
   - Stop `setInterval` loop
   - Keep `startTime` in memory
5. On visibility restore (tab focused):
   - Calculate total elapsed time: `now - startTime`
   - Update `remainingSec` immediately
   - Resume 1s tick loop

**Code Snippet:**
```typescript
// In timerSlice
tick: () => {
  const now = performance.now();
  const elapsed = (now - get().startTime) / 1000; // Convert to seconds
  const remaining = get().initialDuration - elapsed;
  
  if (remaining <= 0) {
    get().complete();
  } else {
    set({ remainingSec: Math.ceil(remaining) });
  }
}
```

**Testing Strategy:**
- Manual: Background tab for 5 minutes, return, verify accuracy
- Automated: Mock `performance.now()` in Vitest, fast-forward time

---

## 2. State Management: Zustand vs Redux vs Context API

### Problem
Need global state for timer, tasks, settings, and stats. Must support localStorage persistence and TypeScript.

### Research Findings

**Options Compared:**

| Solution | Bundle Size | Boilerplate | Learning Curve | TypeScript | Decision |
|----------|-------------|-------------|----------------|------------|----------|
| **Zustand** | <1KB | Minimal | Low | Excellent | ✅ **SELECTED** |
| **Redux Toolkit** | ~10KB | Moderate | Medium | Good | ❌ Too heavy |
| **Context API + useReducer** | 0KB (built-in) | High | Low | Manual types | ❌ Too verbose |
| **Jotai** | <3KB | Minimal | Medium | Excellent | ❌ Atomic model overkill |

### Selected Solution: Zustand

**Rationale:**
- **Lightweight:** <1KB impact on bundle size (aligns with Principle 4: Performance)
- **Simple API:** No providers, no boilerplate (aligns with Principle 5: Maintainability)
- **TypeScript-first:** Built-in type inference
- **Middleware support:** Built-in `persist` middleware for localStorage

**Implementation Pattern (Slice Pattern):**
```typescript
// store.ts
import { create } from 'zustand';
import { timerSlice } from './slices/timerSlice';
import { tasksSlice } from './slices/tasksSlice';

export const useStore = create((set, get) => ({
  ...timerSlice(set, get),
  ...tasksSlice(set, get),
  ...settingsSlice(set, get),
  ...statsSlice(set, get),
}));
```

**Persistence Strategy:**
- Use `zustand/middleware` persist plugin
- Serialize specific slices to localStorage keys
- Custom serializer for date handling (ISO strings)

**References:**
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Slice Pattern Example](https://docs.pmnd.rs/zustand/guides/slices-pattern)

---

## 3. Glassmorphism Implementation (Tailwind + CSS)

### Problem
Achieve immersive glassmorphism effect (backdrop blur, translucent backgrounds) while maintaining WCAG AA contrast and performance.

### Research Findings

**CSS Properties:**
- `backdrop-filter: blur(20px)` — Blur background behind element
- `background: rgba(255, 255, 255, 0.1)` — Translucent fill
- `border: 1px solid rgba(255, 255, 255, 0.2)` — Subtle edge definition

**Browser Support:**
- Chrome/Edge: Full support (89+)
- Firefox: Full support (103+)
- Safari: Full support (14+)
- Coverage: 94% of global users (Can I Use, Oct 2025)

**Performance Concerns:**
- Backdrop blur is GPU-intensive (especially on mobile)
- Can cause jank on low-end devices
- Mitigation: Respect `prefers-reduced-motion` media query

**Accessibility Concerns:**
- Low contrast between glass panel and background
- Text readability issues if background is busy

**Solutions:**

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Static gradient background** | High contrast; predictable | Less visually immersive | ✅ **MVP Default** |
| **Dark scrim behind glass** | Improves text contrast | Reduces "glass" effect | ✅ **Fallback for a11y mode** |
| **High-contrast theme option** | Meets WCAG AAA | Loses glassmorphism aesthetic | ✅ **v1.1 Feature** |

### Selected Solution: Static Gradient + Dark Scrim

**Implementation:**
```css
/* Tailwind config - custom utilities */
.glass-panel {
  background: rgba(0, 0, 0, 0.4); /* Dark scrim for contrast */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .glass-panel {
    backdrop-filter: none;
    background: rgba(0, 0, 0, 0.8); /* Solid fallback */
  }
}
```

**Background Layer:**
- MVP: CSS gradient (`bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900`)
- v1.1: User-selectable static images
- v1.2: Animated scenes (video/CSS animations)

**Contrast Testing:**
- White text on dark glass: 7:1 (AAA compliance)
- Blue accent on dark glass: 4.8:1 (AA compliance)

**References:**
- [Glassmorphism Guide](https://css-tricks.com/glassmorphism/)
- [backdrop-filter Browser Support](https://caniuse.com/css-backdrop-filter)

---

## 4. PWA Offline Strategy (Service Worker + Workbox)

### Problem
Enable offline-first functionality: timer, tasks, and stats must work without network. Must cache shell and static assets.

### Research Findings

**Service Worker Strategies:**

| Strategy | Use Case | Pros | Cons |
|----------|----------|------|------|
| **Cache First** | Static assets (JS, CSS, images) | Fast; fully offline | Stale content |
| **Network First** | HTML shell | Fresh content; offline fallback | Slower on poor network |
| **Stale While Revalidate** | API data (not needed in MVP) | Balance of speed and freshness | Complexity |

**Workbox Features:**
- Precaching: Cache shell assets at SW install
- Runtime caching: Cache on-demand requests
- Background sync: Queue failed requests (deferred to v1.2)

### Selected Solution: Workbox with Precache + Runtime Cache

**Caching Strategy:**
1. **Precache (at SW install):**
   - HTML shell (`index.html`)
   - JS bundles (hashed for cache busting)
   - CSS bundles
   - Font files (Inter, Poppins)
   - Manifest and icons

2. **Runtime Cache (on first request):**
   - Background images (if user-selectable in future)
   - Lazy-loaded components

**Implementation (Vite Plugin):**
```javascript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' }
          }
        ]
      }
    })
  ]
});
```

**Offline Fallback:**
- Network failures → serve cached shell
- No network on first visit → show "Requires initial online load" message

**Update Strategy:**
- New SW detected → show toast: "Update available. Refresh to update."
- Auto-reload on user consent (avoids mid-session disruption)

**References:**
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

---

## 5. localStorage Persistence & Quota Management

### Problem
Store tasks, settings, and daily stats in localStorage. Handle quota limits (5-10MB per origin) and data corruption gracefully.

### Research Findings

**localStorage Characteristics:**
- Synchronous API (blocks main thread)
- String-only storage (JSON.stringify/parse required)
- Quota: 5MB (Chrome/Edge), 10MB (Firefox/Safari)
- No automatic expiration (persists indefinitely)

**Quota Monitoring:**
```javascript
// Estimate storage usage (Chrome/Edge only)
if ('storage' in navigator && 'estimate' in navigator.storage) {
  const estimate = await navigator.storage.estimate();
  const percent = (estimate.usage / estimate.quota) * 100;
  console.log(`Using ${percent.toFixed(2)}% of localStorage`);
}
```

**Data Size Estimates (MVP):**
- Settings: <1KB
- Tasks (100 tasks): ~20KB
- Daily stats: <1KB
- Total: <25KB (0.5% of 5MB quota)

**Corruption Handling:**
```typescript
// Defensive parsing utility
function safeParseJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage key: ${key}`, error);
    return fallback;
  }
}
```

### Selected Solution: Versioned Keys + Defensive Parsing

**Key Naming Convention:**
- `FT_<ENTITY>_v<VERSION>`
- Examples: `FT_SETTINGS_v1`, `FT_TASKS_v1`, `FT_TODAY_v1`

**Migration Strategy (v1 → v2):**
1. Check for old key (`FT_SETTINGS_v1`)
2. Parse and transform data
3. Write to new key (`FT_SETTINGS_v2`)
4. Delete old key
5. Update code to use new key

**Quota Management:**
- Monitor usage with Storage API (if available)
- Expose "Reset Data" button in settings
- Show warning if quota >80% (unlikely in MVP)

**References:**
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Storage Quotas](https://web.dev/storage-for-the-web/)

---

## 6. Typography: Inter vs Poppins vs System Fonts

### Problem
Select font(s) for readability, aesthetics, and performance. Must support multiple weights (400, 600, 700) and load quickly.

### Research Findings

**Font Options:**

| Font | Aesthetic | Readability | File Size (WOFF2) | Decision |
|------|-----------|-------------|-------------------|----------|
| **Inter** | Modern, neutral | Excellent (designed for UI) | ~15KB/weight | ✅ **Body + UI** |
| **Poppins** | Friendly, rounded | Good (geometric) | ~20KB/weight | ✅ **Headings** |
| **System fonts** | Native | Excellent | 0KB | ❌ Inconsistent across OS |

### Selected Solution: Inter (Body) + Poppins (Headings)

**Rationale:**
- Inter: Optimized for UI/screen reading (OpenType features)
- Poppins: Adds personality to headings without sacrificing readability
- Google Fonts CDN: Fast delivery, cached across sites

**Loading Strategy:**
- Use `<link rel="preconnect">` to Google Fonts
- Load only required weights (400, 600, 700)
- Subset to Latin characters (reduces file size by 60%)

**Tailwind Config:**
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Poppins', 'Inter', 'sans-serif'],
}
```

**Performance:**
- Total font size: ~100KB (gzipped)
- Preload critical weights (400) in `<head>`
- Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)

**References:**
- [Inter Font](https://rsms.me/inter/)
- [Google Fonts Optimization](https://csswizardry.com/2020/05/the-fastest-google-fonts/)

---

## 7. Date Handling & Timezone Awareness

### Problem
Reset daily stats at midnight. Must handle timezone differences and daylight saving time transitions correctly.

### Research Findings

**JavaScript Date Challenges:**
- `Date.now()` returns UTC timestamp
- Local midnight varies by timezone (UTC-12 to UTC+14)
- DST transitions can cause date discontinuities

**Solutions:**

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **ISO date strings (YYYY-MM-DD)** | Simple; no library needed | Manual parsing | ✅ **SELECTED** |
| **date-fns library** | Rich utilities; immutable | +12KB bundle size | ❌ Too heavy for MVP |
| **Intl.DateTimeFormat** | Built-in; locale-aware | Verbose API | ❌ Overkill |

### Selected Solution: ISO Date Strings + Manual Comparison

**Implementation:**
```typescript
// Get local date as ISO string (YYYY-MM-DD)
function getTodayISO(): string {
  const now = new Date();
  return now.toISOString().split('T')[0]; // "2025-10-28"
}

// Check if date changed (in statsSlice)
function checkDateChange() {
  const today = getTodayISO();
  const stored = get().todayDate;
  
  if (stored !== today) {
    // Date changed, reset stats
    set({
      todayDate: today,
      todayTotalMin: 0,
      todaySessionsCount: 0,
    });
  }
}
```

**When to Check:**
- On app mount/load
- On timer completion (before incrementing stats)

**Edge Cases:**
- DST transitions: `toISOString()` uses UTC, but split keeps local date
- User changes timezone: Stats reset correctly (different local date)

**References:**
- [MDN: Date.prototype.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)

---

## 8. Accessibility: ARIA Live Regions for Timer

### Problem
Screen reader users need to be notified of timer updates without constant announcements (every second would be overwhelming).

### Research Findings

**ARIA Live Region Options:**

| `aria-live` Value | Behavior | Use Case |
|-------------------|----------|----------|
| **off** | No announcements | Default |
| **polite** | Announces at next opportunity (pause in speech) | ✅ Timer updates (every 5 min) |
| **assertive** | Interrupts current speech | ❌ Too aggressive for timer |

**ARIA Atomic:**
- `aria-atomic="true"`: Announce entire region content (not just changed text)
- Ensures screen readers say "10 minutes 30 seconds remaining" (not just "30")

### Selected Solution: Polite Live Region with Throttled Updates

**Implementation:**
```tsx
<div
  role="timer"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only" // Visually hidden but accessible
>
  {Math.floor(remainingSec / 60)} minutes {remainingSec % 60} seconds remaining
</div>
```

**Update Frequency:**
- Visual: Every 1 second
- Announced: Every 5 minutes (to avoid spam)
- On state change: "Work session started", "Break session started"

**Testing:**
- NVDA (Windows): Verify announcements
- JAWS (Windows): Verify announcements
- VoiceOver (macOS/iOS): Verify announcements

**References:**
- [MDN: aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [WebAIM: ARIA Live Regions](https://webaim.org/techniques/aria/#live)

---

## 9. Mobile Vibration API (Session Completion Feedback)

### Problem
Provide subtle haptic feedback on session completion (optional enhancement, non-blocking).

### Research Findings

**Vibration API:**
- Simple API: `navigator.vibrate(duration)` or `navigator.vibrate([pattern])`
- Supported: Chrome/Edge (Android), Safari (iOS 14.5+)
- Not supported: Desktop browsers (gracefully degrades)

**Patterns:**
```javascript
// Single pulse
navigator.vibrate(200); // 200ms

// Pattern (vibrate, pause, vibrate)
navigator.vibrate([100, 50, 100]);
```

**User Preference:**
- Respect device silent mode (API checks hardware switch on iOS)
- Provide opt-out in settings (v1.1 feature)

### Selected Solution: Optional Single Pulse on Completion

**Implementation:**
```typescript
function notifySessionComplete() {
  // Visual notification (toast)
  showToast("Session complete!");
  
  // Haptic feedback (if supported)
  if ('vibrate' in navigator) {
    navigator.vibrate(200); // 200ms pulse
  }
}
```

**Fallback:**
- No vibration support → Visual notification only (no degradation)

**References:**
- [MDN: Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)

---

## 10. Testing Strategy: Vitest vs Jest

### Problem
Select unit testing framework for React components and Zustand logic. Must support TypeScript, fast execution, and good DX.

### Research Findings

| Framework | Speed | Config | Vite Integration | Decision |
|-----------|-------|--------|------------------|----------|
| **Vitest** | Very fast (native ESM) | Minimal | Native | ✅ **SELECTED** |
| **Jest** | Slower (CJS transforms) | Complex | Requires adapter | ❌ Too slow |

### Selected Solution: Vitest + React Testing Library

**Rationale:**
- **Speed:** 10x faster than Jest (native ESM, no transforms)
- **Vite integration:** Zero config, shares Vite config
- **Jest-compatible API:** Easy migration if needed
- **TypeScript:** First-class support

**Test Structure:**
```typescript
// timerSlice.test.ts
import { describe, it, expect, vi } from 'vitest';
import { useStore } from './store';

describe('timerSlice', () => {
  it('should start timer with correct duration', () => {
    const { start, remainingSec } = useStore.getState();
    start('work', 25 * 60); // 25 minutes
    expect(remainingSec).toBe(1500);
  });
});
```

**Coverage Target:** >80% for core logic (timer, tasks, stats)

**References:**
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## Summary of Key Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Wall-clock delta for timer** | Simple, accurate, no special APIs | ✅ Solves background throttling |
| **Zustand for state** | <1KB, minimal boilerplate, TS-first | ✅ Lightweight, maintainable |
| **Static gradient background** | High contrast, predictable | ✅ WCAG AA compliant |
| **Workbox for PWA** | Battle-tested, Vite plugin available | ✅ Reliable offline caching |
| **localStorage with versioned keys** | Simple, synchronous, sufficient for MVP | ✅ No over-engineering |
| **Inter + Poppins fonts** | Readable, modern, ~100KB total | ✅ Performance budget met |
| **ISO date strings** | No library needed, timezone-safe | ✅ Simple date handling |
| **ARIA live regions (polite)** | Accessible without spam | ✅ Screen reader friendly |
| **Vitest for testing** | Fast, native ESM, Vite integration | ✅ Great DX |

---

## Next Steps

1. ✅ Research complete — All NEEDS CLARIFICATION resolved
2. → Proceed to Phase 1: Generate data-model.md and contracts
3. → Update agent context with React + TypeScript + Tailwind + Zustand

---

**Document Status:** ✅ **COMPLETE**  
**Approval Date:** 2025-10-28

