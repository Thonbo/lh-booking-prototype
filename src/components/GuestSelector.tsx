'use client';

import copy from '@/copy';

interface GuestSelectorProps {
  adults: number;
  children: number;
  onAdultsChange: (n: number) => void;
  onChildrenChange: (n: number) => void;
  compact?: boolean;
}

function Counter({
  label,
  value,
  onChange,
  min = 0,
  max = 20,
  note,
  compact,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  note?: string;
  compact?: boolean;
}) {
  const btnSize = compact ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-lg';
  const numSize = compact ? 'w-6 text-sm' : 'w-8 text-lg';

  return (
    <div className={`flex items-center justify-between ${compact ? 'py-1.5' : 'py-3'}`}>
      <div>
        <span className={`font-medium text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>{label}</span>
        {note && <p className="text-[10px] text-gray-500">{note}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={`${btnSize} rounded-full border border-gray-300 flex items-center justify-center
                     font-bold text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed
                     hover:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors`}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className={`${numSize} text-center font-semibold tabular-nums`} aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={`${btnSize} rounded-full border border-gray-300 flex items-center justify-center
                     font-bold text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed
                     hover:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors`}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function GuestSelector({
  adults,
  children: childCount,
  onAdultsChange,
  onChildrenChange,
  compact,
}: GuestSelectorProps) {
  return (
    <fieldset>
      <legend className={`font-semibold text-gray-600 mb-1 ${compact ? 'text-xs' : 'text-sm'}`}>{copy.guestsLabel}</legend>
      <div className="divide-y divide-gray-100">
        <Counter label={copy.adults} value={adults} onChange={onAdultsChange} compact={compact} />
        <Counter label={copy.children} value={childCount} onChange={onChildrenChange} note={copy.childrenNote} compact={compact} />
      </div>
    </fieldset>
  );
}
