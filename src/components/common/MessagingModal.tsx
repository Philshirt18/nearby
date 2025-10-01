import { useState } from 'react'

interface Message {
  id: string
  senderId: string
  senderName: string
  text: string
  timestamp: Date
}

interface MessagingModalProps {
  recipientName: string
  offerId: string
  offerTitle: string
  onClose: () => void
}

export function MessagingModal({ recipientName, offerId, offerTitle, onClose }: MessagingModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      text: `You're now connected with ${recipientName} about "${offerTitle}". Your contact information will not be shared unless you choose to share it.`,
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'currentUser',
      senderName: 'You',
      text: newMessage,
      timestamp: new Date()
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simulate a response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'other',
        senderName: recipientName,
        text: "Thanks for reaching out! I'll get back to you soon.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{recipientName}</h2>
            <p className="text-sm text-gray-500">{offerTitle}</p>
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

        {/* Privacy Notice */}
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
          <div className="flex gap-2 items-start">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-blue-900">
              Messages are private and your contact info is protected. Only share personal details when you're ready.
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.senderId === 'currentUser'
                    ? 'bg-green-600 text-white'
                    : msg.senderId === 'system'
                    ? 'bg-gray-100 text-gray-700 text-sm italic'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {msg.senderId !== 'currentUser' && msg.senderId !== 'system' && (
                  <p className="text-xs font-semibold mb-1">{msg.senderName}</p>
                )}
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === 'currentUser' ? 'text-green-100' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              rows={2}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed self-end"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tip: Only share contact details after you've gotten to know the person through messages.
          </p>
        </div>
      </div>
    </div>
  )
}