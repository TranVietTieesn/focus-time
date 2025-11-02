# VTea UI Redesign - Implementation Progress

## Objective
Rebuild and polish central UI for calm, elegant, minimal design with futuristic glow aesthetic.

## Design System Updates

### ✅ Completed
- [x] CSS tokens updated with VTea gradient (`--gradient-bg-vtea`)
- [x] Primary button gradient: `#4B6BFB → #805DFF`
- [x] Timer glow effects: base, pulsating, dim
- [x] Mode selector glow
- [x] Music player glow effects
- [x] Updated BackgroundLayer with VTea gradient

### 🚧 In Progress
- [ ] TimerDisplay redesign - extra large with glow animations
- [ ] UnifiedActionButton - gradient + hover lift + morphing
- [ ] SecondaryControls - circular icons, always visible
- [ ] ModeSwitcher - active glow effect
- [ ] EditableTaskTitle - refined typography
- [ ] Header - quote area integration
- [ ] Music panel glassmorphism
- [ ] Fade-in animations (0.6s easeInOutCubic)

## Layout Specifications

### Spacing (Vertical)
- Mode Selector ↔ Timer: 60-80px (`--space-16` to `--space-20`)
- Timer ↔ Main Button: 30-40px (`--space-8` to `--space-12`)
- Main ↔ Secondary Controls: 24px (`--space-6`)

### Timer
- Font: Semi-rounded geometric (system default with letter-spacing)
- Size: Dynamic, max 35vh
- Glow: Violet tint (`--glow-timer-base`)
- States:
  - Running: Pulsating glow (`--glow-timer-pulsating`)
  - Paused: Dim glow (`--glow-timer-dim`)
  - Complete: Flash white → fade to base

### Main Button
- Border radius: 30px
- Gradient: `linear-gradient(90deg, #4B6BFB → #805DFF)`
- Font weight: 700
- Hover: Lift effect (translateY + shadow depth)
- Pressed: Deeper shadow
- Morphing: Smooth transition between Start/Pause

### Secondary Controls
- Shape: Circular
- Background: Semi-transparent (opacity 0.6)
- Hover: Brightness increase
- Always visible
- Icons: Reset, Fullscreen, Sound

### Quote Area
- Position: Top-right
- Font: Light, italicized
- Opacity: 0.6
- Glow: `--glow-quote`
- Randomize per session start

### Music Panel
- Position: Fixed bottom-left (32-40px from edge)
- Style: Glassmorphism
  - Background: `rgba(40, 40, 80, 0.4)`
  - Blur: 10px
  - Border radius: 20-24px
- When playing: Glowing border (`--glow-music-playing`)

## Animation Guidelines

### Timing
- Fade-in: 0.6s
- State transitions: easeInOutCubic
- No flicker on timer redraw

### Principles
- Subtle motion replaces hard changes
- Glows and opacity communicate rhythm
- Colors fade gracefully (no pop)
- No sudden brightness or distracting animations

## Accessibility

### Color Contrast
- Verify ratio ≥ 4.5:1 for all text

### Keyboard Shortcuts
- Space: Start/Pause ✅
- R: Reset ✅
- F: Fullscreen ✅
- M: Music Panel ✅
- ↑/↓: Volume (when panel open) ✅

### ARIA
- All interactive elements have labels
- State changes announced
- Focus management

## Acceptance Criteria
- [ ] All controls always visible, centered
- [ ] Timer never flickers
- [ ] Smooth mode transitions
- [ ] Music panel aesthetic harmony
- [ ] No overlap/jitter on different screen sizes
- [ ] Reload starts fresh
- [ ] Frame rate maintained

## Next Steps
1. Complete TimerDisplay with animations
2. Rebuild UnifiedActionButton
3. Polish SecondaryControls
4. Update remaining components
5. Final testing & polish
