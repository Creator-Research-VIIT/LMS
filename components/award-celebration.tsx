'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface AwardCelebrationProps {
  readonly awardName?: string
  readonly awardIcon?: string
  readonly description?: string
  readonly color?: string
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly award?: { name: string; description: string; icon: string; color: string }
}

export function AwardCelebration({
  awardName,
  awardIcon,
  description,
  color,
  isOpen,
  onClose,
  award,
}: AwardCelebrationProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  const getConfettiConfig = () => {
    switch (color) {
      case 'blue':
        return { colors: ['#3B82F6', '#60A5FA', '#1E40AF'] }
      case 'silver':
        return { colors: ['#C0C0C0', '#E8E8E8', '#A9A9A9'] }
      case 'gold':
        return { colors: ['#FCD34D', '#FBBF24', '#F59E0B'] }
      case 'platinum':
        return { colors: ['#E5E7EB', '#D1D5DB', '#F3F4F6', '#FCD34D'] }
      default:
        return { colors: ['#3B82F6', '#60A5FA', '#1E40AF'] }
    }
  }

  const confettiConfig = getConfettiConfig()

  const getBackgroundColor = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50'
      case 'silver':
        return 'bg-gray-50'
      case 'gold':
        return 'bg-yellow-50'
      case 'platinum':
        return 'bg-purple-50'
      default:
        return 'bg-blue-50'
    }
  }

  const getBorderColor = () => {
    switch (color) {
      case 'blue':
        return 'border-blue-500 shadow-blue-500/50'
      case 'silver':
        return 'border-gray-400 shadow-gray-400/50'
      case 'gold':
        return 'border-yellow-500 shadow-yellow-500/50'
      case 'platinum':
        return 'border-purple-500 shadow-purple-500/50'
      default:
        return 'border-blue-500 shadow-blue-500/50'
    }
  }

  const getTextColor = () => {
    switch (color) {
      case 'blue':
        return 'text-blue-600'
      case 'silver':
        return 'text-gray-700'
      case 'gold':
        return 'text-yellow-600'
      case 'platinum':
        return 'text-purple-600'
      default:
        return 'text-blue-600'
    }
  }

  const getGradientColorClass = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-500'
      case 'silver':
        return 'from-gray-500'
      case 'gold':
        return 'from-yellow-500'
      case 'platinum':
        return 'from-purple-500'
      default:
        return 'from-blue-500'
    }
  }

  const displayAward = award || {
    name: awardName || 'Achievement Unlocked!',
    description: description || 'You have earned a new award',
    icon: awardIcon || '🏆',
    color: color || 'blue'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti */}
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={150}
            recycle={false}
            {...confettiConfig}
          />

          {/* Blur background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`${getBackgroundColor()} ${getBorderColor()} pointer-events-auto rounded-2xl border-4 shadow-2xl p-8 max-w-md mx-4 text-center`}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-8xl mb-6 inline-block"
              >
                {displayAward.icon}
              </motion.div>

              {/* Award Name */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-4xl font-bold ${getTextColor()} mb-2`}
              >
                {displayAward.name}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 text-lg mb-6"
              >
                {displayAward.description}
              </motion.p>

              {/* Celebration message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-gray-500"
              >
                Congratulations on your achievement! 🎉
              </motion.p>

              {/* Progress bar showing it will auto-close */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
                className={`mt-6 h-1 bg-gradient-to-r ${getGradientColorClass()} to-transparent rounded-full`}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
