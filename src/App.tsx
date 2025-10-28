import { useEffect, useState } from 'react';
import { useStore } from './store';
import { BackgroundLayer } from './components/BackgroundLayer';
import { TopBar } from './components/TopBar';
import { FocusCard } from './components/FocusCard';
import { DailyBar } from './components/DailyBar';
import { TaskDrawer } from './components/tasks/TaskDrawer';
import { SettingsModal } from './components/settings/SettingsModal';

function App() {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const tick = useStore((state) => state.tick);
  const status = useStore((state) => state.status);
  const checkDateChange = useStore((state) => state.checkDateChange);
  const theme = useStore((state) => state.theme);

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

  return (
    <div className="min-h-screen relative">
      <BackgroundLayer />
      <TopBar
        onSettingsClick={() => setIsSettingsOpen(true)}
        onTasksClick={() => setIsTaskDrawerOpen(!isTaskDrawerOpen)}
      />
      
      <div className="flex relative z-10">
        {/* Task Drawer */}
        <TaskDrawer
          isOpen={isTaskDrawerOpen}
          onClose={() => setIsTaskDrawerOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <FocusCard />
        </main>
      </div>

      <DailyBar />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default App;

