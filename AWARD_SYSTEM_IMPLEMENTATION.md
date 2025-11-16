# Award System Implementation Guide

## Overview
This document provides a complete step-by-step guide to implement the comprehensive Award/Gamification system for the LMS application. The system awards badges to students when they reach course completion milestones.

---

## Table of Contents
1. [Database Schema Setup](#database-schema-setup)
2. [Award Service Layer](#award-service-layer)
3. [API Endpoints](#api-endpoints)
4. [Frontend Components](#frontend-components)
5. [Integration Points](#integration-points)
6. [Testing & Verification](#testing--verification)

---

## Database Schema Setup

### Step 1: Update Prisma Schema

**File:** `prisma/schema.prisma`

Add the following models to your schema (after the existing User, Course, and Enrollment models):

```prisma
// Award System Models
model Award {
  id            String   @id @default(cuid())
  name          String   @unique // e.g., "Rising Scholar"
  description   String   // e.g., "Completed 10 courses"
  icon          String   // e.g., "📚"
  milestone     Int      // e.g., 10 (number of completed courses)
  color         String   // e.g., "blue" for styling (blue, silver, gold, platinum)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  userAwards    UserAward[]

  @@index([milestone])
}

model UserAward {
  id            String   @id @default(cuid())
  userId        String
  awardId       String
  achievedAt    DateTime @default(now())

  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  Award         Award    @relation(fields: [awardId], references: [id], onDelete: Cascade)

  @@unique([userId, awardId]) // Prevent duplicate awards per user
  @@index([userId])
  @@index([awardId])
}

// Add to User model if not already present:
// userAwards  UserAward[]
```

**Add to User model:**
```prisma
model User {
  // ... existing fields ...
  userAwards  UserAward[]
}
```

### Step 2: Create and Run Database Migration

Execute the following commands in the terminal:

```bash
# Generate Prisma client with new models
npx prisma generate

# Create migration for the schema changes
npx prisma migrate dev --name add_award_system

# Alternative if using Neon/PostgreSQL directly:
npx prisma db push --skip-generate
```

**Expected Output:**
```
✔ Generated Prisma Client
✔ Created migration: prisma/migrations/xxx_add_award_system
✔ Successfully applied migrations
```

---

## Award Service Layer

### Step 3: Create Award Service Module

**File:** `lib/awards.ts`

Create this new file with the core award logic:

```typescript
import { prisma } from './prisma'

/**
 * Award milestone definitions
 * These are the achievements users can earn
 */
export const AWARDS = [
  {
    name: 'Rising Scholar',
    description: 'Completed 10 courses',
    icon: '📚',
    milestone: 10,
    color: 'blue',
  },
  {
    name: 'Silver Scholar',
    description: 'Completed 25 courses',
    icon: '🥈',
    milestone: 25,
    color: 'silver',
  },
  {
    name: 'Elite Learner',
    description: 'Completed 50 courses',
    icon: '🏆',
    milestone: 50,
    color: 'gold',
  },
  {
    name: 'LMS Hall of Fame',
    description: 'Completed 100 courses',
    icon: '👑',
    milestone: 100,
    color: 'platinum',
  },
]

/**
 * Initialize the awards system by creating default awards in the database
 * Call this once on app startup
 */
export async function initializeAwards() {
  try {
    for (const award of AWARDS) {
      const existingAward = await prisma.award.findUnique({
        where: { name: award.name },
      })

      if (!existingAward) {
        await prisma.award.create({
          data: award,
        })
        console.log(`✅ Created award: ${award.name}`)
      }
    }
    console.log('✅ Awards initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing awards:', error)
    throw error
  }
}

/**
 * Count the number of completed courses for a user
 * A course is considered completed when all modules are done
 */
export async function countCompletedCourses(userId: string): Promise<number> {
  try {
    const completedCourses = await prisma.courseProgress.count({
      where: {
        studentId: userId,
        completedAt: {
          not: null,
        },
      },
    })
    return completedCourses
  } catch (error) {
    console.error('❌ Error counting completed courses:', error)
    return 0
  }
}

/**
 * Get all awards earned by a user with progress to next milestone
 */
export async function getUserAwards(userId: string) {
  try {
    const userAwards = await prisma.userAward.findMany({
      where: { userId },
      include: {
        Award: true,
      },
      orderBy: {
        achievedAt: 'desc',
      },
    })

    // Calculate progress toward next milestone
    const completedCount = await countCompletedCourses(userId)
    const nextMilestone = AWARDS.find(a => a.milestone > completedCount)

    return {
      awards: userAwards,
      completedCourses: completedCount,
      nextMilestone: nextMilestone || null,
      progressToNext: nextMilestone
        ? Math.min(100, (completedCount / nextMilestone.milestone) * 100)
        : 100,
    }
  } catch (error) {
    console.error('❌ Error fetching user awards:', error)
    return {
      awards: [],
      completedCourses: 0,
      nextMilestone: null,
      progressToNext: 0,
    }
  }
}

/**
 * Check if user has reached a milestone and award badge if so
 * Returns the newly awarded badge if any, or null
 */
export async function checkAndAwardBadges(
  userId: string
): Promise<{
  id: string
  userId: string
  awardId: string
  achievedAt: Date
  Award: {
    id: string
    name: string
    description: string
    icon: string
    milestone: number
    color: string
  }
} | null> {
  try {
    // Count completed courses
    const completedCount = await countCompletedCourses(userId)

    // Find awards that should be assigned
    const awardToAssign = AWARDS.find(award => award.milestone === completedCount)

    if (!awardToAssign) {
      console.log(
        `ℹ️ User ${userId} has ${completedCount} completed courses, no award milestone reached`
      )
      return null
    }

    // Get the award from database
    const award = await prisma.award.findUnique({
      where: { name: awardToAssign.name },
    })

    if (!award) {
      console.error(`❌ Award not found: ${awardToAssign.name}`)
      return null
    }

    // Check if user already has this award (prevent duplicates)
    const existingAward = await prisma.userAward.findUnique({
      where: {
        userId_awardId: {
          userId,
          awardId: award.id,
        },
      },
    })

    if (existingAward) {
      console.log(`ℹ️ User ${userId} already has award: ${award.name}`)
      return null
    }

    // Create the award entry
    const userAward = await prisma.userAward.create({
      data: {
        userId,
        awardId: award.id,
      },
      include: {
        Award: true,
      },
    })

    console.log('✅ Award assigned:', {
      userId,
      awardName: award.name,
      milestone: award.milestone,
    })

    return userAward
  } catch (error) {
    console.error('❌ Error checking and awarding badges:', error)
    return null
  }
}

/**
 * Get upcoming milestones for a user
 */
export function getUpcomingMilestones(completedCount: number) {
  return AWARDS.filter(award => award.milestone > completedCount).sort(
    (a, b) => a.milestone - b.milestone
  )
}

/**
 * Calculate progress percentage to next milestone
 */
export function calculateProgressToNext(completedCount: number): {
  current: number
  next: number | null
  percentage: number
} {
  const nextMilestone = AWARDS.find(a => a.milestone > completedCount)
  if (!nextMilestone) {
    return { current: completedCount, next: null, percentage: 100 }
  }

  return {
    current: completedCount,
    next: nextMilestone.milestone,
    percentage: Math.min(100, (completedCount / nextMilestone.milestone) * 100),
  }
}
```

---

## API Endpoints

### Step 4: Create Award Trigger Endpoint

**File:** `app/api/awards/trigger/route.ts`

```typescript
import { checkAndAwardBadges } from '@/lib/awards'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

/**
 * POST /api/awards/trigger
 * Check if user has reached an award milestone and assign if so
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get userId from request body or session
    const body = await request.json().catch(() => ({}))
    const userId = body.userId || session.user.id

    // Verify user can only check their own awards
    if (userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check and award badges
    const newAward = await checkAndAwardBadges(userId)

    if (newAward) {
      return NextResponse.json(
        {
          success: true,
          newAward: {
            name: newAward.Award.name,
            description: newAward.Award.description,
            icon: newAward.Award.icon,
            color: newAward.Award.color,
          },
          message: `Congratulations! You earned the "${newAward.Award.name}" award!`,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        newAward: null,
        message: 'No new awards earned yet',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Error triggering award check:', error)
    return NextResponse.json(
      { error: 'Failed to check awards' },
      { status: 500 }
    )
  }
}
```

### Step 5: Create Get User Awards Endpoint

**File:** `app/api/awards/user/route.ts`

```typescript
import { getUserAwards } from '@/lib/awards'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

/**
 * GET /api/awards/user
 * Fetch user's earned awards and progress
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || session.user.id

    // Verify user can only view their own or other users' data
    // (adjust based on your privacy requirements)
    if (userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const awardsData = await getUserAwards(userId)

    return NextResponse.json(
      {
        success: true,
        data: awardsData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Error fetching user awards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 }
    )
  }
}
```

### Step 6: Create Awards Initialization Endpoint

**File:** `app/api/awards/init/route.ts`

```typescript
import { initializeAwards } from '@/lib/awards'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * POST /api/awards/init
 * Initialize the awards system (idempotent - safe to call multiple times)
 */
export async function POST() {
  try {
    // Check if awards already exist
    const existingAwards = await prisma.award.count()

    if (existingAwards > 0) {
      return NextResponse.json(
        {
          message: 'Awards already initialized',
          count: existingAwards,
        },
        { status: 200 }
      )
    }

    // Initialize awards
    await initializeAwards()

    return NextResponse.json(
      {
        message: 'Awards initialized successfully',
        count: 4,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Error initializing awards:', error)
    return NextResponse.json(
      { error: 'Failed to initialize awards' },
      { status: 500 }
    )
  }
}
```

---

## Frontend Components

### Step 7: Create Award Celebration Component

**File:** `components/award-celebration.tsx`

This is a full-screen modal that displays when an award is earned with confetti animations.

```typescript
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
    color: color || 'blue',
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

export default AwardCelebration
```

### Step 8: Create Award Badge Component

**File:** `components/award-badge.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface AwardBadgeProps {
  readonly icon: string
  readonly name: string
  readonly description: string
  readonly achievedAt: Date
  readonly color: string
  readonly size?: 'sm' | 'md' | 'lg'
}

export function AwardBadge({
  icon,
  name,
  description,
  achievedAt,
  color,
  size = 'md',
}: AwardBadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-4xl',
    lg: 'w-20 h-20 text-5xl',
  }

  const bgColorMap = {
    blue: 'bg-blue-100',
    silver: 'bg-gray-100',
    gold: 'bg-yellow-100',
    platinum: 'bg-purple-100',
  }

  const bgColor = bgColorMap[color as keyof typeof bgColorMap] || 'bg-blue-100'

  const dateStr = new Date(achievedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center cursor-pointer transition-all`}
          >
            {icon}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-bold">{name}</p>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-xs text-gray-500 mt-1">Earned on {dateStr}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

### Step 9: Create Awards Display Component

**File:** `components/awards-display.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AwardBadge } from './award-badge'
import { Trophy } from 'lucide-react'

interface Award {
  id: string
  name: string
  description: string
  icon: string
  milestone: number
  color: string
}

interface UserAwardData {
  id: string
  userId: string
  awardId: string
  achievedAt: Date
  Award: Award
}

interface AwardsDisplayProps {
  readonly userId: string
}

export function AwardsDisplay({ userId }: AwardsDisplayProps) {
  const [userAwards, setUserAwards] = useState<UserAwardData[]>([])
  const [completedCourses, setCompletedCourses] = useState(0)
  const [nextMilestone, setNextMilestone] = useState<Award | null>(null)
  const [progressToNext, setProgressToNext] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/awards/user?userId=${userId}`)
        const data = await response.json()

        if (data.success) {
          setUserAwards(data.data.awards)
          setCompletedCourses(data.data.completedCourses)
          setNextMilestone(data.data.nextMilestone)
          setProgressToNext(data.data.progressToNext)
        }
      } catch (error) {
        console.error('Failed to fetch awards:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchAwards()
    }
  }, [userId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading achievements...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Achievements & Milestones
        </CardTitle>
        <CardDescription>
          Track your learning journey and unlock badges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Earned Badges */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Earned Badges</h3>
          {userAwards.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {userAwards.map(userAward => (
                <AwardBadge
                  key={userAward.id}
                  icon={userAward.Award.icon}
                  name={userAward.Award.name}
                  description={userAward.Award.description}
                  achievedAt={new Date(userAward.achievedAt)}
                  color={userAward.Award.color}
                  size="md"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No badges earned yet. Keep learning to unlock achievements!
            </p>
          )}
        </div>

        {/* Progress Section */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Progress</h3>
          <div className="space-y-4">
            {/* Courses Completed */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Courses Completed
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {completedCourses}
                </span>
              </div>
            </div>

            {/* Progress to Next Milestone */}
            {nextMilestone ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress to "{nextMilestone.name}"
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    {Math.round(progressToNext)}%
                  </span>
                </div>
                <Progress value={progressToNext} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">
                  {nextMilestone.milestone - completedCourses} courses until
                  next milestone
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-semibold text-sm">
                  ✨ Congratulations! You've unlocked all milestones!
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AwardsDisplay
```

### Step 10: Create Server Action for Award Trigger

**File:** `app/actions/awards.ts`

```typescript
'use server'

import { checkAndAwardBadges } from '@/lib/awards'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function triggerAwardCheck() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const newAward = await checkAndAwardBadges(session.user.id)

    if (newAward) {
      return {
        success: true,
        newAward: {
          name: newAward.Award.name,
          description: newAward.Award.description,
          icon: newAward.Award.icon,
          color: newAward.Award.color,
        },
      }
    }

    return { success: true, newAward: null }
  } catch (error) {
    console.error('Error triggering award check:', error)
    return { success: false, error: 'Failed to check awards' }
  }
}
```

### Step 11: Create Custom Hook for Course Completion

**File:** `hooks/useCourseCompletion.ts`

```typescript
'use client'

import { useState } from 'react'

interface AwardData {
  name: string
  description: string
  icon: string
  color: string
}

export function useCourseCompletion() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [awardData, setAwardData] = useState<AwardData | null>(null)

  const handleCourseCompletion = async () => {
    try {
      const response = await fetch('/api/awards/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (response.ok && data.newAward) {
        setAwardData(data.newAward)
        setShowCelebration(true)
      }
    } catch (error) {
      console.error('Error triggering award:', error)
    }
  }

  return {
    showCelebration,
    awardData,
    setShowCelebration,
    handleCourseCompletion,
  }
}
```

---

## Integration Points

### Step 12: Integrate Award Celebration into Enrolled Course Page

**File:** `app/courses/[id]/enrolled/enrolled-client.tsx`

#### 12a: Add imports at the top of the file:

```typescript
import AwardCelebration from '@/components/award-celebration'
```

#### 12b: Add state variables in the component:

```typescript
const [showAwardCelebration, setShowAwardCelebration] = useState(false)
const [awardData, setAwardData] = useState<{
  name: string
  description: string
  icon: string
  color: string
} | null>(null)
```

#### 12c: Update the `submitFinalQuiz` function to trigger awards on pass:

```typescript
const submitFinalQuiz = async () => {
  if (!finalQuiz) return
  setQuizSubmitting(true)
  setQuizMessage(null)
  try {
    const res = await fetch(`/api/quizzes/${finalQuiz.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: quizAnswers })
    })
    const data = await res.json()
    if (res.ok) {
      setQuizMessage(`Your score: ${data.result.percentage}%`) 
      if (data.result.isPassed) {
        setCertificateReady(true)
        
        // Trigger award check for course completion milestone
        try {
          const awardRes = await fetch('/api/awards/trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: session?.user?.id })
          })
          const awardData = await awardRes.json()
          if (awardRes.ok && awardData.newAward) {
            // Show celebration if new award earned
            setAwardData({
              name: awardData.newAward.name,
              description: awardData.newAward.description,
              icon: awardData.newAward.icon,
              color: awardData.newAward.color
            })
            setShowAwardCelebration(true)
          }
        } catch (error) {
          console.error('Error triggering award check:', error)
        }
      }
    } else {
      setQuizMessage(data.error || 'Failed to submit quiz')
    }
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'An error occurred submitting the quiz'
    setQuizMessage(errorMessage)
  } finally {
    setQuizSubmitting(false)
  }
}
```

#### 12d: Update the return statement to include the celebration modal:

```typescript
return (
  <>
    {showAwardCelebration && awardData && (
      <AwardCelebration 
        award={awardData}
        isOpen={showAwardCelebration}
        onClose={() => setShowAwardCelebration(false)}
      />
    )}
    <div className="container mx-auto px-4 py-8">
      {/* Rest of the JSX */}
    </div>
  </>
)
```

### Step 13: Add Awards to Student Profile

**File:** `app/student/page.tsx`

#### 13a: Add import:

```typescript
import AwardsDisplay from '@/components/awards-display'
```

#### 13b: Replace the profile section:

Find the section that says:
```typescript
{activeView === 'profile' && (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
    <p className="text-gray-600">This section is coming soon!</p>
  </div>
)}
```

Replace with:

```typescript
{activeView === 'profile' && (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
      
      {/* User Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-semibold text-gray-900">{session?.user?.name || 'Student'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-gray-900 font-medium">{session?.user?.email}</p>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Awards Display */}
      <AwardsDisplay userId={session?.user?.id || ''} />
    </div>
  </div>
)}
```

---

## Testing & Verification

### Step 14: Initialize Awards in Database

Run this command once to populate the awards in the database:

```bash
curl -X POST http://localhost:3000/api/awards/init
```

Or you can call it from the browser console:

```javascript
fetch('/api/awards/init', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log('Awards initialized:', data))
```

### Step 15: Verify Installation

1. **Check Database:** Verify awards exist in database:
   ```sql
   SELECT * FROM Award;
   ```
   Expected: 4 awards (Rising Scholar, Silver Scholar, Elite Learner, LMS Hall of Fame)

2. **Check Dependencies:** Ensure animation packages are installed:
   ```bash
   npm list framer-motion react-confetti
   ```

3. **Build Project:**
   ```bash
   npm run build
   ```
   Expected: No errors, successful build

### Step 16: Test Award Flow

1. **Complete Courses:**
   - Complete 10 courses as a student
   - Pass the final quiz on the 10th course
   - Expected: Celebration modal should appear with "Rising Scholar" award

2. **Check Profile:**
   - Navigate to Student Dashboard → Profile
   - Expected: See earned awards with badges and progress to next milestone

3. **Test Subsequent Milestones:**
   - Complete 25 courses → "Silver Scholar" should appear
   - Complete 50 courses → "Elite Learner" should appear
   - Complete 100 courses → "LMS Hall of Fame" should appear

### Step 17: Manual Testing Checklist

- [ ] Database migration applied successfully
- [ ] Awards initialized in database
- [ ] Award trigger endpoint returns correct data
- [ ] Get user awards endpoint returns correct progress
- [ ] Celebration component displays on award earned
- [ ] Confetti animation works correctly
- [ ] Profile page shows earned awards
- [ ] Progress bar updates correctly
- [ ] No duplicate awards are created
- [ ] Build completes without errors
- [ ] Page loads without errors in browser console

---

## Required Dependencies

Ensure these packages are installed:

```bash
npm install framer-motion react-confetti
# or
pnpm add framer-motion react-confetti
```

If not already installed:
- `next-auth` (for authentication)
- `prisma` (for database)
- `@prisma/client` (Prisma client)

---

## Environment Setup

Make sure `.env.local` includes:

```
DATABASE_URL=<your-database-url>
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=http://localhost:3000
```

---

## Troubleshooting

### Build Errors

**Error:** `Property 'award' does not exist on type 'PrismaClient'`
- **Fix:** Run `npx prisma generate` to regenerate the Prisma client

**Error:** Module not found
- **Fix:** Ensure all file paths are correct and components are properly exported

### Runtime Errors

**Award doesn't trigger:**
- Check that `courseProgress.completedAt` is set when course is marked complete
- Verify user has exactly N completed courses (not more than N for that milestone)

**Confetti doesn't appear:**
- Ensure `react-confetti` is installed
- Check browser console for errors
- Verify `window` object is available (client-side only)

---

## File Checklist

Ensure all these files are created:

```
✓ prisma/schema.prisma (updated with Award models)
✓ lib/awards.ts
✓ app/api/awards/trigger/route.ts
✓ app/api/awards/user/route.ts
✓ app/api/awards/init/route.ts
✓ components/award-celebration.tsx
✓ components/award-badge.tsx
✓ components/awards-display.tsx
✓ app/actions/awards.ts
✓ hooks/useCourseCompletion.ts
✓ app/courses/[id]/enrolled/enrolled-client.tsx (updated)
✓ app/student/page.tsx (updated)
```

---

## Summary

The Award System is now fully integrated with your LMS. Students will:

1. ✅ Earn badges when completing course milestones (10, 25, 50, 100)
2. ✅ See celebration modals with confetti animations
3. ✅ Track their progress on the profile page
4. ✅ Never receive duplicate awards
5. ✅ View all earned achievements with dates

**Next Steps:**
- Deploy to production
- Monitor award triggers
- Adjust milestone numbers if needed
- Add more awards as features expand
