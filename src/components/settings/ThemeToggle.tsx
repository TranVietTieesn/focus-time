/**
 * Theme Toggle - Radio button group for theme selection
 */

import type { Theme } from '@/types';

interface ThemeToggleProps {
  value: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'auto', label: 'Auto', icon: '🌓' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
  ];

  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Theme selection">
      {themes.map((theme) => (
        <button
          key={theme.value}
          type="button"
          onClick={() => onChange(theme.value)}
          role="radio"
          aria-checked={value === theme.value}
          className={`
            flex-1 px-4 py-3 rounded-lg
            border-2 transition-all
            focus-ring
            ${
              value === theme.value
                ? 'border-primary bg-primary/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">{theme.icon}</span>
            <span className="text-sm font-medium">{theme.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

