import { LmaLevel } from '@/types';

export const LMA_LEVELS: LmaLevel[] = [
  {
    id: 'open',
    name: 'Open',
    subtitle: 'Ages 2+',
    description:
      'Free play with LEGO bricks in a creative, open environment. Build whatever your imagination desires with thousands of bricks.',
    price: 99,
    readMoreUrl: '#',
    image: '/images/lma-open.jpg',
  },
  {
    id: 'guided',
    name: 'Guided',
    subtitle: 'Ages 4+',
    description:
      'Follow a guided building experience led by a LEGO Master Builder. Create amazing models with expert instruction.',
    price: 149,
    readMoreUrl: '#',
    image: '/images/lma-guided.jpg',
  },
  {
    id: 'expert',
    name: 'Expert',
    subtitle: 'Ages 7+',
    description:
      'Advanced building challenges that push your skills to the limit. Tackle complex models with expert-level techniques.',
    price: 199,
    readMoreUrl: '#',
    image: '/images/lma-expert.jpg',
  },
  {
    id: 'masterclass',
    name: 'Masterclass',
    subtitle: 'Ages 10+',
    description:
      'An exclusive masterclass with a LEGO Master Builder. Learn professional techniques and take home your creation.',
    price: 299,
    readMoreUrl: '#',
    image: '/images/lma-masterclass.jpg',
  },
];
