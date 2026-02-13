'use client';

import React, { useState, useMemo } from 'react';

interface DatePickerProps {
  selected: string | null;
  onSelect: (date: string) => void;
  onSelectToday?: () => void;
  showSameDatePill?: boolean;
  onSameDate?: () => void;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function toISODate(d: Date) {
  return d.toISOString().split('T')[0];
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DatePicker({
  selected,
  onSelect,
  onSelectToday,
  showSameDatePill,
  onSameDate,
}: DatePickerProps) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const todayISO = toISODate(today);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  // Convert Sunday=0 to Monday-based: Mon=0 .. Sun=6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const totalDays = daysInMonth(viewYear, viewMonth);

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  }

  function dateISO(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  return (
    <div className="w-full">
      {/* Pills */}
      <div className="flex gap-2 mb-3">
        {onSelectToday && (
          <button
            type="button"
            onClick={() => {
              onSelectToday();
              onSelect(todayISO);
            }}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Select today
          </button>
        )}
        {showSameDatePill && onSameDate && (
          <button
            type="button"
            onClick={onSameDate}
            className="px-3 py-1 text-sm rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
          >
            Same date
          </button>
        )}
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-800">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const iso = dateISO(day);
          const disabled = isDisabled(day);
          const isSelected = selected === iso;
          const isToday = iso === todayISO;

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              className={`
                w-full aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                ${isSelected ? 'bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500' : ''}
                ${isToday && !isSelected ? 'ring-1 ring-yellow-400' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
