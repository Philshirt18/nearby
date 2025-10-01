interface CategoryFilterProps {
    selected: string
    onSelect: (category: string) => void
  }
  
  export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => onSelect('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === 'all'
              ? 'bg-[#8B7355] text-white'
              : 'bg-[#E8D5C4] text-[#5A4A3A] hover:bg-[#D4C4B4]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onSelect('food')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === 'food'
              ? 'bg-[#C17B5C] text-white'
              : 'bg-[#F4D4C4] text-[#8B4513] hover:bg-[#E8C4B4]'
          }`}
        >
          🍅 Food
        </button>
        <button
          onClick={() => onSelect('land')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === 'land'
              ? 'bg-[#6B8E23] text-white'
              : 'bg-[#D4E4B4] text-[#4A6318] hover:bg-[#C4D4A4]'
          }`}
        >
          🌾 Land
        </button>
        <button
          onClick={() => onSelect('meals')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === 'meals'
              ? 'bg-[#D4864C] text-white'
              : 'bg-[#F4E4D4] text-[#8B5A2B] hover:bg-[#E8D4C4]'
          }`}
        >
          👨‍🍳 Meals
        </button>
        <button
          onClick={() => onSelect('skills')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === 'skills'
              ? 'bg-[#7B8E9E] text-white'
              : 'bg-[#D4E0E8] text-[#4A5E6E] hover:bg-[#C4D4E0]'
          }`}
        >
          🛠️ Skills
        </button>
      </div>
    )
  }