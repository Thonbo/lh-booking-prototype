export type BookingStep = 'checkout' | 'success';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  zip: string;
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

export interface LmaLevel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number; // per person
  readMoreUrl: string;
  image: string;
}

export interface Timeslot {
  id: string;
  time: string;
  available: boolean;
}

export interface ProductConfig {
  enabled: boolean;
  guests: GuestCounts;
  date: string | null; // ISO date string
  timeslot: string | null;
}

export interface ZonesConfig extends ProductConfig {
  annualPass: boolean;
}

export interface LmaConfig extends ProductConfig {
  levelId: string | null;
}

export interface CartLineItem {
  product: string;
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BookingState {
  step: BookingStep;
  zones: ZonesConfig;
  lma: LmaConfig;
  customer: CustomerInfo;
  paymentModalOpen: boolean;
}

export type BookingAction =
  | { type: 'SET_STEP'; step: BookingStep }
  | { type: 'TOGGLE_ZONES' }
  | { type: 'TOGGLE_LMA' }
  | { type: 'SET_ZONES_GUESTS'; guests: GuestCounts }
  | { type: 'SET_LMA_GUESTS'; guests: GuestCounts }
  | { type: 'SET_ZONES_DATE'; date: string | null }
  | { type: 'SET_LMA_DATE'; date: string | null }
  | { type: 'SET_ZONES_TIMESLOT'; timeslot: string | null }
  | { type: 'SET_LMA_TIMESLOT'; timeslot: string | null }
  | { type: 'SET_LMA_LEVEL'; levelId: string | null }
  | { type: 'TOGGLE_ANNUAL_PASS' }
  | { type: 'SYNC_LMA_DATE' }
  | { type: 'SET_CUSTOMER'; field: keyof CustomerInfo; value: string }
  | { type: 'OPEN_PAYMENT_MODAL' }
  | { type: 'CLOSE_PAYMENT_MODAL' }
  | { type: 'COMPLETE_PAYMENT' };
