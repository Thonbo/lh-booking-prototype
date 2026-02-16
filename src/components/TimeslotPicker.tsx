'use client';

import { Timeslot, LmaTimeslot } from '@/types';
import copy from '@/copy';
import { formatPrice } from '@/utils/format';
import {
  ZONE_PRICE_ADULT,
} from '@/data/prices';

interface TimeslotPickerProps {
  slots: (Timeslot | LmaTimeslot)[];
  selected: string | null;
  onSelect: (id: string) => void;
  basePrice?: number;
  showSpots?: boolean;
}

export default function TimeslotPicker({
  slots,
  selected,
  onSelect,
  basePrice = ZONE_PRICE_ADULT,
  showSpots = false,
}: TimeslotPickerProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 block mb-2">
        {copy.timeslotLabel}
      </label>
      <p className="text-xs text-gray-500 mb-3">{copy.timeslotHint}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Timeslots">
        {slots.map((slot) => {
          const isSelected = slot.id === selected;
          const lmaSlot = showSpots ? (slot as LmaTimeslot) : null;
          const discountedPrice =
            slot.priceFactor < 1 ? formatPrice(Math.round(basePrice * slot.priceFactor)) : null;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => !slot.soldOut && onSelect(slot.id)}
              disabled={slot.soldOut}
              role="radio"
              aria-checked={isSelected}
              className={`
                relative p-3 rounded-xl border-2 text-left transition-all
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}
                ${slot.soldOut ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-yellow-300 cursor-pointer'}
              `}
            >
              <div className="font-semibold text-gray-900">{slot.time}</div>
              {discountedPrice && !slot.soldOut && (
                <div className="text-xs text-green-700 font-medium mt-0.5">
                  from {discountedPrice}
                </div>
              )}
              {slot.soldOut && (
                <div className="text-xs text-red-600 font-medium mt-0.5">{copy.soldOut}</div>
              )}
              {showSpots && lmaSlot && !slot.soldOut && (
                <div className="text-xs text-gray-500 mt-0.5">
                  {copy.spotsLeft(lmaSlot.spotsLeft)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
