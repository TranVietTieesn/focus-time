/**
 * Header - Decorative header with VTea wordmark and quote
 * Semi-transparent, fades during running state
 */

import { useState, useEffect } from 'react';
import { useTimer } from '@/core/timer';
import { getRandomQuote } from '@/lib/quotes';

export function Header() {
  const [quote, setQuote] = useState<string>('');
  const status = useTimer((state) => state.status);
  const lastEvent = useTimer((state) => state.lastEvent);

  // Set random quote on mount and on each session start
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  // Randomize quote when starting new session
  useEffect(() => {
    if (lastEvent?.type === 'started') {
      setQuote(getRandomQuote());
    }
  }, [lastEvent]);

  // Opacity based on status: full when idle/paused, faded when running
  const opacity = status === 'running' ? 0.3 : 0.6;

  return (
    <header
      className="fixed inset-x-0 top-0 px-8 py-6 z-5 transition-opacity duration-500"
      role="doc-subtitle"
      aria-label="Header"
    >
      {/* VTea Wordmark - Top Left */}
      <div 
        className="absolute left-0 top-0 p-6 pointer-events-none"
        style={{
          animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards',
        }}
      >
        <div
          className="text-xl font-bold text-white"
          style={{
            textShadow: 'var(--glow-text-sm)',
            letterSpacing: '0.05em',
            opacity,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          VTea
        </div>
      </div>

      {/* Inspirational Quote - Top Right */}
      <div 
        className="absolute right-0 top-0 p-6 max-w-sm pointer-events-none"
        style={{
          animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards',
        }}
      >
        <p
          className="text-sm font-light text-white text-right italic"
          style={{
            textShadow: 'var(--glow-quote)',
            lineHeight: '1.5',
            opacity,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          {quote}
        </p>
      </div>
    </header>
  );
}
