interface VolunteerBoardBannerProps {
    activeRequests: number
    onClick: () => void
  }
  
  export function VolunteerBoardBanner({ activeRequests, onClick }: VolunteerBoardBannerProps) {
    return (
      <div
        onClick={onClick}
        className="bg-gradient-to-r from-[#FAF7F2] to-[#E8D5C4] border-2 border-[#C17B5C] rounded-lg p-4 mb-6 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🤝</div>
            <div>
              <h3 className="font-semibold text-gray-900">Community Volunteer Board</h3>
              <p className="text-sm text-gray-600">
                Help neighbors in need • {activeRequests} people seeking volunteers
              </p>
            </div>
          </div>
          <div className="text-purple-600 font-semibold">
            View Requests →
          </div>
        </div>
      </div>
    )
  }