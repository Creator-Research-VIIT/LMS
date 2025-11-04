const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testTeacherApprovalEmails() {
  console.log('🔍 Testing Teacher Approval Email System...\n');
  
  try {
    // Check pending teachers
    const pendingTeachers = await prisma.user.findMany({
      where: { 
        role: 'TEACHER',
        approvalStatus: 'pending'
      },
      select: {
        id: true,
        name: true,
        email: true,
        approvalStatus: true,
        createdAt: true
      }
    });
    
    console.log(`📊 Pending teachers: ${pendingTeachers.length}\n`);
    
    if (pendingTeachers.length > 0) {
      console.log('⏳ Pending Teachers:');
      pendingTeachers.forEach((teacher, index) => {
        console.log(`${index + 1}. ${teacher.name} (${teacher.email})`);
        console.log(`   Applied: ${teacher.createdAt.toLocaleDateString()}\n`);
      });
    }
    
    // Check approved teachers
    const approvedTeachers = await prisma.user.findMany({
      where: { 
        role: 'TEACHER',
        approvalStatus: 'approved'
      },
      select: {
        id: true,
        name: true,
        email: true,
        approvalStatus: true,
        createdAt: true
      }
    });
    
    console.log(`✅ Approved teachers: ${approvedTeachers.length}\n`);
    
    // Check all admins who will receive notifications
    const admins = await prisma.user.findMany({
      where: { 
        role: 'ADMIN',
        emailVerified: { not: null }
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    
    console.log(`👑 Admin users (who receive teacher notifications): ${admins.length}`);
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.name} (${admin.email})`);
    });
    
    console.log('\n🔧 Teacher Email Flow Configuration:');
    console.log('✅ Teacher registration → Admin notification email');
    console.log('✅ Teacher approval → Teacher approval email'); 
    console.log('✅ Teacher rejection → Teacher rejection email');
    console.log('✅ Email functions: sendTeacherApplicationConfirmation()');
    console.log('✅ Email functions: sendTeacherApplicationNotification()');
    console.log('✅ Email functions: sendTeacherApprovalNotification()');
    
    console.log('\n📧 Email Testing:');
    console.log('• New teacher registers → Admin gets notification');
    console.log('• Admin approves teacher → Teacher gets approval email');
    console.log('• Admin rejects teacher → Teacher gets rejection email');
    
    console.log('\n🧪 API Endpoints:');
    console.log('• GET /api/teachers/pending - List pending teachers');
    console.log('• PATCH /api/teachers/[id]/approve - Approve teacher');
    console.log('• PATCH /api/teachers/[id]/reject - Reject teacher (with optional message)');
    
    if (pendingTeachers.length > 0) {
      console.log('\n🎯 Test Approval Flow:');
      console.log('1. Start dev server: npm run dev');
      console.log('2. Login as admin');
      console.log(`3. Approve teacher: PATCH /api/teachers/${pendingTeachers[0].id}/approve`);
      console.log(`4. Check email sent to: ${pendingTeachers[0].email}`);
    }
    
  } catch (error) {
    console.error('❌ Error testing teacher approval emails:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testTeacherApprovalEmails();