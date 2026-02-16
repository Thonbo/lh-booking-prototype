import { LmaLevel } from '@/types';

export const lmaLevels: LmaLevel[] = [
  {
    id: 'play-agent',
    name: 'Play Agent',
    description: 'Guided building experience with a LEGO Play Agent. Perfect for families.',
    priceAdult: 149,
    priceChild: 99,
  },
  {
    id: 'master-builder',
    name: 'Master Builder',
    description: 'Advanced building session with a certified LEGO Master Builder. Limited spots.',
    priceAdult: 249,
    priceChild: 199,
  },
  {
    id: 'creative-lab',
    name: 'Creative Lab',
    description: 'Hands-on creative workshop exploring new LEGO techniques and digital building tools.',
    priceAdult: 179,
    priceChild: 129,
  },
  {
    id: 'story-makers',
    name: 'Story Makers',
    description: 'Build characters and scenes, then bring them to life with stop-motion animation.',
    priceAdult: 199,
    priceChild: 149,
  },
];
