/**
 * FocusCard - Main timer card with glassmorphism effect
 * VTea UI Makeover: Action Controls Enhancement
 */

import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { formatTime, minutesToSeconds } from '@/lib/time';
import { FocusTitle } from './FocusTitle';
import { ModeSwitcher } from './ModeSwitcher';
import { RestartButton } from './RestartButton';
import { FullscreenButton } from './FullscreenButton';

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

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStart = () => {
    const durationSec = minutesToSeconds(workMin);
    start('work', durationSec);
  };

  const handleStartBreak = (breakType: 'shortBreak' | 'longBreak') => {
    const duration = breakType === 'shortBreak' ? shortBreakMin : longBreakMin;
    const durationSec = minutesToSeconds(duration);
    start(breakType, durationSec);
  };

  // T107: Implement handleRestart() function
  const handleRestart = () => {
    const duration = 
      type === 'work' ? workMin :
      type === 'shortBreak' ? shortBreakMin :
      longBreakMin;
    start(type, minutesToSeconds(duration));
  };

  // T209: Implement handleFullscreenToggle()
  const handleFullscreenToggle = async () => {
    try {
      if (isFullscreen) {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      } else {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
      // Gracefully handle fullscreen denial
    }
  };

  // T108 & T210: Add keyboard event listeners for R and F keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') {
        handleRestart();
      }
      if (e.key.toLowerCase() === 'f') {
        handleFullscreenToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, workMin, shortBreakMin, longBreakMin, isFullscreen]);

  // T211: Handle ESC key to sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen]);

  return (
    <div className="w-full max-w-2xl glass-panel rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
      {/* Focus Title - VTea UI Makeover */}
      <FocusTitle />
      
      {/* Mode Switcher - VTea UI Makeover */}
      <ModeSwitcher />
      
      {/* Session Counter */}
      {status !== 'idle' && (
        <div className="text-center mb-4">
          <p className="text-xs md:text-sm text-white/60">
            Session {currentSessionIndex} of {sessionsBeforeLongBreak}
          </p>
        </div>
      )}

      {/* Timer Display - VTea UI Makeover */}
      <div className="text-center mb-6 md:mb-8">
        <div
          className="text-timer-mobile md:text-timer-desktop font-bold tabular-nums"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
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
              className="w-full min-h-[44px] py-4 px-6 bg-primary hover:bg-primary-dark active:bg-primary-dark rounded-xl font-semibold text-base md:text-lg transition-colors focus-ring touch-manipulation"
              aria-label="Start 25-minute focus session"
            >
              Start Focus Session
            </button>
            
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => handleStartBreak('shortBreak')}
                className="flex-1 min-h-[44px] py-3 px-3 md:px-4 bg-white/10 hover:bg-white/20 active:bg-white/20 rounded-xl font-medium text-sm md:text-base transition-colors focus-ring touch-manipulation"
                aria-label={`Start ${shortBreakMin} minute short break`}
              >
                Short Break ({shortBreakMin}m)
              </button>
              <button
                onClick={() => handleStartBreak('longBreak')}
                className="flex-1 min-h-[44px] py-3 px-3 md:px-4 bg-white/10 hover:bg-white/20 active:bg-white/20 rounded-xl font-medium text-sm md:text-base transition-colors focus-ring touch-manipulation"
                aria-label={`Start ${longBreakMin} minute long break`}
              >
                Long Break ({longBreakMin}m)
              </button>
            </div>
          </>
        )}

        {status === 'running' && (
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={pause}
              className="flex-1 min-h-[44px] py-4 px-4 md:px-6 bg-white/10 hover:bg-white/20 active:bg-white/20 rounded-xl font-semibold text-base md:text-lg transition-colors focus-ring touch-manipulation"
              aria-label="Pause timer"
            >
              Pause
            </button>
            <button
              onClick={complete}
              className="flex-1 min-h-[44px] py-4 px-4 md:px-6 bg-secondary hover:bg-secondary-dark active:bg-secondary-dark rounded-xl font-semibold text-base md:text-lg transition-colors focus-ring touch-manipulation"
              aria-label="Complete session early"
            >
              Complete
            </button>
          </div>
        )}

        {status === 'paused' && (
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={resume}
              className="flex-1 min-h-[44px] py-4 px-4 md:px-6 bg-primary hover:bg-primary-dark active:bg-primary-dark rounded-xl font-semibold text-base md:text-lg transition-colors focus-ring touch-manipulation"
              aria-label="Resume timer"
            >
              Resume
            </button>
            <button
              onClick={complete}
              className="flex-1 min-h-[44px] py-4 px-4 md:px-6 bg-white/10 hover:bg-white/20 active:bg-white/20 rounded-xl font-medium text-base md:text-lg transition-colors focus-ring touch-manipulation"
              aria-label="Complete session"
            >
              Complete
            </button>
          </div>
        )}
      </div>

      {/* Action Controls Row - T106 & T207: Integrate buttons */}
      <div className="flex justify-center gap-3 mt-6">
        <RestartButton onRestart={handleRestart} />
        <FullscreenButton 
          isFullscreen={isFullscreen}
          onToggle={handleFullscreenToggle}
          isAvailable={!!document.fullscreenEnabled}
        />
      </div>

      {/* Screen reader announcements - VTea UI Makeover WCAG AA */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {status === 'running' && `${Math.floor(remainingSec / 60)} minutes remaining`}
        {status === 'paused' && 'Timer paused'}
        {status === 'idle' && 'Timer ready to start'}
        {status === 'running' && remainingSec === 300 && '5 minutes remaining'}
      </div>
    </div>
  );
}

