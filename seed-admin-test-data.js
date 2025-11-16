const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function seedTestData() {
  try {
    console.log('🌱 Seeding test admin data...');

    // Get or create a teacher
    let teacher = await prisma.user.findUnique({
      where: { email: 'teacher@lms.com' },
    });

    if (!teacher) {
      teacher = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          name: 'Test Teacher',
          email: 'teacher@lms.com',
          password: 'hashed_password',
          role: 'TEACHER',
          approvalStatus: 'approved',
          emailVerified: new Date(),
        },
      });
      console.log('✅ Created test teacher');
    }

    // Get or create students
    const studentEmails = ['student1@lms.com', 'student2@lms.com', 'student3@lms.com'];
    const students = [];

    for (const email of studentEmails) {
      let student = await prisma.user.findUnique({
        where: { email },
      });

      if (!student) {
        student = await prisma.user.create({
          data: {
            id: crypto.randomUUID(),
            name: email.replace('@lms.com', '').replace(/([0-9])/g, ' $1').trim(),
            email,
            password: 'hashed_password',
            role: 'STUDENT',
            approvalStatus: 'approved',
            emailVerified: new Date(),
          },
        });
        console.log(`✅ Created student: ${email}`);
      }
      students.push(student);
    }

    // Create test courses
    const courseNames = [
      { title: 'Introduction to React', description: 'Learn React basics' },
      { title: 'Advanced JavaScript', description: 'Master JavaScript concepts' },
      { title: 'Web Design Fundamentals', description: 'Learn modern web design' },
      { title: 'Full Stack Development', description: 'Build complete web applications' },
    ];

    for (const course of courseNames) {
      const existing = await prisma.course.findFirst({
        where: { title: course.title },
      });

      if (!existing) {
        await prisma.course.create({
          data: {
            id: crypto.randomUUID(),
            title: course.title,
            description: course.description,
            teacherId: teacher.id,
            price: Math.floor(Math.random() * 5000) + 500,
            approvalStatus: 'approved',
            isFree: Math.random() > 0.7,
          },
        });
        console.log(`✅ Created course: ${course.title}`);
      }
    }

    // Create enrollments (link students to courses)
    const courses = await prisma.course.findMany({ where: { teacherId: teacher.id } });

    for (const student of students) {
      for (const course of courses) {
        const existing = await prisma.enrollment.findFirst({
          where: {
            studentId: student.id,
            courseId: course.id,
          },
        });

        if (!existing && Math.random() > 0.3) {
          await prisma.enrollment.create({
            data: {
              id: crypto.randomUUID(),
              studentId: student.id,
              courseId: course.id,
              isPaid: true,
            },
          });
          console.log(`✅ Enrolled ${student.email} in ${course.title}`);
        }
      }
    }

    // Create test payments
    const enrollments = await prisma.enrollment.findMany({
      include: { Course: true },
    });

    for (const enrollment of enrollments.slice(0, 3)) {
      const existing = await prisma.payment.findFirst({
        where: {
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
        },
      });

      if (!existing) {
        await prisma.payment.create({
          data: {
            id: crypto.randomUUID(),
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
            amount: enrollment.Course.price,
            currency: 'INR',
            razorpayOrderId: `order_${crypto.randomBytes(8).toString('hex')}`,
            status: 'SUCCESS',
          },
        });
        console.log(`✅ Created payment for ${enrollment.studentId}`);
      }
    }

    console.log('\n✅ Test data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - 1 teacher created`);
    console.log(`   - 3 students created`);
    console.log(`   - 4 courses created`);
    console.log(`   - Multiple enrollments created`);
    console.log(`   - Test payments created`);
    console.log('\n💡 Now go to http://localhost:3001/admin to see the data!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestData();
