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

  // Set random quote on mount
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  // Opacity based on status: full when idle/paused, faded when running
  const opacityClass =
    status === 'running' ? 'opacity-20' : 'opacity-40';

  return (
    <header
      className="fixed inset-x-0 top-0 px-8 py-6 z-5 transition-opacity duration-500"
      role="doc-subtitle"
      aria-label="Header"
    >
      {/* VTea Wordmark - Top Left */}
      <div className="absolute left-0 top-0 p-6 pointer-events-none">
        <div
          className={`text-xl font-bold text-white transition-opacity duration-500 ${opacityClass}`}
          style={{
            textShadow: 'var(--glow-text-sm)',
            letterSpacing: '0.05em',
          }}
        >
          VTea
        </div>
      </div>

      {/* Inspirational Quote - Top Right */}
      <div className="absolute right-0 top-0 p-6 max-w-xs pointer-events-none">
        <p
          className={`text-sm font-light text-white text-right transition-opacity duration-500 ${opacityClass}`}
          style={{
            textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
            lineHeight: '1.4',
          }}
        >
          {quote}
        </p>
      </div>
    </header>
  );
}
