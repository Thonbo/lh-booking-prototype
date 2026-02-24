import { EventAudience } from '@/types/community';

const ICONS: Record<EventAudience, React.ReactNode> = {
  adults: (
    <svg aria-hidden="true" focusable="false" width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </svg>
  ),
  children: (
    <svg aria-hidden="true" focusable="false" width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v5M9 21l3-8 3 8" />
    </svg>
  ),
  family: (
    <svg aria-hidden="true" focusable="false" width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6" r="3" />
      <circle cx="17" cy="6" r="3" />
      <path d="M1 21v-2a6 6 0 0 1 12 0v2" />
      <path d="M11 21v-2a6 6 0 0 1 12 0v2" />
    </svg>
  ),
};

const LABELS: Record<EventAudience, string> = {
  adults: 'Adults',
  children: 'Children',
  family: 'Family',
};

const STYLES: Record<EventAudience, string> = {
  adults:   'bg-[--color-brand-light] text-[--color-brand] border-[--color-brand]/20',
  children: 'bg-[--color-children-light] text-[--color-children] border-[--color-children]/20',
  family:   'bg-[--color-family-light] text-[--color-family] border-[--color-family]/20',
};

interface AudienceBadgeProps {
  audience: EventAudience;
  size?: 'sm' | 'md';
}

export default function AudienceBadge({ audience, size = 'md' }: AudienceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full font-medium
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'}
        ${STYLES[audience]}`}
    >
      {ICONS[audience]}
      {LABELS[audience]}
    </span>
  );
}
