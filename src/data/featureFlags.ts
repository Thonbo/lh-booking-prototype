import { FeatureFlags } from '@/types';

export const featureFlags: FeatureFlags = {
  // true  → always ask for a timeslot when booking zones
  // false → only ask on peak days (when SMART_TIMESLOT is true)
  ALWAYS_ASK_TIMESLOT_FOR_ZONES: false,

  // true  → ask for timeslot only on peak / high-capacity days
  // false → never ask (unless ALWAYS_ASK above is true)
  SMART_TIMESLOT: true,
};
