export const COPY = {
  // Header
  logo: 'LEGO House',

  // Product cards
  zones: {
    title: 'Experience Zones',
    subtitle: 'Explore all the Experience Zones in LEGO House',
    description:
      'Dive into the world of LEGO with six Experience Zones, each offering unique creative challenges and play experiences. Build, create, and discover across all zones.',
    enableLabel: 'I want this',
    price: 229,
    priceLabel: 'per person',
    annualPassLabel: 'Add Annual Pass',
    annualPassPrice: 449,
    annualPassNote: 'Unlimited visits for 12 months',
  },

  lma: {
    title: 'LEGO Masterpiece Academy',
    subtitle: 'Take your building skills to the next level',
    description:
      'Join a LEGO Masterpiece Academy session and learn advanced building techniques from expert builders.',
    enableLabel: "I'd like to add this too",
    selectLevel: 'Select a level',
    readMore: 'Read more',
  },

  // Guests
  guests: {
    title: 'Guests',
    adults: 'Adults',
    adultsAge: '13+',
    children: 'Children',
    childrenAge: '2–12',
    infants: 'Infants',
    infantsAge: '0–1',
    infantsFree: 'Free',
  },

  // Date picker
  datePicker: {
    title: 'Select date',
    today: 'Select today',
    sameDate: 'Same date',
    timeslot: 'Select time',
  },

  // Sidebar
  sidebar: {
    title: 'Your booking',
    emptyState: 'Select a product to get started',
    subtotal: 'Subtotal',
    total: 'Total',
    payButton: 'Pay now',
  },

  // Customer form
  customer: {
    title: 'Your details',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    country: 'Country',
    zip: 'Zip code',
  },

  // Validation
  validation: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    selectProduct: 'Please select at least one product',
    summary: 'Please complete all required fields to continue',
  },

  // Payment modal
  payment: {
    title: 'Payment',
    cardNumber: 'Card number',
    expiry: 'Expiry',
    cvc: 'CVC',
    nameOnCard: 'Name on card',
    payButton: 'Complete payment',
    cancel: 'Cancel',
  },

  // Success page
  success: {
    title: 'Booking confirmed!',
    subtitle: 'A confirmation has been sent to',
    receipt: 'Receipt',
    bookingRef: 'Booking reference',
    date: 'Date',
    guests: 'Guests',
    total: 'Total',
    backToHome: 'Back to home',
  },

  // Upsell cards
  upsells: {
    title: 'Make the most of your visit',
    miniChef: {
      title: 'Mini Chef',
      description: 'A fun dining experience where your food is delivered by LEGO robots.',
      cta: 'Book Mini Chef',
    },
    hotels: {
      title: 'LEGO Hotels',
      description: 'Stay overnight in a LEGO-themed hotel room near LEGO House.',
      cta: 'Explore hotels',
    },
    parking: {
      title: 'Parking',
      description: 'Reserve a parking spot close to LEGO House for easy access.',
      cta: 'Reserve parking',
    },
    annualPass: {
      title: 'Annual Pass',
      description: 'Get unlimited visits to LEGO House for a full year.',
      cta: 'Get Annual Pass',
    },
  },

  // General
  currency: 'DKK',
} as const;
