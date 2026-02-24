export type EventAudience = 'adults' | 'children' | 'family';

export type EventCategory =
  | 'music'
  | 'art'
  | 'theater'
  | 'literature'
  | 'film'
  | 'science'
  | 'history'
  | 'dance';

export type PlaceCategory =
  | 'library'
  | 'museum'
  | 'theater'
  | 'gallery'
  | 'music-venue'
  | 'outdoor';

export interface CommunityEvent {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  date: string;      // ISO date: "2026-03-21"
  time: string;      // "20:15"
  endTime: string;   // "22:30"
  audience: EventAudience;
  category: EventCategory;
  placeSlug: string;
  price: number;     // 0 = free
  imageUrl: string;
  featured: boolean;
  ageRange?: string; // "4–7 years" — children events only
  tags: string[];
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: PlaceCategory;
  address: string;
  openingHours: string[];
  imageUrl: string;
  website?: string;
  featured: boolean;
}

export interface EventFilters {
  audience: EventAudience | 'all';
  category: EventCategory | 'all';
  dateFrom: string | null;
  dateTo: string | null;
}
