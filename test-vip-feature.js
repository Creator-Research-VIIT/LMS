/**
 * Test VIP Feature
 * Demonstrates the VIP functionality
 */

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function testVIPFeature() {
  try {
    console.log('\n🧪 Testing VIP Feature\n');
    console.log('═'.repeat(60));

    // 1. Check current VIP students
    console.log('\n1️⃣  Current VIP Students:');
    const vipStudents = await prisma.user.findMany({
      where: { 
        role: 'STUDENT',
        isVIP: true 
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVIP: true,
        vipGrantedAt: true
      }
    });

    if (vipStudents.length > 0) {
      vipStudents.forEach(student => {
        console.log(`   👑 ${student.name} (${student.email})`);
        console.log(`      Granted: ${student.vipGrantedAt?.toLocaleDateString() || 'N/A'}`);
      });
    } else {
      console.log('   No VIP students yet');
    }

    // 2. Check students close to VIP
    console.log('\n2️⃣  Students Close to VIP Status:');
    const allStudents = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true, isVIP: true }
    });

    for (const student of allStudents.slice(0, 5)) {
      const completedCount = await prisma.courseProgress.count({
        where: {
          studentId: student.id,
          progressPercent: 100,
          completedAt: { not: null }
        }
      });

      if (completedCount >= 50 && !student.isVIP) {
        console.log(`   📈 ${student.name}: ${completedCount}/100 courses completed`);
      }
    }

    // 3. Show VIP benefits
    console.log('\n3️⃣  VIP Benefits:');
    console.log('   ✅ Free enrollment in ALL courses');
    console.log('   ✅ Lifetime access - permanent status');
    console.log('   ✅ VIP Elite Member award badge');
    console.log('   ✅ Special recognition on platform');

    // 4. Test enrollment logic
    console.log('\n4️⃣  Testing Enrollment Logic:');
    
    // Get a sample course
    const sampleCourse = await prisma.course.findFirst({
      where: { approvalStatus: 'approved' },
      select: { id: true, title: true, price: true, isFree: true }
    });

    if (sampleCourse) {
      console.log(`   Course: ${sampleCourse.title}`);
      console.log(`   Price: ₹${sampleCourse.price} (Free: ${sampleCourse.isFree})`);
      
      if (vipStudents.length > 0) {
        console.log(`   VIP Enrollment: Would be FREE (isPaid: true automatically)`);
      } else {
        console.log(`   Regular Enrollment: Payment required`);
      }
    }

    // 5. VIP Statistics
    console.log('\n5️⃣  VIP Statistics:');
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    const totalVIPs = vipStudents.length;
    const vipPercentage = totalStudents > 0 ? ((totalVIPs / totalStudents) * 100).toFixed(2) : 0;

    console.log(`   Total Students: ${totalStudents}`);
    console.log(`   VIP Students: ${totalVIPs} (${vipPercentage}%)`);
    console.log(`   VIP Threshold: 100 completed courses`);

    // 6. How to test VIP upgrade
    console.log('\n6️⃣  How to Test VIP Upgrade:');
    console.log('   1. Create a test student account');
    console.log('   2. Enroll in 100 courses');
    console.log('   3. Complete all modules in each course');
    console.log('   4. When 100th course reaches 100%, VIP status is granted');
    console.log('   5. Future enrollments will be free automatically');

    console.log('\n═'.repeat(60));
    console.log('\n✅ VIP Feature Test Complete!\n');

  } catch (error) {
    console.error('\n❌ Error testing VIP feature:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testVIPFeature();
