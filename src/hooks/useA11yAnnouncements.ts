/**
 * useA11yAnnouncements - Announce timer events to screen readers
 * Uses aria-live region for accessible announcements
 */

import { useEffect, useRef } from 'react';
import { useTimer } from '@/core/timer';

export function useA11yAnnouncements() {
  const lastEvent = useTimer((state) => state.lastEvent);
  const status = useTimer((state) => state.status);
  const type = useTimer((state) => state.type);

  // Ref to announce region element
  const announceRef = useRef<HTMLDivElement | null>(null);

  // Create or get announce region on mount
  useEffect(() => {
    if (!announceRef.current) {
      const region = document.createElement('div');
      region.id = 'aria-live-announcer';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
      announceRef.current = region;
    }

    return () => {
      // Cleanup on unmount
      if (announceRef.current && announceRef.current.parentNode) {
        announceRef.current.parentNode.removeChild(announceRef.current);
      }
    };
  }, []);

  // Announce timer events
  useEffect(() => {
    if (!lastEvent || !announceRef.current) return;

    let message = '';

    switch (lastEvent.type) {
      case 'started': {
        const sessionName =
          lastEvent.sessionType === 'work'
            ? 'Focus'
            : lastEvent.sessionType === 'shortBreak'
              ? 'Short Break'
              : 'Long Break';
        message = `${sessionName} session started, ${lastEvent.duration} seconds`;
        break;
      }

      case 'paused': {
        const mins = Math.floor(lastEvent.remaining / 60);
        const secs = lastEvent.remaining % 60;
        message = `Timer paused, ${mins} minutes ${secs} seconds remaining`;
        break;
      }

      case 'resumed': {
        const mins = Math.floor(lastEvent.remaining / 60);
        const secs = lastEvent.remaining % 60;
        message = `Timer resumed, ${mins} minutes ${secs} seconds remaining`;
        break;
      }

      case 'completed': {
        const sessionName =
          type === 'work'
            ? 'Focus'
            : type === 'shortBreak'
              ? 'Short Break'
              : 'Long Break';
        message = `${sessionName} session complete. Well done!`;
        break;
      }

      case 'reset': {
        message = 'Timer reset';
        break;
      }
    }

    if (message) {
      announceRef.current.textContent = message;
    }
  }, [lastEvent, type]);

  // Announce mode changes
  useEffect(() => {
    if (!announceRef.current) return;
    if (status !== 'idle') return;

    const sessionName =
      type === 'work'
        ? 'Focus'
        : type === 'shortBreak'
          ? 'Short Break'
          : 'Long Break';

    announceRef.current.textContent = `${sessionName} mode selected`;
  }, [type, status]);
}
