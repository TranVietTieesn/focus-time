/**
 * FocusCard - Main timer card with glassmorphism effect
 */

import { useStore } from '@/store';
import { formatTime, minutesToSeconds } from '@/lib/time';

export function FocusCard() {
  const status = useStore((state) => state.status);
  const type = useStore((state) => state.type);
  const remainingSec = useStore((state) => state.remainingSec);
  const currentSessionIndex = useStore((state) => state.currentSessionIndex);
  const sessionsBeforeLongBreak = useStore((state) => state.sessionsBeforeLongBreak);
  
  const start = useStore((state) => state.start);
  const pause = useStore((state) => state.pause);
  const resume = useStore((state) => state.resume);
  const complete = useStore((state) => state.complete);
  
  const workMin = useStore((state) => state.workMin);
  const shortBreakMin = useStore((state) => state.shortBreakMin);
  const longBreakMin = useStore((state) => state.longBreakMin);

  const handleStart = () => {
    const durationSec = minutesToSeconds(workMin);
    start('work', durationSec);
  };

  const handleStartBreak = (breakType: 'shortBreak' | 'longBreak') => {
    const duration = breakType === 'shortBreak' ? shortBreakMin : longBreakMin;
    const durationSec = minutesToSeconds(duration);
    start(breakType, durationSec);
  };

  const getSessionTypeLabel = () => {
    if (type === 'work') return 'Work Session';
    if (type === 'shortBreak') return 'Short Break';
    return 'Long Break';
  };

  const getSessionColor = () => {
    if (type === 'work') return 'text-primary';
    return 'text-secondary';
  };

  return (
    <div className="w-full max-w-2xl glass-panel rounded-3xl p-8 md:p-12">
      {/* Session Type Label */}
      <div className="text-center mb-6">
        <p className={`text-lg uppercase tracking-wide ${getSessionColor()}`}>
          {getSessionTypeLabel()}
        </p>
        {status !== 'idle' && (
          <p className="text-sm text-white/60 mt-2">
            Session {currentSessionIndex} of {sessionsBeforeLongBreak}
          </p>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-8">
        <div
          className="text-6xl md:text-8xl font-bold font-display tabular-nums"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {formatTime(remainingSec)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {status === 'idle' && (
          <>
            <button
              onClick={handleStart}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-dark rounded-xl font-semibold text-lg transition-colors focus-ring"
            >
              Start Focus Session
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleStartBreak('shortBreak')}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors focus-ring"
              >
                Short Break ({shortBreakMin}m)
              </button>
              <button
                onClick={() => handleStartBreak('longBreak')}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors focus-ring"
              >
                Long Break ({longBreakMin}m)
              </button>
            </div>
          </>
        )}

        {status === 'running' && (
          <div className="flex gap-3">
            <button
              onClick={pause}
              className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors focus-ring"
            >
              Pause
            </button>
            <button
              onClick={complete}
              className="flex-1 py-4 px-6 bg-secondary hover:bg-secondary-dark rounded-xl font-semibold transition-colors focus-ring"
            >
              Complete
            </button>
          </div>
        )}

        {status === 'paused' && (
          <div className="flex gap-3">
            <button
              onClick={resume}
              className="flex-1 py-4 px-6 bg-primary hover:bg-primary-dark rounded-xl font-semibold transition-colors focus-ring"
            >
              Resume
            </button>
            <button
              onClick={complete}
              className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors focus-ring"
            >
              Complete
            </button>
          </div>
        )}
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {status === 'running' && Math.floor(remainingSec / 60)} minutes remaining
      </div>
    </div>
  );
}

