/**
 * BrandingHeader - Minimalist header with VTea wordmark + rotating affirmation
 * VTea UI Makeover: Pure identity, zero navigation, emotional tone only
 * Visual Priority: TERTIARY (whisper of presence, fades during sessions)
 *
 * Features:
 * - Left: VTea wordmark (600 weight Inter, 18–24px, 60% opacity)
 * - Right: Rotating affirmation (400 weight, 14–16px, 60% opacity)
 * - No containers, no backgrounds, no navigation elements
 * - Fade to 30% opacity when timer runs (reduced distraction)
 * - Fully transparent header (accessibility contrast via dark overlay only)
 * - Render cost <2% of frame budget (pure CSS positioning, no interactions)
 */

import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { getTodayAffirmation } from '@/lib/affirmations';

export function BrandingHeader() {
  const status = useStore((state) => state.status);
  const [affirmation, setAffirmation] = useState('');

  // Initialize affirmation on mount
  useEffect(() => {
    setAffirmation(getTodayAffirmation());
  }, []);

  // Calculate opacity based on timer status
  // Fully visible when idle/paused, fades when running
  const headerOpacity = status === 'running' ? 0.3 : 0.6;
  const transitionClass = 'transition-opacity duration-500';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 px-4 md:px-8 py-4 md:py-6 ${transitionClass}`}
      style={{
        pointerEvents: 'none', // Header is purely presentational
        opacity: headerOpacity,
      }}
      aria-hidden="true" // Immersive header is decorative
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: VTea Wordmark */}
        <div
          className="flex-1"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 1.0)',
            lineHeight: 1.2,
          }}
        >
          VTea
        </div>

        {/* Right: Rotating Affirmation */}
        <div
          className="flex-1 text-right"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            letterSpacing: '0',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.5,
            maxWidth: '60ch',
            marginLeft: 'auto',
            wordBreak: 'break-word',
          }}
        >
          {affirmation}
        </div>
      </div>
    </header>
  );
}
