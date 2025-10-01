import { useState } from 'react'
import { UserProfile } from '../../types'
import { categoryIcons, categoryNames } from '../../config/constants'

interface ProfileScreenProps {
  profile: UserProfile
  onClose: () => void
}

export function ProfileScreen({ profile, onClose }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'reviews'>('about')

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const getVerificationBadges = () => {
    const badges = []
    if (profile.verified.phone) badges.push({ icon: '📱', label: 'Phone' })
    if (profile.verified.email) badges.push({ icon: '✉️', label: 'Email' })
    if (profile.verified.id) badges.push({ icon: '🆔', label: 'ID' })
    return badges
  }

  const memberDuration = () => {
    const months = Math.floor((Date.now() - profile.memberSince.getTime()) / (1000 * 60 * 60 * 24 * 30))
    if (months < 1) return 'Less than a month'
    if (months < 12) return `${months} month${months > 1 ? 's' : ''}`
    const years = Math.floor(months / 12)
    return `${years} year${years > 1 ? 's' : ''}`
  }

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-4xl">
                {profile.profilePhoto}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">@{profile.username}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.location}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {getVerificationBadges().map((badge, idx) => (
              <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
                <span>{badge.icon}</span>
                <span>{badge.label} Verified</span>
              </span>
            ))}
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Member for {memberDuration()}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{profile.stats.offersPosted}</div>
              <div className="text-xs text-gray-600">Offers</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-700">{profile.stats.exchangesCompleted}</div>
              <div className="text-xs text-gray-600">Exchanges</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-700">{profile.stats.volunteerHours}</div>
              <div className="text-xs text-gray-600">Vol. Hours</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-700">{profile.stats.responseRate}%</div>
              <div className="text-xs text-gray-600">Response</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-pink-700">{profile.stats.avgResponseTime}</div>
              <div className="text-xs text-gray-600">Avg Time</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 px-4 py-3 font-medium ${
                  activeTab === 'about'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 px-4 py-3 font-medium ${
                  activeTab === 'activity'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 px-4 py-3 font-medium ${
                  activeTab === 'reviews'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews ({profile.testimonials.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">About Me</h3>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills I Offer</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsOffered.map((skill, idx) => (
                      <span key={idx} className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills I'm Looking For</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsSeeking.map((skill, idx) => (
                      <span key={idx} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Active In</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.activeCategories.map((category, idx) => (
                      <span key={idx} className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium flex items-center gap-1">
                        <span>{categoryIcons[category]}</span>
                        <span>{categoryNames[category]}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Languages</h3>
                  <div className="flex gap-2">
                    {profile.languages.map((lang, idx) => (
                      <span key={idx} className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Availability</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      {profile.availability.weekdays && <p>✓ Weekdays</p>}
                      {profile.availability.weekends && <p>✓ Weekends</p>}
                      {profile.availability.evenings && <p>✓ Evenings</p>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Preferences</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Max distance: {profile.maxDistance}km</p>
                      <p>Contact: {profile.preferredContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>Activity history coming soon</p>
                  <p className="text-sm mt-1">Your recent offers and exchanges will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {profile.testimonials.length > 0 ? (
                  profile.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.from}</p>
                          <p className="text-xs text-gray-500">
                            {testimonial.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {renderStars(testimonial.stars)}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{testimonial.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <p>No reviews yet</p>
                    <p className="text-sm mt-1">Complete exchanges to start receiving reviews</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trust & Safety
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All exchanges are community-verified</li>
            <li>• Report suspicious activity to moderators</li>
            <li>• Meet in public places for first exchanges</li>
            <li>• Your exact address is never shared publicly</li>
          </ul>
        </div>
      </main>
    </div>
  )
}