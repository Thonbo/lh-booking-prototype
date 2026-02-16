import { Cart, CartTotal, CartLineItem } from '@/types';
import {
  ZONE_PRICE_ADULT,
  ZONE_PRICE_CHILD,
  ANNUAL_PASS_PRICE_ADULT,
  ANNUAL_PASS_PRICE_CHILD,
} from '@/data/prices';
import { zoneTimeslots, lmaTimeslots } from '@/data/timeslots';
import { lmaLevels } from '@/data/lma';

export function calculateTotal(cart: Cart): CartTotal {
  const items: CartLineItem[] = [];

  // ─── Zones tickets ────────────────────────────────────────
  if (cart.zones.enabled) {
    const timeslot = cart.zones.timeslotId
      ? zoneTimeslots.find((t) => t.id === cart.zones.timeslotId)
      : null;
    const factor = timeslot?.priceFactor ?? 1.0;

    if (cart.addOns.annualPass.enabled) {
      if (cart.zones.tickets.adults > 0) {
        items.push({
          label: 'Annual Pass – Adult',
          quantity: cart.zones.tickets.adults,
          unitPrice: ANNUAL_PASS_PRICE_ADULT,
          total: ANNUAL_PASS_PRICE_ADULT * cart.zones.tickets.adults,
        });
      }
      if (cart.zones.tickets.children > 0) {
        items.push({
          label: 'Annual Pass – Child',
          quantity: cart.zones.tickets.children,
          unitPrice: ANNUAL_PASS_PRICE_CHILD,
          total: ANNUAL_PASS_PRICE_CHILD * cart.zones.tickets.children,
        });
      }
    } else {
      if (cart.zones.tickets.adults > 0) {
        const price = Math.round(ZONE_PRICE_ADULT * factor);
        items.push({
          label: 'Experience Zones – Adult',
          quantity: cart.zones.tickets.adults,
          unitPrice: price,
          total: price * cart.zones.tickets.adults,
        });
      }
      if (cart.zones.tickets.children > 0) {
        const price = Math.round(ZONE_PRICE_CHILD * factor);
        items.push({
          label: 'Experience Zones – Child',
          quantity: cart.zones.tickets.children,
          unitPrice: price,
          total: price * cart.zones.tickets.children,
        });
      }
    }
  }

  // ─── LMA tickets ─────────────────────────────────────────
  if (cart.lma.enabled && cart.lma.levelId) {
    const level = lmaLevels.find((l) => l.id === cart.lma.levelId);
    const timeslot = cart.lma.timeslotId
      ? lmaTimeslots.find((t) => t.id === cart.lma.timeslotId)
      : null;
    const factor = timeslot?.priceFactor ?? 1.0;

    if (level) {
      if (cart.lma.tickets.adults > 0) {
        const price = Math.round(level.priceAdult * factor);
        items.push({
          label: `LMA ${level.name} – Adult`,
          quantity: cart.lma.tickets.adults,
          unitPrice: price,
          total: price * cart.lma.tickets.adults,
        });
      }
      if (cart.lma.tickets.children > 0) {
        const price = Math.round(level.priceChild * factor);
        items.push({
          label: `LMA ${level.name} – Child`,
          quantity: cart.lma.tickets.children,
          unitPrice: price,
          total: price * cart.lma.tickets.children,
        });
      }
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { subtotal, items };
}
