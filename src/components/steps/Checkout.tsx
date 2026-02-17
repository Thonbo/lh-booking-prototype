'use client';

import { useState } from 'react';
import copy from '@/copy';
import { useBooking } from '@/hooks/useBookingFlow';
import { calculateTotal } from '@/utils/pricing';
import { formatPrice, formatDate, getTodayISO } from '@/utils/format';
import DatePicker from '@/components/DatePicker';
import GuestSelector from '@/components/GuestSelector';
import TimeslotPicker from '@/components/TimeslotPicker';
import { zoneTimeslots, lmaTimeslots } from '@/data/timeslots';
import { lmaLevels } from '@/data/lma';
import { featureFlags } from '@/data/featureFlags';
import { isPeakDay, isSoldOut } from '@/data/calendar';
import { ZONE_PRICE_ADULT, ZONE_PRICE_CHILD, ANNUAL_PASS_PRICE_ADULT } from '@/data/prices';
import { zones } from '@/data/zones';

/* ─── Chevron icons ─── */
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8l4 4 4-4" />
    </svg>
  );
}
function ChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12l4-4 4 4" />
    </svg>
  );
}

export default function Checkout() {
  const { state, dispatch } = useBooking();
  const { cart } = state;
  const total = calculateTotal(cart);

  const [zonesExpanded, setZonesExpanded] = useState(false);
  const [lmaExpanded, setLmaExpanded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [openOption, setOpenOption] = useState<string | null>(null);

  // Clear individual errors in real-time once user has attempted to pay
  const clearError = (key: string) => {
    if (errors[key]) {
      setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
    }
  };
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Form state
  const [name, setName] = useState(cart.customer.name);
  const [email, setEmail] = useState(cart.customer.email);
  const [country, setCountry] = useState(cart.customer.country);
  const [zip, setZip] = useState(cart.customer.zip);

  // Derived
  const showTimeslot =
    cart.zones.enabled &&
    cart.zones.date &&
    (featureFlags.ALWAYS_ASK_TIMESLOT_FOR_ZONES ||
      (featureFlags.SMART_TIMESLOT && isPeakDay(cart.zones.date)));

  const zoneDateError =
    cart.zones.date && isSoldOut(cart.zones.date) ? copy.errorSoldOut : errors.zoneDate;

  const totalZoneGuests = cart.zones.tickets.adults + cart.zones.tickets.children;
  const filteredLmaSlots = cart.lma.levelId
    ? lmaTimeslots.filter((s) => s.levelId === cart.lma.levelId)
    : [];

  const zonesConfigured = cart.zones.enabled && cart.zones.date && totalZoneGuests > 0;
  const lmaConfigured = cart.lma.enabled && cart.lma.levelId && cart.lma.date && cart.lma.timeslotId;

  // Dynamic checkbox labels (#1)
  const zonesCheckboxLabel = cart.lma.enabled ? copy.zonesCheckboxWhenOtherSelected : copy.zonesCheckboxDefault;
  const lmaCheckboxLabel = cart.zones.enabled ? copy.lmaCheckboxWhenOtherSelected : copy.lmaCheckboxDefault;

  const handleToggleZones = () => {
    clearError('product');
    if (!cart.zones.enabled) {
      dispatch({ type: 'TOGGLE_ZONES' });
      setZonesExpanded(true);
    } else {
      dispatch({ type: 'TOGGLE_ZONES' });
      setZonesExpanded(false);
    }
  };

  const handleToggleLma = () => {
    clearError('product');
    if (!cart.lma.enabled) {
      dispatch({ type: 'TOGGLE_LMA' });
      setLmaExpanded(true);
    } else {
      dispatch({ type: 'TOGGLE_LMA' });
      setLmaExpanded(false);
    }
  };

  // Group line items by product for sidebar pricing
  const zonesItems = total.items.filter(
    (i) => i.label.startsWith('Experience Zones') || i.label.startsWith('Annual Pass')
  );
  const lmaItems = total.items.filter((i) => i.label.startsWith('LMA'));
  const zonesSubtotal = zonesItems.reduce((s, i) => s + i.total, 0);
  const lmaSubtotal = lmaItems.reduce((s, i) => s + i.total, 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!cart.zones.enabled && !cart.lma.enabled) e.product = copy.errorNoProduct;
    if (cart.zones.enabled) {
      if (!cart.zones.date) e.zoneDate = copy.errorNoDate;
      if (cart.zones.date && isSoldOut(cart.zones.date)) e.zoneDate = copy.errorSoldOut;
      if (totalZoneGuests === 0) e.zoneGuests = copy.errorNoGuests;
      if (showTimeslot && !cart.zones.timeslotId) e.zoneTimeslot = copy.errorNoTimeslot;
    }
    if (cart.lma.enabled) {
      if (!cart.lma.date) e.lmaDate = copy.errorNoDate;
      if (cart.lma.tickets.adults + cart.lma.tickets.children === 0) e.lmaGuests = copy.errorNoGuests;
      if (!cart.lma.levelId) e.lmaLevel = copy.errorNoLevel;
      if (!cart.lma.timeslotId) e.lmaTimeslot = copy.errorNoTimeslot;
    }
    if (!name.trim()) e.name = copy.errorRequired;
    if (!email.trim()) e.email = copy.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = copy.errorEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    setHasSubmitted(true);
    if (validate()) {
      dispatch({ type: 'SET_CUSTOMER', name: name.trim(), email: email.trim(), country: country.trim(), zip: zip.trim() });
      setShowPayment(true);
    } else {
      // Auto-expand cards that have errors so inline messages are visible
      const newErrors = (() => { const e: Record<string, string> = {}; if (cart.zones.enabled) { if (!cart.zones.date) e.zoneDate = '1'; if (totalZoneGuests === 0) e.zoneGuests = '1'; if (showTimeslot && !cart.zones.timeslotId) e.zoneTimeslot = '1'; } if (cart.lma.enabled) { if (!cart.lma.date) e.lmaDate = '1'; if (!cart.lma.levelId) e.lmaLevel = '1'; if (!cart.lma.timeslotId) e.lmaTimeslot = '1'; if (cart.lma.tickets.adults + cart.lma.tickets.children === 0) e.lmaGuests = '1'; } return e; })();
      if (newErrors.zoneDate || newErrors.zoneGuests || newErrors.zoneTimeslot) setZonesExpanded(true);
      if (newErrors.lmaDate || newErrors.lmaLevel || newErrors.lmaTimeslot || newErrors.lmaGuests) setLmaExpanded(true);
    }
  };

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      dispatch({ type: 'SET_STEP', step: 'success' });
    }, 1500);
  };

  const handleSelectToday = (type: 'zones' | 'lma') => {
    const today = getTodayISO();
    if (type === 'zones') { dispatch({ type: 'SET_ZONES_DATE', date: today }); clearError('zoneDate'); }
    else { dispatch({ type: 'SET_LMA_DATE', date: today }); clearError('lmaDate'); }
  };

  const zonesTimeslot = cart.zones.timeslotId
    ? zoneTimeslots.find((t) => t.id === cart.zones.timeslotId)
    : null;
  const lmaLevel = cart.lma.levelId ? lmaLevels.find((l) => l.id === cart.lma.levelId) : null;
  const lmaTimeslot = cart.lma.timeslotId
    ? lmaTimeslots.find((t) => t.id === cart.lma.timeslotId)
    : null;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{copy.checkoutTitle}</h1>
      <p className="text-gray-500 text-sm mb-6">{copy.checkoutSubtitle}</p>

      {errors.product && (
        <p className="text-sm text-red-600 mb-4 bg-red-50 rounded-lg p-3" role="alert">
          {errors.product}
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ═══════════════ MAIN CONTENT ═══════════════ */}
        <div className="flex-1 space-y-4">

          {/* ─── ZONES CARD ─── */}
          <div className={`rounded-2xl border-2 overflow-hidden transition-all ${
            cart.zones.enabled ? 'border-yellow-400 bg-white' : 'border-gray-200 bg-white hover:border-yellow-200'
          }`}>
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-64 h-44 sm:h-auto shrink-0 overflow-hidden">
                <img src="/images/masterpiece-gallery-2018_009.jpg" alt="Experience Zones"
                  className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {zones.map((z) => (
                    <div key={z.id} className="w-3.5 h-3.5 rounded-full border-2 border-white/80 shadow-sm"
                      style={{ backgroundColor: z.color }} title={z.name} />
                  ))}
                </div>
                <span className="absolute top-3 left-3 text-[10px] font-bold bg-white/90 text-gray-800 px-2 py-0.5 rounded-full">
                  {copy.zonesCardTag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-center">
                <h2 className="text-lg font-bold text-gray-900">{copy.zonesCardTitle}</h2>
                <p className="text-sm text-gray-500 mt-1">{copy.zonesCardDesc}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {copy.zonesFrom}{' '}
                  <span className="font-bold text-gray-800">{formatPrice(ZONE_PRICE_CHILD)}</span>
                  {' / child · '}
                  <span className="font-bold text-gray-800">{formatPrice(ZONE_PRICE_ADULT)}</span>
                  {' / adult'}
                </p>

                <div className="mt-4 flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer select-none flex-1">
                    <input type="checkbox" checked={cart.zones.enabled} onChange={handleToggleZones}
                      className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 accent-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">{zonesCheckboxLabel}</span>
                  </label>
                  <button type="button" onClick={() => setZonesExpanded(!zonesExpanded)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={zonesExpanded ? 'Collapse details' : 'Expand details'}>
                    {zonesExpanded ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                <p className="text-[11px] text-green-700 font-medium mt-2">{copy.dayTicketSaving}</p>

                {cart.zones.enabled && zonesConfigured && !zonesExpanded && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <span>{formatDate(cart.zones.date!)}</span>
                    <span className="text-gray-300">|</span>
                    <span>{copy.basketGuestsSummary(cart.zones.tickets.adults, cart.zones.tickets.children)}</span>
                    {zonesTimeslot && (<><span className="text-gray-300">|</span><span>{zonesTimeslot.time}</span></>)}
                    {cart.addOns.annualPass.enabled && (<><span className="text-gray-300">|</span><span className="text-yellow-700 font-medium">Annual Pass</span></>)}
                  </div>
                )}
              </div>
            </div>

            {/* Expanded details */}
            {zonesExpanded && (
              <div className="border-t border-yellow-200 bg-yellow-50/30 p-5 space-y-3">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Guests first (#2) */}
                  <div className="md:w-48 shrink-0">
                    <GuestSelector
                      adults={cart.zones.tickets.adults} children={cart.zones.tickets.children}
                      onAdultsChange={(n) => { dispatch({ type: 'SET_ZONES_TICKETS', tickets: { ...cart.zones.tickets, adults: n } }); if (n + cart.zones.tickets.children > 0) clearError('zoneGuests'); }}
                      onChildrenChange={(n) => { dispatch({ type: 'SET_ZONES_TICKETS', tickets: { ...cart.zones.tickets, children: n } }); if (cart.zones.tickets.adults + n > 0) clearError('zoneGuests'); }}
                      compact
                    />
                    {errors.zoneGuests && <p className="text-xs text-red-600 mt-1" role="alert">{errors.zoneGuests}</p>}
                  </div>
                  {/* Then date (#2) */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-gray-600">{copy.dateLabel}</span>
                      <button type="button" onClick={() => handleSelectToday('zones')}
                        className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full hover:bg-yellow-200 focus:outline-none focus:ring-1 focus:ring-yellow-400">
                        Select today
                      </button>
                      {cart.lma.enabled && cart.lma.date && !cart.zones.date && (
                        <button type="button" onClick={() => { dispatch({ type: 'SET_ZONES_DATE', date: cart.lma.date! }); clearError('zoneDate'); }}
                          className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-400">
                          {copy.sameDate}
                        </button>
                      )}
                    </div>
                    <DatePicker value={cart.zones.date}
                      onChange={(d) => { dispatch({ type: 'SET_ZONES_DATE', date: d }); clearError('zoneDate'); }}
                      error={zoneDateError} compact />
                  </div>
                </div>

                {cart.zones.date && showTimeslot && (
                  <>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-[11px] text-orange-800">{copy.peakDayNote}</div>
                    <TimeslotPicker slots={zoneTimeslots} selected={cart.zones.timeslotId}
                      onSelect={(id) => { dispatch({ type: 'SET_ZONES_TIMESLOT', timeslotId: id }); clearError('zoneTimeslot'); }} basePrice={ZONE_PRICE_ADULT} />
                    {errors.zoneTimeslot && <p className="text-xs text-red-600" role="alert">{errors.zoneTimeslot}</p>}
                  </>
                )}
                {cart.zones.date && !showTimeslot && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-[11px] text-green-700">{copy.noTimeslotNeeded}</div>
                )}

                {/* Annual Pass checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none pt-2 border-t border-yellow-200">
                  <input type="checkbox" checked={cart.addOns.annualPass.enabled}
                    onChange={() => dispatch({ type: 'TOGGLE_ANNUAL_PASS' })}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 accent-yellow-400" />
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{copy.annualPassUpgradeLink}</span>
                    <span className="text-[10px] text-gray-500 ml-1.5">{formatPrice(ANNUAL_PASS_PRICE_ADULT)}/adult · {copy.annualPassDesc}</span>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* ─── LMA CARD ─── */}
          <div className={`rounded-2xl border-2 overflow-hidden transition-all ${
            cart.lma.enabled ? 'border-yellow-400 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}>
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-48 h-36 sm:h-auto shrink-0 overflow-hidden">
                <img src="/images/legohouse_v2_legohouse_0570.jpg" alt="LEGO Masters Academy"
                  className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-[10px] font-bold bg-white/90 text-gray-800 px-2 py-0.5 rounded-full">
                  {copy.lmaCardTag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-center">
                <h2 className="text-base font-bold text-gray-900">{copy.lmaCardTitle}</h2>
                <p className="text-xs text-gray-500 mt-1">{copy.lmaCardDesc}</p>

                {cart.zones.enabled && !cart.lma.enabled && (
                  <p className="text-[11px] text-yellow-700 mt-2 font-medium">✦ {copy.lmaCombineHint}</p>
                )}

                <div className="mt-3 flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer select-none flex-1">
                    <input type="checkbox" checked={cart.lma.enabled} onChange={handleToggleLma}
                      className="w-5 h-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 accent-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{lmaCheckboxLabel}</span>
                  </label>
                  <button type="button" onClick={() => setLmaExpanded(!lmaExpanded)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={lmaExpanded ? 'Collapse details' : 'Expand details'}>
                    {lmaExpanded ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>

                {cart.lma.enabled && lmaConfigured && !lmaExpanded && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    {lmaLevel && <span>{lmaLevel.name}</span>}
                    <span className="text-gray-300">|</span>
                    <span>{formatDate(cart.lma.date!)}</span>
                    <span className="text-gray-300">|</span>
                    <span>{copy.basketGuestsSummary(cart.lma.tickets.adults, cart.lma.tickets.children)}</span>
                    {lmaTimeslot && (<><span className="text-gray-300">|</span><span>{lmaTimeslot.time}</span></>)}
                  </div>
                )}
              </div>
            </div>

            {/* Expanded details */}
            {lmaExpanded && (
              <div className="border-t border-yellow-200 bg-yellow-50/30 p-5 space-y-3">
                {/* Level picker — 4 options in a grid with "Read more" (#4) */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">{copy.lmaLevelLabel}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {lmaLevels.map((level) => {
                      const isSelected = cart.lma.levelId === level.id;
                      return (
                        <button key={level.id} type="button"
                          onClick={() => { dispatch({ type: 'SET_LMA_LEVEL', levelId: level.id }); clearError('lmaLevel'); }}
                          className={`p-2 rounded-lg border text-left transition-all
                            focus:outline-none focus:ring-1 focus:ring-yellow-400
                            ${isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'}`}
                          aria-pressed={isSelected}>
                          <div className="font-bold text-gray-900 text-[11px] leading-tight">{level.name}</div>
                          <div className="text-[9px] text-gray-500 mt-0.5">{formatPrice(level.priceAdult)} / {formatPrice(level.priceChild)}</div>
                          <span className="text-[9px] text-yellow-700 hover:underline mt-1 inline-block"
                            onClick={(e) => { e.stopPropagation(); }}>
                            {copy.lmaReadMore} →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.lmaLevel && <p className="text-xs text-red-600 mt-1" role="alert">{errors.lmaLevel}</p>}
                </div>

                {/* Always show full guests + calendar UI (#3) */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-48 shrink-0">
                    <GuestSelector
                      adults={cart.lma.tickets.adults} children={cart.lma.tickets.children}
                      onAdultsChange={(n) => { dispatch({ type: 'SET_LMA_TICKETS', tickets: { ...cart.lma.tickets, adults: n } }); if (n + cart.lma.tickets.children > 0) clearError('lmaGuests'); }}
                      onChildrenChange={(n) => { dispatch({ type: 'SET_LMA_TICKETS', tickets: { ...cart.lma.tickets, children: n } }); if (cart.lma.tickets.adults + n > 0) clearError('lmaGuests'); }}
                      compact
                    />
                    {errors.lmaGuests && <p className="text-xs text-red-600 mt-1" role="alert">{errors.lmaGuests}</p>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-gray-600">{copy.dateLabel}</span>
                      <button type="button" onClick={() => handleSelectToday('lma')}
                        className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full hover:bg-yellow-200 focus:outline-none focus:ring-1 focus:ring-yellow-400">
                        Select today
                      </button>
                      {cart.zones.enabled && cart.zones.date && !cart.lma.date && (
                        <button type="button" onClick={() => { dispatch({ type: 'SET_LMA_DATE', date: cart.zones.date! }); clearError('lmaDate'); }}
                          className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-400">
                          {copy.sameDate}
                        </button>
                      )}
                    </div>
                    <DatePicker value={cart.lma.date}
                      onChange={(d) => { dispatch({ type: 'SET_LMA_DATE', date: d }); clearError('lmaDate'); }}
                      error={errors.lmaDate} compact />
                  </div>
                </div>

                {/* Timeslots */}
                {cart.lma.levelId && cart.lma.date && (
                  <>
                    <TimeslotPicker slots={filteredLmaSlots} selected={cart.lma.timeslotId}
                      onSelect={(id) => { dispatch({ type: 'SET_LMA_TIMESLOT', timeslotId: id }); clearError('lmaTimeslot'); }}
                      basePrice={lmaLevels.find((l) => l.id === cart.lma.levelId)?.priceAdult ?? 149} showSpots />
                    {errors.lmaTimeslot && <p className="text-xs text-red-600" role="alert">{errors.lmaTimeslot}</p>}
                  </>
                )}
              </div>
            )}
          </div>

          {/* ─── MORE TICKET OPTIONS (tertiary) ─── */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{copy.moreTicketOptions}</h3>
            <div className="space-y-2">

              {/* ── Combo Tickets & Packages ── */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <button type="button" onClick={() => setOpenOption(openOption === 'combo' ? null : 'combo')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base">🎁</span>
                  <span className="text-sm font-medium text-gray-800 flex-1">{copy.tertiaryComboTitle}</span>
                  {openOption === 'combo' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openOption === 'combo' && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <img src="/images/legohouseDJI_20240611122911_0016_D_CROP_web.jpg" alt="Combo packages" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">{copy.tertiaryComboTagline}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {copy.tertiaryComboItems.map((item) => (
                        <div key={item.name} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-xs font-bold text-gray-800">{item.name}</div>
                            <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.price}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium">{item.subtitle}</div>
                          <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <a href="#" className="text-xs font-semibold text-yellow-700 hover:underline inline-flex items-center gap-1">
                      {copy.tertiaryComboCta} <span aria-hidden>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* ── Guided Tours & Exclusives ── */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <button type="button" onClick={() => setOpenOption(openOption === 'tours' ? null : 'tours')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base">🏆</span>
                  <span className="text-sm font-medium text-gray-800 flex-1">{copy.tertiaryToursTitle}</span>
                  {openOption === 'tours' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openOption === 'tours' && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <img src="/images/masterpiece-gallery-2018_009.jpg" alt="Tours" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">{copy.tertiaryToursTagline}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {copy.tertiaryToursItems.map((item) => (
                        <div key={item.name} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-xs font-bold text-gray-800">{item.name}</div>
                            <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.price}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium">{item.subtitle}</div>
                          <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <a href="#" className="text-xs font-semibold text-yellow-700 hover:underline inline-flex items-center gap-1">
                      {copy.tertiaryToursCta} <span aria-hidden>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* ── Annual Pass ── */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <button type="button" onClick={() => setOpenOption(openOption === 'annual' ? null : 'annual')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base">📅</span>
                  <span className="text-sm font-medium text-gray-800 flex-1">{copy.tertiaryAnnualTitle}</span>
                  {openOption === 'annual' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openOption === 'annual' && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <img src="/images/blue-zone_BuildTheChange_2024_84A0205_web.jpg" alt="Annual Pass" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">{copy.tertiaryAnnualTagline}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                      <div>
                        <span className="text-2xl font-black text-gray-900">{copy.tertiaryAnnualPrice} DKK</span>
                        <span className="text-xs text-gray-500 ml-1">/year</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {copy.tertiaryAnnualBenefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[11px] text-gray-600">
                          <span className="text-yellow-500 font-bold mt-px">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#"
                      className="inline-block w-full text-center py-2 rounded-lg bg-yellow-400 text-black text-xs font-bold hover:bg-yellow-500 transition-colors">
                      {copy.tertiaryAnnualCta} →
                    </a>
                  </div>
                )}
              </div>

              {/* ── Groups & School Visits ── */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <button type="button" onClick={() => setOpenOption(openOption === 'groups' ? null : 'groups')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base">👥</span>
                  <span className="text-sm font-medium text-gray-800 flex-1">{copy.tertiaryGroupsTitle}</span>
                  {openOption === 'groups' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>
                {openOption === 'groups' && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <img src="/images/green-zone_world-explorer_2018_024.jpg" alt="Groups" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">{copy.tertiaryGroupsTagline}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {copy.tertiaryGroupsItems.map((item) => (
                        <div key={item.name} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-xs font-bold text-gray-800">{item.name}</div>
                            <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.price}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium">{item.subtitle}</div>
                          <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <a href="#" className="text-xs font-semibold text-yellow-700 hover:underline inline-flex items-center gap-1">
                      {copy.tertiaryGroupsCta} <span aria-hidden>→</span>
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* ─── Annual Pass login prompt ─── */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <p className="text-sm text-gray-500 whitespace-nowrap">
              {copy.annualPassLoginPrompt}{' '}
              <a href="#" className="font-bold text-gray-800 hover:underline">{copy.annualPassLoginLink}</a>{' '}
              {copy.annualPassLoginSuffix}
            </p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>

        {/* ═══════════════ SIDEBAR ═══════════════ */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-20 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">{copy.customerTitle}</h3>
              <div className="space-y-2">
                <div>
                  <input type="text" name="name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); if (e.target.value.trim()) clearError('name'); }}
                    placeholder={copy.namePlaceholder} aria-label={copy.nameLabel}
                    className={`w-full px-3 py-2 rounded-lg border bg-white text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.name && <p className="text-[10px] text-red-600 mt-0.5">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) clearError('email'); }}
                    placeholder={copy.emailPlaceholder} aria-label={copy.emailLabel}
                    className={`w-full px-3 py-2 rounded-lg border bg-white text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.email && <p className="text-[10px] text-red-600 mt-0.5">{errors.email}</p>}
                </div>
                <input type="text" name="country" autoComplete="country-name" value={country} onChange={(e) => setCountry(e.target.value)}
                  placeholder={copy.countryPlaceholder} aria-label={copy.countryLabel}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400" />
                <input type="text" name="postal-code" autoComplete="postal-code" value={zip} onChange={(e) => setZip(e.target.value)}
                  placeholder={copy.zipPlaceholder} aria-label={copy.zipLabel}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">{copy.orderSummary}</h3>
              {zonesItems.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-700 mb-1">{copy.pricingZonesHeader}</div>
                  {zonesItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-500 py-0.5">
                      <span>{item.quantity}x {item.label.replace('Experience Zones – ', '').replace('Annual Pass – ', '')}</span>
                      <span className="font-medium text-gray-700">{formatPrice(item.total)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-semibold text-gray-800 mt-1 pt-1 border-t border-gray-100">
                    <span>Subtotal</span><span>{formatPrice(zonesSubtotal)}</span>
                  </div>
                </div>
              )}
              {lmaItems.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-700 mb-1">{copy.pricingLmaHeader}</div>
                  {lmaItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-500 py-0.5">
                      <span>{item.quantity}x {item.label.replace(/^LMA .+ – /, '')}</span>
                      <span className="font-medium text-gray-700">{formatPrice(item.total)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-semibold text-gray-800 mt-1 pt-1 border-t border-gray-100">
                    <span>Subtotal</span><span>{formatPrice(lmaSubtotal)}</span>
                  </div>
                </div>
              )}
              {total.subtotal === 0 && <p className="text-xs text-gray-400">Select an experience to see pricing</p>}
              {total.subtotal > 0 && (
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span><span>{formatPrice(total.subtotal)}</span>
                </div>
              )}
            </div>

            <div className="sticky bottom-4">
              <button type="button" onClick={handlePay} disabled={total.subtotal === 0}
                className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold text-base shadow-lg shadow-yellow-400/30
                           hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all">
                Pay{total.subtotal > 0 ? ` · ${formatPrice(total.subtotal)}` : ''}
              </button>
              {Object.keys(errors).length > 0 && (
                <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3 space-y-0.5">
                  {errors.product && <p className="text-[11px] text-red-700">{errors.product}</p>}
                  {errors.zoneDate && <p className="text-[11px] text-red-700">Experience Zones: {errors.zoneDate}</p>}
                  {errors.zoneGuests && <p className="text-[11px] text-red-700">Experience Zones: {errors.zoneGuests}</p>}
                  {errors.zoneTimeslot && <p className="text-[11px] text-red-700">Experience Zones: {errors.zoneTimeslot}</p>}
                  {errors.lmaLevel && <p className="text-[11px] text-red-700">Masters Academy: {errors.lmaLevel}</p>}
                  {errors.lmaDate && <p className="text-[11px] text-red-700">Masters Academy: {errors.lmaDate}</p>}
                  {errors.lmaGuests && <p className="text-[11px] text-red-700">Masters Academy: {errors.lmaGuests}</p>}
                  {errors.lmaTimeslot && <p className="text-[11px] text-red-700">Masters Academy: {errors.lmaTimeslot}</p>}
                  {errors.name && <p className="text-[11px] text-red-700">Name: {errors.name}</p>}
                  {errors.email && <p className="text-[11px] text-red-700">Email: {errors.email}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog" aria-modal="true" aria-label={copy.paymentTitle}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{copy.paymentTitle}</h2>
            <p className="text-sm text-gray-500 mb-4">Total: {formatPrice(total.subtotal)}</p>
            <div className="space-y-3 mb-5">
              <div>
                <label htmlFor="card" className="text-xs font-medium text-gray-600 block mb-1">{copy.cardNumberLabel}</label>
                <input id="card" type="text" placeholder="4242 4242 4242 4242" maxLength={19}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="expiry" className="text-xs font-medium text-gray-600 block mb-1">{copy.expiryLabel}</label>
                  <input id="expiry" type="text" placeholder="MM/YY" maxLength={5}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                  <label htmlFor="cvc" className="text-xs font-medium text-gray-600 block mb-1">{copy.cvcLabel}</label>
                  <input id="cvc" type="text" placeholder="123" maxLength={3}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowPayment(false)}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">{copy.close}</button>
              <button type="button" onClick={handleConfirm} disabled={processing}
                className="flex-1 px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-500 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-colors">
                {processing ? copy.processing : copy.confirmPayment}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
