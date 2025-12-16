import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// GET - List all institutes
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { domain: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [institutes, total] = await Promise.all([
      prisma.institute.findMany({
        where,
        include: {
          _count: {
            select: { Users: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.institute.count({ where }),
    ])

    return NextResponse.json({
      institutes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Failed to fetch institutes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch institutes' },
      { status: 500 }
    )
  }
}

// POST - Create new institute
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      domain,
      description,
      address,
      phone,
      email,
      website,
      logo,
      established,
    } = body

    // Validate required fields
    if (!name || !domain) {
      return NextResponse.json(
        { error: 'Name and domain are required' },
        { status: 400 }
      )
    }

    // Check if domain already exists
    const existing = await prisma.institute.findUnique({
      where: { domain: domain.toLowerCase() },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Institute with this domain already exists' },
        { status: 400 }
      )
    }

    const institute = await prisma.institute.create({
      data: {
        name,
        domain: domain.toLowerCase(),
        description,
        address,
        phone,
        email,
        website,
        logo,
        established,
      },
    })

    return NextResponse.json({ institute }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create institute:', error)
    return NextResponse.json(
      { error: 'Failed to create institute' },
      { status: 500 }
    )
  }
}
