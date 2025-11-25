'use client'

import { AwardBadge } from '@/components/award-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Award {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

interface UserAwardWithData {
  id: string
  achievedAt: Date
  Award: Award
}

interface AwardsDisplayProps {
  readonly userId: string
}

export default function AwardsDisplay({ userId }: AwardsDisplayProps) {
  const [userAwards, setUserAwards] = useState<UserAwardWithData[]>([])
  const [completedCourses, setCompletedCourses] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAwards = async () => {
      if (!userId) return
      try {
        const response = await fetch(`/api/awards/user?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setUserAwards(data.userAwards || [])
          setCompletedCourses(data.completedCourses || 0)
        }
      } catch (error) {
        console.error('Failed to fetch awards:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAwards()
  }, [userId])

  const nextMilestones = [
    { courses: 10, name: 'Rising Scholar', icon: '📚' },
    { courses: 25, name: 'Silver Scholar', icon: '🥈' },
    { courses: 50, name: 'Elite Learner', icon: '🏆' },
    { courses: 100, name: 'LMS Hall of Fame', icon: '👑' },
  ]

  const unlockedMilestones = nextMilestones.filter(m => m.courses <= completedCourses)
  const nextMilestone = nextMilestones.find(m => m.courses > completedCourses)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading achievements...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle>Achievements</CardTitle>
        </div>
        <CardDescription>
          {completedCourses} course{completedCourses !== 1 ? 's' : ''} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earned Awards */}
        {userAwards.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4">Earned Awards</h3>
            <div className="flex flex-wrap gap-4">
              {userAwards.map((userAward, index) => (
                <motion.div
                  key={userAward.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AwardBadge
                    name={userAward.Award.name}
                    icon={userAward.Award.icon}
                    description={userAward.Award.description}
                    color={userAward.Award.color}
                    achievedAt={userAward.achievedAt}
                    size="md"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Your Journey</h3>
          <div className="space-y-3">
            {unlockedMilestones.map((milestone) => (
              <div key={milestone.courses} className="flex items-center justify-between">
                <span className="text-sm font-medium">{milestone.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{milestone.icon}</span>
                  <span className="text-xs text-green-600 font-semibold">EARNED</span>
                </div>
              </div>
            ))}

            {nextMilestone && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Next Milestone</span>
                  <span className="text-lg">{nextMilestone.icon}</span>
                </div>
                <p className="font-semibold mb-2">{nextMilestone.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">
                    {nextMilestone.courses - completedCourses} course{nextMilestone.courses - completedCourses !== 1 ? 's' : ''} to go
                  </p>
                  <div className="w-32 bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(completedCourses / nextMilestone.courses) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {!nextMilestone && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-center font-semibold text-purple-600">
                  🎉 You've achieved all awards! You're a legend!
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
