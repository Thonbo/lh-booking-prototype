'use client';

import { BookingProvider } from '@/hooks/useBookingFlow';
import BookingFlow from '@/components/BookingFlow';

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  );
}
