import { Offer } from '../../types'
import { categoryConfig, paymentIcons } from '../../config/constants'

interface OfferCardProps {
  offer: Offer
  isMyOffer: boolean
  onClick: () => void
  onEdit: (e: React.MouseEvent) => void
  onDelete: (e: React.MouseEvent) => void
}

export function OfferCard({ offer, isMyOffer, onClick, onEdit, onDelete }: OfferCardProps) {
  const config = categoryConfig[offer.category]

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
          {config.emoji} {offer.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{paymentIcons[offer.paymentType]}</span>
          {isMyOffer && (
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onEdit}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{offer.description}</p>

      {offer.price && (
        <p className="text-sm font-semibold text-green-600 mb-2">
          €{offer.price}{offer.quantity && ` / ${offer.quantity}`}
        </p>
      )}

      {offer.skillsNeeded && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Looking for:</p>
          <div className="flex flex-wrap gap-1">
            {offer.skillsNeeded.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
        <span>📍 {offer.city}</span>
        {offer.distance !== undefined && <span className="font-medium">{offer.distance} km away</span>}
      </div>
    </div>
  )
}