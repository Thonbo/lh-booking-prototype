'use client';

import React, { useState } from 'react';
import { COPY } from '@/copy';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { calculateCart, cartTotal, formatPrice } from '@/utils/pricing';

export default function PaymentModal() {
  const { state, dispatch } = useBookingFlow();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const items = calculateCart(state);
  const total = cartTotal(items);

  if (!state.paymentModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-1">{COPY.payment.title}</h2>
        <p className="text-sm text-gray-500 mb-6">Total: {formatPrice(total)}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {COPY.payment.cardNumber}
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {COPY.payment.expiry}
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {COPY.payment.cvc}
              </label>
              <input
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {COPY.payment.nameOnCard}
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => dispatch({ type: 'CLOSE_PAYMENT_MODAL' })}
            className="flex-1 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {COPY.payment.cancel}
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'COMPLETE_PAYMENT' })}
            className="flex-1 py-2.5 text-sm font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            {COPY.payment.payButton}
          </button>
        </div>
      </div>
    </div>
  );
}
