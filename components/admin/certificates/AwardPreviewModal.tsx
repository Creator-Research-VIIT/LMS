'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface Award {
  id: string
  name: string
  description: string
  icon: string
  milestone: number
  color: string
}

interface AwardPreviewModalProps {
  readonly award: Award
  readonly isOpen: boolean
  readonly onClose: () => void
}

export default function AwardPreviewModal({ award, isOpen, onClose }: AwardPreviewModalProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getConfettiConfig = () => {
    switch (award.color) {
      case 'blue':
        return { colors: ['#3B82F6', '#60A5FA', '#1E40AF', '#DBEAFE'] }
      case 'silver':
        return { colors: ['#C0C0C0', '#E8E8E8', '#A9A9A9', '#F0F0F0'] }
      case 'gold':
        return { colors: ['#FCD34D', '#FBBF24', '#F59E0B', '#FECACA'] }
      case 'platinum':
        return { colors: ['#E5E7EB', '#D1D5DB', '#F3F4F6', '#FCD34D', '#C084FC'] }
      default:
        return { colors: ['#3B82F6', '#60A5FA', '#1E40AF'] }
    }
  }

  const confettiConfig = getConfettiConfig()

  const getBackgroundColor = () => {
    switch (award.color) {
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
    switch (award.color) {
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
    switch (award.color) {
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
    switch (award.color) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti */}
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={true}
            {...confettiConfig}
          />

          {/* Blur Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`${getBackgroundColor()} ${getBorderColor()} pointer-events-auto rounded-2xl border-4 shadow-2xl p-8 max-w-lg mx-4 text-center relative`}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-9xl mb-6 inline-block"
              >
                {award.icon}
              </motion.div>

              {/* Award Name */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-4xl font-bold ${getTextColor()} mb-2`}
              >
                {award.name}
              </motion.h2>

              {/* Milestone Info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-2"
              >
                {award.milestone} Courses Completed
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 text-lg mb-6"
              >
                {award.description}
              </motion.p>

              {/* Celebration Message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-gray-500 mb-4"
              >
                ✨ This is what students will see when they earn this award!
              </motion.p>

              {/* Progress Bar Animation */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 10, ease: 'linear' }}
                className={`h-1 bg-gradient-to-r ${getGradientColorClass()} to-transparent rounded-full`}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
