/**
 * UnifiedActionButton - Single button for Start/Pause/Resume
 * Dynamic label and gradient tone based on timer status
 * Reset & fullscreen icons always visible with opacity control
 * Keyboard accessible (Tab + Enter)
 */

import { useRef, useState } from 'react';
import { useTimer } from '@/core/timer';

export function UnifiedActionButton() {
  const status = useTimer((state) => state.status);
  const start = useTimer((state) => state.start);
  const pause = useTimer((state) => state.pause);
  const resume = useTimer((state) => state.resume);
  const reset = useTimer((state) => state.reset);
  const type = useTimer((state) => state.type);

  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

  // Determine button label, gradient, and icon
  const getButtonConfig = () => {
    if (status === 'idle') {
      return {
        label: 'Start',
        gradient: 'linear-gradient(135deg, #4b6bfb 0%, #3b5ceb 100%)',
        glow: '0 8px 32px rgba(75, 107, 251, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      };
    }
    if (status === 'running') {
      return {
        label: 'Pause',
        gradient: 'linear-gradient(135deg, #ff89bb 0%, #ff6ea0 100%)',
        glow: '0 8px 32px rgba(255, 137, 187, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      };
    }
    return {
      label: 'Resume',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #ff89bb 100%)',
      glow: '0 8px 32px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    };
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

  const config = getButtonConfig();

  // Handle reset animation and confirmation
  const handleReset = () => {
    if (status !== 'idle' && resetButtonRef.current) {
      // Trigger fade animation on reset
      resetButtonRef.current.style.animation = 'none';
      setTimeout(() => {
        if (resetButtonRef.current) {
          resetButtonRef.current.style.animation = 'fadeIn 0.3s ease-in-out';
        }
      }, 10);
    }
    reset();
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        animation: 'slideUp 0.5s ease-in-out 0.1s backwards',
      }}
    >
      {/* Main Action Button */}
      <button
        onClick={handleClick}
        className="min-h-[56px] px-12 py-3 text-white font-bold text-lg focus-ring transition-all duration-300"
        style={{
          borderRadius: '9999px',
          background: config.gradient,
          boxShadow: config.glow,
          border: 'none',
          cursor: 'pointer',
          transform: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = config.glow.replace('0.4', '0.5').replace('0.3', '0.4');
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = config.glow;
          e.currentTarget.style.transform = 'none';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1)';
        }}
      >
        {config.label}
      </button>

      {/* Secondary Controls - Always visible with opacity control */}
      <div
        className="flex gap-6 transition-all duration-200"
        style={{
          opacity: isHovering ? 1 : 0.6,
          marginTop: '6px',
        }}
      >
        {/* Reset Button */}
        <button
          ref={resetButtonRef}
          onClick={handleReset}
          disabled={status === 'idle'}
          className="text-lg focus-ring transition-all duration-200"
          title="Reset timer"
          aria-label="Reset timer"
          style={{
            background: 'transparent',
            border: 'none',
            color: status === 'idle' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.6)',
            cursor: status === 'idle' ? 'not-allowed' : 'pointer',
            fontSize: '1.5rem',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease-out',
            opacity: isHovering ? 1 : status === 'idle' ? 0.4 : 0.6,
          }}
          onMouseEnter={(e) => {
            if (status !== 'idle') {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (status !== 'idle') {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.textShadow = 'none';
            }
          }}
          onFocus={(e) => {
            if (status !== 'idle') {
              e.currentTarget.style.textShadow = '0 0 12px rgba(75, 107, 251, 0.4)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          ↻
        </button>

        {/* Fullscreen Button */}
        <button
          ref={fullscreenButtonRef}
          onClick={() => {
            if (document.documentElement.requestFullscreen) {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen();
              }
            }
          }}
          className="text-lg focus-ring transition-all duration-200"
          title="Toggle fullscreen"
          aria-label="Toggle fullscreen"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease-out',
            opacity: isHovering ? 1 : 0.6,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            e.currentTarget.style.textShadow = 'none';
          }}
          onFocus={(e) => {
            e.currentTarget.style.textShadow = '0 0 12px rgba(75, 107, 251, 0.4)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
