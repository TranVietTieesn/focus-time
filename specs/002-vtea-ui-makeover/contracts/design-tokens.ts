/**
 * VTea UI Makeover - Design Tokens
 * 
 * This file contains finalized design system tokens for the VTea UI Makeover.
 * All values were resolved during the clarification phase and should be used
 * verbatim in implementation.
 * 
 * DO NOT modify these values without updating the specification (spec.md).
 * 
 * @project Focus Timer Hub
 * @feature 002-vtea-ui-makeover
 * @version 1.0
 * @created 2025-10-28
 */

// ============================================================================
// TYPOGRAPHY SYSTEM (Inter Font Family)
// ============================================================================

export const typography = {
  fontFamily: {
    base: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  fontWeight: {
    regular: 400,
    semiBold: 600,
    bold: 700,
  },
  
  fontSize: {
    // Timer (primary visual anchor)
    timerMobile: '90px',
    timerDesktop: '120px',
    
    // Focus Title
    titleMin: '24px',
    titleMax: '32px',
    
    // Body text (minimum for accessibility)
    base: '16px',
    
    // Labels (mode switcher, task list)
    label: '14px',
    labelLarge: '16px',
    
    // Helper text (validation hints, timestamps)
    helper: '12px',
    helperLarge: '14px',
  },
  
  lineHeight: {
    timer: 1.0,      // Compact, numerical display
    heading: 1.2,    // Tight for emphasis
    body: 1.5,       // Readable, accessible
  },
  
  letterSpacing: {
    timer: '-0.02em',  // Slight tightening for large numerals
    default: '0',      // All other text
  },
} as const;

// ============================================================================
// COLOR SYSTEM
// ============================================================================

export const colors = {
  // Mode Colors (Primary Palette)
  mode: {
    focus: '#4B6BFB',       // Primary Blue (work sessions)
    shortBreak: '#FF89BB',  // Secondary Pink (short breaks)
    longBreak: '#10B981',   // Success Green (long breaks)
  },
  
  // Semantic Colors
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  
  // Glass Morphism Surfaces
  glass: {
    background: 'rgba(255, 255, 255, 0.10)',  // 10% opacity baseline
    backgroundHover: 'rgba(255, 255, 255, 0.12)', // 12% on hover
    border: 'rgba(255, 255, 255, 0.20)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropBlur: '16px',
  },
  
  // Text Colors (on dark backgrounds)
  text: {
    primary: 'rgba(255, 255, 255, 0.90)',    // 90% opacity - high contrast
    secondary: 'rgba(255, 255, 255, 0.70)',  // 70% opacity - de-emphasized
    tertiary: 'rgba(255, 255, 255, 0.50)',   // 50% opacity - timestamps, helper text
  },
  
  // Interactive States
  interactive: {
    hover: '+10% opacity',        // Visual cue (additive)
    active: '-10% opacity',       // Pressed state (subtractive)
    disabled: '0.40-0.50',        // 40-50% opacity
    focusRing: 'rgba(255, 255, 255, 0.80)', // 80% opacity, 2px solid
  },
  
  // Background Overlay (ensures text readability)
  overlay: {
    radial: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
    linear: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
    combined: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.6) 100%)',
  },
} as const;

// ============================================================================
// SPACING & LAYOUT
// ============================================================================

export const spacing = {
  // Touch Targets (WCAG 2.1 Level AA)
  touchTarget: {
    minimum: '44px',      // Minimum touch target size
    primary: '48px',      // Primary action buttons (Start/Pause)
    comfortable: '56px',  // Extra comfortable target size
  },
  
  // Focus Indicators (WCAG 2.1 Level AA)
  focus: {
    width: '2px',         // Outline width
    offset: '2px',        // Offset from element
    minContrast: '3:1',   // Minimum contrast ratio
  },
  
  // Gaps & Padding
  gap: {
    tight: '8px',         // Tight spacing
    normal: '16px',       // Normal spacing
    comfortable: '24px',  // Comfortable spacing between controls
  },
  
  // Card Padding
  cardPadding: {
    mobile: '24px',       // Mobile padding
    desktop: '32px',      // Desktop padding
    large: '48px',        // Large card padding
  },
} as const;

// ============================================================================
// BRANDING & COPY
// ============================================================================

export const branding = {
  logo: 'VTea',
  tagline: 'focus & chill',
  inspirationalQuote: 'Your thoughts deserve a calm place.',
  
  // Typography for branding elements
  logoStyle: {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.semiBold,
    fontSize: '20-24px', // Responsive
    color: colors.text.primary, // White 90%
  },
  
  taglineStyle: {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.helper, // 12px
    color: colors.text.secondary, // White 70%
  },
  
  quoteStyle: {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.label, // 14-16px
    fontStyle: 'italic',
    color: colors.text.tertiary, // White 50%
  },
} as const;

// ============================================================================
// BACKGROUND SYSTEM
// ============================================================================

export const background = {
  // CSS Gradient (instant, zero bundle cost)
  gradient: {
    primary: 'radial-gradient(circle at 30% 30%, #4B6BFB 0%, #2A2A72 50%, #1A1A2E 100%)',
    fallback: 'linear-gradient(to bottom, #2A2A72 0%, #1A1A2E 100%)',
  },
  
  // Optional WebP Image (progressive enhancement, ≤80KB)
  image: {
    maxSize: '80KB',
    format: 'WebP with JPEG fallback',
    loading: 'lazy', // Progressive loading after gradient displays
  },
  
  // Overlay (ensures WCAG AA contrast ≥4.5:1)
  overlay: {
    radial: colors.overlay.radial,
    linear: colors.overlay.linear,
    combined: colors.overlay.combined,
    opacity: '0.40-0.60', // 40-60% dark overlay
  },
} as const;

// ============================================================================
// ACCESSIBILITY SPECIFICATIONS
// ============================================================================

export const accessibility = {
  // WCAG 2.1 Level AA Contrast Ratios
  contrast: {
    bodyText: '4.5:1',        // Normal text minimum
    largeText: '3.0:1',       // ≥24px or ≥19px bold
    uiElements: '3.0:1',      // Interactive elements
    focusIndicator: '3.0:1',  // Focus ring vs background
  },
  
  // Touch Targets
  touchTargets: {
    minimum: spacing.touchTarget.minimum,    // 44×44px
    spacing: spacing.gap.tight,              // 8px between targets
    primary: spacing.touchTarget.primary,    // 48×48px for primary actions
  },
  
  // Keyboard Navigation
  keyboard: {
    tabOrder: 'logical (top-to-bottom, left-to-right)',
    focusTrap: 'modals only',
    escKey: 'closes modals/drawers, returns focus to trigger',
    activation: 'Enter and Space',
  },
  
  // ARIA Live Regions
  ariaLive: {
    politeness: 'polite',
    announcements: [
      'Timer started',
      'Timer paused',
      'Timer resumed',
      '5 minutes remaining',
      'Session complete',
    ],
  },
  
  // Motion Preferences
  motion: {
    drawerAnimation: 'disabled if prefers-reduced-motion',
    transitions: 'instant instead of smooth if prefers-reduced-motion',
    timerCountdown: 'always animated (essential feedback)',
  },
} as const;

// ============================================================================
// PERFORMANCE BUDGETS
// ============================================================================

export const performance = {
  bundle: {
    jsGzipped: '150KB',       // Maximum gzipped JS bundle size
    backgroundImage: '80KB',  // Maximum background image size
    totalAssets: '250KB',     // Total asset budget
  },
  
  timing: {
    LCP: '2s',    // Largest Contentful Paint (3G)
    FCP: '1.5s',  // First Contentful Paint (3G)
    TTI: '2s',    // Time to Interactive (3G)
  },
  
  lighthouse: {
    performance: 90,      // Minimum score
    accessibility: 95,    // Minimum score (upgraded from MVP)
    pwa: 90,              // Minimum score
  },
} as const;

// ============================================================================
// COMPONENT TOKENS (Semantic Mappings)
// ============================================================================

export const components = {
  // Mode Switcher (Segmented Control)
  modeSwitcher: {
    active: {
      background: 'mode.focus | mode.shortBreak | mode.longBreak',
      textColor: 'rgba(255, 255, 255, 1.0)', // 100% opacity
      border: 'none',
    },
    inactive: {
      background: 'transparent',
      textColor: colors.text.secondary, // 70% opacity
      border: `1px solid ${colors.glass.border}`, // 20% opacity
    },
    hover: {
      background: colors.glass.background, // 10% white
      border: `1px solid rgba(255, 255, 255, 0.40)`, // 40% opacity
    },
    disabled: {
      opacity: '0.50', // 50% opacity
      cursor: 'not-allowed',
    },
  },
  
  // Primary Action Button (Start/Pause/Resume)
  primaryButton: {
    minSize: spacing.touchTarget.primary, // 48×48px
    background: colors.mode.focus,
    textColor: 'rgba(255, 255, 255, 1.0)',
    hover: 'increase brightness by 10%',
    active: 'decrease brightness by 10%',
    focusRing: `${spacing.focus.width} solid ${colors.interactive.focusRing}`,
    focusOffset: spacing.focus.offset,
  },
  
  // Compact Icon Buttons (Restart, Fullscreen)
  iconButton: {
    minSize: spacing.touchTarget.minimum, // 44×44px
    visualSize: '32px', // Icon visible area
    color: colors.text.secondary, // 70% opacity
    hover: colors.text.primary, // 90% opacity
    focusRing: `${spacing.focus.width} solid ${colors.interactive.focusRing}`,
  },
  
  // Task Drawer
  taskDrawer: {
    mobile: {
      position: 'bottom sheet',
      animation: 'translateY',
      duration: '200-300ms',
    },
    desktop: {
      position: 'left side-sheet',
      animation: 'translateX',
      duration: '200-300ms',
    },
    background: colors.glass.background,
    backdropBlur: colors.glass.backdropBlur,
  },
  
  // Focus Title (Inline Editable)
  focusTitle: {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.semiBold, // 600
    fontSize: {
      mobile: typography.fontSize.titleMin, // 24px
      desktop: typography.fontSize.titleMax, // 32px
    },
    color: colors.text.primary, // 90% opacity
    placeholder: 'Untitled Session',
    placeholderColor: colors.text.tertiary, // 50% opacity
  },
  
  // Timer Display
  timerDisplay: {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.bold, // 700
    fontSize: {
      mobile: typography.fontSize.timerMobile, // 90px
      desktop: typography.fontSize.timerDesktop, // 120px
    },
    lineHeight: typography.lineHeight.timer, // 1.0
    letterSpacing: typography.letterSpacing.timer, // -0.02em
    color: 'rgba(255, 255, 255, 1.0)', // 100% opacity (maximum contrast)
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', // Subtle depth
  },
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobileSmall: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1440px',
  
  // Tailwind default breakpoints (for reference)
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// EXPORTS (Type-Safe)
// ============================================================================

export type Typography = typeof typography;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Branding = typeof branding;
export type Background = typeof background;
export type Accessibility = typeof accessibility;
export type Performance = typeof performance;
export type Components = typeof components;
export type Breakpoints = typeof breakpoints;

// Default export (all tokens)
export default {
  typography,
  colors,
  spacing,
  branding,
  background,
  accessibility,
  performance,
  components,
  breakpoints,
} as const;

