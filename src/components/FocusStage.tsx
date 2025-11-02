/**
 * FocusStage - Root visual component
 * Contains 5 layers: BackgroundLayer, ModeSwitcher, SessionTitle,
 * TimerDisplay, and ControlButtons - all centered with uniform spacing
 */

import { useTimer } from '@/core/timer';
import { BackgroundLayer } from './BackgroundLayer';
import { Header } from './Header';
import { ModeSwitcher } from './ModeSwitcher';
import { EditableTaskTitle } from './EditableTaskTitle';
import { TimerDisplay } from './TimerDisplay';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryControls } from './SecondaryControls';

export function FocusStage() {

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background layer */}
      <BackgroundLayer />

      {/* Header with branding and quote */}
      <Header />

      {/* Main centered content */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        role="main"
        style={{ zIndex: 10 }}
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

        {/* Primary Action Button */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <PrimaryButton />
        </div>

        {/* Secondary Controls */}
        <SecondaryControls />
      </div>
    </div>
  );
}
