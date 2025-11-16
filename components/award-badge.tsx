'use client'

import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface AwardBadgeProps {
  name: string
  icon: string
  description: string
  color: string
  achievedAt: Date
  size?: 'sm' | 'md' | 'lg'
}

export function AwardBadge({
  name,
  icon,
  description,
  color,
  achievedAt,
  size = 'md',
}: AwardBadgeProps) {
  const getBgColor = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 border-blue-300'
      case 'silver':
        return 'bg-gray-100 border-gray-300'
      case 'gold':
        return 'bg-yellow-100 border-yellow-300'
      case 'platinum':
        return 'bg-purple-100 border-purple-300'
      default:
        return 'bg-blue-100 border-blue-300'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-16 text-3xl'
      case 'md':
        return 'w-20 h-20 text-4xl'
      case 'lg':
        return 'w-28 h-28 text-6xl'
      default:
        return 'w-20 h-20 text-4xl'
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className={`${getSizeClasses()} ${getBgColor()} border-2 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow`}
          >
            {icon}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-center">
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-sm">{description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(achievedAt).toLocaleDateString()}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
