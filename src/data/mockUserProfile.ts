import { UserProfile } from '../types'

export const mockUserProfile: UserProfile = {
  userId: 'currentUser',
  name: 'María García',
  username: 'maria_g',
  profilePhoto: '👤',
  location: 'Málaga Centro',
  memberSince: new Date('2024-03-15'),
  verified: {
    phone: true,
    email: true,
    id: false
  },
  stats: {
    offersPosted: 12,
    exchangesCompleted: 28,
    volunteerHours: 45,
    responseRate: 95,
    avgResponseTime: '2 hours'
  },
  skillsOffered: ['Cooking', 'Spanish tutoring', 'Garden maintenance', 'Childcare'],
  skillsSeeking: ['Plumbing', 'Web design', 'Bicycle repair'],
  activeCategories: ['meals', 'skills', 'land'],
  languages: ['Spanish', 'English'],
  availability: {
    weekdays: true,
    weekends: true,
    evenings: true
  },
  maxDistance: 10,
  preferredContact: 'Email',
  bio: 'Single mom passionate about building community. I love cooking traditional Spanish meals and teaching kids. Looking to learn new skills and help my neighbors!',
  testimonials: [
    {
      id: 't1',
      from: 'Ahmed K.',
      text: 'María helped me with Spanish lessons for my kids. Very patient and professional!',
      date: new Date('2025-09-10'),
      stars: 5
    },
    {
      id: 't2',
      from: 'Sofia L.',
      text: 'Delicious paella! María is generous and kind. Highly recommend.',
      date: new Date('2025-08-22'),
      stars: 5
    },
    {
      id: 't3',
      from: 'Carlos M.',
      text: 'Helped me set up my vegetable garden. Great advice and very helpful.',
      date: new Date('2025-07-15'),
      stars: 5
    }
  ]
}