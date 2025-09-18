import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifySeededData() {
  try {
    console.log('🔍 Checking seeded data...')
    
    // Check users
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        approvalStatus: true
      }
    })
    
    // Check courses
    const courses = await prisma.course.findMany({
      select: {
        title: true,
        price: true,
        approvalStatus: true
      }
    })
    
    // Check quizzes
    const quizzes = await prisma.quiz.findMany({
      select: {
        title: true,
        courseId: true
      }
    })
    
    console.log('\n👥 Users created:', users.length)
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role} - ${user.approvalStatus}`)
    })
    
    console.log('\n📚 Courses created:', courses.length)
    courses.forEach(course => {
      console.log(`  - ${course.title} - $${course.price} - ${course.approvalStatus}`)
    })
    
    console.log('\n❓ Quizzes created:', quizzes.length)
    quizzes.forEach(quiz => {
      console.log(`  - ${quiz.title} (Course: ${quiz.courseId})`)
    })
    
    console.log('\n✅ Verification complete!')
    
  } catch (error) {
    console.error('❌ Error verifying data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifySeededData()