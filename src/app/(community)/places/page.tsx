import type { Metadata } from 'next';
import { places } from '@/data/community/places';
import PlaceCard from '@/components/community/PlaceCard';

export const metadata: Metadata = {
  title: 'Cultural Places',
  description: 'Explore libraries, museums, theatres, galleries, and outdoor venues in the city.',
};

export default function PlacesPage() {
  return (
    <div className="max-w-[--max-w-content] mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-[--color-ink]">Cultural Places</h1>
        <p className="text-lg text-[--color-ink-muted] mt-2">
          The venues, galleries, and outdoor spaces where culture happens.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
