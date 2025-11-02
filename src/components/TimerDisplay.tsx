/**
 * TimerDisplay
 * Large centered timer with Flocus glow aesthetic
 */

import { useTimer } from '@/core/timer';

export function TimerDisplay() {
  const remainingSec = useTimer((state) => state.remainingSec);

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="text-center">
      <time
        className="text-8xl font-bold text-white tracking-tight"
        style={{
          fontFamily: 'var(--font-family-mono)',
          fontWeight: 700,
          textShadow: 'var(--glow-text-lg)',
          animation: 'slideUp 0.5s ease-in-out',
          letterSpacing: '0.05em',
        }}
      >
        {display}
      </time>
    </div>
  );
}
