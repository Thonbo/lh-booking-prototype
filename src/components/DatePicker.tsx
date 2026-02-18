'use client';

import { useState } from 'react';
import { getDayInfo } from '@/data/calendar';
import { getTodayISO } from '@/utils/format';

interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  error?: string;
  compact?: boolean;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function DatePicker({ value, onChange, error, compact }: DatePickerProps) {
  const today = getTodayISO();
  const initial = value ? new Date(value + 'T00:00:00') : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };
  const handleToday = () => {
    const d = new Date();
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    onChange(today);
  };

  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div>
      <div className={`bg-white rounded-xl border border-gray-200 ${compact ? 'p-2' : 'p-3'}`}>
        <div className="flex items-center justify-between mb-1.5">
          <button type="button" onClick={prevMonth}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm
                       focus:outline-none focus:ring-1 focus:ring-yellow-400"
            aria-label="Previous month">&#8249;</button>
          <span className="text-xs font-semibold text-gray-800">{monthLabel}</span>
          <button type="button" onClick={nextMonth}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm
                       focus:outline-none focus:ring-1 focus:ring-yellow-400"
            aria-label="Next month">&#8250;</button>
        </div>

        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
          {dayNames.map((d, i) => (
            <div key={i} className="text-center text-xs font-medium text-gray-400 py-0.5">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5" role="grid" aria-label="Calendar">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className={compact ? 'w-7 h-7' : 'w-full aspect-square'} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const info = getDayInfo(dateStr);
            const isPast = dateStr < today;
            const isSelected = dateStr === value;
            const isDisabled = isPast || info.soldOut;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => !isDisabled && onChange(dateStr)}
                disabled={isDisabled}
                className={`
                  ${compact ? 'w-7 h-7 text-xs' : 'w-full aspect-square text-sm'}
                  relative flex items-center justify-center rounded-md
                  transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-400
                  ${isSelected ? 'bg-yellow-400 text-black font-bold' : ''}
                  ${!isSelected && info.isPeak && !isDisabled ? 'bg-orange-50 text-orange-700 font-medium' : ''}
                  ${!isSelected && !info.isPeak && !isDisabled ? 'hover:bg-gray-100 text-gray-800' : ''}
                  ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                  ${info.soldOut ? 'line-through' : ''}
                `}
                aria-label={`${dateStr}${info.isPeak ? ' (busy)' : ''}${info.soldOut ? ' (sold out)' : ''}`}
                role="gridcell"
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-600" role="alert">{error}</p>}
    </div>
  );
}
