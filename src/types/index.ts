// ─── Domain Types ───────────────────────────────────────────

export interface Zone {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface Timeslot {
  id: string;
  time: string;
  label: string;
  priceFactor: number;
  soldOut: boolean;
}

export interface LmaLevel {
  id: string;
  name: string;
  description: string;
  priceAdult: number;
  priceChild: number;
}

export interface LmaTimeslot extends Timeslot {
  levelId: string;
  spotsLeft: number;
}

export interface RestaurantSlot {
  id: string;
  time: string;
  label: string;
  spotsLeft: number;
}

export interface HotelSuggestion {
  id: string;
  name: string;
  brand: 'lego' | 'other';
  description: string;
  priceFrom: number;
  distanceMin: number;
}

// ─── Cart / Booking State ───────────────────────────────────

export interface TicketSelection {
  adults: number;
  children: number;
}

export interface ZonesBooking {
  enabled: boolean;
  date: string | null;
  tickets: TicketSelection;
  timeslotId: string | null;
}

export interface LmaBooking {
  enabled: boolean;
  date: string | null;
  tickets: TicketSelection;
  timeslotId: string | null;
  levelId: string | null;
}

export interface RestaurantBooking {
  enabled: boolean;
  date: string | null;
  guests: number;
  slotId: string | null;
}

export interface AnnualPassUpgrade {
  enabled: boolean;
}

export interface Cart {
  zones: ZonesBooking;
  lma: LmaBooking;
  addOns: {
    annualPass: AnnualPassUpgrade;
    restaurant: RestaurantBooking;
  };
  customer: CustomerInfo;
}

export interface CustomerInfo {
  name: string;
  email: string;
  country: string;
  zip: string;
}

export interface CartTotal {
  subtotal: number;
  items: CartLineItem[];
}

export interface CartLineItem {
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// ─── Feature Flags ──────────────────────────────────────────

export interface FeatureFlags {
  ALWAYS_ASK_TIMESLOT_FOR_ZONES: boolean;
  SMART_TIMESLOT: boolean;
}

// ─── Flow (2 steps: checkout + success) ─────────────────────

export type BookingStep =
  | 'checkout'  // select products + pay (single page)
  | 'success';  // receipt + upsells

// ─── Peak Calendar ──────────────────────────────────────────

export interface DayInfo {
  date: string;
  isPeak: boolean;
  soldOut: boolean;
}
