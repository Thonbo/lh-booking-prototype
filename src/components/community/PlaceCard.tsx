import Link from 'next/link';
import Image from 'next/image';
import { Place } from '@/types/community';

const CATEGORY_LABELS: Record<string, string> = {
  library: 'Library',
  museum: 'Museum',
  theater: 'Theatre',
  gallery: 'Gallery',
  'music-venue': 'Music Venue',
  outdoor: 'Outdoor Venue',
};

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article
      className="bg-[--color-surface] border border-[--color-border] rounded-[--radius-card]
                 overflow-hidden shadow-[--shadow-card] hover:shadow-[--shadow-card-hover]
                 transition-shadow group"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={place.imageUrl}
          alt={`Exterior or interior view of ${place.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold tracking-wide uppercase text-[--color-ink-muted] mb-1">
          {CATEGORY_LABELS[place.category]}
        </p>
        <h3 className="text-lg font-semibold text-[--color-ink] mb-2">{place.name}</h3>
        <p className="text-sm text-[--color-ink-muted] leading-relaxed mb-4 line-clamp-3">
          {place.shortDescription}
        </p>
        <p className="text-xs text-[--color-ink-muted] mb-4">{place.address}</p>
        <Link
          href={`/places/${place.slug}`}
          className="text-sm font-semibold text-[--color-brand] hover:underline focus-visible:underline underline-offset-2"
        >
          Explore place
          <span className="sr-only">: {place.name}</span>
        </Link>
      </div>
    </article>
  );
}
