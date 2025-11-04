// Test script to add sample pending teachers and courses for admin dashboard testing
// Run this with: node test-admin-dashboard.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addSampleData() {
  try {
    console.log('🚀 Adding sample data for admin dashboard testing...');

    // Create a sample pending teacher
    const pendingTeacher = await prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane.teacher@example.com',
        password: '$2a$10$example.hash.here', // This would be properly hashed in production
        role: 'TEACHER',
        approvalStatus: 'PENDING',
        emailVerified: new Date(),
        referralCode: 'REF123'
      }
    });

    console.log('✅ Created pending teacher:', pendingTeacher.name);

    // Create another pending teacher
    const pendingTeacher2 = await prisma.user.create({
      data: {
        name: 'Michael Johnson',
        email: 'michael.teacher@example.com',
        password: '$2a$10$example.hash.here2',
        role: 'TEACHER',
        approvalStatus: 'PENDING',
        emailVerified: new Date(),
        referralCode: 'REF456'
      }
    });

    console.log('✅ Created pending teacher:', pendingTeacher2.name);

    // Create a sample approved teacher for course creation
    const approvedTeacher = await prisma.user.create({
      data: {
        name: 'Dr. Sarah Wilson',
        email: 'sarah.teacher@example.com',
        password: '$2a$10$example.hash.here3',
        role: 'TEACHER',
        approvalStatus: 'APPROVED',
        emailVerified: new Date(),
        referralCode: 'REF789'
      }
    });

    console.log('✅ Created approved teacher:', approvedTeacher.name);

    // Create a sample pending course
    const pendingCourse = await prisma.course.create({
      data: {
        title: 'Advanced JavaScript Programming',
        description: 'Learn advanced JavaScript concepts including closures, promises, async/await, and modern ES6+ features.',
        price: 299.99,
        thumbnail: '/react-course-thumbnail.png',
        youtubeUrl: 'https://www.youtube.com/playlist?list=PLZlA0Gpn_vH9w2gvhsKuNWOSsHOHMnR6v',
        teacherId: approvedTeacher.id,
        approvalStatus: 'PENDING'
      }
    });

    console.log('✅ Created pending course:', pendingCourse.title);

    // Create another pending course
    const pendingCourse2 = await prisma.course.create({
      data: {
        title: 'Machine Learning with Python',
        description: 'Complete guide to machine learning using Python, scikit-learn, and TensorFlow.',
        price: 499.99,
        thumbnail: '/ml-course-thumbnail.png',
        youtubeUrl: 'https://www.youtube.com/playlist?list=PLQVvvaa0QuDfKTOs3Keq_kaG2P55YRn5v',
        teacherId: approvedTeacher.id,
        approvalStatus: 'PENDING'
      }
    });

    console.log('✅ Created pending course:', pendingCourse2.title);

    console.log('\n🎉 Sample data created successfully!');
    console.log('\nYou can now test the admin dashboard at: http://localhost:3000/admin');
    console.log('\nSample data created:');
    console.log('- 2 pending teachers');
    console.log('- 1 approved teacher');
    console.log('- 2 pending courses');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanupSampleData() {
  try {
    console.log('🧹 Cleaning up sample data...');

    // Delete sample courses
    await prisma.course.deleteMany({
      where: {
        title: {
          in: [
            'Advanced JavaScript Programming',
            'Machine Learning with Python'
          ]
        }
      }
    });

    // Delete sample users
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            'jane.teacher@example.com',
            'michael.teacher@example.com',
            'sarah.teacher@example.com'
          ]
        }
      }
    });

    console.log('✅ Sample data cleaned up successfully!');
  } catch (error) {
    console.error('❌ Error cleaning up sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check command line arguments
const command = process.argv[2];

if (command === 'cleanup') {
  cleanupSampleData();
} else {
  addSampleData();
}

// Export functions for potential use in other scripts
module.exports = { addSampleData, cleanupSampleData };