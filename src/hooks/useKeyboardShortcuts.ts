/**
 * useKeyboardShortcuts - Handle keyboard shortcuts for timer
 * Space/Enter: Start/Pause/Resume
 * R: Restart with confirmation
 * F: Fullscreen
 * Esc: Exit fullscreen or dismiss dialogs
 */

import { useEffect, useRef } from 'react';
import { useTimer } from '@/core/timer';

export function useKeyboardShortcuts() {
  const status = useTimer((state) => state.status);
  const type = useTimer((state) => state.type);
  const start = useTimer((state) => state.start);
  const pause = useTimer((state) => state.pause);
  const resume = useTimer((state) => state.resume);
  const reset = useTimer((state) => state.reset);

  // Track if restart was requested (for confirmation animation)
  const restartPendingRef = useRef(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere with text input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.code) {
        case 'Space':
        case 'Enter': {
          event.preventDefault();
          if (status === 'idle') {
            const DEFAULT_DURATIONS = {
              work: 25 * 60,
              shortBreak: 5 * 60,
              longBreak: 15 * 60,
            };
            start(type, DEFAULT_DURATIONS[type]);
          } else if (status === 'running') {
            pause();
          } else if (status === 'paused') {
            resume();
          }
          break;
        }

        case 'KeyR': {
          event.preventDefault();
          if (restartPendingRef.current) {
            // Second press confirms reset
            restartPendingRef.current = false;
            if (restartTimeoutRef.current) {
              clearTimeout(restartTimeoutRef.current);
            }
            reset();
          } else {
            // First press shows confirmation intent
            restartPendingRef.current = true;
            // Reset after 2 seconds if no confirmation
            restartTimeoutRef.current = setTimeout(() => {
              restartPendingRef.current = false;
            }, 2000);
          }
          break;
        }

        case 'KeyF': {
          event.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {
              console.log('Fullscreen not available');
            });
          } else {
            document.exitFullscreen().catch(() => {
              console.log('Exit fullscreen failed');
            });
          }
          break;
        }

        case 'Escape': {
          // Exit fullscreen if active
          if (document.fullscreenElement) {
            event.preventDefault();
            document.exitFullscreen().catch(() => {
              console.log('Exit fullscreen failed');
            });
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [status, type, start, pause, resume, reset]);
}
