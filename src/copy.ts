/**
 * Centralised UI copy / microcopy.
 * All user-facing strings live here for easy editing and future i18n.
 */

const copy = {
  // ─── Global ─────────────────────────────────────────────
  siteName: 'LEGO House',
  currency: 'DKK',
  back: 'Back',
  next: 'Continue',
  close: 'Close',
  add: 'Add',
  remove: 'Remove',
  added: 'Added',
  soldOut: 'Sold out',
  spotsLeft: (n: number) => `${n} spot${n === 1 ? '' : 's'} left`,
  free: 'Free',
  today: 'Today',
  startOver: 'Start over',
  included: 'Included',
  popular: 'Popular',
  recommended: 'Recommended add-on',

  // ─── Checkout (single page) ──────────────────────────────
  checkoutTitle: 'Plan your visit',
  checkoutSubtitle: 'Choose what you want to buy — then pay on the right',

  zonesCardTitle: 'Day Ticket (All Experience Zones)',
  zonesCardDesc: 'Includes all play zones & rooftop, plus the LEGO history exhibit. Typical visit: 3–4 hours.',
  dayTicketSaving: 'Save 30 DKK when you book online!',
  zonesCardTag: 'Most popular',
  zonesFrom: 'From',
  zonesCheckboxDefault: 'I want this',
  zonesCheckboxWhenOtherSelected: "I'd like to add this too",

  lmaCardTitle: 'LEGO Masters Academy',
  lmaCardDesc: 'Book creative building workshops for ages 5–15.',
  lmaCardTag: 'Add to your day',
  lmaCheckboxDefault: 'I want this',
  lmaCheckboxWhenOtherSelected: "I'd like to add this too",
  lmaReadMore: 'Read more',
  sameDate: 'Same date',
  lmaCombineHint: 'Combine with Experience Zones for the ultimate visit',

  detailsExpand: 'Select date & guests',
  detailsCollapse: 'Hide details',
  editDetails: 'Edit',

  // ─── Shared details ───────────────────────────────────
  dateLabel: 'Select a date',
  guestsLabel: 'Guests',
  adults: 'Adults',
  children: 'Children (2–11)',
  childrenNote: 'Under 2 free',
  timeslotLabel: 'Choose arrival time',
  timeslotHint: 'Later arrival = lower price. You can stay all day.',
  noTimeslotNeeded: 'Arrive any time – no timeslot needed today',
  peakDayNote: 'Busy day – please select an arrival time',
  lmaLevelLabel: 'Choose your level',
  sameAsZones: 'Same date & guests as Experience Zones',
  editGuests: 'Edit attendees',

  // ─── Pricing sidebar ─────────────────────────────────────
  orderSummary: 'Order summary',
  pricingZonesHeader: 'Experience Zones',
  pricingLmaHeader: 'LEGO Masters Academy',
  basketGuestsSummary: (a: number, c: number) => {
    const parts: string[] = [];
    if (a > 0) parts.push(`${a} adult${a !== 1 ? 's' : ''}`);
    if (c > 0) parts.push(`${c} child${c !== 1 ? 'ren' : ''}`);
    return parts.join(', ');
  },

  annualPassUpgradeLink: 'Upgrade to Annual Pass',
  annualPassDesc: 'Unlimited visits for 12 months. Pays for itself in 3 visits.',

  // ─── Customer + Payment ────────────────────────────────
  customerTitle: 'Your details',
  nameLabel: 'Full name',
  emailLabel: 'Email',
  countryLabel: 'Country',
  zipLabel: 'Postal code',
  namePlaceholder: 'Enter your full name',
  emailPlaceholder: 'you@example.com',
  countryPlaceholder: 'Denmark',
  zipPlaceholder: 'e.g. 7190',
  paymentTitle: 'Payment',
  cardNumberLabel: 'Card number',
  expiryLabel: 'Expiry',
  cvcLabel: 'CVC',
  confirmPayment: 'Confirm payment',
  processing: 'Processing...',

  // ─── Success / Receipt ───────────────────────────────────
  successTitle: 'Booking confirmed!',
  successSubtitle: 'A confirmation email has been sent to',
  successCta: 'Book another visit',
  receiptExtrasTitle: 'Make your trip even better',

  miniChefTitle: 'Mini Chef – Restaurant',
  miniChefDesc: "Don't miss LEGO House's signature dining. Tables fill up fast!",
  miniChefGuests: 'Guests dining',
  miniChefCta: 'Book a table',

  parkingTitle: 'Parking',
  parkingDesc: '1st hour free · 2 min walk from LEGO House',
  parkingCta: 'See where to park',

  hotelsTitle: 'Nearby hotels',
  hotelsDesc: 'Planning an overnight stay?',
  hotelFrom: 'From',
  hotelPerNight: '/night',
  hotelDistance: (min: number) => `${min} min drive`,

  // ─── More Ticket Options (tertiary) ─────────────────────
  moreTicketOptions: 'More Ticket Options',
  tertiaryComboTitle: 'Combo Tickets & Packages',
  tertiaryComboDesc: 'Bundle zones + academy for a full day out.',
  tertiaryComboCta: 'View options',
  tertiaryToursTitle: 'Guided Tours & Exclusives',
  tertiaryToursDesc: 'Private tours and behind-the-scenes experiences.',
  tertiaryToursCta: 'View tours',
  tertiaryAnnualTitle: 'Annual Pass',
  tertiaryAnnualDesc: 'Unlimited visits for 12 months.',
  tertiaryAnnualCta: 'Log in to book a time slot',
  tertiaryGroupsTitle: 'Groups & School Visits',
  tertiaryGroupsDesc: 'Special rates for 10+ guests and school bookings.',
  tertiaryGroupsCta: 'See group options',

  // ─── Annual Pass login prompt ──────────────────────────
  annualPassLoginPrompt: 'Annual Pass?',
  annualPassLoginLink: 'Log in',
  annualPassLoginSuffix: 'to book your time slot.',

  // ─── Validation ────────────────────────────────────────
  errorRequired: 'This field is required',
  errorEmail: 'Please enter a valid email',
  errorNoDate: 'Please select a date',
  errorNoGuests: 'Add at least 1 guest',
  errorNoTimeslot: 'Please select a timeslot',
  errorNoLevel: 'Please select a level',
  errorSoldOut: 'Sold out – choose another day',
  errorNoProduct: 'Select at least one experience',
} as const;

export default copy;
