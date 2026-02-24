import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { places } from '@/data/community/places';
import { events } from '@/data/community/events';
import EventCard from '@/components/community/EventCard';

export function generateStaticParams() {
  return places.map(place => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = places.find(p => p.slug === slug);
  if (!place) return { title: 'Place not found' };
  return {
    title: place.name,
    description: place.shortDescription,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  library: 'Library', museum: 'Museum', theater: 'Theatre',
  gallery: 'Gallery', 'music-venue': 'Music Venue', outdoor: 'Outdoor Venue',
};

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find(p => p.slug === slug);
  if (!place) notFound();

  const upcomingEvents = events
    .filter(e => e.placeSlug === place.slug)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="max-w-[--max-w-content] mx-auto px-6 py-12">
      <Link
        href="/places"
        aria-label="Back to all places"
        className="inline-flex items-center gap-1 text-sm text-[--color-brand]
                   hover:underline focus:outline-none focus-visible:ring-3
                   focus-visible:ring-[--color-focus-ring] rounded mb-8"
      >
        ← Back to places
      </Link>

      <div className="aspect-video relative rounded-[--radius-card] overflow-hidden mb-10 mt-4">
        <Image
          src={place.imageUrl}
          alt={`View of ${place.name}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-[--color-ink] mb-2">{place.name}</h1>
          <p className="text-sm font-semibold uppercase tracking-wide text-[--color-ink-muted] mb-6">
            {CATEGORY_LABELS[place.category]}
          </p>
          {place.longDescription.trim().split('\n').map((para, i) => (
            <p key={i} className="text-base leading-7 text-[--color-ink] mb-4">{para.trim()}</p>
          ))}

          {upcomingEvents.length > 0 && (
            <section aria-labelledby="place-events-heading" className="mt-12">
              <h2 id="place-events-heading" className="text-2xl font-bold text-[--color-ink] mb-6">
                Upcoming events here
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside aria-label="Place information">
          <div className="border border-[--color-border] rounded-[--radius-card] p-6 bg-[--color-surface] sticky top-24">
            <h2 className="text-lg font-semibold text-[--color-ink] mb-4">Visit information</h2>
            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted] mb-1">
                  Address
                </dt>
                <dd className="text-[--color-ink]">{place.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted] mb-1">
                  Opening Hours
                </dt>
                <dd>
                  <ul className="flex flex-col gap-1 list-none p-0">
                    {place.openingHours.map((h, i) => (
                      <li key={i} className="text-[--color-ink]">{h}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {place.website && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[--color-ink-muted] mb-1">
                    Website
                  </dt>
                  <dd>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--color-brand] hover:underline focus:outline-none
                                 focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded"
                    >
                      Visit website
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
