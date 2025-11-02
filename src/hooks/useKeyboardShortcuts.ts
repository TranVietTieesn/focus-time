/**
 * useKeyboardShortcuts - Handle keyboard shortcuts for timer
 * Space/Enter: Start/Pause/Resume
 * R: Restart with confirmation
 * F: Fullscreen
 * M: Toggle music panel
 * ↑/↓: Volume control (when music panel is open)
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

        case 'KeyM': {
          event.preventDefault();
          // Dispatch custom event for music panel toggle
          window.dispatchEvent(new CustomEvent('toggleMusicPanel'));
          break;
        }

        case 'ArrowUp':
        case 'ArrowDown': {
          // Only handle volume if music panel is open
          // Dispatch custom event, let MusicPanel decide if it should handle
          const volumeChange = event.code === 'ArrowUp' ? 10 : -10;
          const volumeEvent = new CustomEvent('musicVolumeChange', {
            detail: { change: volumeChange },
          });
          const handled = window.dispatchEvent(volumeEvent);
          if (!handled) {
            // Event was prevented (music panel handled it)
            event.preventDefault();
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
