import React, { useState } from 'react';
import { EmergencyRequest, EmergencyPoolStats } from '../../types';

interface EmergencyPoolProps {
  requests: EmergencyRequest[];
  poolStats: EmergencyPoolStats;
  userCredits: number;
  onDonate: (requestId: string, amount: number) => void;
  onClose: () => void;
}

const EmergencyPool: React.FC<EmergencyPoolProps> = ({
  requests,
  poolStats,
  userCredits,
  onDonate,
  onClose
}) => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [showDonateModal, setShowDonateModal] = useState(false);

  const urgencyColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  const handleDonateClick = (requestId: string) => {
    setSelectedRequest(requestId);
    setShowDonateModal(true);
  };

  const handleConfirmDonation = () => {
    if (selectedRequest && donationAmount > 0) {
      onDonate(selectedRequest, donationAmount);
      setShowDonateModal(false);
      setDonationAmount(0);
      setSelectedRequest(null);
    }
  };

  const getProgressPercentage = (received: number, needed: number) => {
    return Math.min((received / needed) * 100, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🆘 Community Emergency Pool
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Support neighbors facing crisis situations
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

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{poolStats.totalCredits}</div>
              <div className="text-xs text-gray-600">Total Credits</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{poolStats.peopleHelped}</div>
              <div className="text-xs text-gray-600">People Helped</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">{poolStats.activeRequests}</div>
              <div className="text-xs text-gray-600">Active Requests</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{userCredits}</div>
              <div className="text-xs text-gray-600">Your Credits</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Donate time credits you've earned to help community members in crisis</li>
              <li>• All requests are verified by community moderators</li>
              <li>• Recipients can use credits immediately for urgent services</li>
              <li>• Build a safety net for everyone in the community</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Emergency Requests</h3>

          <div className="space-y-4">
            {requests.map((request) => {
              const progress = getProgressPercentage(request.creditsReceived, request.creditsNeeded);
              
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
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <p className="text-xs text-gray-500">
                        Posted by {request.userName} • Expires {request.expiresAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {request.skillsNeeded && request.skillsNeeded.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Help Needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.skillsNeeded.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {request.creditsReceived} / {request.creditsNeeded} credits
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleDonateClick(request.id)}
                    disabled={userCredits === 0}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Donate Credits
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {showDonateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Donate Time Credits</h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  You have <span className="font-semibold text-green-600">{userCredits} credits</span> available
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to donate
                </label>
                <input
                  type="number"
                  min="1"
                  max={userCredits}
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setDonationAmount(5)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  5 credits
                </button>
                <button
                  onClick={() => setDonationAmount(10)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  10 credits
                </button>
                <button
                  onClick={() => setDonationAmount(userCredits)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  All
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDonateModal(false);
                    setDonationAmount(0);
                    setSelectedRequest(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDonation}
                  disabled={donationAmount === 0 || donationAmount > userCredits}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirm Donation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPool;