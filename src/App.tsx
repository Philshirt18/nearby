import { useState, useEffect } from 'react'
import { Offer, Location, VolunteerRequest } from './types'
import { getDistance, getUserLocation } from './utils/locationUtils'
import { mockUserProfile } from './data/mockUserProfile'
import { mockVolunteerRequests, mockBoardStats } from './data/mockVolunteerData'
import { ProfileScreen } from './components/profile/ProfileScreen'
import { VolunteerBoardBanner } from './components/volunteer/VolunteerBoardBanner'
import { VolunteerBoard } from './components/volunteer/VolunteerBoard'
import { CreateVolunteerRequestModal } from './components/volunteer/CreateVolunteerRequestModal'
import { MessagingModal } from './components/common/MessagingModal'
import { CategoryFilter } from './components/filters/CategoryFilter'
import { DistanceFilter } from './components/filters/DistanceFilter'
import { OfferCard } from './components/feed/OfferCard'

// Mock offers data
const mockOffers: Offer[] = [
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
    category: 'skills',
    title: "Ahmed's Language Exchange",
    description: 'Refugee fluent in Arabic & French. Need to learn bike repair - I teach languages in exchange',
    paymentType: 'skill-only',
    skillsNeeded: ['Bike repair lessons', 'Bicycle maintenance'],
    lat: 36.7190,
    lng: -4.4210,
    city: 'Málaga',
    contactInfo: 'ahmed.kareem@email.com'
  },
  {
    id: '3',
    category: 'land',
    title: 'Community Garden Initiative',
    description: '0.5 acre plot available. Looking for 10 families to form community garden cooperative',
    paymentType: 'skill-only',
    skillsNeeded: ['Gardening', 'Time commitment', 'Share harvest'],
    lat: 36.7150,
    lng: -4.4100,
    city: 'Málaga',
    contactInfo: 'garden.collective@email.com'
  },
  {
    id: '4',
    category: 'food',
    title: "Pedro's Fresh Tomatoes",
    description: '50kg fresh picked today. €1.50/kg (supermarket €3.50/kg) or help with harvest',
    price: 1.50,
    quantity: '50kg',
    paymentType: 'hybrid',
    lat: 40.4268,
    lng: -3.7138,
    city: 'Madrid',
    contactInfo: 'pedro.farm@email.com'
  },
  {
    id: '5',
    category: 'food',
    title: 'Organic Vegetable Box',
    description: 'Weekly box: carrots, lettuce, peppers, herbs. Straight from farm',
    price: 12,
    quantity: 'Weekly',
    paymentType: 'hybrid',
    lat: 36.7250,
    lng: -4.4200,
    city: 'Málaga',
    contactInfo: 'organicbox@email.com'
  },
  {
    id: '6',
    category: 'food',
    title: 'Ugly Fruit - Free Harvest',
    description: 'Cosmetically imperfect oranges & lemons. Pick yourself, take what you need',
    paymentType: 'gift',
    skillsNeeded: ['Help picking', 'Bring containers'],
    lat: 36.7100,
    lng: -4.4050,
    city: 'Málaga',
    contactInfo: 'citrus.share@email.com'
  },
]

function App() {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [distanceFilter, setDistanceFilter] = useState<number>(1000)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showVolunteerBoard, setShowVolunteerBoard] = useState(false)
  const [showCreateVolunteerRequest, setShowCreateVolunteerRequest] = useState(false)
  const [showMessaging, setShowMessaging] = useState(false)
  const [messagingRecipient, setMessagingRecipient] = useState<{ name: string; offerId: string; offerTitle: string } | null>(null)
  
  const [offers, setOffers] = useState<Offer[]>(mockOffers)
  const [myOffers, setMyOffers] = useState<string[]>([])
  const [volunteerRequests, setVolunteerRequests] = useState(mockVolunteerRequests)
  const [boardStats, setBoardStats] = useState(mockBoardStats)

  useEffect(() => {
    getUserLocation().then((loc) => {
      setLocation(loc)
      setLoading(false)
    })
  }, [])

  const offersWithDistance = location
    ? offers.map(o => ({
        ...o,
        distance: getDistance(location.lat, location.lng, o.lat, o.lng)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0))
    : offers

  const filteredOffers = offersWithDistance.filter(o => {
    const categoryMatch = selectedCategory === 'all' || o.category === selectedCategory
    const distanceMatch = !o.distance || o.distance <= distanceFilter
    return categoryMatch && distanceMatch
  })

  const distanceRanges = {
    '0-5': offersWithDistance.filter(o => o.distance && o.distance <= 5).length,
    '5-10': offersWithDistance.filter(o => o.distance && o.distance > 5 && o.distance <= 10).length,
    '10-25': offersWithDistance.filter(o => o.distance && o.distance > 10 && o.distance <= 25).length,
    '25+': offersWithDistance.filter(o => o.distance && o.distance > 25).length,
  }

  const handleEdit = (offer: Offer, e: React.MouseEvent) => {
    e.stopPropagation()
    alert('Edit functionality - implement PostOfferModal component')
  }

  const handleDelete = (offerId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== offerId))
      setMyOffers(myOffers.filter(id => id !== offerId))
    }
  }

  const handleSubmitVolunteerRequest = (request: Omit<VolunteerRequest, 'id' | 'userId' | 'userName' | 'verificationStatus'>) => {
    const newRequest: VolunteerRequest = {
      ...request,
      id: `vr${Date.now()}`,
      userId: 'currentUser',
      userName: 'You',
      verificationStatus: 'pending'
    }

    setVolunteerRequests(prev => [newRequest, ...prev])
    setBoardStats(prev => ({
      ...prev,
      activeRequests: prev.activeRequests + 1
    }))

    setShowCreateVolunteerRequest(false)
    alert('Volunteer request submitted! It will be reviewed by community moderators.')
  }

  const getDistanceLabel = () => {
    if (distanceFilter >= 1000) return 'All distances'
    if (distanceFilter === 5) return 'Within 5km'
    if (distanceFilter === 10) return 'Within 10km'
    if (distanceFilter === 25) return 'Within 25km'
    return `Within ${distanceFilter}km`
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-[#8B7355]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center relative">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#6B8E23] mb-2">Nearby</h1>
              <p className="text-base text-gray-600 mb-2">
                Where neighbours become helpers
              </p>
              {location && (
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Málaga, Spain</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors absolute right-0"
              aria-label="View Profile"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <VolunteerBoardBanner
          activeRequests={boardStats.activeRequests}
          onClick={() => setShowVolunteerBoard(true)}
        />

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Near You</h2>
          <p className="text-sm text-gray-600 mb-4">
            {filteredOffers.length} of {offers.length} offers • {getDistanceLabel()}
          </p>
          
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <DistanceFilter
            selected={distanceFilter}
            onSelect={setDistanceFilter}
            distanceRanges={distanceRanges}
          />
        </div>

        <div className="space-y-4">
          {filteredOffers.map(offer => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isMyOffer={myOffers.includes(offer.id)}
              onClick={() => setSelectedOffer(offer)}
              onEdit={(e) => handleEdit(offer, e)}
              onDelete={(e) => handleDelete(offer.id, e)}
            />
          ))}
        </div>

        <button
          onClick={() => alert('Implement PostOfferModal component')}
          className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {selectedOffer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedOffer.title}</h2>
                <button onClick={() => setSelectedOffer(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedOffer.description}</p>
              
              {selectedOffer.price && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">
                    Price: €{selectedOffer.price}{selectedOffer.quantity && ` / ${selectedOffer.quantity}`}
                  </p>
                </div>
              )}

              {selectedOffer.skillsNeeded && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Skills Needed:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOffer.skillsNeeded.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setMessagingRecipient({
                      name: 'Offer Creator',
                      offerId: selectedOffer.id,
                      offerTitle: selectedOffer.title
                    })
                    setShowMessaging(true)
                    setSelectedOffer(null)
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message via App
                </button>

                {selectedOffer.contactInfo && (
                  <button
                    onClick={() => alert(`Direct Contact: ${selectedOffer.contactInfo}`)}
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Direct Contact (Share Info)
                  </button>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900">
                  <strong>Privacy Tip:</strong> Use in-app messaging first to get to know the person before sharing personal contact information.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {showProfile && (
        <ProfileScreen
          profile={mockUserProfile}
          onClose={() => setShowProfile(false)}
        />
      )}

      {showVolunteerBoard && (
        <VolunteerBoard
          requests={volunteerRequests}
          boardStats={boardStats}
          onClose={() => setShowVolunteerBoard(false)}
          onCreateRequest={() => {
            setShowVolunteerBoard(false)
            setShowCreateVolunteerRequest(true)
          }}
          onOpenMessaging={(recipientName, requestId, requestTitle) => {
            setMessagingRecipient({
              name: recipientName,
              offerId: requestId,
              offerTitle: requestTitle
            })
            setShowMessaging(true)
            setShowVolunteerBoard(false)
          }}
        />
      )}

      {showCreateVolunteerRequest && (
        <CreateVolunteerRequestModal
          onClose={() => setShowCreateVolunteerRequest(false)}
          onSubmit={handleSubmitVolunteerRequest}
        />
      )}

      {showMessaging && messagingRecipient && (
        <MessagingModal
          recipientName={messagingRecipient.name}
          offerId={messagingRecipient.offerId}
          offerTitle={messagingRecipient.offerTitle}
          onClose={() => {
            setShowMessaging(false)
            setMessagingRecipient(null)
          }}
        />
      )}
    </div>
  )
}

export default App