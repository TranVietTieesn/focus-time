/**
 * Settings Modal - User preferences for durations and theme
 */

import { useState, FormEvent } from 'react';
import { useStore } from '@/store';
import { Modal } from '../ui/Modal';
import { DurationInput } from './DurationInput';
import { ThemeToggle } from './ThemeToggle';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const workMin = useStore((state) => state.workMin);
  const shortBreakMin = useStore((state) => state.shortBreakMin);
  const longBreakMin = useStore((state) => state.longBreakMin);
  const sessionsBeforeLongBreak = useStore((state) => state.sessionsBeforeLongBreak);
  const theme = useStore((state) => state.theme);

  const setWorkMin = useStore((state) => state.setWorkMin);
  const setShortBreakMin = useStore((state) => state.setShortBreakMin);
  const setLongBreakMin = useStore((state) => state.setLongBreakMin);
  const setSessionsBeforeLongBreak = useStore((state) => state.setSessionsBeforeLongBreak);
  const setTheme = useStore((state) => state.setTheme);
  const resetToDefaults = useStore((state) => state.resetToDefaults);

  const [localWorkMin, setLocalWorkMin] = useState(workMin.toString());
  const [localShortBreak, setLocalShortBreak] = useState(shortBreakMin.toString());
  const [localLongBreak, setLocalLongBreak] = useState(longBreakMin.toString());
  const [localSessions, setLocalSessions] = useState(sessionsBeforeLongBreak.toString());
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setWorkMin(parseInt(localWorkMin, 10));
      setShortBreakMin(parseInt(localShortBreak, 10));
      setLongBreakMin(parseInt(localLongBreak, 10));
      setSessionsBeforeLongBreak(parseInt(localSessions, 10));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid settings');
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setLocalWorkMin('25');
    setLocalShortBreak('5');
    setLocalLongBreak('15');
    setLocalSessions('4');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Duration Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
            Timer Durations
          </h3>

          <DurationInput
            id="work-duration"
            label="Work Session"
            value={localWorkMin}
            onChange={setLocalWorkMin}
            min={1}
            max={120}
            unit="minutes"
          />

          <DurationInput
            id="short-break-duration"
            label="Short Break"
            value={localShortBreak}
            onChange={setLocalShortBreak}
            min={1}
            max={30}
            unit="minutes"
          />

          <DurationInput
            id="long-break-duration"
            label="Long Break"
            value={localLongBreak}
            onChange={setLocalLongBreak}
            min={1}
            max={60}
            unit="minutes"
          />

          <DurationInput
            id="sessions-before-long"
            label="Sessions Before Long Break"
            value={localSessions}
            onChange={setLocalSessions}
            min={2}
            max={8}
            unit="sessions"
          />
        </div>

        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
            Appearance
          </h3>
          <ThemeToggle value={theme} onChange={setTheme} />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 px-4 py-2 rounded-lg
                bg-white/10 hover:bg-white/20
                text-white font-medium
                transition-colors focus-ring
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                flex-1 px-4 py-2 rounded-lg
                bg-primary hover:bg-primary-dark
                text-white font-medium
                transition-colors focus-ring
              "
            >
              Save Changes
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/5 hover:bg-white/10
              text-white/70 hover:text-white
              text-sm font-medium
              transition-colors focus-ring
            "
          >
            Reset to Defaults
          </button>
        </div>
      </form>
    </Modal>
  );
}

