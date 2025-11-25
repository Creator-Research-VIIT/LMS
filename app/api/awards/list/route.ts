import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * GET /api/awards/list
 * Fetch all awards from the database for admin preview
 */
export async function GET() {
  try {
    const awards = await prisma.award.findMany({
      orderBy: {
        milestone: 'asc',
      },
    })

    return NextResponse.json(
      {
        success: true,
        awards: awards.map(award => ({
          id: award.id,
          name: award.name,
          description: award.description,
          icon: award.icon,
          milestone: award.milestone,
          color: award.color,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching awards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 }
    )
  }
}
