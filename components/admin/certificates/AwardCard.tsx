'use client'

import { Play } from 'lucide-react'

interface Award {
  id: string
  name: string
  description: string
  icon: string
  milestone: number
  color: string
}

interface AwardCardProps {
  readonly award: Award
  readonly onPreview: () => void
}

export default function AwardCard({ award, onPreview }: AwardCardProps) {
  const getColorBadge = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '📚' },
      silver: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '🥈' },
      gold: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🏆' },
      platinum: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '👑' },
    }
    return colorMap[color] || colorMap.blue
  }

  const colorBadge = getColorBadge(award.color)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Icon Section */}
      <div className={`${colorBadge.bg} p-6 flex items-center justify-center`}>
        <div className="text-5xl">{award.icon}</div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Award Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{award.name}</h3>

        {/* Milestone Badge */}
        <div className="mb-3">
          <span className={`inline-block ${colorBadge.bg} ${colorBadge.text} text-xs font-semibold px-3 py-1 rounded-full`}>
            {award.milestone} Courses
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-1">{award.description}</p>

        {/* Preview Button */}
        <button
          onClick={onPreview}
          className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Play className="w-4 h-4" />
          <span>Preview Animation</span>
        </button>
      </div>
    </div>
  )
}
