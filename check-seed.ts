import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkSeededData() {
  try {
    console.log('📊 Checking seeded data...\n')
    
    // Check users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approvalStatus: true,
      }
    })
    
    console.log('👥 Users in database:')
    users.forEach(user => {
      console.log(`  ${user.role.padEnd(8)} | ${user.email.padEnd(25)} | ${user.name.padEnd(20)} | ${user.approvalStatus}`)
    })
    
    // Check courses
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        approvalStatus: true,
        teacher: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    
    console.log('\n📚 Courses in database:')
    courses.forEach(course => {
      console.log(`  ${course.title.padEnd(25)} | ${course.approvalStatus.padEnd(10)} | by ${course.teacher.name}`)
    })
    
    // Check enrollments
    const enrollments = await prisma.enrollment.findMany({
      select: {
        student: {
          select: {
            name: true,
            email: true
          }
        },
        course: {
          select: {
            title: true
          }
        }
      }
    })
    
    console.log('\n📝 Enrollments in database:')
    enrollments.forEach(enrollment => {
      console.log(`  ${enrollment.student.name} enrolled in "${enrollment.course.title}"`)
    })
    
    console.log('\n✅ Database check completed!')
    
  } catch (error) {
    console.error('❌ Error checking database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkSeededData()
