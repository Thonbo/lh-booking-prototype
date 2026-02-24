export default function CommunityFooter() {
  return (
    <footer
      className="border-t border-[--color-border] mt-24 py-12 bg-[--color-surface]"
      aria-label="Site footer"
    >
      <div className="max-w-[--max-w-content] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-semibold text-[--color-ink] mb-2">Community Events</p>
            <p className="text-sm text-[--color-ink-muted] max-w-xs leading-relaxed">
              Connecting people with cultural events and places in their community.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2 list-none">
              <li>
                <a href="/events" className="text-sm text-[--color-ink-muted] hover:text-[--color-brand] focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded">
                  Events
                </a>
              </li>
              <li>
                <a href="/places" className="text-sm text-[--color-ink-muted] hover:text-[--color-brand] focus-visible:ring-3 focus-visible:ring-[--color-focus-ring] rounded">
                  Places
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="text-xs text-[--color-ink-muted] mt-8">
          © {new Date().getFullYear()} Community Events. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
