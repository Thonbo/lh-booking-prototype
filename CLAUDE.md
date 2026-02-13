# LEGO House Booking Prototype

## Project Overview
Frontend-only booking flow prototype for LEGO House. Kiosk-style single-page checkout experience.

- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React Context + useReducer
- **Deployment**: Netlify (static export) — https://lh-booking-prototype.netlify.app
- **Deploy command**: `npx netlify deploy --prod --dir=out` (run `npm run build` first)

## Architecture

### Flow
Two steps: `checkout` → `success`

### Checkout Page (`src/components/steps/Checkout.tsx`)
- Two horizontal product cards: **Experience Zones** (primary) and **LMA** (secondary)
- Each card has a checkbox to enable, with dynamic labels ("I want this" / "I'd like to add this too")
- Chevron expand/collapse for card details
- Expanded: guests picker (left) + date picker (right) on same row
- "Select today" pill + conditional "Same date" blue pill for cross-product date sync
- LMA has 4 levels in a 2x2 grid with "Read more" links
- Annual Pass checkbox inside zones expanded panel
- Right sidebar: customer form (name, email, country, zip), grouped pricing, sticky Pay button
- Payment modal with fake card inputs

### Success/Receipt Page (`src/components/steps/Success.tsx`)
- Booking confirmation with customer email
- Receipt grouped by product (zones subtotal, LMA subtotal, total)
- Upsell cards: Mini Chef, Hotels, Parking, Annual Pass

### Key Files
- `src/types/index.ts` — Domain types, BookingStep, CustomerInfo
- `src/hooks/useBookingFlow.tsx` — Central state (useReducer + Context)
- `src/copy.ts` — All UI strings/copy
- `src/data/lma.ts` — 4 LMA levels with pricing
- `src/data/timeslots.ts` — Timeslots for zones and all 4 LMA levels
- `src/utils/pricing.ts` — Price calculation, returns CartLineItem[]
- `src/components/BookingFlow.tsx` — Main wrapper, black logo, checkout/success routing
- `src/components/DatePicker.tsx` — Calendar widget

### Images
Real LEGO House photos in `public/images/`. Logo variants: `dark=true.svg` (black), `dark=false.svg` (white).

## Design Decisions
- Zones not selected by default — user must opt in
- LMA always shows full interactive UI (not readonly) even when zones is configured
- No progress bar — single page with sidebar
- Hotels, parking, mini chef, annual pass are upsells on the receipt page, not in checkout
- Pricing displayed grouped by product in sidebar
