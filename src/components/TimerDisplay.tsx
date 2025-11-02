/**
 * TimerDisplay - VTea extra-large timer with dynamic glow
 * Max 35vh, violet-tinted glow, state-based animations
 * Running: pulsating glow | Paused: dim | Complete: flash
 * Optimized: no per-second re-renders, smooth display updates only
 */

import { useRef, useEffect, useState } from 'react';
import { useTimer } from '@/core/timer';

export function TimerDisplay() {
  const remainingSec = useTimer((state) => state.remainingSec);
  const status = useTimer((state) => state.status);
  const lastEvent = useTimer((state) => state.lastEvent);
  const timeRef = useRef<HTMLTimeElement>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  // Flash effect on completion
  useEffect(() => {
    if (lastEvent?.type === 'completed') {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [lastEvent]);

  // Update text content directly without forcing re-renders
  useEffect(() => {
    if (timeRef.current) {
      const minutes = Math.floor(remainingSec / 60);
      const seconds = remainingSec % 60;
      const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      if (timeRef.current.textContent !== display) {
        timeRef.current.textContent = display;
      }
      
      timeRef.current.setAttribute('aria-label', `${minutes} minutes ${seconds} seconds remaining`);
    }
  }, [remainingSec]);

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Dynamic glow based on status
  const getTimerGlow = () => {
    if (isFlashing) {
      return '0 0 60px rgba(255, 255, 255, 1), 0 0 120px rgba(255, 255, 255, 0.8)';
    }
    if (status === 'running') {
      return 'var(--glow-timer-pulsating)';
    }
    if (status === 'paused') {
      return 'var(--glow-timer-dim)';
    }
    return 'var(--glow-timer-base)';
  };

  // Pulsating animation for running state
  const getAnimation = () => {
    const baseAnimation = 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards';
    if (status === 'running' && !isFlashing) {
      return `${baseAnimation}, timerPulse 3s ease-in-out infinite`;
    }
    if (isFlashing) {
      return `${baseAnimation}, timerFlash 0.8s ease-out`;
    }
    return baseAnimation;
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: 'clamp(200px, 35vh, 400px)',
      }}
    >
      <time
        ref={timeRef}
        className="font-bold text-white"
        style={{
          fontSize: 'clamp(4rem, 20vw, 12rem)',
          fontFamily: 'var(--font-family-base)',
          fontWeight: 700,
          textShadow: getTimerGlow(),
          letterSpacing: '0.08em',
          lineHeight: '1',
          animation: getAnimation(),
          transition: 'text-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-label={`${minutes} minutes ${seconds} seconds remaining`}
        aria-live="polite"
      >
        {display}
      </time>

      <style>{`
        @keyframes timerPulse {
          0%, 100% {
            text-shadow: var(--glow-timer-pulsating);
          }
          50% {
            text-shadow: 0 0 15px rgba(160, 120, 255, 0.4),
                         0 0 30px rgba(160, 120, 255, 0.3),
                         0 0 50px rgba(160, 120, 255, 0.2);
          }
        }
        @keyframes timerFlash {
          0% {
            text-shadow: var(--glow-timer-base);
          }
          30% {
            text-shadow: 0 0 60px rgba(255, 255, 255, 1),
                         0 0 120px rgba(255, 255, 255, 0.8),
                         0 0 180px rgba(255, 255, 255, 0.6);
          }
          100% {
            text-shadow: var(--glow-timer-base);
          }
        }
      `}</style>
    </div>
  );
}
