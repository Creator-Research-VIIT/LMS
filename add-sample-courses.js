const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addSampleCourses() {
  try {
    // First, let's check if we have any teachers
    const teachers = await prisma.user.findMany({
      where: { role: 'TEACHER' }
    })

    if (teachers.length === 0) {
      console.log('No teachers found. Creating a sample teacher...')
      
      const teacher = await prisma.user.create({
        data: {
          name: 'Dr. Sarah Johnson',
          email: 'sarah.teacher@lms.com',
          role: 'TEACHER',
          isApproved: true
        }
      })
      
      teachers.push(teacher)
    }

    const teacherId = teachers[0].id

    // Add sample courses
    const courses = [
      {
        title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More',
        description: 'Master AI tools and techniques with hands-on training in ChatGPT, prompt engineering, and practical AI applications for business and creativity.',
        thumbnail: '/react-course-thumbnail.png',
        price: 2559,
        teacherId: teacherId,
        approvalStatus: 'APPROVED'
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Learn the foundations of machine learning with Python, scikit-learn, and practical projects.',
        thumbnail: '/ml-course-thumbnail.png',
        price: 3499,
        teacherId: teacherId,
        approvalStatus: 'APPROVED'
      },
      {
        title: 'Digital Marketing Mastery',
        description: 'Complete digital marketing course covering SEO, social media, PPC, and analytics.',
        thumbnail: '/digital-marketing-course-thumbnail.png',
        price: 1999,
        teacherId: teacherId,
        approvalStatus: 'APPROVED'
      }
    ]

    for (const courseData of courses) {
      const existingCourse = await prisma.course.findFirst({
        where: { title: courseData.title }
      })

      if (!existingCourse) {
        const course = await prisma.course.create({
          data: courseData
        })
        console.log(`Created course: ${course.title} (ID: ${course.id})`)
      } else {
        console.log(`Course already exists: ${courseData.title}`)
      }
    }

    console.log('Sample courses added successfully!')
  } catch (error) {
    console.error('Error adding sample courses:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addSampleCourses()