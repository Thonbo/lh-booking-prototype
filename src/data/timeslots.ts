import { Timeslot, LmaTimeslot, RestaurantSlot } from '@/types';

export const zoneTimeslots: Timeslot[] = [
  { id: 'z-0900', time: '09:00', label: '09:00 – Morning', priceFactor: 1.0, soldOut: false },
  { id: 'z-1000', time: '10:00', label: '10:00 – Morning', priceFactor: 1.0, soldOut: false },
  { id: 'z-1100', time: '11:00', label: '11:00 – Late morning', priceFactor: 0.95, soldOut: false },
  { id: 'z-1200', time: '12:00', label: '12:00 – Midday', priceFactor: 0.9, soldOut: false },
  { id: 'z-1300', time: '13:00', label: '13:00 – Afternoon', priceFactor: 0.85, soldOut: false },
  { id: 'z-1400', time: '14:00', label: '14:00 – Afternoon', priceFactor: 0.8, soldOut: false },
  { id: 'z-1500', time: '15:00', label: '15:00 – Late afternoon', priceFactor: 0.75, soldOut: true },
];

export const lmaTimeslots: LmaTimeslot[] = [
  // Play Agent
  { id: 'lma-1000-pa', time: '10:00', label: '10:00 – Play Agent', priceFactor: 1.0, soldOut: false, levelId: 'play-agent', spotsLeft: 8 },
  { id: 'lma-1300-pa', time: '13:00', label: '13:00 – Play Agent', priceFactor: 1.0, soldOut: true, levelId: 'play-agent', spotsLeft: 0 },
  { id: 'lma-1500-pa', time: '15:00', label: '15:00 – Play Agent', priceFactor: 1.0, soldOut: false, levelId: 'play-agent', spotsLeft: 3 },
  // Master Builder
  { id: 'lma-1000-mb', time: '10:00', label: '10:00 – Master Builder', priceFactor: 1.0, soldOut: false, levelId: 'master-builder', spotsLeft: 4 },
  { id: 'lma-1300-mb', time: '13:00', label: '13:00 – Master Builder', priceFactor: 1.0, soldOut: false, levelId: 'master-builder', spotsLeft: 6 },
  { id: 'lma-1500-mb', time: '15:00', label: '15:00 – Master Builder', priceFactor: 1.0, soldOut: true, levelId: 'master-builder', spotsLeft: 0 },
  // Creative Lab
  { id: 'lma-1100-cl', time: '11:00', label: '11:00 – Creative Lab', priceFactor: 1.0, soldOut: false, levelId: 'creative-lab', spotsLeft: 10 },
  { id: 'lma-1400-cl', time: '14:00', label: '14:00 – Creative Lab', priceFactor: 1.0, soldOut: false, levelId: 'creative-lab', spotsLeft: 5 },
  // Story Makers
  { id: 'lma-1000-sm', time: '10:00', label: '10:00 – Story Makers', priceFactor: 1.0, soldOut: false, levelId: 'story-makers', spotsLeft: 6 },
  { id: 'lma-1300-sm', time: '13:00', label: '13:00 – Story Makers', priceFactor: 1.0, soldOut: false, levelId: 'story-makers', spotsLeft: 2 },
  { id: 'lma-1500-sm', time: '15:00', label: '15:00 – Story Makers', priceFactor: 1.0, soldOut: true, levelId: 'story-makers', spotsLeft: 0 },
];

export const restaurantSlots: RestaurantSlot[] = [
  { id: 'r-1130', time: '11:30', label: '11:30', spotsLeft: 4 },
  { id: 'r-1200', time: '12:00', label: '12:00', spotsLeft: 0 },
  { id: 'r-1230', time: '12:30', label: '12:30', spotsLeft: 2 },
  { id: 'r-1300', time: '13:00', label: '13:00', spotsLeft: 6 },
  { id: 'r-1730', time: '17:30', label: '17:30', spotsLeft: 8 },
  { id: 'r-1800', time: '18:00', label: '18:00', spotsLeft: 3 },
  { id: 'r-1830', time: '18:30', label: '18:30', spotsLeft: 0 },
];
