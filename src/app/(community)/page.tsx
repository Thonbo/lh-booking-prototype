import type { Metadata } from 'next';
import Link from 'next/link';
import { events } from '@/data/community/events';
import { places } from '@/data/community/places';
import EventCard from '@/components/community/EventCard';
import PlaceCard from '@/components/community/PlaceCard';

export const metadata: Metadata = {
  title: 'Community Events — Culture for Everyone',
  description: 'Discover events and cultural places for adults, children, and families.',
};

export default function HomePage() {
  const featuredEvents = events.filter(e => e.featured);
  const featuredPlaces = places.filter(p => p.featured);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="bg-[--color-canvas] py-20 px-6">
        <div className="max-w-[--max-w-content] mx-auto">
          <h1
            id="hero-heading"
            className="text-5xl font-bold text-[--color-ink] leading-tight mb-4 max-w-2xl"
          >
            Culture for<br />everyone in the city
          </h1>
          <p className="text-xl text-[--color-ink-muted] max-w-lg mb-8 leading-relaxed">
            Events for adults, children, and families — music, art, theatre, science, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/events?audience=adults"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[--radius-pill]
                         bg-[--color-brand] text-white text-sm font-semibold
                         hover:bg-[--color-brand-hover] focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring]"
            >
              Adults
            </Link>
            <Link
              href="/events?audience=children"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[--radius-pill]
                         bg-[--color-children] text-white text-sm font-semibold
                         hover:opacity-90 focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring]"
            >
              Children
            </Link>
            <Link
              href="/events?audience=family"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[--radius-pill]
                         bg-[--color-family] text-white text-sm font-semibold
                         hover:opacity-90 focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring]"
            >
              Family
            </Link>
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section aria-labelledby="featured-events-heading" className="py-16 px-6">
        <div className="max-w-[--max-w-content] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 id="featured-events-heading" className="text-3xl font-bold text-[--color-ink]">
              Featured Events
            </h2>
            <Link
              href="/events"
              className="text-sm font-semibold text-[--color-brand] hover:underline
                         focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded"
            >
              View all events
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured places */}
      <section aria-labelledby="featured-places-heading" className="py-16 px-6 bg-[--color-surface]">
        <div className="max-w-[--max-w-content] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 id="featured-places-heading" className="text-3xl font-bold text-[--color-ink]">
              Cultural Places
            </h2>
            <Link
              href="/places"
              className="text-sm font-semibold text-[--color-brand] hover:underline
                         focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded"
            >
              View all places
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
