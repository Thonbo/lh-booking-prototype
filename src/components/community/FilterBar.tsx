'use client';

import { EventAudience, EventCategory, EventFilters } from '@/types/community';

const AUDIENCE_OPTIONS: { value: EventAudience | 'all'; label: string }[] = [
  { value: 'all',      label: 'All audiences' },
  { value: 'adults',   label: 'Adults' },
  { value: 'children', label: 'Children' },
  { value: 'family',   label: 'Family' },
];

const CATEGORY_OPTIONS: { value: EventCategory | 'all'; label: string }[] = [
  { value: 'all',        label: 'All categories' },
  { value: 'music',      label: 'Music' },
  { value: 'art',        label: 'Art' },
  { value: 'theater',    label: 'Theatre' },
  { value: 'literature', label: 'Literature' },
  { value: 'film',       label: 'Film' },
  { value: 'science',    label: 'Science' },
  { value: 'history',    label: 'History' },
  { value: 'dance',      label: 'Dance' },
];

interface FilterBarProps {
  filters: EventFilters;
  onChange: (filters: EventFilters) => void;
  totalVisible: number;
  totalAll: number;
}

export default function FilterBar({ filters, onChange, totalVisible, totalAll }: FilterBarProps) {
  const update = (patch: Partial<EventFilters>) => onChange({ ...filters, ...patch });
  const isFiltered =
    filters.audience !== 'all' ||
    filters.category !== 'all' ||
    filters.dateFrom !== null ||
    filters.dateTo !== null;

  const selectClass =
    'border border-[--color-border] rounded-[--radius-btn] px-3 py-2 text-sm ' +
    'bg-white text-[--color-ink] focus:outline-none focus-visible:ring-3 ' +
    'focus-visible:ring-[--color-focus-ring]';

  return (
    <section
      aria-label="Filter events"
      className="border-b border-[--color-border] bg-[--color-canvas] sticky top-16 z-30 py-4"
    >
      <div className="max-w-[--max-w-content] mx-auto px-6">
        <div className="flex flex-wrap gap-4 items-end">

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filter-audience"
              className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted]"
            >
              Audience
            </label>
            <select
              id="filter-audience"
              value={filters.audience}
              onChange={e => update({ audience: e.target.value as EventFilters['audience'] })}
              className={selectClass}
            >
              {AUDIENCE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filter-category"
              className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted]"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={filters.category}
              onChange={e => update({ category: e.target.value as EventFilters['category'] })}
              className={selectClass}
            >
              {CATEGORY_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filter-date-from"
              className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted]"
            >
              From date
            </label>
            <input
              id="filter-date-from"
              type="date"
              value={filters.dateFrom ?? ''}
              onChange={e => update({ dateFrom: e.target.value || null })}
              className={selectClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filter-date-to"
              className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted]"
            >
              To date
            </label>
            <input
              id="filter-date-to"
              type="date"
              value={filters.dateTo ?? ''}
              onChange={e => update({ dateTo: e.target.value || null })}
              className={selectClass}
            />
          </div>

          {isFiltered && (
            <button
              onClick={() => onChange({ audience: 'all', category: 'all', dateFrom: null, dateTo: null })}
              className="text-sm text-[--color-brand] underline-offset-2 hover:underline
                         focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring]
                         rounded-[--radius-btn] px-2 py-2 self-end"
            >
              Clear filters
            </button>
          )}

          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm text-[--color-ink-muted] self-end ml-auto"
          >
            {totalVisible === totalAll
              ? `${totalAll} events`
              : `${totalVisible} of ${totalAll} events`}
          </p>
        </div>
      </div>
    </section>
  );
}
