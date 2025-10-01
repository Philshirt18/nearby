import { useState } from 'react'
import { Offer, FormData } from '../../types'

interface PostOfferModalProps {
  onClose: () => void
  onSubmit: (offerData: Partial<Offer>) => void
  editingOffer?: Offer | null
}

export function PostOfferModal({ onClose, onSubmit, editingOffer }: PostOfferModalProps) {
  const [formStep, setFormStep] = useState(editingOffer ? 2 : 1)
  const [formData, setFormData] = useState<FormData>({
    category: editingOffer?.category || '',
    title: editingOffer?.title || '',
    description: editingOffer?.description || '',
    paymentType: editingOffer?.paymentType || '',
    price: editingOffer?.price?.toString() || '',
    quantity: editingOffer?.quantity || '',
    skillsNeeded: editingOffer?.skillsNeeded?.join(', ') || '',
    contactInfo: editingOffer?.contactInfo || ''
  })

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category })
    setFormStep(2)
  }

  const handleNextStep = () => {
    setFormStep(formStep + 1)
  }

  const handlePrevStep = () => {
    setFormStep(formStep - 1)
  }

  const handleSubmit = () => {
    const offerData: Partial<Offer> = {
      category: formData.category as any,
      title: formData.title,
      description: formData.description,
      paymentType: formData.paymentType as any,
      price: formData.price ? parseFloat(formData.price) : undefined,
      quantity: formData.quantity || undefined,
      skillsNeeded: formData.skillsNeeded ? formData.skillsNeeded.split(',').map(s => s.trim()) : undefined,
      contactInfo: formData.contactInfo
    }

    onSubmit(offerData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingOffer ? 'Edit Offer' : 'Post an Offer'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Step {formStep} of 4</p>
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

          {formStep === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What are you offering?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleCategorySelect('land')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#6B8E23] hover:bg-[#D4E4B4] transition-colors"
                >
                  <div className="text-3xl mb-2">🌾</div>
                  <div className="font-medium">Land/Garden Space</div>
                </button>
                <button
                  onClick={() => handleCategorySelect('food')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#C17B5C] hover:bg-[#F4D4C4] transition-colors"
                >
                  <div className="text-3xl mb-2">🍅</div>
                  <div className="font-medium">Fresh Food/Produce</div>
                </button>
                <button
                  onClick={() => handleCategorySelect('meals')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4864C] hover:bg-[#F4E4D4] transition-colors"
                >
                  <div className="text-3xl mb-2">👨‍🍳</div>
                  <div className="font-medium">Cooked Meals</div>
                </button>
                <button
                  onClick={() => handleCategorySelect('skills')}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#7B8E9E] hover:bg-[#D4E0E8] transition-colors"
                >
                  <div className="text-3xl mb-2">🛠️</div>
                  <div className="font-medium">Skills/Services</div>
                </button>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Fresh Organic Tomatoes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what you're offering..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
                />
              </div>

              {(formData.category === 'food' || formData.category === 'meals') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 10kg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {!editingOffer && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={!formData.title || !formData.description}
                  className="flex-1 px-4 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5A7A1E] disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How do people get this?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="skill-only"
                      checked={formData.paymentType === 'skill-only'}
                      onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">💚 Skill exchange only</div>
                      <div className="text-sm text-gray-500">Trade skills or services</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="cash"
                      checked={formData.paymentType === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">💶 Cash payment</div>
                      <div className="text-sm text-gray-500">Set a price (cheaper than stores)</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="hybrid"
                      checked={formData.paymentType === 'hybrid'}
                      onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">🤝 Both options</div>
                      <div className="text-sm text-gray-500">Accept cash OR skill exchange</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="gift"
                      checked={formData.paymentType === 'gift'}
                      onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">🎁 Free gift to community</div>
                      <div className="text-sm text-gray-500">Give freely, no exchange needed</div>
                    </div>
                  </label>
                </div>
              </div>

              {(formData.paymentType === 'cash' || formData.paymentType === 'hybrid') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">€</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {(formData.paymentType === 'skill-only' || formData.paymentType === 'hybrid') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills you need (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.skillsNeeded}
                    onChange={(e) => setFormData({ ...formData, skillsNeeded: e.target.value })}
                    placeholder="e.g. Gardening help, Transport"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!formData.paymentType}
                  className="flex-1 px-4 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5A7A1E] disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {formStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information (Optional)
                </label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder="Email, phone, or preferred contact method"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to be contacted via the app. Or add your preferred contact method.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5A7A1E]"
                >
                  {editingOffer ? 'Update Offer' : 'Post Offer'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}