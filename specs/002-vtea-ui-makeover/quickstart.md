# VTea UI Makeover - Quick Start Guide

**Project:** Focus Timer Hub  
**Feature:** 002-vtea-ui-makeover  
**Created:** 2025-10-28  
**Version:** 1.0

---

## Overview

This guide walks you through setting up your development environment and implementing the VTea UI Makeover. Follow these steps to get started quickly.

---

## Prerequisites

**Required:**
- Node.js 18+ and npm 9+ (or equivalent yarn/pnpm)
- Git (for version control)
- Modern browser: Chrome, Firefox, Safari, or Edge (latest)
- Code editor: VS Code recommended

**Recommended VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier

---

## Initial Setup

### 1. Verify Branch

Ensure you're on the correct feature branch:

```bash
git branch --show-current
# Should output: 002-vtea-ui-makeover
```

If not, checkout the branch:

```bash
git checkout 002-vtea-ui-makeover
```

### 2. Install Dependencies

The project already has dependencies from the MVP. No new packages are required for the VTea UI Makeover.

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Design System Setup

### 1. Load Design Tokens

The design tokens are documented in `specs/002-vtea-ui-makeover/contracts/design-tokens.ts`.

**Option A: Direct Import (Recommended)**

Import tokens directly in your components:

```tsx
import tokens from '@/specs/002-vtea-ui-makeover/contracts/design-tokens';

// Usage
const TimerDisplay = () => (
  <div style={{
    fontSize: tokens.typography.fontSize.timerDesktop,
    fontWeight: tokens.typography.fontWeight.bold,
    color: 'rgba(255, 255, 255, 1.0)',
  }}>
    25:00
  </div>
);
```

**Option B: Tailwind Config (Recommended for MVP)**

Update `tailwind.config.ts` to include new tokens:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'vtea-primary': '#4B6BFB',
        'vtea-secondary': '#FF89BB',
        'vtea-success': '#10B981',
        'vtea-error': '#EF4444',
        'vtea-warning': '#F59E0B',
        'vtea-info': '#3B82F6',
      },
      fontSize: {
        'timer-mobile': '90px',
        'timer-desktop': '120px',
      },
      backdropBlur: {
        'vtea': '16px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### 2. Load Inter Font

**Option A: Self-Hosted (Recommended for PWA)**

1. Download Inter font files (WOFF2 format) from [Google Fonts](https://fonts.google.com/specimen/Inter)
2. Place font files in `public/fonts/`
3. Add @font-face declarations in `src/index.css`:

```css
/* src/index.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-semibold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

**Option B: Google Fonts CDN (Quick for Development)**

Add to `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

> **Note:** Self-hosted fonts are preferred for production (offline PWA support).

---

## Phase 1 Implementation Guide

### Background Layer Component

**File:** `src/components/BackgroundLayer.tsx`

**Tasks:**
1. Add CSS gradient as base layer
2. Add optional progressive WebP image
3. Add radial + linear overlay for text contrast
4. Test fallback on browsers without backdrop-filter

**Example Implementation:**

```tsx
// src/components/BackgroundLayer.tsx
export const BackgroundLayer = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* CSS Gradient (instant, always works) */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at 30% 30%, #4B6BFB 0%, #2A2A72 50%, #1A1A2E 100%)'
        }}
      />
      
      {/* Optional WebP Image (progressive enhancement) */}
      <picture>
        <source srcSet="/images/background.webp" type="image/webp" />
        <img 
          src="/images/background.jpg" 
          alt="" 
          loading="lazy" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      </picture>
      
      {/* Overlay for text contrast (40-60% opacity) */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.6) 100%)'
        }}
      />
    </div>
  );
};
```

### TopBar Branding Update

**File:** `src/components/TopBar.tsx`

**Tasks:**
1. Replace "Focus Timer Hub" with "VTea"
2. Add tagline "focus & chill"
3. Update typography to Inter 600, 20-24px

**Example Implementation:**

```tsx
// src/components/TopBar.tsx
export const TopBar = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
      {/* Branding */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-semibold text-white/90">
          VTea
        </h1>
        <span className="text-xs text-white/70 hidden sm:inline">
          focus & chill
        </span>
      </div>
      
      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <SettingsButton />
      </div>
    </header>
  );
};
```

### Inspirational Quote Component

**File:** `src/components/InspirationalQuote.tsx` (new file)

**Tasks:**
1. Display static text: "Your thoughts deserve a calm place."
2. Position: absolute top-right (desktop), static below timer (mobile)
3. Typography: Inter 400, 14-16px, italic, 60% opacity

**Example Implementation:**

```tsx
// src/components/InspirationalQuote.tsx
export const InspirationalQuote = () => {
  return (
    <div className="absolute top-4 right-4 hidden lg:block text-sm md:text-base italic text-white/60">
      Your thoughts deserve a calm place.
    </div>
  );
};
```

### Timer Display Enhancement

**File:** `src/components/TimerDisplay.tsx`

**Tasks:**
1. Apply Inter 700, 90px (mobile) / 120px (desktop)
2. Ensure line-height: 1.0, letter-spacing: -0.02em
3. Add subtle text-shadow for depth

**Example Implementation:**

```tsx
// src/components/TimerDisplay.tsx
export const TimerDisplay = ({ remainingSec }: { remainingSec: number }) => {
  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  return (
    <div 
      className="text-[90px] md:text-[120px] font-bold text-white"
      style={{
        lineHeight: 1.0,
        letterSpacing: '-0.02em',
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      {timeString}
    </div>
  );
};
```

---

## Testing Checklist (Phase 1)

After implementing Phase 1, verify the following:

- [ ] Immersive background displays instantly (CSS gradient)
- [ ] WebP image loads progressively (check Network tab)
- [ ] Timer is visually dominant and clearly readable
- [ ] "VTea" branding visible at top-left
- [ ] Inspirational quote visible and non-intrusive
- [ ] Page load time remains <2s on 3G (Lighthouse)
- [ ] Inter font loads with font-display: swap (no FOIT)
- [ ] Safe area respected on notched devices (iOS Safari)

**Testing Commands:**

```bash
# Run development server
npm run dev

# Run Lighthouse audit (Chrome DevTools)
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Mobile" device
# 4. Check "Performance" and "Accessibility"
# 5. Click "Analyze page load"
# Target: Performance ≥90, Accessibility ≥95

# Build for production (verify bundle size)
npm run build
# Check dist/ folder size (should be ≤150KB gzipped JS)
```

---

## Common Issues & Solutions

### Issue: Inter font not loading

**Solution:**
- Verify font files are in `public/fonts/` directory
- Check @font-face declarations in `src/index.css`
- Verify font-display: swap is set
- Check browser DevTools Network tab for 404 errors

### Issue: Background image not displaying

**Solution:**
- Verify image file is in `public/images/` directory
- Check file size (should be ≤80KB)
- Verify WebP and JPEG formats provided
- Check CSS gradient displays as fallback

### Issue: Glass morphism not working (no blur)

**Solution:**
- Check browser support (Chrome 76+, Safari 9+)
- Verify `backdrop-filter: blur(16px)` in CSS
- Add `-webkit-backdrop-filter: blur(16px)` for Safari
- Fallback to solid `rgba(255, 255, 255, 0.2)` on older browsers

### Issue: Lighthouse Performance score dropped

**Solution:**
- Check bundle size: `npm run build` and inspect `dist/` folder
- Reduce background image size (compress to ≤80KB)
- Optimize font loading (font-display: swap, subset to Latin)
- Remove unused CSS (Tailwind purge config)

### Issue: Text not readable on background

**Solution:**
- Increase overlay opacity (40-60%)
- Verify contrast ratio ≥4.5:1 (WebAIM Contrast Checker)
- Add text-shadow for better separation
- Test with different backgrounds (light and dark)

---

## Next Steps

Once Phase 1 is complete:

1. **Run Lighthouse Audit:**
   - Performance ≥90
   - Accessibility ≥95

2. **Commit Phase 1 Changes:**
   ```bash
   git add .
   git commit -m "Phase 1: Brand + Background + Timer Hierarchy"
   ```

3. **Move to Phase 2:**
   - Implement `FocusTitle` component
   - Implement `ModeSwitcher` component
   - Redesign `PrimaryControls` component
   - See `plan.md` Phase 2 section for details

4. **Generate Phase 2 Tasks:**
   ```bash
   # (If using speckit tasks command)
   /speckit.tasks SPEC_ID: 002-vtea-ui-makeover PHASE: 2
   ```

---

## Resources

**Design System:**
- [Design Tokens](./contracts/design-tokens.ts) - Finalized color, typography, spacing values
- [Spec (Clarified)](./spec.md) - Complete feature specification
- [Plan](./plan.md) - Phased implementation plan
- [Research](./research.md) - Technical research findings

**External Resources:**
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Support

**Questions or Issues?**
1. Check `research.md` for common implementation strategies
2. Review `plan.md` for detailed acceptance criteria
3. Consult `spec.md` for requirements and design decisions

**Report Issues:**
- Create GitHub issue with label `002-vtea-ui-makeover`
- Include screenshots, browser version, and steps to reproduce

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-28  
**Status:** Ready for Phase 1 Implementation

