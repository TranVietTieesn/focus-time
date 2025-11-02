/**
 * PrimaryButton - Large primary action button
 * Used for Start, Pause, and Resume actions
 */

import { useTimer } from '@/core/timer';

export function PrimaryButton() {
  const status = useTimer((state) => state.status);
  const start = useTimer((state) => state.start);
  const pause = useTimer((state) => state.pause);
  const resume = useTimer((state) => state.resume);
  const type = useTimer((state) => state.type);

  const getButtonText = () => {
    if (status === 'idle') return 'Start';
    if (status === 'running') return 'Pause';
    return 'Resume';
  };

  const handleClick = () => {
    if (status === 'idle') {
      const DEFAULT_DURATIONS = {
        work: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
      };
      start(type, DEFAULT_DURATIONS[type]);
    } else if (status === 'running') {
      pause();
    } else {
      resume();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="min-h-[56px] px-12 py-3 text-white font-bold text-lg focus-ring"
      style={{
        borderRadius: '9999px',
        background: 'var(--gradient-primary)',
        boxShadow: 'var(--glow-button-primary)',
        animation: 'slideUp 0.5s ease-in-out 0.1s backwards',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--glow-button-primary-hover)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--glow-button-primary)';
        e.currentTarget.style.transform = 'none';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1)';
      }}
    >
      {getButtonText()}
    </button>
  );
}
