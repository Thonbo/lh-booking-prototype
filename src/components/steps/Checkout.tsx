'use client';

import React, { useState } from 'react';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { COPY } from '@/copy';
import { LMA_LEVELS } from '@/data/lma';
import { ZONES_TIMESLOTS, LMA_TIMESLOTS } from '@/data/timeslots';
import { calculateCart, cartTotal, groupByProduct, formatPrice } from '@/utils/pricing';
import DatePicker from '@/components/DatePicker';
import GuestsPicker from '@/components/GuestsPicker';
import TimeslotPicker from '@/components/TimeslotPicker';
import PaymentModal from '@/components/PaymentModal';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  product?: string;
}

export default function Checkout() {
  const { state, dispatch } = useBookingFlow();
  const [zonesExpanded, setZonesExpanded] = useState(false);
  const [lmaExpanded, setLmaExpanded] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showValidation, setShowValidation] = useState(false);

  const items = calculateCart(state);
  const total = cartTotal(items);
  const grouped = groupByProduct(items);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Check product selection
    if (!state.zones.enabled && !state.lma.enabled) {
      errors.product = COPY.validation.selectProduct;
    }

    // Check required fields
    if (state.customer.firstName.trim() === '') {
      errors.firstName = COPY.validation.required;
    }
    if (state.customer.lastName.trim() === '') {
      errors.lastName = COPY.validation.required;
    }
    if (state.customer.email.trim() === '') {
      errors.email = COPY.validation.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.customer.email)) {
      errors.email = COPY.validation.invalidEmail;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayClick = () => {
    setShowValidation(true);
    if (validateForm()) {
      dispatch({ type: 'OPEN_PAYMENT_MODAL' });
    }
  };

  const showSameDatePill = state.zones.enabled && state.zones.date !== null && state.lma.enabled;

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      {/* Left: Product cards */}
      <div className="flex-1 space-y-4">
        {/* Product selection error */}
        {showValidation && validationErrors.product && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-[15px] font-bold text-red-600">{validationErrors.product}</p>
          </div>
        )}

        {/* ===== Experience Zones Card ===== */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={state.zones.enabled}
                onChange={() => {
                  dispatch({ type: 'TOGGLE_ZONES' });
                  if (!state.zones.enabled) setZonesExpanded(true);
                }}
                className="w-5 h-5 accent-yellow-400"
              />
              <div>
                <h3 className="font-bold text-gray-900">{COPY.zones.title}</h3>
                <p className="text-sm text-gray-500">{COPY.zones.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="font-bold text-gray-900">{formatPrice(COPY.zones.price)}</span>
                <span className="text-xs text-gray-500 block">{COPY.zones.priceLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setZonesExpanded(!zonesExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronIcon open={zonesExpanded} />
              </button>
            </div>
          </div>

          {zonesExpanded && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-600 mb-4">{COPY.zones.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuestsPicker
                  guests={state.zones.guests}
                  onChange={(g) => dispatch({ type: 'SET_ZONES_GUESTS', guests: g })}
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {COPY.datePicker.title}
                  </h4>
                  <DatePicker
                    selected={state.zones.date}
                    onSelect={(d) => dispatch({ type: 'SET_ZONES_DATE', date: d })}
                    onSelectToday={() => {}}
                  />
                  {state.zones.date && (
                    <div className="mt-4">
                      <TimeslotPicker
                        timeslots={ZONES_TIMESLOTS}
                        selected={state.zones.timeslot}
                        onSelect={(id) => dispatch({ type: 'SET_ZONES_TIMESLOT', timeslot: id })}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Annual Pass */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={state.zones.annualPass}
                  onChange={() => dispatch({ type: 'TOGGLE_ANNUAL_PASS' })}
                  className="w-4 h-4 accent-yellow-400"
                />
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {COPY.zones.annualPassLabel}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {formatPrice(COPY.zones.annualPassPrice)} — {COPY.zones.annualPassNote}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== LMA Card ===== */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={state.lma.enabled}
                onChange={() => {
                  dispatch({ type: 'TOGGLE_LMA' });
                  if (!state.lma.enabled) setLmaExpanded(true);
                }}
                className="w-5 h-5 accent-yellow-400"
              />
              <div>
                <h3 className="font-bold text-gray-900">{COPY.lma.title}</h3>
                <p className="text-sm text-gray-500">{COPY.lma.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLmaExpanded(!lmaExpanded)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronIcon open={lmaExpanded} />
            </button>
          </div>

          {lmaExpanded && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-600 mb-4">{COPY.lma.description}</p>

              {/* LMA Levels 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {LMA_LEVELS.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_LMA_LEVEL', levelId: level.id })}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      ${state.lma.levelId === level.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <h4 className="font-bold text-gray-900">{level.name}</h4>
                    <p className="text-xs text-gray-500">{level.subtitle}</p>
                    <p className="text-sm font-semibold mt-2">{formatPrice(level.price)}</p>
                    <a
                      href={level.readMoreUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                    >
                      {COPY.lma.readMore}
                    </a>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuestsPicker
                  guests={state.lma.guests}
                  onChange={(g) => dispatch({ type: 'SET_LMA_GUESTS', guests: g })}
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {COPY.datePicker.title}
                  </h4>
                  <DatePicker
                    selected={state.lma.date}
                    onSelect={(d) => dispatch({ type: 'SET_LMA_DATE', date: d })}
                    onSelectToday={() => {}}
                    showSameDatePill={showSameDatePill}
                    onSameDate={() => dispatch({ type: 'SYNC_LMA_DATE' })}
                  />
                  {state.lma.date && state.lma.levelId && (
                    <div className="mt-4">
                      <TimeslotPicker
                        timeslots={LMA_TIMESLOTS[state.lma.levelId] || []}
                        selected={state.lma.timeslot}
                        onSelect={(id) => dispatch({ type: 'SET_LMA_TIMESLOT', timeslot: id })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-6 space-y-6">
          {/* Customer form */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">{COPY.customer.title}</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="given-name"
                    autoComplete="given-name"
                    placeholder={COPY.customer.firstName}
                    value={state.customer.firstName}
                    onChange={(e) =>
                      dispatch({ type: 'SET_CUSTOMER', field: 'firstName', value: e.target.value })
                    }
                    className={`w-full border ${
                      showValidation && validationErrors.firstName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none`}
                  />
                  {showValidation && validationErrors.firstName && (
                    <p className="mt-1 text-sm font-bold text-red-600">
                      {validationErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="family-name"
                    autoComplete="family-name"
                    placeholder={COPY.customer.lastName}
                    value={state.customer.lastName}
                    onChange={(e) =>
                      dispatch({ type: 'SET_CUSTOMER', field: 'lastName', value: e.target.value })
                    }
                    className={`w-full border ${
                      showValidation && validationErrors.lastName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none`}
                  />
                  {showValidation && validationErrors.lastName && (
                    <p className="mt-1 text-sm font-bold text-red-600">
                      {validationErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={COPY.customer.email}
                  value={state.customer.email}
                  onChange={(e) =>
                    dispatch({ type: 'SET_CUSTOMER', field: 'email', value: e.target.value })
                  }
                  className={`w-full border ${
                    showValidation && validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none`}
                />
                {showValidation && validationErrors.email && (
                  <p className="mt-1 text-sm font-bold text-red-600">{validationErrors.email}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="country-name"
                  autoComplete="country-name"
                  placeholder={COPY.customer.country}
                  value={state.customer.country}
                  onChange={(e) =>
                    dispatch({ type: 'SET_CUSTOMER', field: 'country', value: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                />
                <input
                  type="text"
                  name="postal-code"
                  autoComplete="postal-code"
                  placeholder={COPY.customer.zip}
                  value={state.customer.zip}
                  onChange={(e) =>
                    dispatch({ type: 'SET_CUSTOMER', field: 'zip', value: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">{COPY.sidebar.title}</h3>
            {items.length === 0 ? (
              <p className="text-sm text-gray-400">{COPY.sidebar.emptyState}</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(grouped).map(([product, lineItems]) => {
                  const subtotal = lineItems.reduce((s, li) => s + li.total, 0);
                  return (
                    <div key={product}>
                      <div className="space-y-1">
                        {lineItems.map((li, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {li.label} x{li.quantity}
                            </span>
                            <span className="text-gray-800">{formatPrice(li.total)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm font-semibold mt-1 pt-1 border-t border-gray-100">
                        <span>{COPY.sidebar.subtotal}</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                  <span>{COPY.sidebar.total}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Pay button */}
          <button
            type="button"
            onClick={handlePayClick}
            className="w-full py-3 text-sm font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            {COPY.sidebar.payButton}
          </button>

          {/* Validation summary */}
          {showValidation && Object.keys(validationErrors).length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-semibold text-red-700">{COPY.validation.summary}</p>
              <ul className="mt-2 text-sm text-red-600 space-y-1">
                {validationErrors.product && <li>• {validationErrors.product}</li>}
                {validationErrors.firstName && <li>• First name: {validationErrors.firstName}</li>}
                {validationErrors.lastName && <li>• Last name: {validationErrors.lastName}</li>}
                {validationErrors.email && <li>• Email: {validationErrors.email}</li>}
              </ul>
            </div>
          )}
        </div>
      </div>

      <PaymentModal />
    </div>
  );
}
