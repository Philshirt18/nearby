import { EmergencyRequest, TimeCredit, EmergencyPoolStats } from '../types';

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: 'em1',
    userId: 'user123',
    userName: 'Carlos M.',
    title: 'Urgent: Medical Transport Needed',
    description: 'Recently lost my job and need regular transport to chemotherapy appointments for the next 3 weeks. Cannot afford taxis.',
    urgencyLevel: 'critical',
    creditsNeeded: 50,
    creditsReceived: 32,
    skillsNeeded: ['Transport', 'Medical appointment assistance'],
    status: 'active',
    createdAt: new Date('2025-09-20'),
    expiresAt: new Date('2025-10-15'),
    verificationStatus: 'verified'
  },
  {
    id: 'em2',
    userId: 'user456',
    userName: 'Sofia L.',
    title: 'Family Crisis - Need Childcare',
    description: 'Husband hospitalized unexpectedly. Need childcare for 2 kids (ages 5, 7) for 2 weeks while I work and visit hospital.',
    urgencyLevel: 'high',
    creditsNeeded: 60,
    creditsReceived: 45,
    skillsNeeded: ['Childcare', 'After-school care'],
    status: 'active',
    createdAt: new Date('2025-09-22'),
    expiresAt: new Date('2025-10-08'),
    verificationStatus: 'verified'
  },
  {
    id: 'em3',
    userId: 'user789',
    userName: 'Ahmed K.',
    title: 'Lost Job - Need Food Support',
    description: 'Recently laid off. Looking for food assistance and grocery help while searching for new employment.',
    urgencyLevel: 'medium',
    creditsNeeded: 30,
    creditsReceived: 18,
    skillsNeeded: ['Food donations', 'Grocery shopping help'],
    status: 'active',
    createdAt: new Date('2025-09-25'),
    expiresAt: new Date('2025-10-25'),
    verificationStatus: 'verified'
  }
];

export const mockPoolStats: EmergencyPoolStats = {
  totalCredits: 1247,
  activeRequests: 3,
  totalDonations: 89,
  peopleHelped: 24
};

export const mockUserCredits: TimeCredit[] = [
  {
    id: 'tc1',
    userId: 'currentUser',
    amount: 10,
    type: 'earned',
    description: 'Completed tutoring service',
    relatedOfferId: '1',
    timestamp: new Date('2025-09-15')
  },
  {
    id: 'tc2',
    userId: 'currentUser',
    amount: -5,
    type: 'donated',
    description: 'Donated to Emergency Pool',
    timestamp: new Date('2025-09-18')
  },
  {
    id: 'tc3',
    userId: 'currentUser',
    amount: 8,
    type: 'earned',
    description: 'Garden maintenance help',
    relatedOfferId: '10',
    timestamp: new Date('2025-09-20')
  }
];