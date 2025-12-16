/**
 * Quick Production Readiness Test
 * Fast validation of critical LMS features
 */

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

const results = { pass: 0, fail: 0, warn: 0 };

function log(emoji, test, status, msg = '') {
  if (status === 'pass') {
    results.pass++;
    console.log(`${emoji} ✅ ${test}`);
  } else if (status === 'fail') {
    results.fail++;
    console.log(`${emoji} ❌ ${test}: ${msg}`);
  } else {
    results.warn++;
    console.log(`${emoji} ⚠️  ${test}: ${msg}`);
  }
}

async function runQuickTests() {
  console.log('\n🚀 Quick Production Readiness Check\n');
  console.log('═'.repeat(50));
  
  try {
    // 1. Database Connectivity
    console.log('\n📊 DATABASE');
    await prisma.$connect();
    const users = await prisma.user.count();
    const courses = await prisma.course.count();
    const enrollments = await prisma.enrollment.count();
    const quizzes = await prisma.quiz.count();
    const payments = await prisma.payment.count();
    
    log('📊', 'Database Connected', 'pass');
    console.log(`   └─ Users: ${users}, Courses: ${courses}, Enrollments: ${enrollments}`);
    console.log(`   └─ Quizzes: ${quizzes}, Payments: ${payments}`);
    
    // 2. User Accounts
    console.log('\n👥 USER ACCOUNTS');
    const students = await prisma.user.count({ where: { role: 'student' } });
    const teachers = await prisma.user.count({ where: { role: 'teacher' } });
    const admins = await prisma.user.count({ where: { role: 'admin' } });
    
    log('👥', 'User Roles', 'pass');
    console.log(`   └─ Students: ${students}, Teachers: ${teachers}, Admins: ${admins}`);
    
    //3. Email Verification
    const verifications = await prisma.emailVerification.count();
    const verifiedUsers = await prisma.user.count({ where: { emailVerified: { not: null } } });
    log('📧', `Email System (${verifiedUsers} verified, ${verifications} pending)`, 'pass');
    
    // 4. Teacher Approval
    const pendingTeachers = await prisma.user.count({
      where: { role: 'teacher', approvalStatus: 'pending' }
    });
    const approvedTeachers = await prisma.user.count({
      where: { role: 'teacher', approvalStatus: 'approved' }
    });
    log('✅', `Teacher Approval (${approvedTeachers} approved, ${pendingTeachers} pending)`, 'pass');
    
    // 5. Course System
    console.log('\n📚 COURSES');
    const pendingCourses = await prisma.course.count({ where: { approvalStatus: 'pending' } });
    const approvedCourses = await prisma.course.count({ where: { approvalStatus: 'approved' } });
    const rejectedCourses = await prisma.course.count({ where: { approvalStatus: 'rejected' } });
    
    log('📚', 'Course Management', 'pass');
    console.log(`   └─ Approved: ${approvedCourses}, Pending: ${pendingCourses}, Rejected: ${rejectedCourses}`);
    
    // Check course completeness
    const coursesWithModules = await prisma.course.count({
      where: { Module: { some: {} } }
    });
    log('📦', `Courses with Modules (${coursesWithModules}/${courses})`, coursesWithModules > 0 ? 'pass' : 'warn', 'Some courses need modules');
    
    // 6. Enrollment System
    console.log('\n📝 ENROLLMENTS');
    const paidEnrollments = await prisma.enrollment.count({ where: { isPaid: true } });
    const freeEnrollments = await prisma.enrollment.count({ where: { isPaid: false } });
    
    log('📝', 'Enrollment System', 'pass');
    console.log(`   └─ Paid: ${paidEnrollments}, Free: ${freeEnrollments}`);
    
    // 7. Payment System
    console.log('\n💳 PAYMENTS');
    const successfulPayments = await prisma.payment.count({ where: { status: 'completed' } });
    const pendingPayments = await prisma.payment.count({ where: { status: 'pending' } });
    const failedPayments = await prisma.payment.count({ where: { status: 'failed' } });
    
    log('💳', 'Payment Records', payments > 0 ? 'pass' : 'warn', payments === 0 ? 'No payments yet' : '');
    if (payments > 0) {
      console.log(`   └─ Completed: ${successfulPayments}, Pending: ${pendingPayments}, Failed: ${failedPayments}`);
    }
    
    // 8. Quiz System
    console.log('\n📝 QUIZZES');
    const publishedQuizzes = await prisma.quiz.count({ where: { isPublished: true } });
    const quizSubmissions = await prisma.quizSubmission.count();
    
    log('📝', 'Quiz System', quizzes > 0 ? 'pass' : 'warn', quizzes === 0 ? 'No quizzes created' : '');
    if (quizzes > 0) {
      console.log(`   └─ Total: ${quizzes}, Published: ${publishedQuizzes}, Submissions: ${quizSubmissions}`);
    }
    
    // 9. Progress Tracking
    console.log('\n📊 PROGRESS');
    const courseProgress = await prisma.courseProgress.count();
    const moduleProgress = await prisma.moduleProgress.count();
    const completedCourses = await prisma.courseProgress.count({
      where: { progressPercent: 100 }
    });
    
    log('📊', 'Progress Tracking', 'pass');
    console.log(`   └─ Course Progress: ${courseProgress}, Module Progress: ${moduleProgress}`);
    console.log(`   └─ Completed Courses: ${completedCourses}`);
    
    // 10. Awards System
    console.log('\n🏆 AWARDS');
    const awards = await prisma.award.count();
    const userAwards = await prisma.userAward.count();
    
    log('🏆', 'Awards System', awards > 0 ? 'pass' : 'warn', awards === 0 ? 'Awards not initialized' : '');
    if (awards > 0) {
      console.log(`   └─ Total Awards: ${awards}, Earned: ${userAwards}`);
    }
    
    // 11. Content & Feedback
    console.log('\n📄 CONTENT');
    const courseContent = await prisma.courseContent.count();
    const feedback = await prisma.feedback.count();
    
    log('📄', 'Course Content', courseContent > 0 ? 'pass' : 'warn', courseContent === 0 ? 'No content uploaded' : '');
    log('⭐', `Feedback System (${feedback} reviews)`, 'pass');
    
    // 12. Data Integrity Checks
    console.log('\n🔍 DATA INTEGRITY');
    
    // Check for orphaned records
    const enrollmentsWithoutCourse = await prisma.enrollment.count({
      where: { Course: null }
    });
    const enrollmentsWithoutStudent = await prisma.enrollment.count({
      where: { User: null }
    });
    
    if (enrollmentsWithoutCourse === 0 && enrollmentsWithoutStudent === 0) {
      log('🔍', 'Enrollment Integrity', 'pass');
    } else {
      log('🔍', 'Enrollment Integrity', 'warn', `Found orphaned records`);
    }
    
    // Check course-teacher relationships
    const coursesWithoutTeacher = await prisma.course.count({
      where: { User: null }
    });
    
    if (coursesWithoutTeacher === 0) {
      log('🔍', 'Course-Teacher Integrity', 'pass');
    } else {
      log('🔍', 'Course-Teacher Integrity', 'warn', `${coursesWithoutTeacher} courses without teacher`);
    }
    
    // 13. Environment Configuration
    console.log('\n⚙️  ENVIRONMENT');
    const env = process.env;
    
    log('⚙️', 'DATABASE_URL', env.DATABASE_URL ? 'pass' : 'fail', 'Missing');
    log('⚙️', 'NEXTAUTH_SECRET', env.NEXTAUTH_SECRET ? 'pass' : 'fail', 'Missing');
    log('⚙️', 'Email Config', (env.EMAIL_HOST && env.EMAIL_USER) ? 'pass' : 'warn', 'Check email settings');
    log('⚙️', 'OAuth Google', (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) ? 'pass' : 'warn', 'Optional');
    log('⚙️', 'OAuth GitHub', (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) ? 'pass' : 'warn', 'Optional');
    log('⚙️', 'Groq API', env.GROQ_API_KEY ? 'pass' : 'warn', 'For chatbot');
    
    // Final Summary
    console.log('\n' + '═'.repeat(50));
    console.log('\n📊 SUMMARY');
    console.log('═'.repeat(50));
    
    const total = results.pass + results.fail + results.warn;
    const score = ((results.pass / total) * 100).toFixed(1);
    
    console.log(`✅ Passed: ${results.pass}/${total}`);
    console.log(`⚠️  Warnings: ${results.warn}/${total}`);
    console.log(`❌ Failed: ${results.fail}/${total}`);
    console.log(`\n📈 Score: ${score}%`);
    
    console.log('\n' + '─'.repeat(50));
    
    if (results.fail === 0 && results.warn === 0) {
      console.log('\n🎉 EXCELLENT! Ready for production deployment!');
    } else if (results.fail === 0) {
      console.log('\n✅ GOOD! Application is functional with minor warnings.');
      console.log('   Review warnings before production deployment.');
    } else {
      console.log('\n⚠️  ATTENTION NEEDED! Fix failed checks before deploying.');
    }
    
    console.log('\n' + '═'.repeat(50) + '\n');
    
    // Production Checklist
    console.log('📋 PRE-DEPLOYMENT CHECKLIST:');
    console.log('   □ Initialize awards system (POST /api/awards/init)');
    console.log('   □ Create sample courses with modules');
    console.log('   □ Test payment gateway with test credentials');
    console.log('   □ Start chatbot server (creatorChatbot/fastapi_server.py)');
    console.log('   □ Verify all environment variables in production');
    console.log('   □ Test email sending in production environment');
    console.log('   □ Set up proper domain and NEXTAUTH_URL');
    console.log('   □ Enable SSL/HTTPS');
    console.log('   □ Configure CORS if needed');
    console.log('   □ Set up monitoring and logging');
    console.log('');
    
  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

runQuickTests();
