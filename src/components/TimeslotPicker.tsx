'use client';

import React from 'react';
import { Timeslot } from '@/types';
import { COPY } from '@/copy';

interface TimeslotPickerProps {
  timeslots: Timeslot[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function TimeslotPicker({ timeslots, selected, onSelect }: TimeslotPickerProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{COPY.datePicker.timeslot}</h4>
      <div className="flex flex-wrap gap-2">
        {timeslots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.available}
            onClick={() => onSelect(slot.id)}
            className={`
              px-3 py-1.5 text-sm rounded-lg border transition-colors
              ${selected === slot.id ? 'bg-yellow-400 border-yellow-500 font-semibold' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
              ${!slot.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}
