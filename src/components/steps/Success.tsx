'use client';

import React, { useMemo } from 'react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { COPY } from '@/copy';
import { calculateCart, cartTotal, groupByProduct, formatPrice } from '@/utils/pricing';

function UpsellCard({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 mb-4 flex-1">{description}</p>
      <button
        type="button"
        className="w-full py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {cta}
      </button>
    </div>
  );
}

export default function Success() {
  const { state } = useBookingFlow();

  const items = useMemo(() => calculateCart(state), [state]);
  const total = cartTotal(items);
  const grouped = groupByProduct(items);
  const bookingRef = useMemo(
    () => `LH-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    [],
  );

  const upsells = COPY.upsells;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Confirmation header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{COPY.success.title}</h1>
        <p className="text-gray-500">
          {COPY.success.subtitle} <span className="font-medium text-gray-700">{state.customer.email}</span>
        </p>
      </div>

      {/* Receipt */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">{COPY.success.receipt}</h2>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{COPY.success.bookingRef}</span>
          <span className="font-mono text-gray-800">{bookingRef}</span>
        </div>

        {state.zones.enabled && state.zones.date && (
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{COPY.zones.title} — {COPY.success.date}</span>
            <span className="text-gray-800">{state.zones.date}</span>
          </div>
        )}
        {state.lma.enabled && state.lma.date && (
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{COPY.lma.title} — {COPY.success.date}</span>
            <span className="text-gray-800">{state.lma.date}</span>
          </div>
        )}

        <hr className="my-4 border-gray-100" />

        {Object.entries(grouped).map(([product, lineItems]) => {
          const subtotal = lineItems.reduce((s, li) => s + li.total, 0);
          return (
            <div key={product} className="mb-3">
              {lineItems.map((li, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">
                    {li.label} x{li.quantity}
                  </span>
                  <span className="text-gray-800">{formatPrice(li.total)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-semibold pt-1">
                <span>{COPY.sidebar.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
          <span>{COPY.sidebar.total}</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Upsells */}
      <div className="mb-8">
        <h2 className="font-bold text-gray-900 mb-4">{upsells.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UpsellCard {...upsells.miniChef} />
          <UpsellCard {...upsells.hotels} />
          <UpsellCard {...upsells.parking} />
          <UpsellCard {...upsells.annualPass} />
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {COPY.success.backToHome}
        </button>
      </div>
    </div>
  );
}
