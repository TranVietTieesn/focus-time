/**
 * ModeSwitcher - Flocus-style segmented control
 * Work / Short Break / Long Break selector
 * Active = filled gradient, Inactive = outline, Hover = soft fill
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
    const borderRadius =
      mode === 'work'
        ? 'var(--radius-full) 0 0 var(--radius-full)'
        : mode === 'longBreak'
          ? '0 var(--radius-full) var(--radius-full) 0'
          : '0';

    const getStyle = () => {
      if (isActive) {
        return {
          background: 'var(--gradient-mode-active)',
          color: '#ffffff',
          border: 'none',
          boxShadow: 'var(--glow-mode-active)',
          cursor: 'default',
        };
      }
      return {
        background: 'transparent',
        color: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      };
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        if (isActive) {
          e.currentTarget.style.boxShadow = '0 0 25px rgba(75, 107, 251, 0.6), 0 0 50px rgba(128, 93, 255, 0.4)';
        } else {
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(128, 93, 255, 0.4)';
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (isActive) {
        e.currentTarget.style.boxShadow = 'var(--glow-mode-active)';
      } else {
        e.currentTarget.style.boxShadow = 'none';
      }
    };

    return (
      <button
        onClick={() => handleModeChange(mode)}
        disabled={isDisabled}
        aria-pressed={isActive}
        className="min-h-[48px] px-8 py-3 font-semibold text-base transition-all duration-200 focus-ring"
        style={{
          borderRadius,
          ...getStyle(),
          opacity: isDisabled ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.background = 'rgba(160, 120, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(160, 120, 255, 0.3)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
      style={{
        animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards',
      }}
    >
      <div
        className="inline-flex"
        style={{
          gap: '0',
          padding: '4px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(160, 120, 255, 0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <ModeButton mode="work" label="Focus" />
        <ModeButton mode="shortBreak" label="Short Break" />
        <ModeButton mode="longBreak" label="Long Break" />
      </div>
    </div>
  );
}

