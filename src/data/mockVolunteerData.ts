import { VolunteerRequest, BoardStats } from '../types'

export const mockVolunteerRequests: VolunteerRequest[] = [
  {
    id: 'vr1',
    userId: 'user123',
    userName: 'Carlos M.',
    title: 'Urgent: Medical Transport Needed',
    description: 'Recently lost my job and need regular transport to chemotherapy appointments. Three appointments per week for the next 3 weeks.',
    urgencyLevel: 'critical',
    helpType: ['Transport', 'Medical appointment assistance'],
    schedule: [
      { date: '2025-10-01', time: '9:00 AM', covered: true, volunteerId: 'vol1' },
      { date: '2025-10-03', time: '9:00 AM', covered: false },
      { date: '2025-10-05', time: '9:00 AM', covered: true, volunteerId: 'vol2' },
      { date: '2025-10-08', time: '9:00 AM', covered: false },
      { date: '2025-10-10', time: '9:00 AM', covered: false },
      { date: '2025-10-12', time: '9:00 AM', covered: true, volunteerId: 'vol1' },
      { date: '2025-10-15', time: '9:00 AM', covered: false },
      { date: '2025-10-17', time: '9:00 AM', covered: false },
      { date: '2025-10-19', time: '9:00 AM', covered: false },
    ],
    status: 'active',
    createdAt: new Date('2025-09-20'),
    contactInfo: 'carlos.m@email.com',
    verificationStatus: 'verified'
  },
  {
    id: 'vr2',
    userId: 'user456',
    userName: 'Sofia L.',
    title: 'Family Crisis - Need Childcare',
    description: 'Husband hospitalized unexpectedly. Need childcare for 2 kids (ages 5, 7) while I work and visit hospital. Weekdays 8 AM - 6 PM.',
    urgencyLevel: 'high',
    helpType: ['Childcare', 'After-school care'],
    schedule: [
      { date: '2025-09-30', time: '8:00 AM - 6:00 PM', covered: true, volunteerId: 'vol3' },
      { date: '2025-10-01', time: '8:00 AM - 6:00 PM', covered: true, volunteerId: 'vol3' },
      { date: '2025-10-02', time: '8:00 AM - 6:00 PM', covered: false },
      { date: '2025-10-03', time: '8:00 AM - 6:00 PM', covered: false },
      { date: '2025-10-04', time: '8:00 AM - 6:00 PM', covered: false },
      { date: '2025-10-07', time: '8:00 AM - 6:00 PM', covered: true, volunteerId: 'vol4' },
      { date: '2025-10-08', time: '8:00 AM - 6:00 PM', covered: false },
    ],
    status: 'active',
    createdAt: new Date('2025-09-22'),
    contactInfo: 'sofia.lopez@email.com',
    verificationStatus: 'verified'
  },
  {
    id: 'vr3',
    userId: 'user789',
    userName: 'Ahmed K.',
    title: 'Lost Job - Need Food Support',
    description: 'Recently laid off. Looking for food assistance and grocery help while searching for new employment. Weekly grocery trips would be immensely helpful.',
    urgencyLevel: 'medium',
    helpType: ['Food donations', 'Grocery shopping help'],
    schedule: [
      { date: '2025-09-28', time: 'Flexible', covered: true, volunteerId: 'vol5' },
      { date: '2025-10-05', time: 'Flexible', covered: false },
      { date: '2025-10-12', time: 'Flexible', covered: false },
      { date: '2025-10-19', time: 'Flexible', covered: false },
    ],
    status: 'active',
    createdAt: new Date('2025-09-25'),
    contactInfo: 'ahmed.k@email.com',
    verificationStatus: 'verified'
  }
]

export const mockBoardStats: BoardStats = {
  activeRequests: 3,
  totalVolunteers: 8,
  helpSessionsCovered: 156
}