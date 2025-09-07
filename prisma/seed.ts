import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // Hash passwords for all users
  const hashedPassword = await bcrypt.hash('password123', 12)

  // Create Admin User
  await prisma.user.upsert({
    where: { email: 'admin@lms.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@lms.com',
      password: hashedPassword,
      role: Role.ADMIN,
      approvalStatus: 'approved',
      emailVerified: new Date(),
    },
  })

  // Create Teacher User
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@lms.com' },
    update: {},
    create: {
      name: 'John Teacher',
      email: 'teacher@lms.com',
      password: hashedPassword,
      role: Role.TEACHER,
      approvalStatus: 'approved',
      emailVerified: new Date(),
    },
  })

  // Create Student User
  const student = await prisma.user.upsert({
    where: { email: 'student@lms.com' },
    update: {},
    create: {
      name: 'Jane Student',
      email: 'student@lms.com',
      password: hashedPassword,
      role: Role.STUDENT,
      approvalStatus: 'approved',
      emailVerified: new Date(),
    },
  })

  // Create a pending teacher for admin approval testing
  await prisma.user.upsert({
    where: { email: 'pending.teacher@lms.com' },
    update: {},
    create: {
      name: 'Pending Teacher',
      email: 'pending.teacher@lms.com',
      password: hashedPassword,
      role: Role.TEACHER,
      approvalStatus: 'pending',
      emailVerified: new Date(),
    },
  })

  // Create sample courses by the approved teacher
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React development including components, hooks, and state management.',
      thumbnail: '/react-course-thumbnail.png',
      price: 99.99,
      teacherId: teacher.id,
      approvalStatus: 'approved',
    },
  })

  await prisma.course.upsert({
    where: { id: 'course-2' },
    update: {},
    create: {
      id: 'course-2',
      title: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts including async/await, closures, and design patterns.',
      thumbnail: '/js-course-thumbnail.png',
      price: 129.99,
      teacherId: teacher.id,
      approvalStatus: 'pending',
    },
  })

  // Create sample quizzes for the approved course
  const quiz1 = await prisma.quiz.upsert({
    where: { id: 'quiz-1' },
    update: {},
    create: {
      id: 'quiz-1',
      title: 'React Basics Quiz',
      description: 'Test your understanding of React fundamentals',
      type: 'PRACTICE',
      courseId: course1.id,
    },
  })

  // Create questions for the quiz
  await prisma.question.upsert({
    where: { id: 'question-1' },
    update: {},
    create: {
      id: 'question-1',
      quizId: quiz1.id,
      questionText: 'What is JSX?',
      questionType: 'multiple_choice',
      points: 2,
      orderIndex: 0,
    },
  })

  // Create answers for the question
  await prisma.answer.createMany({
    data: [
      {
        id: 'answer-1-1',
        questionId: 'question-1',
        answerText: 'A syntax extension for JavaScript',
        isCorrect: true,
      },
      {
        id: 'answer-1-2',
        questionId: 'question-1',
        answerText: 'A new programming language',
        isCorrect: false,
      },
      {
        id: 'answer-1-3',
        questionId: 'question-1',
        answerText: 'A CSS framework',
        isCorrect: false,
      },
    ],
    skipDuplicates: true,
  })

  await prisma.question.upsert({
    where: { id: 'question-2' },
    update: {},
    create: {
      id: 'question-2',
      quizId: quiz1.id,
      questionText: 'React components must always return JSX.',
      questionType: 'true_false',
      points: 1,
      orderIndex: 1,
    },
  })

  await prisma.answer.createMany({
    data: [
      {
        id: 'answer-2-1',
        questionId: 'question-2',
        answerText: 'True',
        isCorrect: false,
      },
      {
        id: 'answer-2-2',
        questionId: 'question-2',
        answerText: 'False',
        isCorrect: true,
      },
    ],
    skipDuplicates: true,
  })

  // Create enrollment for student
  await prisma.enrollment.upsert({
    where: { id: 'enrollment-1' },
    update: {},
    create: {
      id: 'enrollment-1',
      studentId: student.id,
      courseId: course1.id,
    },
  })

  console.log('✅ Seeding completed successfully!')
  console.log('\n📋 Test Accounts Created:')
  console.log('┌─────────────────────────────────────────────────────────┐')
  console.log('│                    LOGIN CREDENTIALS                    │')
  console.log('├─────────────────────────────────────────────────────────┤')
  console.log('│ 👑 ADMIN                                               │')
  console.log('│   Email: admin@lms.com                                  │')
  console.log('│   Password: password123                                 │')
  console.log('│                                                         │')
  console.log('│ 👨‍🏫 APPROVED TEACHER                                    │')
  console.log('│   Email: teacher@lms.com                                │')
  console.log('│   Password: password123                                 │')
  console.log('│                                                         │')
  console.log('│ 👨‍🏫 PENDING TEACHER (for testing approval)             │')
  console.log('│   Email: pending.teacher@lms.com                        │')
  console.log('│   Password: password123                                 │')
  console.log('│                                                         │')
  console.log('│ 👨‍🎓 STUDENT                                             │')
  console.log('│   Email: student@lms.com                                │')
  console.log('│   Password: password123                                 │')
  console.log('└─────────────────────────────────────────────────────────┘')
  console.log('\n📚 Sample Data:')
  console.log('• 1 Approved Course: "Introduction to React"')
  console.log('• 1 Pending Course: "Advanced JavaScript"')
  console.log('• 1 Student Enrollment')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
