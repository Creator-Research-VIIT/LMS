const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lms.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Admin User',
      email: 'admin@lms.com',
      password: hashedPassword,
      role: 'ADMIN',
      approvalStatus: 'approved',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created');

  // Create Teacher User
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@lms.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'John Teacher',
      email: 'teacher@lms.com',
      password: hashedPassword,
      role: 'TEACHER',
      approvalStatus: 'approved',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Teacher user created');

  // Create Student User
  const student = await prisma.user.upsert({
    where: { email: 'student@lms.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Jane Student',
      email: 'student@lms.com',
      password: hashedPassword,
      role: 'STUDENT',
      approvalStatus: 'approved',
      emailVerified: new Date(),
    },
  });
  console.log('✅ Student user created');

  // Create sample courses with modules
  const course1 = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Complete React Development Course',
      description: 'Learn React from basics to advanced concepts with hands-on projects',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      price: 2999,
      duration: '12 hours',
      category: 'programming',
      teacherId: teacher.id,
      approvalStatus: 'approved',
      isFree: false,
    },
  });

  // Add modules to course 1
  await prisma.module.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Introduction to React',
        description: 'Understanding React basics and setup',
        videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        resources: 'https://reactjs.org/docs/getting-started.html',
        orderIndex: 1,
        courseId: course1.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'Components and Props',
        description: 'Learn how to create and use React components',
        videoUrl: 'https://www.youtube.com/watch?v=QFaFIcGhPoM',
        resources: 'https://reactjs.org/docs/components-and-props.html',
        orderIndex: 2,
        courseId: course1.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'State and Lifecycle',
        description: 'Managing component state and lifecycle methods',
        videoUrl: 'https://www.youtube.com/watch?v=IYvD9oBCuJI',
        resources: 'https://reactjs.org/docs/state-and-lifecycle.html',
        orderIndex: 3,
        courseId: course1.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ React course with modules created');

  // Create a free course for testing
  const course2 = await prisma.course.upsert({
    where: { id: 'course-2' },
    update: {},
    create: {
      id: 'course-2',
      title: 'Web Development Basics (Free)',
      description: 'Get started with web development - HTML, CSS, and JavaScript basics',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      price: 0,
      duration: '6 hours',
      category: 'programming',
      teacherId: teacher.id,
      approvalStatus: 'approved',
      isFree: true,
    },
  });

  // Add modules to free course
  await prisma.module.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'HTML Fundamentals',
        description: 'Learn the basics of HTML markup',
        videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        resources: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        orderIndex: 1,
        courseId: course2.id,
      },
      {
        id: crypto.randomUUID(),
        title: 'CSS Styling',
        description: 'Style your web pages with CSS',
        videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
        resources: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        orderIndex: 2,
        courseId: course2.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Free web development course with modules created');

  // Create a pending course for admin approval testing
  const course3 = await prisma.course.upsert({
    where: { id: 'course-3' },
    update: {},
    create: {
      id: 'course-3',
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into advanced JavaScript topics',
      thumbnail: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400',
      price: 1999,
      duration: '8 hours',
      category: 'programming',
      teacherId: teacher.id,
      approvalStatus: 'pending',
      isFree: false,
    },
  });

  // Add modules to pending course
  await prisma.module.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: 'Closures and Scope',
        description: 'Understanding JavaScript closures and scope chain',
        videoUrl: 'https://www.youtube.com/watch?v=3a0I8ICR1Vg',
        resources: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
        orderIndex: 1,
        courseId: course3.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Pending JavaScript course with modules created');

  // Enroll student in the free course
  try {
    await prisma.enrollment.create({
      data: {
        id: crypto.randomUUID(),
        studentId: student.id,
        courseId: course2.id,
      },
    });
  } catch (error) {
    // Enrollment might already exist, which is fine
    console.log('📝 Enrollment already exists or created');
  }
  console.log('✅ Student enrolled in free course');

  console.log('🎉 Seeding completed successfully!');
  console.log('\n📋 Test Accounts:');
  console.log('Admin: admin@lms.com / password123');
  console.log('Teacher: teacher@lms.com / password123');
  console.log('Student: student@lms.com / password123');
  console.log('\n📚 Sample Courses:');
  console.log('- Complete React Development Course (₹2999) - APPROVED');
  console.log('- Web Development Basics (Free) - APPROVED');
  console.log('- Advanced JavaScript Concepts (₹1999) - PENDING');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });