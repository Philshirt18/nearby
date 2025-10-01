import { useState } from 'react'
import { VolunteerRequest, VolunteerFormData } from '../../types'

interface CreateVolunteerRequestModalProps {
  onClose: () => void
  onSubmit: (request: Omit<VolunteerRequest, 'id' | 'userId' | 'userName' | 'verificationStatus'>) => void
}

export function CreateVolunteerRequestModal({ onClose, onSubmit }: CreateVolunteerRequestModalProps) {
  const [formData, setFormData] = useState<VolunteerFormData>({
    title: '',
    description: '',
    urgencyLevel: 'medium',
    helpType: '',
    contactInfo: '',
    scheduleEntries: [{ date: '', time: '' }]
  })

  const addScheduleEntry = () => {
    setFormData({
      ...formData,
      scheduleEntries: [...formData.scheduleEntries, { date: '', time: '' }]
    })
  }

  const removeScheduleEntry = (index: number) => {
    setFormData({
      ...formData,
      scheduleEntries: formData.scheduleEntries.filter((_, i) => i !== index)
    })
  }

  const updateScheduleEntry = (index: number, field: 'date' | 'time', value: string) => {
    const newEntries = [...formData.scheduleEntries]
    newEntries[index][field] = value
    setFormData({
      ...formData,
      scheduleEntries: newEntries
    })
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.contactInfo || !formData.helpType) {
      alert('Please fill in all required fields')
      return
    }

    const validScheduleEntries = formData.scheduleEntries.filter(
      entry => entry.date && entry.time
    )

    if (validScheduleEntries.length === 0) {
      alert('Please add at least one schedule entry')
      return
    }

    const newRequest: Omit<VolunteerRequest, 'id' | 'userId' | 'userName' | 'verificationStatus'> = {
      title: formData.title,
      description: formData.description,
      urgencyLevel: formData.urgencyLevel as 'critical' | 'high' | 'medium',
      helpType: formData.helpType.split(',').map(s => s.trim()),
      schedule: validScheduleEntries.map(entry => ({
        date: entry.date,
        time: entry.time,
        covered: false
      })),
      status: 'active',
      createdAt: new Date(),
      contactInfo: formData.contactInfo
    }

    onSubmit(newRequest)
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      urgencyLevel: 'medium',
      helpType: '',
      contactInfo: '',
      scheduleEntries: [{ date: '', time: '' }]
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Request Volunteer Help</h2>
              <p className="text-sm text-gray-600 mt-1">
                Your request will be reviewed by community moderators
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Volunteer Board Guidelines</p>
                <ul className="space-y-1">
                  <li>• Post genuine needs where volunteer help would make a difference</li>
                  <li>• Be specific about dates, times, and type of help needed</li>
                  <li>• Volunteers will contact you directly to coordinate</li>
                  <li>• No money or credits involved - just community support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of what you need"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain your situation and what kind of help you need..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.urgencyLevel}
                onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="medium">Medium - Within 2-4 weeks</option>
                <option value="high">High - Within 1 week</option>
                <option value="critical">Critical - Immediate (24-48 hours)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Help Needed <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.helpType}
                onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
                placeholder="e.g. Transport, Childcare, Food assistance (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Add specific dates and times when you need help
              </p>
              {formData.scheduleEntries.map((entry, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateScheduleEntry(index, 'date', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <select
                    value={entry.time}
                    onChange={(e) => updateScheduleEntry(index, 'time', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="6:00 AM">6:00 AM</option>
                    <option value="7:00 AM">7:00 AM</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 5:00 PM)">Afternoon (12:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 9:00 PM)">Evening (5:00 PM - 9:00 PM)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  {formData.scheduleEntries.length > 1 && (
                    <button
                      onClick={() => removeScheduleEntry(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addScheduleEntry}
                className="mt-2 text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another date/time
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                placeholder="Email, phone, or preferred contact method"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Volunteers will use this to coordinate with you
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description || !formData.contactInfo || !formData.helpType}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}