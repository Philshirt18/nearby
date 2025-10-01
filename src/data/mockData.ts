import { Offer, VolunteerRequest, BoardStats } from '../types/types'

export const mockOffers: Offer[] = [
  {
    id: '1',
    category: 'skills',
    title: "María's Tutoring Exchange",
    description: 'Single mom needs math tutoring for 2 kids (ages 8, 10). I offer house cleaning services in return',
    paymentType: 'skill-only',
    skillsNeeded: ['Math tutoring', 'Homework help'],
    lat: 36.7210,
    lng: -4.4180,
    city: 'Málaga',
    contactInfo: 'maria.gomez@email.com'
  },
  {
    id: '2',
    category: 'food',
    title: "Pedro's Fresh Tomatoes",
    description: '50kg fresh picked today. €1.50/kg (supermarket €3.50/kg) or help with harvest',
    price: 1.50,
    quantity: '50kg',
    paymentType: 'hybrid',
    lat: 36.7250,
    lng: -4.4200,
    city: 'Málaga',
    contactInfo: 'pedro.farm@email.com'
  }
]

export const mockVolunteerRequests: VolunteerRequest[] = [
  {
    id: 'vr1',
    userId: 'user123',
    userName: 'Carlos M.',
    title: 'Urgent: Medical Transport Needed',
    description: 'Recently lost my job and need regular transport to chemotherapy appointments.',
    urgencyLevel: 'critical',
    helpType: ['Transport', 'Medical appointment assistance'],
    schedule: [
      { date: '2025-10-01', time: '9:00 AM', covered: false }
    ],
    status: 'active',
    createdAt: new Date('2025-09-20'),
    contactInfo: 'carlos.m@email.com',
    verificationStatus: 'verified'
  }
]

export const mockBoardStats: BoardStats = {
  activeRequests: 3,
  totalVolunteers: 8,
  helpSessionsCovered: 156
}