import React from 'react';

interface EmergencyPoolBannerProps {
  totalCredits: number;
  activeRequests: number;
  onClick: () => void;
}

const EmergencyPoolBanner: React.FC<EmergencyPoolBannerProps> = ({
  totalCredits,
  activeRequests,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4 mb-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🆘</div>
          <div>
            <h3 className="font-semibold text-gray-900">Community Emergency Pool</h3>
            <p className="text-sm text-gray-600">
              Help neighbors in crisis • {activeRequests} active requests
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{totalCredits}</div>
          <div className="text-xs text-gray-500">Credits Available</div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPoolBanner;