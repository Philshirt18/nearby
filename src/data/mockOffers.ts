import { Offer } from '../types';
import { Offer, VolunteerRequest, BoardStats } from '../types/types'
export const mockOffers: Omit<Offer, 'distance'>[] = [
  {
    id: '1',
    userId: 'maria001',
    category: 'skills',
    title: "María's Tutoring Exchange",
    description: 'Single mom needs math tutoring for 2 kids (ages 8, 10). I offer house cleaning services in return',
    location: {
      coordinates: { lat: 36.7210, lng: -4.4180 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Math tutoring', 'Homework help'],
    contactInfo: 'maria.gomez@email.com',
    status: 'active',
    createdAt: new Date('2024-09-15')
  },
  {
    id: '2',
    userId: 'ahmed002',
    category: 'skills',
    title: "Ahmed's Language Exchange",
    description: 'Refugee fluent in Arabic & French. Need to learn bike repair - I teach languages in exchange',
    location: {
      coordinates: { lat: 36.7190, lng: -4.4210 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Bike repair lessons', 'Bicycle maintenance'],
    contactInfo: 'ahmed.kareem@email.com',
    status: 'active',
    createdAt: new Date('2024-09-16')
  },
  {
    id: '3',
    userId: 'community003',
    category: 'land',
    title: 'Community Garden Initiative',
    description: '0.5 acre plot available. Looking for 10 families to form community garden cooperative',
    location: {
      coordinates: { lat: 36.7150, lng: -4.4100 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Gardening', 'Time commitment', 'Share harvest'],
    contactInfo: 'garden.collective@email.com',
    status: 'active',
    createdAt: new Date('2024-09-17')
  },
  {
    id: '4',
    userId: 'pedro004',
    category: 'food',
    title: "Pedro's Fresh Tomatoes",
    description: '50kg fresh picked today. €1.50/kg (supermarket €3.50/kg) or help with harvest',
    location: {
      coordinates: { lat: 40.4268, lng: -3.7138 },
      city: 'Madrid',
      privacyLevel: 'approximate'
    },
    paymentType: 'hybrid',
    price: 1.50,
    quantity: '50kg',
    contactInfo: 'pedro.farm@email.com',
    status: 'active',
    createdAt: new Date('2024-09-18')
  },
  {
    id: '5',
    userId: 'organic005',
    category: 'food',
    title: 'Organic Vegetable Box',
    description: 'Weekly box: carrots, lettuce, peppers, herbs. Straight from farm',
    location: {
      coordinates: { lat: 36.7250, lng: -4.4200 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'hybrid',
    price: 12,
    quantity: 'Weekly',
    contactInfo: 'organicbox@email.com',
    status: 'active',
    createdAt: new Date('2024-09-19')
  },
  {
    id: '6',
    userId: 'citrus006',
    category: 'food',
    title: 'Ugly Fruit - Free Harvest',
    description: 'Cosmetically imperfect oranges & lemons. Pick yourself, take what you need',
    location: {
      coordinates: { lat: 36.7100, lng: -4.4050 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'gift',
    skillsNeeded: ['Help picking', 'Bring containers'],
    contactInfo: 'citrus.share@email.com',
    status: 'active',
    createdAt: new Date('2024-09-20')
  },
  {
    id: '7',
    userId: 'rosa007',
    category: 'meals',
    title: "Rosa's Home Cooking",
    description: 'Traditional Spanish meals, 4 servings. Need transport help to doctor visits',
    location: {
      coordinates: { lat: 40.4100, lng: -3.7100 },
      city: 'Madrid',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Transport to appointments'],
    contactInfo: 'rosa.cooking@email.com',
    status: 'active',
    createdAt: new Date('2024-09-21')
  },
  {
    id: '8',
    userId: 'batch008',
    category: 'meals',
    title: 'Sunday Batch Cooking',
    description: 'I cook 20 portions on Sundays. Take 5 portions for helping with grocery shopping',
    location: {
      coordinates: { lat: 36.7220, lng: -4.4190 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Shopping assistance', 'Heavy lifting'],
    contactInfo: 'sunday.batch@email.com',
    status: 'active',
    createdAt: new Date('2024-09-22')
  },
  {
    id: '9',
    userId: 'moroccan009',
    category: 'meals',
    title: 'Traditional Moroccan Meals',
    description: 'Tagine & couscous for 6 people. €8/person or trade for childcare help',
    location: {
      coordinates: { lat: 36.7170, lng: -4.4220 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'hybrid',
    price: 8,
    quantity: 'Per person',
    contactInfo: 'moroccan.meals@email.com',
    status: 'active',
    createdAt: new Date('2024-09-23')
  },
  {
    id: '10',
    userId: 'mariag010',
    category: 'land',
    title: "Maria's Garden Plot",
    description: '0.3 acre available for community garden. Share harvest!',
    location: {
      coordinates: { lat: 40.4180, lng: -3.7050 },
      city: 'Madrid',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Gardening help', 'Maintenance'],
    contactInfo: 'maria.garden@email.com',
    status: 'active',
    createdAt: new Date('2024-09-24')
  },
  {
    id: '11',
    userId: 'rooftop011',
    category: 'land',
    title: 'Rooftop Garden Space',
    description: '50sqm rooftop with water access. Perfect for herbs & container gardening',
    location: {
      coordinates: { lat: 36.7180, lng: -4.4150 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Help with setup', 'Weekly watering'],
    contactInfo: 'rooftop.green@email.com',
    status: 'active',
    createdAt: new Date('2024-09-25')
  },
  {
    id: '12',
    userId: 'webdesign012',
    category: 'skills',
    title: 'Web Design Services',
    description: 'Professional website design. Trade for fresh produce or regular meal prep',
    location: {
      coordinates: { lat: 40.4150, lng: -3.7200 },
      city: 'Madrid',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Fresh vegetables', 'Cooking'],
    contactInfo: 'web.designer@email.com',
    status: 'active',
    createdAt: new Date('2024-09-26')
  },
  {
    id: '13',
    userId: 'carpenter013',
    category: 'skills',
    title: 'Carpentry & Repairs',
    description: 'Fix furniture, build shelves. Need help with English lessons for my kids',
    location: {
      coordinates: { lat: 36.7200, lng: -4.4170 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['English tutoring', 'Homework help'],
    contactInfo: 'carpenter.mike@email.com',
    status: 'active',
    createdAt: new Date('2024-09-27')
  },
  {
    id: '14',
    userId: 'techhelp014',
    category: 'skills',
    title: 'Elderly Tech Help',
    description: 'Teaching seniors to use smartphones/computers. Trade for home-cooked meals',
    location: {
      coordinates: { lat: 36.7160, lng: -4.4130 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'skill-only',
    skillsNeeded: ['Cooking', 'Meal preparation'],
    contactInfo: 'tech.helper@email.com',
    status: 'active',
    createdAt: new Date('2024-09-28')
  },
  {
    id: '15',
    userId: 'breadcoop015',
    category: 'food',
    title: 'Bread Baking Cooperative',
    description: 'Sourdough & whole grain bread. €3/loaf or bring flour + help baking',
    location: {
      coordinates: { lat: 36.7140, lng: -4.4110 },
      city: 'Málaga',
      privacyLevel: 'approximate'
    },
    paymentType: 'hybrid',
    price: 3,
    quantity: 'Per loaf',
    contactInfo: 'bread.coop@email.com',
    status: 'active',
    createdAt: new Date('2024-09-29')
  }
];