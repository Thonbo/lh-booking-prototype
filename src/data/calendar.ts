import { DayInfo } from '@/types';

/**
 * Generate a simple peak calendar.
 * Peak days: weekends + hardcoded holiday periods.
 * Some days are marked as sold out.
 */

const SOLD_OUT_DATES = new Set([
  '2025-07-15',
  '2025-07-16',
  '2025-12-27',
  '2025-12-28',
  '2026-02-14',
  '2026-02-15',
  '2026-04-18', // Easter
  '2026-04-19',
  '2026-04-20',
]);

const HOLIDAY_RANGES: [string, string][] = [
  ['2025-06-28', '2025-08-10'], // Summer holiday
  ['2025-10-11', '2025-10-19'], // Autumn break
  ['2025-12-20', '2026-01-04'], // Christmas / New Year
  ['2026-02-07', '2026-02-15'], // Winter break
  ['2026-03-28', '2026-04-05'], // Easter break
];

function isInRange(date: string, ranges: [string, string][]): boolean {
  return ranges.some(([start, end]) => date >= start && date <= end);
}

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  return day === 0 || day === 6;
}

export function getDayInfo(dateStr: string): DayInfo {
  const isPeak = isWeekend(dateStr) || isInRange(dateStr, HOLIDAY_RANGES);
  const soldOut = SOLD_OUT_DATES.has(dateStr);
  return { date: dateStr, isPeak, soldOut };
}

export function isPeakDay(dateStr: string): boolean {
  return getDayInfo(dateStr).isPeak;
}

export function isSoldOut(dateStr: string): boolean {
  return SOLD_OUT_DATES.has(dateStr);
}
