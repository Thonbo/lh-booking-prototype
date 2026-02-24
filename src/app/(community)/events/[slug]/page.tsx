import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { events } from '@/data/community/events';
import { places } from '@/data/community/places';
import AudienceBadge from '@/components/community/AudienceBadge';

export function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
  if (!event) return { title: 'Event not found' };
  return {
    title: event.title,
    description: event.shortDescription,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  music: 'Music', art: 'Art', theater: 'Theatre', literature: 'Literature',
  film: 'Film', science: 'Science', history: 'History', dance: 'Dance',
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
  if (!event) notFound();

  const place = places.find(p => p.slug === event.placeSlug);
  const isFree = event.price === 0;
  const dateObj = new Date(event.date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="max-w-[--max-w-content] mx-auto px-6 py-12">
      <Link
        href="/events"
        aria-label="Back to all events"
        className="inline-flex items-center gap-1 text-sm text-[--color-brand]
                   hover:underline focus:outline-none focus-visible:ring-3
                   focus-visible:ring-[--color-focus-ring] rounded mb-8"
      >
        ← Back to events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
        {/* Main content */}
        <article className="lg:col-span-2" aria-labelledby="event-title">
          <div className="aspect-video relative rounded-[--radius-card] overflow-hidden mb-8">
            <Image
              src={event.imageUrl}
              alt={`${event.title} — event photo`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <AudienceBadge audience={event.audience} />
            <span className="text-sm font-medium uppercase tracking-wide text-[--color-ink-muted]">
              {CATEGORY_LABELS[event.category]}
            </span>
          </div>

          <h1 id="event-title" className="text-4xl font-bold text-[--color-ink] leading-tight mb-4">
            {event.title}
          </h1>

          {event.ageRange && (
            <p className="text-sm font-medium text-[--color-children] mb-6">
              Suitable for: {event.ageRange}
            </p>
          )}

          <div className="text-[--color-ink] leading-relaxed">
            {event.longDescription.trim().split('\n').map((para, i) => (
              <p key={i} className="mb-4 text-base leading-7">{para.trim()}</p>
            ))}
          </div>

          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {event.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-[--radius-pill] border border-[--color-border]
                             bg-[--color-surface] text-[--color-ink-muted]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside aria-label="Event details" className="lg:col-span-1">
          <div className="border border-[--color-border] rounded-[--radius-card] p-6
                          bg-[--color-surface] sticky top-24">
            <h2 className="text-lg font-semibold text-[--color-ink] mb-4">Event details</h2>

            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="font-semibold text-[--color-ink-muted] uppercase text-xs tracking-wide mb-1">
                  Date &amp; Time
                </dt>
                <dd>
                  <time dateTime={`${event.date}T${event.time}`}>
                    {formattedDate} at {event.time}
                  </time>
                  {event.endTime && ` – ${event.endTime}`}
                </dd>
              </div>

              {place && (
                <div>
                  <dt className="font-semibold text-[--color-ink-muted] uppercase text-xs tracking-wide mb-1">
                    Location
                  </dt>
                  <dd>
                    <Link
                      href={`/places/${place.slug}`}
                      className="font-medium text-[--color-brand] hover:underline
                                 focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded"
                    >
                      {place.name}
                    </Link>
                    <br />
                    <span className="text-[--color-ink-muted]">{place.address}</span>
                  </dd>
                </div>
              )}

              <div>
                <dt className="font-semibold text-[--color-ink-muted] uppercase text-xs tracking-wide mb-1">
                  Price
                </dt>
                <dd className="font-semibold">
                  {isFree
                    ? <span className="text-[--color-brand]">Free admission</span>
                    : `From ${event.price} kr`
                  }
                </dd>
              </div>
            </dl>

            <div
              role="img"
              aria-label={`Map placeholder for ${place?.address ?? 'event location'}`}
              className="mt-6 h-40 rounded-lg bg-[--color-border] flex items-center justify-center
                         text-sm text-[--color-ink-muted]"
            >
              Map coming soon
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
