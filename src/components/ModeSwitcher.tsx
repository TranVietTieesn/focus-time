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
          background: 'linear-gradient(135deg, #5068d9 0%, #4157c9 100%)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 4px 16px rgba(80, 123, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          cursor: 'default',
        };
      }
      return {
        background: 'transparent',
        color: '#999999',
        border: '1px solid #666666',
        boxShadow: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      };
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        if (isActive) {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(80, 123, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
        } else {
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(75, 107, 251, 0.3)';
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (isActive) {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(80, 123, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
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
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.borderColor = '#888888';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#666666';
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
    >
      <div
        className="inline-flex"
        style={{
          gap: '0',
          padding: '4px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <ModeButton mode="work" label="Focus" />
        <ModeButton mode="shortBreak" label="Short Break" />
        <ModeButton mode="longBreak" label="Long Break" />
      </div>
    </div>
  );
}

