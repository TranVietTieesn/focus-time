/**
 * Duration Input - Reusable number input for duration settings
 */

interface DurationInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  unit: string;
}

export function DurationInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: DurationInputProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm text-white/80 font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className="
            w-20 px-3 py-2 rounded-lg text-center
            bg-white/10 border border-white/20
            text-white
            focus:outline-none focus:ring-2 focus:ring-primary
            transition-all
          "
        />
        <span className="text-sm text-white/60 w-16">{unit}</span>
      </div>
    </div>
  );
}

