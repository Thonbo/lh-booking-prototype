import Link from 'next/link';
import Image from 'next/image';
import { CommunityEvent } from '@/types/community';
import AudienceBadge from './AudienceBadge';
import { places } from '@/data/community/places';

const CATEGORY_LABELS: Record<string, string> = {
  music: 'Music',
  art: 'Art',
  theater: 'Theatre',
  literature: 'Literature',
  film: 'Film',
  science: 'Science',
  history: 'History',
  dance: 'Dance',
};

function formatEventDate(isoDate: string, time: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  const dateStr = d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return `${dateStr} at ${time}`;
}

interface EventCardProps {
  event: CommunityEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const place = places.find(p => p.slug === event.placeSlug);
  const dateDisplay = formatEventDate(event.date, event.time);
  const isFree = event.price === 0;

  return (
    <article
      className="bg-[--color-surface] border border-[--color-border] rounded-[--radius-card]
                 overflow-hidden shadow-[--shadow-card] transition-shadow
                 hover:shadow-[--shadow-card-hover] group"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={`${event.title} — event image`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <AudienceBadge audience={event.audience} size="sm" />
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold tracking-wide uppercase text-[--color-ink-muted] mb-2">
          {CATEGORY_LABELS[event.category]}
        </p>

        <h3 className="text-lg font-semibold leading-snug text-[--color-ink] mb-2">
          {event.title}
        </h3>

        <p className="text-sm text-[--color-ink-muted] leading-relaxed mb-4 line-clamp-2">
          {event.shortDescription}
        </p>

        <div className="flex flex-col gap-1 text-sm text-[--color-ink-muted] mb-4">
          <time dateTime={`${event.date}T${event.time}`}>
            <span aria-hidden="true">📅 </span>
            {dateDisplay}
          </time>
          {place && (
            <span>
              <span aria-hidden="true">📍 </span>
              {place.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[--color-ink]">
            {isFree ? (
              <span className="text-[--color-brand]">Free</span>
            ) : (
              `From ${event.price} kr`
            )}
          </span>

          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-semibold text-[--color-brand] underline-offset-2
                       hover:underline focus-visible:underline"
          >
            View event
            <span className="sr-only">: {event.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
