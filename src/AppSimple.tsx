function AppSimple() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">🌱 SkillSwap Local - WORKING</h1>
      
      <div className="max-w-md mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
              🍅 Food
            </span>
            <span className="text-2xl">🤝</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Pedro's Fresh Tomatoes</h3>
          <p className="text-sm text-gray-600 mb-3">50kg fresh picked today</p>
          <p className="text-sm font-semibold text-green-600 mb-3">€1.50 / 50kg</p>
          <div className="flex justify-between text-sm text-gray-500 pt-3 border-t">
            <span>📍 Madrid</span>
            <span className="font-medium">412.6 km away</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              🌾 Land
            </span>
            <span className="text-2xl">💚</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Maria's Garden Plot</h3>
          <p className="text-sm text-gray-600 mb-3">0.3 acre available for community garden</p>
          <div className="flex justify-between text-sm text-gray-500 pt-3 border-t">
            <span>📍 Madrid</span>
            <span className="font-medium">413.1 km away</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppSimple
