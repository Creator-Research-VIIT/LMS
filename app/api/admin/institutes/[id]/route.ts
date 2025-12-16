import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get single institute
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const institute = await prisma.institute.findUnique({
      where: { id: params.id },
      include: {
        Users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
          take: 10,
        },
        _count: {
          select: { Users: true },
        },
      },
    })

    if (!institute) {
      return NextResponse.json({ error: 'Institute not found' }, { status: 404 })
    }

    return NextResponse.json({ institute })
  } catch (error: any) {
    console.error('Failed to fetch institute:', error)
    return NextResponse.json(
      { error: 'Failed to fetch institute' },
      { status: 500 }
    )
  }
}

// PUT - Update institute
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      isActive,
    } = body

    // Check if institute exists
    const existingInstitute = await prisma.institute.findUnique({
      where: { id: params.id },
    })

    if (!existingInstitute) {
      return NextResponse.json({ error: 'Institute not found' }, { status: 404 })
    }

    // If domain is being changed, check if new domain is available
    if (domain && domain.toLowerCase() !== existingInstitute.domain) {
      const domainExists = await prisma.institute.findUnique({
        where: { domain: domain.toLowerCase() },
      })

      if (domainExists) {
        return NextResponse.json(
          { error: 'Domain already in use' },
          { status: 400 }
        )
      }
    }

    const institute = await prisma.institute.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(domain && { domain: domain.toLowerCase() }),
        ...(description !== undefined && { description }),
        ...(address !== undefined && { address }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(website !== undefined && { website }),
        ...(logo !== undefined && { logo }),
        ...(established !== undefined && { established }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json({ institute })
  } catch (error: any) {
    console.error('Failed to update institute:', error)
    return NextResponse.json(
      { error: 'Failed to update institute' },
      { status: 500 }
    )
  }
}

// DELETE - Delete institute
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if institute has users
    const institute = await prisma.institute.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { Users: true },
        },
      },
    })

    if (!institute) {
      return NextResponse.json({ error: 'Institute not found' }, { status: 404 })
    }

    if (institute._count.Users > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete institute with ${institute._count.Users} users. Please remove or reassign users first.`,
        },
        { status: 400 }
      )
    }

    await prisma.institute.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Failed to delete institute:', error)
    return NextResponse.json(
      { error: 'Failed to delete institute' },
      { status: 500 }
    )
  }
}
