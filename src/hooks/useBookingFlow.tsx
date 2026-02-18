'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Cart, BookingStep, TicketSelection } from '@/types';

// ─── Initial State ──────────────────────────────────────────

const initialCart: Cart = {
  zones: {
    enabled: false, // not selected by default — user opts in
    date: null,
    tickets: { adults: 2, children: 0 },
    timeslotId: null,
  },
  lma: {
    enabled: false,
    date: null,
    tickets: { adults: 2, children: 0 },
    timeslotId: null,
    levelId: null,
  },
  addOns: {
    seasonPass: { enabled: false },
    restaurant: { enabled: false, date: null, guests: 2, slotId: null },
  },
  customer: { name: '', email: '', country: '', zip: '' },
};

interface BookingState {
  step: BookingStep;
  cart: Cart;
}

const initialState: BookingState = {
  step: 'checkout',
  cart: initialCart,
};

// ─── Actions ────────────────────────────────────────────────

type Action =
  | { type: 'SET_STEP'; step: BookingStep }
  | { type: 'TOGGLE_ZONES' }
  | { type: 'SET_ZONES_DATE'; date: string }
  | { type: 'SET_ZONES_TICKETS'; tickets: TicketSelection }
  | { type: 'SET_ZONES_TIMESLOT'; timeslotId: string | null }
  | { type: 'TOGGLE_LMA' }
  | { type: 'SET_LMA_DATE'; date: string }
  | { type: 'SET_LMA_TICKETS'; tickets: TicketSelection }
  | { type: 'SET_LMA_TIMESLOT'; timeslotId: string }
  | { type: 'SET_LMA_LEVEL'; levelId: string }
  | { type: 'TOGGLE_SEASON_PASS' }
  | { type: 'TOGGLE_RESTAURANT' }
  | { type: 'SET_RESTAURANT'; guests: number; slotId: string | null }
  | { type: 'SET_CUSTOMER'; name: string; email: string; country: string; zip: string }
  | { type: 'SYNC_LMA_GUESTS' } // sync LMA guests from zones
  | { type: 'RESET' };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'TOGGLE_ZONES':
      return {
        ...state,
        cart: {
          ...state.cart,
          zones: { ...state.cart.zones, enabled: !state.cart.zones.enabled },
        },
      };

    case 'SET_ZONES_DATE':
      return {
        ...state,
        cart: {
          ...state.cart,
          zones: { ...state.cart.zones, date: action.date, timeslotId: null },
        },
      };

    case 'SET_ZONES_TICKETS': {
      const newCart = {
        ...state.cart,
        zones: { ...state.cart.zones, tickets: action.tickets },
      };
      // Auto-sync LMA guests if LMA is enabled and hasn't been customised
      if (newCart.lma.enabled) {
        newCart.lma = { ...newCart.lma, tickets: { ...action.tickets } };
      }
      // Auto-sync restaurant guests
      if (newCart.addOns.restaurant.enabled) {
        newCart.addOns = {
          ...newCart.addOns,
          restaurant: {
            ...newCart.addOns.restaurant,
            guests: action.tickets.adults + action.tickets.children,
          },
        };
      }
      return { ...state, cart: newCart };
    }

    case 'SET_ZONES_TIMESLOT':
      return {
        ...state,
        cart: {
          ...state.cart,
          zones: { ...state.cart.zones, timeslotId: action.timeslotId },
        },
      };

    case 'TOGGLE_LMA': {
      const enabling = !state.cart.lma.enabled;
      return {
        ...state,
        cart: {
          ...state.cart,
          lma: {
            ...state.cart.lma,
            enabled: enabling,
            // Pre-fill from zones when enabling
            tickets: enabling ? { ...state.cart.zones.tickets } : state.cart.lma.tickets,
            date: enabling ? state.cart.zones.date : state.cart.lma.date,
          },
        },
      };
    }

    case 'SET_LMA_DATE':
      return {
        ...state,
        cart: {
          ...state.cart,
          lma: { ...state.cart.lma, date: action.date, timeslotId: null },
        },
      };

    case 'SET_LMA_TICKETS':
      return {
        ...state,
        cart: {
          ...state.cart,
          lma: { ...state.cart.lma, tickets: action.tickets },
        },
      };

    case 'SET_LMA_TIMESLOT':
      return {
        ...state,
        cart: {
          ...state.cart,
          lma: { ...state.cart.lma, timeslotId: action.timeslotId },
        },
      };

    case 'SET_LMA_LEVEL':
      return {
        ...state,
        cart: {
          ...state.cart,
          lma: { ...state.cart.lma, levelId: action.levelId, timeslotId: null },
        },
      };

    case 'TOGGLE_SEASON_PASS':
      return {
        ...state,
        cart: {
          ...state.cart,
          addOns: {
            ...state.cart.addOns,
            seasonPass: { enabled: !state.cart.addOns.seasonPass.enabled },
          },
        },
      };

    case 'TOGGLE_RESTAURANT': {
      const enabling = !state.cart.addOns.restaurant.enabled;
      const totalGuests = state.cart.zones.tickets.adults + state.cart.zones.tickets.children;
      return {
        ...state,
        cart: {
          ...state.cart,
          addOns: {
            ...state.cart.addOns,
            restaurant: {
              ...state.cart.addOns.restaurant,
              enabled: enabling,
              guests: enabling ? Math.max(totalGuests, 1) : state.cart.addOns.restaurant.guests,
              slotId: enabling ? state.cart.addOns.restaurant.slotId : null,
            },
          },
        },
      };
    }

    case 'SET_RESTAURANT':
      return {
        ...state,
        cart: {
          ...state.cart,
          addOns: {
            ...state.cart.addOns,
            restaurant: {
              ...state.cart.addOns.restaurant,
              guests: action.guests,
              slotId: action.slotId,
            },
          },
        },
      };

    case 'SYNC_LMA_GUESTS':
      return {
        ...state,
        cart: {
          ...state.cart,
          lma: { ...state.cart.lma, tickets: { ...state.cart.zones.tickets } },
        },
      };

    case 'SET_CUSTOMER':
      return {
        ...state,
        cart: {
          ...state.cart,
          customer: { name: action.name, email: action.email, country: action.country, zip: action.zip },
        },
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────

interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<Action>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
