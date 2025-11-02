# Flocus Design Aesthetic Updates - VTea Focus Timer

## Overview
Updated VTea UI to match Flocus design principles:
- **Dynamic gradient background** with soft light diffusion
- **No hard borders/cards** – pure glass morphism with blur
- **Centered light, darkened edges** – focus on timer
- **Subtle breathing animations** – 2-3% opacity oscillation
- **Gaussian blur effects** throughout for depth

---

## Changes Made

### 1. **BackgroundLayer.tsx** 
#### Before: Multiple gradient layers with cinematic styling
#### After: Flocus-style light diffusion

**Key updates:**
- Dynamic base gradient (`--gradient-bg-flocus-dynamic`) with smooth 12s animation
- **Layer 2**: Radial glow from center (900px × 700px ellipse)
  - Starts bright blue (75, 107, 251) at 0%
  - Transitions through purple → pink gradient
  - 4s breathing animation (opacity: 1 → 0.97 → 1)
- **Layer 3**: Soft vignette 
  - Center: fully transparent
  - Edges: gradually darkens to 70% black
- **Layer 4**: Minimal blur (0.5px) for subtle depth

```tsx
// Radial glow from center - attracts focus to timer
radial-gradient(
  ellipse 900px 700px at 50% 50%,
  rgba(75, 107, 251, 0.25) 0%,
  rgba(139, 92, 246, 0.15) 30%,
  rgba(255, 137, 187, 0.08) 50%,
  transparent 75%
)
animation: breathe 4s ease-in-out infinite;
```

---

### 2. **tokens.css** - New Animations & Gradients

#### Added Keyframes:
```css
@keyframes breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.97; }  /* Subtle 3% oscillation */
}

@keyframes gradientShift {
  0%, 100% { opacity: 1; }
  50% { opacity: 1.02; }  /* Minimal shimmer */
}
```

#### New Gradient:
```css
--gradient-bg-flocus-dynamic: linear-gradient(
  135deg,
  #0f172e 0%,      /* Deep blue-black */
  #1a1640 30%,     /* Blue-purple */
  #251e4e 60%,     /* Purple */
  #1a1035 100%     /* Deep purple-black */
);
```

---

### 3. **ModeSwitcher.tsx** - Glass Morphism

#### Before: 1px border + semi-transparent background
#### After: Pure glass effect with soft blur

**Changes:**
- Inactive buttons: `rgba(255, 255, 255, 0.08)` (reduced opacity)
- Active buttons: Gradient + glow
- **Blur: 20px** (vs 12px) – softer frosted glass
- **Border: none** – removed hard edges
- Added `WebkitBackdropFilter` for Safari support

```tsx
// Inactive button - soft glass
background: 'rgba(255, 255, 255, 0.08)',
backdropFilter: 'blur(20px)',
WebkitBackdropFilter: 'blur(20px)',
border: 'none',

// Hover effect - subtle brightening
e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
```

---

### 4. **SecondaryControls.tsx** - Glass Morphism

#### Same as ModeSwitcher:
- Reduced opacity: `0.08` (was `0.1`)
- Blur increased to `20px`
- Border removed (`border: 'none'`)
- Hover effect: opacity to `0.12`

---

## Visual Design System

### Color & Glow Values
| Element | Opacity | Blur | Effect |
|---------|---------|------|--------|
| Background gradient | Dynamic | N/A | Subtle shimmer |
| Light diffusion | 0.25 → 0.08 | N/A | Radial fade from center |
| Vignette | 0 → 0.7 | N/A | Center bright → edges dark |
| Glass buttons | 0.08–0.12 | 20px | Frosted effect |
| Primary button | Gradient | N/A | Glowing gradient |

### Animation Timings
- **Gradient shift**: 12s (very subtle)
- **Breathing glow**: 4s (gentle pulse)
- **Opacity range**: ±2–3% (imperceptible but present)

---

## Technical Notes

### Light Diffusion Math
```
Center brightness ∝ distance from edges
Radial ellipse: 900px wide × 700px tall
Positioned at center (50% 50%)
```

### Browser Support
- **Backdrop filter**: Requires modern browser (Chrome 76+, Firefox 103+, Safari 9+)
- **WebkitBackdropFilter**: Added for Safari 9+ support
- **Gradient animations**: CSS opacity animation (no webkit prefix needed)

### Performance Considerations
- Minimal blur (0.5px on vignette layer) – negligible performance impact
- Opacity animations run at 60fps without GPU drain
- Radial gradients calculated once at render time

---

## Customization

### To adjust light intensity:
```css
/* Stronger glow: increase opacity */
rgba(75, 107, 251, 0.35) /* was 0.25 */

/* Faster breathing: reduce duration */
animation: breathe 3s ease-in-out infinite; /* was 4s */
```

### To darken edges more:
```css
/* Vignette max opacity */
rgba(0, 0, 0, 0.85) /* was 0.7 at 100% */
```

### To change glow colors:
Edit radial gradient colors in `BackgroundLayer.tsx` Layer 2

---

## Testing
- [ ] Verify animations run smoothly on low-end devices
- [ ] Test backdrop filter support in Safari
- [ ] Check vignette effect on different screen sizes
- [ ] Validate breathing animation feels natural (not distracting)
