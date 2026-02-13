'use client';

import React from 'react';
import { GuestCounts } from '@/types';
import { COPY } from '@/copy';

interface GuestsPickerProps {
  guests: GuestCounts;
  onChange: (guests: GuestCounts) => void;
}

function Counter({
  label,
  age,
  value,
  min,
  onChange,
  note,
}: {
  label: string;
  age: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <span className="text-sm font-medium text-gray-800">{label}</span>
        <span className="text-xs text-gray-500 ml-1">{age}</span>
        {note && <span className="text-xs text-green-600 ml-1">({note})</span>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function GuestsPicker({ guests, onChange }: GuestsPickerProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{COPY.guests.title}</h4>
      <Counter
        label={COPY.guests.adults}
        age={COPY.guests.adultsAge}
        value={guests.adults}
        min={1}
        onChange={(v) => onChange({ ...guests, adults: v })}
      />
      <Counter
        label={COPY.guests.children}
        age={COPY.guests.childrenAge}
        value={guests.children}
        min={0}
        onChange={(v) => onChange({ ...guests, children: v })}
      />
      <Counter
        label={COPY.guests.infants}
        age={COPY.guests.infantsAge}
        value={guests.infants}
        min={0}
        onChange={(v) => onChange({ ...guests, infants: v })}
        note={COPY.guests.infantsFree}
      />
    </div>
  );
}
