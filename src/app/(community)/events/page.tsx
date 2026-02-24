import type { Metadata } from 'next';
import { Suspense } from 'react';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Browse all community events for adults, children, and families.',
};

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[--max-w-content] mx-auto px-6 py-20 text-center text-[--color-ink-muted]">
        Loading events…
      </div>
    }>
      <EventsClient />
    </Suspense>
  );
}
