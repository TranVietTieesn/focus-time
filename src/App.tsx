import { useEffect, useState, lazy, Suspense } from 'react';
import { useStore } from './store';
import { BackgroundLayer } from './components/BackgroundLayer';
import { BrandingHeader } from './components/BrandingHeader';
import { FocusCard } from './components/FocusCard';

// Lazy load heavy components for better performance
const TaskDrawer = lazy(() => import('./components/tasks/TaskDrawer').then(m => ({ default: m.TaskDrawer })));
const SettingsModal = lazy(() => import('./components/settings/SettingsModal').then(m => ({ default: m.SettingsModal })));

function App() {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [manuallyOpened, setManuallyOpened] = useState(false);

  const tick = useStore((state) => state.tick);
  const status = useStore((state) => state.status);
  const checkDateChange = useStore((state) => state.checkDateChange);
  const theme = useStore((state) => state.theme);
  const restoreSession = useStore((state) => state.restoreSession);
  const clearSnapshot = useStore((state) => state.clearSnapshot);
  const resume = useStore((state) => state.resume);

  // Theme application effect
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto mode: check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Timer tick effect
  useEffect(() => {
    if (status !== 'running') return;

    const intervalId = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, tick]);

  // Check date change on mount
  useEffect(() => {
    checkDateChange();
  }, [checkDateChange]);

  // Check for interrupted session on mount
  useEffect(() => {
    const hasSession = restoreSession();
    if (hasSession) {
      setShowResumePrompt(true);
    }
  }, [restoreSession]);

  // VTea UI Makeover: Auto-hide task drawer when timer starts
  useEffect(() => {
    if (status === 'running' && !manuallyOpened) {
      setIsTaskDrawerOpen(false);
    }
  }, [status, manuallyOpened]);

  // Handle visibility change (background tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && status === 'running') {
        // Force recalculate when tab becomes visible
        tick();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [status, tick]);

  const handleResumeSession = () => {
    resume();
    setShowResumePrompt(false);
  };

  const handleDiscardSession = () => {
    clearSnapshot();
    setShowResumePrompt(false);
  };

  const handleTaskDrawerToggle = () => {
    const newState = !isTaskDrawerOpen;
    setIsTaskDrawerOpen(newState);
    if (status === 'running' && newState) {
      setManuallyOpened(true);
    } else {
      setManuallyOpened(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus-ring"
      >
        Skip to main content
      </a>

      {/* Full-bleed immersive background (z-0) */}
      <BackgroundLayer />

      {/* Minimalist header - VTea wordmark + rotating affirmation, fades during session (z-20) */}
      <BrandingHeader />

      {/* Main immersive content area - centered, full viewport (z-10) */}
      {/* Top padding accounts for minimalist header (z-20) */}
      <main
        id="main-content"
        className="fixed inset-0 flex flex-col items-center justify-center pt-20 md:pt-24 pb-0"
        role="main"
      >
        <FocusCard />
      </main>

      {/* Task Drawer - overlay/side sheet (z-25) - Lazy loaded */}
      <Suspense fallback={null}>
        <TaskDrawer
          isOpen={isTaskDrawerOpen}
          onClose={() => setIsTaskDrawerOpen(false)}
        />
      </Suspense>

      {/* Settings Modal - overlay (z-50) - Lazy loaded */}
      <Suspense fallback={null}>
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </Suspense>

      {/* Resume Session Prompt - overlay (z-50) */}
      {showResumePrompt && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-3">Resume Session?</h2>
            <p className="text-white/80 mb-6">
              You have an interrupted session. Would you like to continue where you left off?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDiscardSession}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors focus-ring"
              >
                Discard
              </button>
              <button
                onClick={handleResumeSession}
                className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors focus-ring"
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

