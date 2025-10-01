interface DistanceFilterProps {
    selected: number
    onSelect: (distance: number) => void
    distanceRanges: {
      '0-5': number
      '5-10': number
      '10-25': number
      '25+': number
    }
  }
  
  export function DistanceFilter({ selected, onSelect, distanceRanges }: DistanceFilterProps) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E8D5C4]">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Distance Range
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelect(5)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === 5
                ? 'bg-[#6B8E23] text-white'
                : 'bg-[#F4F0E8] text-gray-700 hover:bg-[#E8E0D4]'
            }`}
          >
            0-5km ({distanceRanges['0-5']})
          </button>
          <button
            onClick={() => onSelect(10)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === 10
                ? 'bg-[#6B8E23] text-white'
                : 'bg-[#F4F0E8] text-gray-700 hover:bg-[#E8E0D4]'
            }`}
          >
            5-10km ({distanceRanges['5-10']})
          </button>
          <button
            onClick={() => onSelect(25)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === 25
                ? 'bg-[#6B8E23] text-white'
                : 'bg-[#F4F0E8] text-gray-700 hover:bg-[#E8E0D4]'
            }`}
          >
            10-25km ({distanceRanges['10-25']})
          </button>
          <button
            onClick={() => onSelect(1000)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === 1000
                ? 'bg-[#6B8E23] text-white'
                : 'bg-[#F4F0E8] text-gray-700 hover:bg-[#E8E0D4]'
            }`}
          >
            25km+ ({distanceRanges['25+']})
          </button>
        </div>
      </div>
    )
  }