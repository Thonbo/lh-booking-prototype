'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',       label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/places', label: 'Places' },
];

export default function CommunityHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[--color-surface] border-b border-[--color-border]">
      <div className="max-w-[--max-w-content] mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-[--color-ink] tracking-tight
                     focus:outline-none focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded"
          aria-label="Community Events — home"
        >
          Community Events
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors focus:outline-none
                      focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded px-1 py-0.5
                      ${isActive
                        ? 'text-[--color-brand] underline underline-offset-4 decoration-2'
                        : 'text-[--color-ink-muted] hover:text-[--color-ink]'
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
