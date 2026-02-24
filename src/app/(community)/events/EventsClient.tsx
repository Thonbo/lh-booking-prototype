'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { events } from '@/data/community/events';
import { EventFilters } from '@/types/community';
import FilterBar from '@/components/community/FilterBar';
import EventCard from '@/components/community/EventCard';

const DEFAULT_FILTERS: EventFilters = {
  audience: 'all',
  category: 'all',
  dateFrom: null,
  dateTo: null,
};

export default function EventsClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<EventFilters>({
    ...DEFAULT_FILTERS,
    audience: (searchParams.get('audience') as EventFilters['audience']) ?? 'all',
  });

  const filtered = useMemo(() => {
    return events
      .filter(e => filters.audience === 'all' || e.audience === filters.audience)
      .filter(e => filters.category === 'all' || e.category === filters.category)
      .filter(e => !filters.dateFrom || e.date >= filters.dateFrom)
      .filter(e => !filters.dateTo   || e.date <= filters.dateTo)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filters]);

  return (
    <>
      <div className="pt-12 pb-4 px-6 max-w-[--max-w-content] mx-auto">
        <h1 className="text-4xl font-bold text-[--color-ink]">Events</h1>
        <p className="text-[--color-ink-muted] mt-2 text-lg">
          Music, art, theatre, science, and more — for every age.
        </p>
      </div>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        totalVisible={filtered.length}
        totalAll={events.length}
      />

      <div className="max-w-[--max-w-content] mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-semibold text-[--color-ink] mb-2">No events match your filters</p>
            <p className="text-[--color-ink-muted]">Try adjusting your audience or category selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
