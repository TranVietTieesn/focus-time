/**
 * FocusStage - Root visual component
 * Contains 5 layers: BackgroundLayer, ModeSwitcher, SessionTitle,
 * TimerDisplay, and ControlButtons - all centered with uniform spacing
 */

import { BackgroundLayer } from './BackgroundLayer';
import { Header } from './Header';
import { ModeSwitcher } from './ModeSwitcher';
import { EditableTaskTitle } from './EditableTaskTitle';
import { TimerDisplay } from './TimerDisplay';
import { UnifiedActionButton } from './UnifiedActionButton';
import { FloatingAudioControls } from './FloatingAudioControls';

export function FocusStage() {

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background layer - zIndex: 0 */}
      <BackgroundLayer />

      {/* Header with branding and quote - zIndex: 20 */}
      <Header />

      {/* Floating Audio Controls - Bottom Left - zIndex: 50 */}
      <FloatingAudioControls />

      {/* Main centered content - zIndex: 30 (above background, below highest modals) */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        role="main"
        style={{ zIndex: 30 }}
      >
        {/* Mode Switcher */}
        <div style={{ marginBottom: 'var(--space-20)' }}>
          <ModeSwitcher />
        </div>

        {/* Session Title - Editable */}
        <EditableTaskTitle />

        {/* Timer Display */}
        <div style={{ marginBottom: 'var(--space-20)' }}>
          <TimerDisplay />
        </div>

        {/* Unified Action Button (Start/Pause/Resume) + Controls */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <UnifiedActionButton />
        </div>
      </div>
    </div>
  );
}
