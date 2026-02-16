import { HotelSuggestion } from '@/types';

export const hotels: HotelSuggestion[] = [
  {
    id: 'hotel-legoland',
    name: 'Hotel LEGOLAND',
    brand: 'lego',
    description: 'Themed rooms and direct access to LEGOLAND. 10 min drive to LEGO House.',
    priceFrom: 1299,
    distanceMin: 10,
  },
  {
    id: 'lalandia',
    name: 'Lalandia Billund',
    brand: 'other',
    description: 'Tropical water park and family resort. Great for longer stays.',
    priceFrom: 999,
    distanceMin: 5,
  },
  {
    id: 'zleep',
    name: 'Zleep Hotel Billund',
    brand: 'other',
    description: 'Modern budget hotel close to Billund city center.',
    priceFrom: 599,
    distanceMin: 8,
  },
  {
    id: 'legoland-holiday',
    name: 'LEGOLAND Holiday Village',
    brand: 'lego',
    description: 'Cabins and themed apartments in the LEGOLAND resort area.',
    priceFrom: 899,
    distanceMin: 12,
  },
];
