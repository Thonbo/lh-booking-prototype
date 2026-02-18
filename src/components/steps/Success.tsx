'use client';

import { useState } from 'react';
import copy from '@/copy';
import { useBooking } from '@/hooks/useBookingFlow';
import { calculateTotal } from '@/utils/pricing';
import { formatPrice, formatDate } from '@/utils/format';
import { zoneTimeslots, lmaTimeslots, restaurantSlots } from '@/data/timeslots';
import { lmaLevels } from '@/data/lma';
import { hotels } from '@/data/hotels';
import { ZONE_PRICE_ADULT, SEASON_PASS_PRICE_ADULT } from '@/data/prices';

export default function Success() {
  const { state, dispatch } = useBooking();
  const { cart } = state;
  const total = calculateTotal(cart);

  const [showMiniChef, setShowMiniChef] = useState(false);

  const zonesTimeslot = cart.zones.timeslotId
    ? zoneTimeslots.find((t) => t.id === cart.zones.timeslotId)
    : null;
  const lmaLevel = cart.lma.levelId ? lmaLevels.find((l) => l.id === cart.lma.levelId) : null;
  const lmaTimeslot = cart.lma.timeslotId
    ? lmaTimeslots.find((t) => t.id === cart.lma.timeslotId)
    : null;

  // Group items for receipt
  const zonesItems = total.items.filter(
    (i) => i.label.startsWith('Experience Zones') || i.label.startsWith('Season Pass')
  );
  const lmaItems = total.items.filter((i) => i.label.startsWith('LMA'));
  const zonesSubtotal = zonesItems.reduce((s, i) => s + i.total, 0);
  const lmaSubtotal = lmaItems.reduce((s, i) => s + i.total, 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* ═══════════════ CONFIRMATION ═══════════════ */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4" role="img" aria-label="Celebration">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{copy.successTitle}</h1>
        <p className="text-gray-600">
          {copy.successSubtitle}{' '}
          <span className="font-semibold text-gray-900">{cart.customer.email}</span>
        </p>
      </div>

      {/* ═══════════════ RECEIPT ═══════════════ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Booking details
        </h2>

        <dl className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <dt className="text-gray-600">Name</dt>
            <dd className="font-medium text-gray-900">{cart.customer.name}</dd>
          </div>
          {cart.customer.country && (
            <div className="flex justify-between">
              <dt className="text-gray-600">Country</dt>
              <dd className="font-medium text-gray-900">{cart.customer.country}</dd>
            </div>
          )}
        </dl>

        {/* Zones section */}
        {cart.zones.enabled && (
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-800 mb-2">{copy.zonesCardTitle}</h3>
            <dl className="space-y-1 text-sm">
              {cart.zones.date && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Date</dt>
                  <dd className="text-gray-700">{formatDate(cart.zones.date)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">Guests</dt>
                <dd className="text-gray-700">
                  {copy.basketGuestsSummary(cart.zones.tickets.adults, cart.zones.tickets.children)}
                </dd>
              </div>
              {zonesTimeslot && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Arrival</dt>
                  <dd className="text-gray-700">{zonesTimeslot.time}</dd>
                </div>
              )}
            </dl>
            {zonesItems.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-50">
                {zonesItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-500 py-0.5">
                    <span>{item.quantity}x {item.label}</span>
                    <span className="font-medium text-gray-700">{formatPrice(item.total)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs font-semibold text-gray-800 mt-1">
                  <span>Subtotal</span>
                  <span>{formatPrice(zonesSubtotal)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LMA section */}
        {cart.lma.enabled && lmaLevel && (
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-800 mb-2">
              {copy.lmaCardTitle} – {lmaLevel.name}
            </h3>
            <dl className="space-y-1 text-sm">
              {cart.lma.date && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Date</dt>
                  <dd className="text-gray-700">{formatDate(cart.lma.date)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">Guests</dt>
                <dd className="text-gray-700">
                  {copy.basketGuestsSummary(cart.lma.tickets.adults, cart.lma.tickets.children)}
                </dd>
              </div>
              {lmaTimeslot && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Time</dt>
                  <dd className="text-gray-700">{lmaTimeslot.time}</dd>
                </div>
              )}
            </dl>
            {lmaItems.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-50">
                {lmaItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-500 py-0.5">
                    <span>{item.quantity}x {item.label}</span>
                    <span className="font-medium text-gray-700">{formatPrice(item.total)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs font-semibold text-gray-800 mt-1">
                  <span>Subtotal</span>
                  <span>{formatPrice(lmaSubtotal)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
          <span>Total paid</span>
          <span>{formatPrice(total.subtotal)}</span>
        </div>
      </div>

      {/* ═══════════════ UPSELLS / EXTRAS ═══════════════ */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{copy.receiptExtrasTitle}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Mini Chef */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
            <div className="h-32 overflow-hidden">
              <img src="/images/2018_MINI_CHEF_03.jpg" alt="Mini Chef" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-900">{copy.miniChefTitle}</h3>
              <p className="text-xs text-gray-500 mt-1">{copy.miniChefDesc}</p>
              <button type="button"
                onClick={() => setShowMiniChef(!showMiniChef)}
                className="mt-3 w-full py-2 rounded-lg text-xs font-bold transition-colors
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                  bg-gray-100 text-gray-700 hover:bg-yellow-100">
                {showMiniChef ? 'Hide slots' : copy.miniChefCta}
              </button>

              {showMiniChef && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span className="font-medium">{copy.miniChefGuests}: {cart.addOns.restaurant.guests}</span>
                    <div className="flex gap-1">
                      <button type="button"
                        onClick={() => dispatch({ type: 'SET_RESTAURANT', guests: Math.max(1, cart.addOns.restaurant.guests - 1), slotId: cart.addOns.restaurant.slotId })}
                        className="w-5 h-5 rounded-full border border-gray-300 text-[10px] font-bold hover:border-yellow-400">−</button>
                      <button type="button"
                        onClick={() => dispatch({ type: 'SET_RESTAURANT', guests: cart.addOns.restaurant.guests + 1, slotId: cart.addOns.restaurant.slotId })}
                        className="w-5 h-5 rounded-full border border-gray-300 text-[10px] font-bold hover:border-yellow-400">+</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {restaurantSlots.map((slot) => {
                      const isFull = slot.spotsLeft === 0;
                      const isSelected = cart.addOns.restaurant.slotId === slot.id;
                      return (
                        <button key={slot.id} type="button"
                          onClick={() => {
                            if (!isFull) {
                              if (!cart.addOns.restaurant.enabled) dispatch({ type: 'TOGGLE_RESTAURANT' });
                              dispatch({ type: 'SET_RESTAURANT', guests: cart.addOns.restaurant.guests, slotId: slot.id });
                            }
                          }}
                          disabled={isFull}
                          className={`px-2 py-1 rounded text-[11px] font-medium transition-all
                            ${isSelected ? 'bg-yellow-400 text-black' : 'bg-gray-50 text-gray-600'}
                            ${isFull ? 'opacity-30 cursor-not-allowed line-through' : 'hover:bg-yellow-100'}`}>
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                  {cart.addOns.restaurant.slotId && (
                    <p className="text-[11px] text-green-700 font-medium mt-1">
                      ✓ Table booked for {restaurantSlots.find(s => s.id === cart.addOns.restaurant.slotId)?.label}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hotels */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
            <div className="h-32 overflow-hidden">
              <img src="/images/green-zone_world-explorer_2018_024.jpg" alt="Hotels nearby" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-900">{copy.hotelsTitle}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-3">{copy.hotelsDesc}</p>
              <div className="space-y-2">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-800">
                      {hotel.name}
                      {hotel.brand === 'lego' && (
                        <span className="ml-1 text-[9px] bg-yellow-200 text-yellow-800 px-1 rounded font-bold">LEGO</span>
                      )}
                    </span>
                    <span className="text-gray-500">{copy.hotelFrom} {formatPrice(hotel.priceFrom)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parking */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
            <div className="h-32 overflow-hidden">
              <img src="/images/legohouselegohouse_0928.jpg" alt="Parking" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">{copy.parkingTitle}</h3>
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">{copy.free}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{copy.parkingDesc}</p>
              <button type="button"
                className="mt-3 text-xs font-medium text-yellow-700 hover:underline focus:outline-none">
                {copy.parkingCta} →
              </button>
            </div>
          </div>

          {/* Season Pass upgrade — only if not already selected */}
          {cart.zones.enabled && !cart.addOns.seasonPass.enabled && (
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <div className="h-32 overflow-hidden">
                <img src="/images/legohouseDJI_20240611122911_0016_D_CROP_web.jpg" alt="Season Pass" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900">{copy.seasonPassUpgradeLink}</h3>
                <p className="text-xs text-gray-500 mt-1">{copy.seasonPassDesc}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {formatPrice(ZONE_PRICE_ADULT)} → {formatPrice(SEASON_PASS_PRICE_ADULT)} /adult
                </p>
                <button type="button"
                  onClick={() => dispatch({ type: 'TOGGLE_SEASON_PASS' })}
                  className="mt-3 w-full py-2 rounded-lg text-xs font-bold transition-colors
                    focus:outline-none focus:ring-2 focus:ring-yellow-400
                    bg-gray-100 text-gray-700 hover:bg-yellow-100">
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Start over */}
      <div className="text-center pb-8">
        <button type="button" onClick={() => dispatch({ type: 'RESET' })}
          className="px-8 py-3 rounded-xl bg-yellow-400 text-black font-bold
                     hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-colors">
          {copy.successCta}
        </button>
      </div>
    </div>
  );
}
