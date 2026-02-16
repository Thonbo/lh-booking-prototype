'use client';

import { BookingProvider } from '@/hooks/useBookingFlow';
import BookingFlow from '@/components/BookingFlow';

export default function Home() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  );
}
