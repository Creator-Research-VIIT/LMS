'use client'

import { triggerAwardCheck } from '@/app/actions/awards'
import { useCallback, useState } from 'react'

interface CourseCompletionProps {
  userId: string
  courseId: string
  onCompletionSuccess?: () => void
}

export function useCourseCompletion() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [awardData, setAwardData] = useState<any>(null)

  const handleCourseCompletion = useCallback(async () => {
    try {
      // Trigger award check
      const result = await triggerAwardCheck()

      if (!result.success) {
        console.error('Award trigger failed:', result.error)
        return
      }

      // If a new award was earned, show celebration
      if (result.newAward) {
        setAwardData(result.newAward)
        setShowCelebration(true)
      }
    } catch (error) {
      console.error('Error in course completion:', error)
    }
  }, [])

  return {
    showCelebration,
    awardData,
    setShowCelebration,
    handleCourseCompletion,
  }
}

/**
 * Example usage in a component:
 *
 * function CourseCompletionExample() {
 *   const { showCelebration, awardData, setShowCelebration, handleCourseCompletion } = useCourseCompletion()
 *
 *   return (
 *     <>
 *       <Button onClick={handleCourseCompletion}>Complete Course</Button>
 *       {awardData && (
 *         <AwardCelebration
 *           awardName={awardData.award.name}
 *           awardIcon={awardData.award.icon}
 *           description={awardData.award.description}
 *           color={awardData.award.color}
 *           isOpen={showCelebration}
 *           onClose={() => setShowCelebration(false)}
 *         />
 *       )}
 *     </>
 *   )
 * }
 */
