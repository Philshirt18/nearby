export interface Offer {
    id: string
    category: 'skills' | 'land' | 'food' | 'meals'
    title: string
    description: string
    paymentType: 'skill-only' | 'cash' | 'hybrid' | 'gift'
    price?: number
    quantity?: string
    skillsNeeded?: string[]
    lat: number
    lng: number
    city: string
    contactInfo?: string
    distance?: number
  }
  
  export interface VolunteerRequest {
    id: string
    userId: string
    userName: string
    title: string
    description: string
    urgencyLevel: 'critical' | 'high' | 'medium'
    helpType: string[]
    schedule: ScheduleSlot[]
    status: 'active' | 'completed' | 'cancelled'
    createdAt: Date
    contactInfo: string
    verificationStatus: 'verified' | 'pending' | 'rejected'
  }
  
  export interface ScheduleSlot {
    date: string
    time: string
    covered: boolean
    volunteerId?: string
  }
  
  export interface BoardStats {
    activeRequests: number
    totalVolunteers: number
    helpSessionsCovered: number
  }
  
  export interface UserProfile {
    userId: string
    name: string
    username: string
    profilePhoto: string
    location: string
    memberSince: Date
    verified: {
      phone: boolean
      email: boolean
      id: boolean
    }
    stats: {
      offersPosted: number
      exchangesCompleted: number
      volunteerHours: number
      responseRate: number
      avgResponseTime: string
    }
    skillsOffered: string[]
    skillsSeeking: string[]
    activeCategories: string[]
    languages: string[]
    availability: {
      weekdays: boolean
      weekends: boolean
      evenings: boolean
    }
    maxDistance: number
    preferredContact: string
    bio: string
    testimonials: Testimonial[]
  }
  
  export interface Testimonial {
    id: string
    from: string
    text: string
    date: Date
    stars: number
  }
  
  export interface Location {
    lat: number
    lng: number
  }
  
  export interface FormData {
    category: string
    title: string
    description: string
    paymentType: string
    price: string
    quantity: string
    skillsNeeded: string
    contactInfo: string
  }
  
  export interface VolunteerFormData {
    title: string
    description: string
    urgencyLevel: string
    helpType: string
    contactInfo: string
    scheduleEntries: { date: string; time: string }[]
  }