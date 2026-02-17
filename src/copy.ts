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
  tertiaryComboTagline: 'The full LEGO hometown package',
  tertiaryComboItems: [
    { name: 'Combi Ticket', subtitle: 'LEGO House + LEGOLAND', price: 'From 649 DKK', desc: 'One-day access to both LEGO House and LEGOLAND Billund. LEGOLAND visit valid up to 6 days before or after.' },
    { name: 'Ultimate Destination Stay', subtitle: '2 adults + 2 kids', price: 'From 2,998 DKK', desc: 'LEGO House + LEGOLAND + overnight at Hotel LEGOLAND, Castle Hotel, or Holiday Village.' },
    { name: 'Winter Short Break', subtitle: 'Seasonal package', price: 'From 2,056 DKK', desc: 'LEGO House + Hotel LEGOLAND with breakfast + Billund Bad indoor swimming pool.' },
  ],
  tertiaryComboCta: 'See all packages on legohouse.com',

  tertiaryToursTitle: 'Guided Tours & Exclusives',
  tertiaryToursTagline: 'Go behind the scenes',
  tertiaryToursItems: [
    { name: 'LEGO House + Factory Visit', subtitle: 'Full day', price: '2,495 DKK/person', desc: 'Full-day Experience Zones access plus an exclusive guided tour of the LEGO brick factory.' },
    { name: 'LEGO Fan Tour', subtitle: 'Group of 25', price: '4,999 DKK', desc: 'Join international enthusiasts for a guided day across LEGO sites in Billund.' },
    { name: 'Brick Tour (Private)', subtitle: 'Up to 5 guests', price: 'From 20,000 DKK', desc: 'Private guide, lunch, and a 1-hour build session with a LEGO designer.' },
    { name: 'LEGO Inside Tour', subtitle: '3-day experience', price: '25,000 DKK', desc: 'The ultimate fan experience — 3 days inside otherwise restricted LEGO Group facilities. Hotel & meals included.' },
  ],
  tertiaryToursCta: 'Explore all tours on legohouse.com',

  tertiaryAnnualTitle: 'Annual Pass',
  tertiaryAnnualTagline: 'Unlimited play, all year',
  tertiaryAnnualPrice: '649',
  tertiaryAnnualBenefits: [
    'Unlimited visits for 12 months',
    '25\u2009% off LEGO Masters Academy sessions',
    'Advance booking for full-day experiences',
    'Upgrade any day ticket at the info desk',
  ],
  tertiaryAnnualCta: 'Get your Annual Pass',

  tertiaryGroupsTitle: 'Groups & School Visits',
  tertiaryGroupsTagline: 'Play together, learn together',
  tertiaryGroupsItems: [
    { name: 'Large Groups (20+)', subtitle: 'Creative group day', price: 'From 229 DKK/person', desc: 'Welcomed by Play Agents with unique LEGO House stories and creative challenges.' },
    { name: 'Playful Tour', subtitle: 'Private guide', price: 'From 3,600 DKK', desc: 'Custom guided tour on weekdays. Three time slots available: 10:00, 11:30, and 13:00.' },
    { name: 'School Programmes', subtitle: 'Grades 1–6', price: '3,000 DKK/class', desc: '75-minute lessons — Fish Designer, Story Lab, Robo Lab, or Test Driver. Up to 30 pupils + 3 teachers.' },
    { name: 'Exclusive Venue Rental', subtitle: '1,000+ guests', price: 'On request', desc: 'Reserve the entire LEGO House for your company or organisation. Fully bespoke event.' },
  ],
  tertiaryGroupsCta: 'Contact groups@legohouse.com',

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
