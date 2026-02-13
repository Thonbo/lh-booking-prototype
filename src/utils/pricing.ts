import { BookingState, CartLineItem } from '@/types';
import { LMA_LEVELS } from '@/data/lma';
import { COPY } from '@/copy';

export function calculateCart(state: BookingState): CartLineItem[] {
  const items: CartLineItem[] = [];

  if (state.zones.enabled) {
    const { adults, children } = state.zones.guests;
    const ticketQty = adults + children;
    if (ticketQty > 0) {
      items.push({
        product: 'zones',
        label: COPY.zones.title,
        quantity: ticketQty,
        unitPrice: COPY.zones.price,
        total: ticketQty * COPY.zones.price,
      });
    }

    if (state.zones.annualPass) {
      items.push({
        product: 'zones',
        label: COPY.zones.annualPassLabel,
        quantity: ticketQty,
        unitPrice: COPY.zones.annualPassPrice,
        total: ticketQty * COPY.zones.annualPassPrice,
      });
    }
  }

  if (state.lma.enabled && state.lma.levelId) {
    const level = LMA_LEVELS.find((l) => l.id === state.lma.levelId);
    if (level) {
      const { adults, children } = state.lma.guests;
      const ticketQty = adults + children;
      if (ticketQty > 0) {
        items.push({
          product: 'lma',
          label: `${COPY.lma.title} — ${level.name}`,
          quantity: ticketQty,
          unitPrice: level.price,
          total: ticketQty * level.price,
        });
      }
    }
  }

  return items;
}

export function cartTotal(items: CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function groupByProduct(items: CartLineItem[]): Record<string, CartLineItem[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.product]) acc[item.product] = [];
      acc[item.product].push(item);
      return acc;
    },
    {} as Record<string, CartLineItem[]>,
  );
}

export function formatPrice(amount: number): string {
  return `${amount} ${COPY.currency}`;
}
