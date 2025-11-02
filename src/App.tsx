import { useEffect } from 'react';
import { useTimer } from './core/timer';
import { FocusStage } from './components/FocusStage';
import { useTimerEvents } from './hooks/useTimerEvents';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useA11yAnnouncements } from './hooks/useA11yAnnouncements';

function App() {
  const status = useTimer((state) => state.status);
  const tick = useTimer((state) => state.tick);

  // Wire up timer events (completion sound, logging, etc.)
  useTimerEvents();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Enable accessibility announcements
  useA11yAnnouncements();

  // Timer tick effect - runs every second when timer is running
  useEffect(() => {
    if (status !== 'running') return;

    const intervalId = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, tick]);

  return <FocusStage />;
}

export default App;

