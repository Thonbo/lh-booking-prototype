'use client';

import React from 'react';
import { BookingProvider, useBookingFlow } from '@/hooks/useBookingFlow';
import Checkout from '@/components/steps/Checkout';
import Success from '@/components/steps/Success';

function BookingContent() {
  const { state } = useBookingFlow();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dark=true.svg" alt="LEGO House" className="h-8" />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {state.step === 'checkout' && <Checkout />}
        {state.step === 'success' && <Success />}
      </main>
    </div>
  );
}

export default function BookingFlow() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  );
}
