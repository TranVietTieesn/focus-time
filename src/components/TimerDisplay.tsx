/**
 * TimerDisplay - Flocus-style large timer
 * 40% viewport height with fade transitions on mode change
 * Muted glow, no harsh shadows
 * Optimized: no per-second re-renders, smooth display updates only
 */

import { useRef, useEffect } from 'react';
import { useTimer } from '@/core/timer';

export function TimerDisplay() {
  const remainingSec = useTimer((state) => state.remainingSec);
  const status = useTimer((state) => state.status);
  const timeRef = useRef<HTMLTimeElement>(null);

  // Update text content directly without forcing re-renders
  // This avoids the flickering caused by key changes
  useEffect(() => {
    if (timeRef.current) {
      const minutes = Math.floor(remainingSec / 60);
      const seconds = remainingSec % 60;
      const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      // Only update if content actually changed
      if (timeRef.current.textContent !== display) {
        timeRef.current.textContent = display;
      }
      
      // Update aria-label for accessibility
      timeRef.current.setAttribute('aria-label', `${minutes} minutes ${seconds} seconds remaining`);
    }
  }, [remainingSec]);

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: '40vh',
        animation: 'slideUp 0.5s ease-in-out 0.2s backwards',
      }}
    >
      <time
        ref={timeRef}
        className="font-bold text-white tracking-tight"
        style={{
          fontSize: 'clamp(6rem, 40vw, 20rem)',
          fontFamily: 'var(--font-family-mono)',
          fontWeight: 700,
          textShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(75, 107, 251, 0.2)',
          letterSpacing: '0.05em',
          lineHeight: '1',
        }}
        aria-label={`${minutes} minutes ${seconds} seconds remaining`}
      >
        {display}
      </time>
    </div>
  );
}
