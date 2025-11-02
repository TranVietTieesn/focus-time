/**
 * SecondaryControls - Secondary action buttons (Reset, etc)
 */

import { useTimer } from '@/core/timer';

export function SecondaryControls() {
  const reset = useTimer((state) => state.reset);
  const status = useTimer((state) => state.status);

  return (
    <div className="flex gap-4 justify-center mt-8">
      <button
        onClick={reset}
        disabled={status === 'idle'}
        className="min-h-[44px] px-8 py-2 text-white font-semibold focus-ring"
        style={{
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          animation: 'slideUp 0.5s ease-in-out 0.2s backwards',
          transition: 'all 0.3s ease-out',
          opacity: status === 'idle' ? 0.5 : 1,
          cursor: status === 'idle' ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (status !== 'idle') {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }}
      >
        Reset
      </button>
    </div>
  );
}
