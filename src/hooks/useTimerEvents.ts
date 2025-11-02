/**
 * useTimerEvents - Hook to react to timer events
 * Handles completion effects, state changes, and UI updates
 */

import { useEffect } from 'react';
import { useTimer } from '@/core/timer';

/**
 * Play a subtle completion sound (Web Audio API)
 */
function playCompletionSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;

    // Create a short beep: two tones ascending
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gain = audioContext.createGain();

    gain.connect(audioContext.destination);
    osc1.connect(gain);
    osc2.connect(gain);

    // First tone: 600 Hz
    osc1.frequency.value = 600;
    osc1.start(now);
    osc1.stop(now + 0.1);

    // Second tone: 800 Hz (offset slightly)
    osc2.frequency.value = 800;
    osc2.start(now + 0.1);
    osc2.stop(now + 0.2);

    // Volume envelope
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  } catch (e) {
    console.log('Audio context not available:', e);
  }
}

/**
 * Hook to handle timer events
 */
export function useTimerEvents() {
  const lastEvent = useTimer((state) => state.lastEvent);

  useEffect(() => {
    if (!lastEvent) return;

    switch (lastEvent.type) {
      case 'started': {
        console.log(
          `Timer started: ${lastEvent.sessionType} for ${lastEvent.duration}s`
        );
        // Could dispatch analytics event here
        break;
      }

      case 'paused': {
        console.log(`Timer paused: ${lastEvent.remaining}s remaining`);
        break;
      }

      case 'resumed': {
        console.log(`Timer resumed: ${lastEvent.remaining}s remaining`);
        break;
      }

      case 'completed': {
        console.log('Timer completed!');
        playCompletionSound();
        // Could show a notification or animation here
        break;
      }

      case 'reset': {
        console.log('Timer reset');
        break;
      }
    }
  }, [lastEvent]);
}
