/**
 * ModeSwitcher - Session type selector
 * Segmented control: Work, Short Break, Long Break
 */

import { useTimer, SessionType } from '@/core/timer';

const DEFAULT_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function ModeSwitcher() {
  const type = useTimer((state) => state.type);
  const status = useTimer((state) => state.status);
  const start = useTimer((state) => state.start);

  const isDisabled = status === 'running';

  const handleModeChange = (newType: SessionType) => {
    if (isDisabled || type === newType) return;
    start(newType, DEFAULT_DURATIONS[newType]);
  };

  const ModeButton = ({
    mode,
    label,
  }: {
    mode: SessionType;
    label: string;
  }) => {
    const isActive = type === mode;
    const baseClasses =
      'min-h-[48px] px-8 py-3 font-semibold text-base text-white transition-all duration-300 focus-ring';

    const borderRadius =
      mode === 'work'
        ? '999px 0 0 999px'
        : mode === 'longBreak'
          ? '0 999px 999px 0'
          : '0';

    const getButtonStyle = () => {
      if (isActive) {
        return {
          background: 'var(--gradient-primary)',
          boxShadow: 'var(--glow-button-primary)',
          transform: 'translateY(-1px)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: 'none',
        };
      }
      return {
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      };
    };

    return (
      <button
        onClick={() => handleModeChange(mode)}
        disabled={isDisabled}
        aria-pressed={isActive}
        className={baseClasses}
        style={{
          borderRadius,
          ...getButtonStyle(),
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="flex justify-center mb-8 md:mb-12"
      role="group"
      aria-label="Session type selector"
    >
      <div className="inline-flex" style={{ gap: '2px' }}>
        <ModeButton mode="work" label="Focus" />
        <ModeButton mode="shortBreak" label="Short Break" />
        <ModeButton mode="longBreak" label="Long Break" />
      </div>
    </div>
  );
}

