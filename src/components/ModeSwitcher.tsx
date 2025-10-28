/**
 * ModeSwitcher - Segmented control for session type selection
 * VTea UI Makeover: Pill-style buttons for Focus/Short Break/Long Break
 */

import { useStore } from '@/store';
import { minutesToSeconds } from '@/lib/time';

export function ModeSwitcher() {
  const type = useStore((state) => state.type);
  const status = useStore((state) => state.status);
  const start = useStore((state) => state.start);
  const workMin = useStore((state) => state.workMin);
  const shortBreakMin = useStore((state) => state.shortBreakMin);
  const longBreakMin = useStore((state) => state.longBreakMin);

  const isDisabled = status === 'running';

  const handleModeChange = (newType: 'work' | 'shortBreak' | 'longBreak') => {
    if (isDisabled || type === newType) return;
    
    const durations = {
      work: workMin,
      shortBreak: shortBreakMin,
      longBreak: longBreakMin,
    };
    
    start(newType, minutesToSeconds(durations[newType]));
  };

  const getModeColor = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    if (mode === 'work') return '#4B6BFB';
    if (mode === 'shortBreak') return '#FF89BB';
    return '#10B981';
  };

  const ModeButton = ({ 
    mode, 
    label 
  }: { 
    mode: 'work' | 'shortBreak' | 'longBreak'; 
    label: string;
  }) => {
    const isActive = type === mode;
    const baseClasses = "min-h-[44px] px-4 py-2 font-medium text-sm md:text-base transition-all duration-200 touch-manipulation";
    
    const activeStyle = {
      backgroundColor: getModeColor(mode),
      color: 'rgba(255, 255, 255, 1.0)',
      border: 'none',
    };
    
    const inactiveStyle = {
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    };
    
    const hoverStyle = !isActive && !isDisabled ? {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.4)',
    } : {};
    
    const disabledStyle = isDisabled ? {
      opacity: 0.5,
      cursor: 'not-allowed',
    } : {};

    return (
      <button
        onClick={() => handleModeChange(mode)}
        disabled={isDisabled}
        aria-pressed={isActive}
        className={`${baseClasses} focus-ring`}
        style={{
          ...(isActive ? activeStyle : inactiveStyle),
          ...disabledStyle,
          borderRadius: mode === 'work' ? '999px 0 0 999px' : 
                       mode === 'longBreak' ? '0 999px 999px 0' : '0',
        }}
        onMouseEnter={(e) => {
          if (!isActive && !isDisabled) {
            Object.assign(e.currentTarget.style, hoverStyle);
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !isDisabled) {
            Object.assign(e.currentTarget.style, inactiveStyle);
          }
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div 
      className="flex justify-center mb-6"
      role="group"
      aria-label="Session type selector"
    >
      <div className="inline-flex" style={{ gap: '1px' }}>
        <ModeButton mode="work" label="Focus" />
        <ModeButton mode="shortBreak" label="Short Break" />
        <ModeButton mode="longBreak" label="Long Break" />
      </div>
    </div>
  );
}

