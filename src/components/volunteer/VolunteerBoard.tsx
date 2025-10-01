import { useState } from 'react'
import { VolunteerRequest, BoardStats } from '../../types'
import { urgencyColors } from '../../config/constants'

interface VolunteerBoardProps {
  requests: VolunteerRequest[]
  boardStats: BoardStats
  onClose: () => void
  onCreateRequest: () => void
  onOpenMessaging: (recipientName: string, requestId: string, requestTitle: string) => void
}

export function VolunteerBoard({ requests, boardStats, onClose, onCreateRequest, onOpenMessaging }: VolunteerBoardProps) {
  const [selectedRequest, setSelectedRequest] = useState<VolunteerRequest | null>(null)
  const [showVolunteerModal, setShowVolunteerModal] = useState(false)
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<number | null>(null)
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null)

  const handleVolunteerClick = (request: VolunteerRequest, scheduleIndex: number) => {
    setSelectedRequest(request)
    setSelectedScheduleIndex(scheduleIndex)
    setShowVolunteerModal(true)
  }

  const handleConfirmVolunteer = () => {
    if (!selectedRequest) return
    
    setShowVolunteerModal(false)
    setSelectedRequest(null)
    setSelectedScheduleIndex(null)
    
    alert('Thank you for volunteering! You can now message them directly through the app to coordinate.')
  }

  const getProgressStats = (schedule: any[]) => {
    const covered = schedule.filter(s => s.covered).length
    const total = schedule.length
    const percentage = Math.round((covered / total) * 100)
    return { covered, total, percentage }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🤝 Community Volunteer Board
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Connect with neighbors who need help
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{boardStats.activeRequests}</div>
              <div className="text-xs text-gray-600">Active Requests</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{boardStats.totalVolunteers}</div>
              <div className="text-xs text-gray-600">Active Volunteers</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{boardStats.helpSessionsCovered}</div>
              <div className="text-xs text-gray-600">Help Sessions</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Browse requests from community members who need help</li>
              <li>• Choose a specific date/time to volunteer</li>
              <li>• Contact them directly to coordinate</li>
              <li>• No money or credits involved - just neighbors helping neighbors</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">People Seeking Volunteers</h3>

          <button
            onClick={onCreateRequest}
            className="w-full mb-4 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post a Request for Help
          </button>

          <div className="space-y-4">
            {requests.map((request) => {
              const progress = getProgressStats(request.schedule)
              const isExpanded = expandedRequestId === request.id
              const upcomingSlots = request.schedule.filter(s => !s.covered).slice(0, 2)
              
              return (
                <div
                  key={request.id}
                  className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${urgencyColors[request.urgencyLevel]}`}>
                          {request.urgencyLevel.toUpperCase()}
                        </span>
                        {request.verificationStatus === 'verified' && (
                          <span className="text-green-600 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{request.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{request.description}</p>
                      <p className="text-xs text-gray-500">Posted by {request.userName}</p>
                    </div>
                  </div>

                  {request.helpType && request.helpType.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {request.helpType.slice(0, 3).map((type, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {type}
                          </span>
                        ))}
                        {request.helpType.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{request.helpType.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="font-medium text-gray-900">
                        {progress.covered} of {progress.total} covered ({progress.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>

                    {!isExpanded && upcomingSlots.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 mb-1">Next available slots:</p>
                        {upcomingSlots.map((slot, idx) => {
                          const scheduleIdx = request.schedule.indexOf(slot)
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {new Date(slot.date).toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                  <div className="text-xs text-gray-600">{slot.time}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleVolunteerClick(request, scheduleIdx)}
                                className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
                              >
                                I can help
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {isExpanded && (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 mb-1">All scheduled times:</p>
                        {request.schedule.map((slot, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              slot.covered
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                {slot.covered ? (
                                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {new Date(slot.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </div>
                                <div className="text-xs text-gray-600">{slot.time}</div>
                              </div>
                            </div>
                            {slot.covered ? (
                              <span className="text-xs font-medium text-green-700">
                                Volunteer Found ✓
                              </span>
                            ) : (
                              <button
                                onClick={() => handleVolunteerClick(request, idx)}
                                className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
                              >
                                I can help
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setExpandedRequestId(isExpanded ? null : request.id)}
                      className="mt-3 text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          Show less
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          Show all {request.schedule.length} time slots
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {showVolunteerModal && selectedRequest && selectedScheduleIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Volunteering</h3>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-2">{selectedRequest.title}</p>
                <p className="text-sm text-gray-600 mb-3">
                  Date: {new Date(selectedRequest.schedule[selectedScheduleIndex].date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  Time: {selectedRequest.schedule[selectedScheduleIndex].time}
                </p>
              </div>

              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Next step:</strong> You can message {selectedRequest.userName} through the app to coordinate, or contact them directly.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onOpenMessaging(selectedRequest.userName, selectedRequest.id, selectedRequest.title)
                    setShowVolunteerModal(false)
                    setSelectedRequest(null)
                    setSelectedScheduleIndex(null)
                  }}
                  className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message via App (Recommended)
                </button>
                
                <button
                  onClick={handleConfirmVolunteer}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get Direct Contact Info
                </button>

                <button
                  onClick={() => {
                    setShowVolunteerModal(false)
                    setSelectedRequest(null)
                    setSelectedScheduleIndex(null)
                  }}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}