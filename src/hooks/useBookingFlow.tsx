'use client';

import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { BookingState, BookingAction, GuestCounts } from '@/types';

const defaultGuests: GuestCounts = { adults: 2, children: 0, infants: 0 };

const initialState: BookingState = {
  step: 'checkout',
  zones: {
    enabled: false,
    guests: { ...defaultGuests },
    date: null,
    timeslot: null,
    annualPass: false,
  },
  lma: {
    enabled: false,
    guests: { ...defaultGuests },
    date: null,
    timeslot: null,
    levelId: null,
  },
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    country: 'Denmark',
    zip: '',
  },
  paymentModalOpen: false,
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'TOGGLE_ZONES':
      return {
        ...state,
        zones: { ...state.zones, enabled: !state.zones.enabled },
      };

    case 'TOGGLE_LMA':
      return {
        ...state,
        lma: { ...state.lma, enabled: !state.lma.enabled },
      };

    case 'SET_ZONES_GUESTS':
      return {
        ...state,
        zones: { ...state.zones, guests: action.guests },
      };

    case 'SET_LMA_GUESTS':
      return {
        ...state,
        lma: { ...state.lma, guests: action.guests },
      };

    case 'SET_ZONES_DATE':
      return {
        ...state,
        zones: { ...state.zones, date: action.date, timeslot: null },
      };

    case 'SET_LMA_DATE':
      return {
        ...state,
        lma: { ...state.lma, date: action.date, timeslot: null },
      };

    case 'SET_ZONES_TIMESLOT':
      return {
        ...state,
        zones: { ...state.zones, timeslot: action.timeslot },
      };

    case 'SET_LMA_TIMESLOT':
      return {
        ...state,
        lma: { ...state.lma, timeslot: action.timeslot },
      };

    case 'SET_LMA_LEVEL':
      return {
        ...state,
        lma: { ...state.lma, levelId: action.levelId, timeslot: null },
      };

    case 'TOGGLE_ANNUAL_PASS':
      return {
        ...state,
        zones: { ...state.zones, annualPass: !state.zones.annualPass },
      };

    case 'SYNC_LMA_DATE':
      return {
        ...state,
        lma: { ...state.lma, date: state.zones.date, timeslot: null },
      };

    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: { ...state.customer, [action.field]: action.value },
      };

    case 'OPEN_PAYMENT_MODAL':
      return { ...state, paymentModalOpen: true };

    case 'CLOSE_PAYMENT_MODAL':
      return { ...state, paymentModalOpen: false };

    case 'COMPLETE_PAYMENT':
      return { ...state, paymentModalOpen: false, step: 'success' };

    default:
      return state;
  }
}

interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBookingFlow() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingFlow must be used within a BookingProvider');
  }
  return context;
}
