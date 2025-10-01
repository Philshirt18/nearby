export const categoryConfig: Record<string, { color: string; emoji: string }> = {
    land: { color: 'bg-green-100 text-green-800', emoji: '🌾' },
    food: { color: 'bg-red-100 text-red-800', emoji: '🍅' },
    meals: { color: 'bg-orange-100 text-orange-800', emoji: '👨‍🍳' },
    skills: { color: 'bg-blue-100 text-blue-800', emoji: '🛠️' }
  }
  
  export const paymentIcons: Record<string, string> = {
    'skill-only': '💚',
    'cash': '💶',
    'hybrid': '🤝',
    'gift': '🎁'
  }
  
  export const paymentLabels: Record<string, string> = {
    'skill-only': 'Skill exchange only',
    'cash': 'Cash payment',
    'hybrid': 'Cash or skill exchange',
    'gift': 'Free gift to community'
  }
  
  export const urgencyColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }
  
  export const categoryIcons: Record<string, string> = {
    food: '🍅',
    meals: '👨‍🍳',
    land: '🌾',
    skills: '🛠️'
  }
  
  export const categoryNames: Record<string, string> = {
    food: 'Food',
    meals: 'Meals',
    land: 'Land',
    skills: 'Skills'
  }