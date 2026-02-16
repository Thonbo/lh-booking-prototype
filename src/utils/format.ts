import copy from '@/copy';

export function formatPrice(amount: number): string {
  return `${amount} ${copy.currency}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getTodayISO(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}
