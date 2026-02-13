import { Timeslot } from '@/types';

export const ZONES_TIMESLOTS: Timeslot[] = [
  { id: 'z-0900', time: '09:00', available: true },
  { id: 'z-0930', time: '09:30', available: true },
  { id: 'z-1000', time: '10:00', available: true },
  { id: 'z-1030', time: '10:30', available: true },
  { id: 'z-1100', time: '11:00', available: true },
  { id: 'z-1130', time: '11:30', available: true },
  { id: 'z-1200', time: '12:00', available: true },
  { id: 'z-1230', time: '12:30', available: true },
  { id: 'z-1300', time: '13:00', available: true },
  { id: 'z-1330', time: '13:30', available: true },
  { id: 'z-1400', time: '14:00', available: true },
  { id: 'z-1430', time: '14:30', available: true },
  { id: 'z-1500', time: '15:00', available: true },
  { id: 'z-1530', time: '15:30', available: true },
  { id: 'z-1600', time: '16:00', available: true },
];

export const LMA_TIMESLOTS: Record<string, Timeslot[]> = {
  open: [
    { id: 'lma-o-1000', time: '10:00', available: true },
    { id: 'lma-o-1100', time: '11:00', available: true },
    { id: 'lma-o-1200', time: '12:00', available: true },
    { id: 'lma-o-1300', time: '13:00', available: true },
    { id: 'lma-o-1400', time: '14:00', available: true },
    { id: 'lma-o-1500', time: '15:00', available: true },
  ],
  guided: [
    { id: 'lma-g-1000', time: '10:00', available: true },
    { id: 'lma-g-1130', time: '11:30', available: true },
    { id: 'lma-g-1300', time: '13:00', available: true },
    { id: 'lma-g-1430', time: '14:30', available: true },
  ],
  expert: [
    { id: 'lma-e-1000', time: '10:00', available: true },
    { id: 'lma-e-1200', time: '12:00', available: true },
    { id: 'lma-e-1400', time: '14:00', available: true },
  ],
  masterclass: [
    { id: 'lma-m-1000', time: '10:00', available: true },
    { id: 'lma-m-1300', time: '13:00', available: true },
  ],
};
