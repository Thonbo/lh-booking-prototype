'use client';

import { useBooking } from '@/hooks/useBookingFlow';
import Checkout from '@/components/steps/Checkout';
import Success from '@/components/steps/Success';

export default function BookingFlow() {
  const { state } = useBooking();
  const { step } = state;

  const renderStep = () => {
    switch (step) {
      case 'checkout':
        return <Checkout />;
      case 'success':
        return <Success />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/dark=true.svg" alt="LEGO House" className="h-8" />
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Booking</span>
        </div>
      </header>

      {/* Step content */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-16">
        {renderStep()}
      </main>
    </div>
  );
}
