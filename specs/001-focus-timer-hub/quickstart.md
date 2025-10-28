# Quick Start Guide: Focus Timer Hub MVP

**Feature:** 001-focus-timer-hub  
**Version:** 1.0  
**Date:** 2025-10-28

---

## Overview

This guide helps developers set up and start building the Focus Timer Hub MVP. Follow these steps to initialize the project, understand the architecture, and begin implementing features.

---

## Prerequisites

**Required:**
- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- Git
- Modern code editor (VS Code recommended)

**Recommended VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier

---

## Project Initialization

### Step 1: Create Vite Project

```bash
# Create new Vite project with React + TypeScript template
npm create vite@latest focus-timer-hub -- --template react-ts

cd focus-timer-hub
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install zustand uuid

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Development tools
npm install -D @types/uuid
npm install -D eslint prettier eslint-config-prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @vitejs/plugin-react

# PWA support (Phase 6)
npm install -D vite-plugin-pwa workbox-window
```

### Step 3: Configure Tailwind CSS

**`tailwind.config.js`**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4B6BFB',
          dark: '#3A56E0',
          light: '#6B8AFF',
        },
        secondary: {
          DEFAULT: '#FF89BB',
          dark: '#FF6BA3',
          light: '#FFA8CC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**`src/index.css`**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-panel {
    @apply bg-black/40 backdrop-blur-xl border border-white/15;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .glass-panel {
      @apply backdrop-blur-none bg-black/80;
    }
  }
}
```

### Step 4: Project Structure

Create the following directory structure:

```
src/
├── components/          # React components
│   ├── timer/          # Timer-related components
│   ├── tasks/          # Task management components
│   ├── layout/         # Layout components (TopBar, DailyBar)
│   └── ui/             # Reusable UI components (Button, Modal, etc.)
├── store/              # Zustand store
│   ├── slices/         # Store slices
│   │   ├── timerSlice.ts
│   │   ├── tasksSlice.ts
│   │   ├── settingsSlice.ts
│   │   └── statsSlice.ts
│   └── index.ts        # Combined store
├── types/              # TypeScript types
│   └── index.ts        # Core types (copy from contracts/)
├── utils/              # Utility functions
│   ├── validation.ts   # Validation functions
│   ├── storage.ts      # localStorage utilities
│   └── date.ts         # Date utilities
├── hooks/              # Custom React hooks
│   └── useTimer.ts     # Timer logic hook
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

### Step 5: Copy Type Definitions

Copy type definitions from `specs/001-focus-timer-hub/contracts/types.ts` to `src/types/index.ts`:

```bash
# From project root
cp specs/001-focus-timer-hub/contracts/types.ts src/types/index.ts
```

---

## Core Implementation Steps

### Phase 1: Timer Engine (Week 1)

**Goal:** Implement core timer functionality with accurate countdown

**Files to Create:**
1. `src/store/slices/timerSlice.ts` - Timer state management
2. `src/components/timer/TimerDisplay.tsx` - Large countdown display
3. `src/components/timer/PrimaryControls.tsx` - Start/Pause/Resume buttons
4. `src/components/timer/FocusCard.tsx` - Glass panel container

**Key Implementation Points:**

**1. timerSlice.ts (Starter Template)**
```typescript
import { SliceCreator } from '@/types';
import type { TimerSlice } from '@/types';

export const createTimerSlice: SliceCreator<TimerSlice> = (set, get) => ({
  // Initial state
  status: "idle",
  type: "work",
  remainingSec: 0,
  initialDuration: 0,
  currentSessionIndex: 1,
  startTime: null,
  activeTaskId: null,
  
  // Actions
  start: (type, durationSec, taskId = null) => {
    set({
      status: "running",
      type,
      remainingSec: durationSec,
      initialDuration: durationSec,
      startTime: performance.now(),
      activeTaskId: taskId,
    });
    
    // Start interval timer (handled in useTimer hook)
  },
  
  pause: () => {
    if (get().status !== "running") return;
    set({ status: "paused" });
  },
  
  resume: () => {
    if (get().status !== "paused") return;
    
    const now = performance.now();
    const elapsed = (now - (get().startTime || 0)) / 1000;
    
    set({
      status: "running",
      remainingSec: Math.max(0, get().initialDuration - elapsed),
      startTime: now,
    });
  },
  
  tick: () => {
    if (get().status !== "running") return;
    
    const now = performance.now();
    const elapsed = (now - (get().startTime || 0)) / 1000;
    const remaining = get().initialDuration - elapsed;
    
    if (remaining <= 0) {
      get().complete();
    } else {
      set({ remainingSec: Math.ceil(remaining) });
    }
  },
  
  complete: () => {
    // TODO: Record session in statsSlice
    // TODO: Auto-start break
    // TODO: Show notification
    
    set({
      status: "idle",
      remainingSec: 0,
      startTime: null,
    });
  },
  
  reset: () => {
    set({
      status: "idle",
      type: "work",
      remainingSec: 0,
      initialDuration: 0,
      currentSessionIndex: 1,
      startTime: null,
      activeTaskId: null,
    });
  },
});
```

**2. useTimer.ts Hook**
```typescript
import { useEffect } from 'react';
import { useStore } from '@/store';

export function useTimer() {
  const { status, tick } = useStore();
  
  useEffect(() => {
    if (status !== "running") return;
    
    const intervalId = setInterval(() => {
      tick();
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [status, tick]);
}
```

**3. TimerDisplay.tsx**
```typescript
import { useStore } from '@/store';

export function TimerDisplay() {
  const { remainingSec, type } = useStore();
  
  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  
  return (
    <div className="text-center">
      <div className="text-6xl md:text-8xl font-bold font-display tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="mt-4 text-lg text-white/70 uppercase tracking-wide">
        {type === "work" ? "Work Session" : 
         type === "shortBreak" ? "Short Break" : "Long Break"}
      </div>
    </div>
  );
}
```

---

### Phase 2: Task Management (Week 2)

**Files to Create:**
1. `src/store/slices/tasksSlice.ts` - Task state management
2. `src/components/tasks/TaskDrawer.tsx` - Slide-in drawer
3. `src/components/tasks/TaskList.tsx` - Task list
4. `src/components/tasks/TaskItem.tsx` - Individual task
5. `src/components/tasks/TaskCreateForm.tsx` - Task creation form

**Key Implementation:**
- Use `uuid` for task ID generation
- Implement localStorage persistence
- Add slide-in animation with Tailwind transitions

---

### Phase 3: Daily Stats & Persistence (Week 2-3)

**Files to Create:**
1. `src/store/slices/statsSlice.ts` - Stats state management
2. `src/components/stats/DailyBar.tsx` - Bottom stats strip
3. `src/utils/storage.ts` - localStorage utilities
4. `src/utils/date.ts` - Date handling utilities

**Key Implementation:**
- Implement date change detection
- Add write-through persistence
- Handle localStorage quota gracefully

---

### Phase 4: Settings & Customization (Week 3)

**Files to Create:**
1. `src/store/slices/settingsSlice.ts` - Settings state management
2. `src/components/settings/SettingsModal.tsx` - Settings modal
3. `src/components/ui/Modal.tsx` - Reusable modal component
4. `src/utils/validation.ts` - Validation utilities

---

### Phase 5: Accessibility & Performance (Week 4)

**Tasks:**
- Add ARIA labels and live regions
- Implement keyboard navigation
- Run Lighthouse audits
- Optimize bundle size
- Add prefers-reduced-motion support

---

### Phase 6: PWA Enablement (Week 4)

**Files to Create:**
1. `vite.config.ts` - Update with PWA plugin
2. `public/manifest.json` - Web app manifest
3. `src/registerSW.ts` - Service worker registration

**Vite Config Update:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Focus Timer Hub',
        short_name: 'Focus Timer',
        description: 'Distraction-free Pomodoro timer',
        theme_color: '#4B6BFB',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      }
    })
  ]
});
```

---

## Development Workflow

### Running Dev Server

```bash
npm run dev
```

Access at `http://localhost:5173`

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Building for Production

```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Testing Strategy

### Unit Tests Example

**`src/store/slices/timerSlice.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';
import { create } from 'zustand';
import { createTimerSlice } from './timerSlice';

describe('timerSlice', () => {
  it('should start timer with correct duration', () => {
    const store = create(createTimerSlice);
    
    store.getState().start('work', 1500);
    
    expect(store.getState().status).toBe('running');
    expect(store.getState().remainingSec).toBe(1500);
    expect(store.getState().type).toBe('work');
  });
  
  it('should pause running timer', () => {
    const store = create(createTimerSlice);
    
    store.getState().start('work', 1500);
    store.getState().pause();
    
    expect(store.getState().status).toBe('paused');
  });
});
```

---

## Debugging Tips

### localStorage Inspection

Open DevTools → Application → Local Storage → `http://localhost:5173`

Check keys:
- `FT_SETTINGS_v1`
- `FT_TASKS_v1`
- `FT_TODAY_v1`

### Zustand DevTools

Install Redux DevTools extension. Zustand integrates automatically in development.

### Timer Accuracy Testing

```typescript
// In console
const start = Date.now();
// Wait 60 seconds
const elapsed = (Date.now() - start) / 1000;
console.log(`Expected: 60s, Actual: ${elapsed}s, Drift: ${elapsed - 60}s`);
```

---

## Common Issues & Solutions

### Issue: Tailwind styles not applying

**Solution:** Ensure `index.css` is imported in `main.tsx`:
```typescript
import './index.css';
```

### Issue: localStorage quota exceeded

**Solution:** Implement defensive storage with try-catch:
```typescript
try {
  localStorage.setItem(key, value);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    // Show warning to user
    console.error('Storage quota exceeded');
  }
}
```

### Issue: Timer drifts in background tab

**Solution:** Use wall-clock delta calculation (already implemented in timerSlice).

---

## Next Steps

1. ✅ Project initialized
2. → Implement Phase 1: Core Timer (see plan.md for details)
3. → Run `/speckit.tasks` to generate task breakdown
4. → Set up CI/CD for automated testing and deployment

---

## Resources

### Documentation
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)

### Related Spec Files
- `specs/001-focus-timer-hub/spec.md` - Feature specification
- `specs/001-focus-timer-hub/plan.md` - Implementation plan
- `specs/001-focus-timer-hub/data-model.md` - Data structures
- `specs/001-focus-timer-hub/research.md` - Technical research

---

**Document Status:** ✅ **COMPLETE**  
**Last Updated:** 2025-10-28

