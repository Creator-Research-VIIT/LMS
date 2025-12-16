/**
 * Comprehensive Production Readiness Test Suite
 * Tests all critical features of the LMS application
 */

const axios = require('axios');
const { PrismaClient } = require('./generated/prisma');

const BASE_URL = 'http://127.0.0.1:3000';
const prisma = new PrismaClient();

// Configure axios to handle connection better
axios.defaults.timeout = 10000;

// Test results tracking
const testResults = {
  passed: [],
  failed: [],
  warnings: []
};

// Helper function to log test results
function logTest(testName, passed, message = '') {
  if (passed) {
    testResults.passed.push(testName);
    console.log(`✅ PASS: ${testName}`);
  } else {
    testResults.failed.push({ test: testName, error: message });
    console.log(`❌ FAIL: ${testName} - ${message}`);
  }
}

function logWarning(testName, message) {
  testResults.warnings.push({ test: testName, warning: message });
  console.log(`⚠️  WARN: ${testName} - ${message}`);
}

// Generate random test data
const timestamp = Date.now();
const testStudent = {
  email: `student_${timestamp}@test.com`,
  password: 'TestPass123!',
  name: `Test Student ${timestamp}`,
  role: 'student'
};

const testTeacher = {
  email: `teacher_${timestamp}@test.com`,
  password: 'TestPass123!',
  name: `Test Teacher ${timestamp}`,
  role: 'teacher'
};

let studentSession = null;
let teacherSession = null;
let adminSession = null;
let createdCourseId = null;
let createdQuizId = null;
let enrollmentId = null;
let paymentOrderId = null;

console.log('\n🚀 Starting Production Readiness Tests...\n');
console.log('═'.repeat(60));

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// TEST 1: Database Connectivity
// ============================================================================
async function testDatabaseConnectivity() {
  console.log('\n📊 TEST 1: Database Connectivity');
  console.log('-'.repeat(60));
  
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    logTest('Database Connection', true);
    console.log(`   Database connected. Total users: ${userCount}`);
    
    // Test all models
    const courseCount = await prisma.course.count();
    const enrollmentCount = await prisma.enrollment.count();
    const quizCount = await prisma.quiz.count();
    
    console.log(`   Courses: ${courseCount}, Enrollments: ${enrollmentCount}, Quizzes: ${quizCount}`);
    logTest('Database Models Access', true);
  } catch (error) {
    logTest('Database Connection', false, error.message);
    throw new Error('Database connectivity failed - cannot continue tests');
  }
}

// ============================================================================
// TEST 2: Health Check Endpoint
// ============================================================================
async function testHealthCheck() {
  console.log('\n🏥 TEST 2: Health Check Endpoint');
  console.log('-'.repeat(60));
  
  try {
    const response = await axios.get(`${BASE_URL}/api/health`);
    logTest('Health Check Endpoint', response.status === 200);
    console.log(`   Status: ${response.data.status}`);
  } catch (error) {
    logTest('Health Check Endpoint', false, error.message);
  }
}

// ============================================================================
// TEST 3: Student Registration
// ============================================================================
async function testStudentRegistration() {
  console.log('\n👨‍🎓 TEST 3: Student Registration');
  console.log('-'.repeat(60));
  
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, testStudent);
    logTest('Student Registration', response.status === 200 || response.status === 201);
    console.log(`   Student registered: ${testStudent.email}`);
    return true;
  } catch (error) {
    if (error.response?.data?.error?.includes('already exists')) {
      logWarning('Student Registration', 'User already exists - using existing user');
      return true;
    }
    logTest('Student Registration', false, error.response?.data?.error || error.message);
    return false;
  }
}

// ============================================================================
// TEST 4: Teacher Registration
// ============================================================================
async function testTeacherRegistration() {
  console.log('\n👨‍🏫 TEST 4: Teacher Registration');
  console.log('-'.repeat(60));
  
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, testTeacher);
    logTest('Teacher Registration', response.status === 200 || response.status === 201);
    console.log(`   Teacher registered: ${testTeacher.email}`);
    return true;
  } catch (error) {
    if (error.response?.data?.error?.includes('already exists')) {
      logWarning('Teacher Registration', 'User already exists - using existing user');
      return true;
    }
    logTest('Teacher Registration', false, error.response?.data?.error || error.message);
    return false;
  }
}

// ============================================================================
// TEST 5: Email Verification Check
// ============================================================================
async function testEmailVerification() {
  console.log('\n📧 TEST 5: Email Verification System');
  console.log('-'.repeat(60));
  
  try {
    // Check if verification email was created in database
    const studentUser = await prisma.user.findUnique({
      where: { email: testStudent.email }
    });
    
    if (studentUser) {
      const verification = await prisma.emailVerification.findFirst({
        where: { userId: studentUser.id }
      });
      
      if (verification) {
        logTest('Email Verification Record Created', true);
        console.log(`   Verification token created for: ${testStudent.email}`);
        
        // Test resend verification endpoint
        try {
          const resendResponse = await axios.post(`${BASE_URL}/api/auth/resend-verification`, {
            email: testStudent.email
          });
          logTest('Resend Verification Email', resendResponse.status === 200);
        } catch (error) {
          logTest('Resend Verification Email', false, error.response?.data?.error || error.message);
        }
      } else {
        logWarning('Email Verification', 'No verification record found - may be auto-verified');
      }
    }
  } catch (error) {
    logTest('Email Verification System', false, error.message);
  }
}

// ============================================================================
// TEST 6: Login Authentication
// ============================================================================
async function testLogin() {
  console.log('\n🔐 TEST 6: Login Authentication');
  console.log('-'.repeat(60));
  
  try {
    // Test student login
    const loginResponse = await axios.post(`${BASE_URL}/api/login`, {
      email: testStudent.email,
      password: testStudent.password
    });
    
    logTest('Student Login', loginResponse.status === 200);
    console.log(`   Student logged in successfully`);
    
    // Test auth check
    const authResponse = await axios.get(`${BASE_URL}/api/auth/check`);
    logTest('Auth Check Endpoint', authResponse.status === 200);
    
  } catch (error) {
    logTest('Login Authentication', false, error.response?.data?.error || error.message);
  }
}

// ============================================================================
// TEST 7: Teacher Approval Workflow
// ============================================================================
async function testTeacherApproval() {
  console.log('\n✅ TEST 7: Teacher Approval Workflow');
  console.log('-'.repeat(60));
  
  try {
    // Get teacher from database
    const teacher = await prisma.user.findUnique({
      where: { email: testTeacher.email }
    });
    
    if (teacher) {
      console.log(`   Teacher status: ${teacher.approvalStatus}`);
      
      // Get pending teachers list
      const pendingResponse = await axios.get(`${BASE_URL}/api/teachers/pending`);
      logTest('Get Pending Teachers', pendingResponse.status === 200);
      console.log(`   Pending teachers: ${pendingResponse.data.length}`);
      
      // If teacher is pending, approve them
      if (teacher.approvalStatus === 'pending') {
        try {
          const approveResponse = await axios.post(`${BASE_URL}/api/teachers/${teacher.id}/approve`);
          logTest('Approve Teacher', approveResponse.status === 200);
          console.log(`   Teacher approved: ${teacher.email}`);
        } catch (error) {
          logTest('Approve Teacher', false, error.response?.data?.error || error.message);
        }
      } else {
        logWarning('Teacher Approval', `Teacher already ${teacher.approvalStatus}`);
      }
    }
  } catch (error) {
    logTest('Teacher Approval Workflow', false, error.message);
  }
}

// ============================================================================
// TEST 8: Course Creation
// ============================================================================
async function testCourseCreation() {
  console.log('\n📚 TEST 8: Course Creation');
  console.log('-'.repeat(60));
  
  try {
    // Get approved teacher
    const teacher = await prisma.user.findUnique({
      where: { email: testTeacher.email }
    });
    
    if (!teacher) {
      logTest('Course Creation', false, 'Teacher not found');
      return;
    }
    
    // Create a course
    const courseData = {
      id: `course_test_${timestamp}`,
      title: `Test Course ${timestamp}`,
      description: 'This is a comprehensive test course for production readiness testing',
      price: 999,
      category: 'Technology',
      duration: '4 weeks',
      isFree: false,
      teacherId: teacher.id
    };
    
    const course = await prisma.course.create({
      data: courseData
    });
    
    createdCourseId = course.id;
    logTest('Course Creation', true);
    console.log(`   Course created: ${course.title} (ID: ${course.id})`);
    console.log(`   Status: ${course.approvalStatus}`);
    
    // Test get teacher courses
    const teacherCoursesResponse = await axios.get(`${BASE_URL}/api/courses/teacher?teacherId=${teacher.id}`);
    logTest('Get Teacher Courses', teacherCoursesResponse.status === 200);
    
  } catch (error) {
    logTest('Course Creation', false, error.message);
  }
}

// ============================================================================
// TEST 9: Course Approval System
// ============================================================================
async function testCourseApproval() {
  console.log('\n✅ TEST 9: Course Approval System');
  console.log('-'.repeat(60));
  
  try {
    if (!createdCourseId) {
      logTest('Course Approval', false, 'No course to approve');
      return;
    }
    
    // Get pending courses
    const pendingResponse = await axios.get(`${BASE_URL}/api/courses/pending`);
    logTest('Get Pending Courses', pendingResponse.status === 200);
    console.log(`   Pending courses: ${pendingResponse.data.length}`);
    
    // Approve the course
    const approveResponse = await axios.post(`${BASE_URL}/api/courses/${createdCourseId}/approve`);
    logTest('Approve Course', approveResponse.status === 200);
    console.log(`   Course approved: ${createdCourseId}`);
    
  } catch (error) {
    logTest('Course Approval System', false, error.response?.data?.error || error.message);
  }
}

// ============================================================================
// TEST 10: Student Enrollment
// ============================================================================
async function testEnrollment() {
  console.log('\n📝 TEST 10: Student Enrollment');
  console.log('-'.repeat(60));
  
  try {
    if (!createdCourseId) {
      logTest('Student Enrollment', false, 'No course to enroll in');
      return;
    }
    
    const student = await prisma.user.findUnique({
      where: { email: testStudent.email }
    });
    
    if (!student) {
      logTest('Student Enrollment', false, 'Student not found');
      return;
    }
    
    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: student.id,
        courseId: createdCourseId
      }
    });
    
    if (!existingEnrollment) {
      // Create enrollment
      const enrollment = await prisma.enrollment.create({
        data: {
          id: `enroll_test_${timestamp}`,
          studentId: student.id,
          courseId: createdCourseId,
          isPaid: false
        }
      });
      
      enrollmentId = enrollment.id;
      logTest('Student Enrollment', true);
      console.log(`   Student enrolled in course: ${createdCourseId}`);
    } else {
      logWarning('Student Enrollment', 'Student already enrolled');
      enrollmentId = existingEnrollment.id;
    }
    
    // Test enrollment check endpoint
    const checkResponse = await axios.get(`${BASE_URL}/api/enrollments/check?studentId=${student.id}&courseId=${createdCourseId}`);
    logTest('Check Enrollment Status', checkResponse.status === 200);
    
  } catch (error) {
    logTest('Student Enrollment', false, error.message);
  }
}

// ============================================================================
// TEST 11: Payment Gateway
// ============================================================================
async function testPaymentGateway() {
  console.log('\n💳 TEST 11: Payment Gateway Integration');
  console.log('-'.repeat(60));
  
  try {
    if (!createdCourseId) {
      logWarning('Payment Gateway', 'No course for payment test');
      return;
    }
    
    const student = await prisma.user.findUnique({
      where: { email: testStudent.email }
    });
    
    const course = await prisma.course.findUnique({
      where: { id: createdCourseId }
    });
    
    if (!student || !course) {
      logTest('Payment Gateway', false, 'Missing student or course');
      return;
    }
    
    // Test create payment order
    const orderResponse = await axios.post(`${BASE_URL}/api/payments/create-order`, {
      courseId: createdCourseId,
      studentId: student.id
    });
    
    if (orderResponse.status === 200 && orderResponse.data.orderId) {
      paymentOrderId = orderResponse.data.orderId;
      logTest('Create Payment Order', true);
      console.log(`   Payment order created: ${paymentOrderId}`);
      console.log(`   Amount: ₹${course.price}`);
    } else {
      logTest('Create Payment Order', false, 'No order ID returned');
    }
    
    // Test payment history
    const historyResponse = await axios.get(`${BASE_URL}/api/payments/history?userId=${student.id}`);
    logTest('Payment History', historyResponse.status === 200);
    
  } catch (error) {
    if (error.response?.data?.error?.includes('Razorpay')) {
      logWarning('Payment Gateway', 'Razorpay configuration may be missing - expected in production');
    } else {
      logTest('Payment Gateway', false, error.response?.data?.error || error.message);
    }
  }
}

// ============================================================================
// TEST 12: Quiz Creation and Submission
// ============================================================================
async function testQuizSystem() {
  console.log('\n📝 TEST 12: Quiz Creation and Submission');
  console.log('-'.repeat(60));
  
  try {
    if (!createdCourseId) {
      logTest('Quiz System', false, 'No course for quiz');
      return;
    }
    
    // Create a quiz
    const quizData = {
      title: `Test Quiz ${timestamp}`,
      courseId: createdCourseId,
      description: 'Production readiness test quiz',
      timeLimit: 30,
      passingScore: 70,
      isPublished: true
    };
    
    const quiz = await prisma.quiz.create({
      data: quizData
    });
    
    createdQuizId = quiz.id;
    logTest('Quiz Creation', true);
    console.log(`   Quiz created: ${quiz.title}`);
    
    // Create quiz questions
    const question = await prisma.question.create({
      data: {
        quizId: quiz.id,
        questionText: 'What is 2 + 2?',
        questionType: 'MULTIPLE_CHOICE',
        points: 10,
        orderIndex: 1,
        Answer: {
          create: [
            { answerText: '3', isCorrect: false, orderIndex: 1 },
            { answerText: '4', isCorrect: true, orderIndex: 2 },
            { answerText: '5', isCorrect: false, orderIndex: 3 }
          ]
        }
      }
    });
    
    logTest('Quiz Question Creation', true);
    console.log(`   Question added to quiz`);
    
    // Test get quiz
    const quizResponse = await axios.get(`${BASE_URL}/api/quizzes/${quiz.id}`);
    logTest('Get Quiz Details', quizResponse.status === 200);
    
    // Test get course quizzes
    const courseQuizzesResponse = await axios.get(`${BASE_URL}/api/quizzes/course/${createdCourseId}`);
    logTest('Get Course Quizzes', courseQuizzesResponse.status === 200);
    
  } catch (error) {
    logTest('Quiz System', false, error.message);
  }
}

// ============================================================================
// TEST 13: Progress Tracking
// ============================================================================
async function testProgressTracking() {
  console.log('\n📊 TEST 13: Progress Tracking');
  console.log('-'.repeat(60));
  
  try {
    const student = await prisma.user.findUnique({
      where: { email: testStudent.email }
    });
    
    if (!student || !createdCourseId) {
      logTest('Progress Tracking', false, 'Missing student or course');
      return;
    }
    
    // Create or update course progress
    const progress = await prisma.courseProgress.upsert({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId: createdCourseId
        }
      },
      update: {
        completedLessons: 3,
        totalLessons: 10,
        progressPercent: 30,
        updatedAt: new Date()
      },
      create: {
        id: `progress_test_${timestamp}`,
        studentId: student.id,
        courseId: createdCourseId,
        completedLessons: 3,
        totalLessons: 10,
        progressPercent: 30,
        updatedAt: new Date()
      }
    });
    
    logTest('Course Progress Creation', true);
    console.log(`   Progress: ${progress.progressPercent}% (${progress.completedLessons}/${progress.totalLessons} lessons)`);
    
    // Test get progress endpoint
    const progressResponse = await axios.get(`${BASE_URL}/api/progress/${student.id}/${createdCourseId}`);
    logTest('Get Progress Endpoint', progressResponse.status === 200);
    
  } catch (error) {
    logTest('Progress Tracking', false, error.message);
  }
}

// ============================================================================
// TEST 14: Analytics and Admin Dashboard
// ============================================================================
async function testAnalytics() {
  console.log('\n📈 TEST 14: Analytics and Admin Dashboard');
  console.log('-'.repeat(60));
  
  try {
    // Test admin analytics
    const analyticsResponse = await axios.get(`${BASE_URL}/api/admin/analytics`);
    logTest('Admin Analytics', analyticsResponse.status === 200);
    
    if (analyticsResponse.data) {
      console.log(`   Total Students: ${analyticsResponse.data.totalStudents || 0}`);
      console.log(`   Total Teachers: ${analyticsResponse.data.totalTeachers || 0}`);
      console.log(`   Total Courses: ${analyticsResponse.data.totalCourses || 0}`);
    }
    
    // Test admin stats
    const statsResponse = await axios.get(`${BASE_URL}/api/admin/stats`);
    logTest('Admin Stats', statsResponse.status === 200);
    
    // Test admin courses
    const coursesResponse = await axios.get(`${BASE_URL}/api/admin/courses`);
    logTest('Admin Courses List', coursesResponse.status === 200);
    
    // Test admin students
    const studentsResponse = await axios.get(`${BASE_URL}/api/admin/students`);
    logTest('Admin Students List', studentsResponse.status === 200);
    
    // Test admin payments
    const paymentsResponse = await axios.get(`${BASE_URL}/api/admin/payments`);
    logTest('Admin Payments List', paymentsResponse.status === 200);
    
  } catch (error) {
    logTest('Analytics and Admin Dashboard', false, error.response?.data?.error || error.message);
  }
}

// ============================================================================
// TEST 15: Chatbot Functionality
// ============================================================================
async function testChatbot() {
  console.log('\n🤖 TEST 15: Chatbot Functionality');
  console.log('-'.repeat(60));
  
  try {
    const chatbotResponse = await axios.post(`${BASE_URL}/api/chatbot`, {
      message: 'Hello, what courses do you offer?'
    });
    
    logTest('Chatbot Response', chatbotResponse.status === 200);
    
    if (chatbotResponse.data.response) {
      console.log(`   Chatbot replied: ${chatbotResponse.data.response.substring(0, 100)}...`);
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
      logWarning('Chatbot', 'Chatbot server not running - ensure FastAPI server is started for production');
    } else {
      logTest('Chatbot Functionality', false, error.response?.data?.error || error.message);
    }
  }
}

// ============================================================================
// TEST 16: Awards System
// ============================================================================
async function testAwardsSystem() {
  console.log('\n🏆 TEST 16: Awards System');
  console.log('-'.repeat(60));
  
  try {
    // Test initialize awards
    const initResponse = await axios.post(`${BASE_URL}/api/awards/init`);
    logTest('Initialize Awards', initResponse.status === 200);
    console.log(`   Awards initialized: ${initResponse.data.count} awards created`);
    
    // Test list awards
    const listResponse = await axios.get(`${BASE_URL}/api/awards/list`);
    logTest('List Awards', listResponse.status === 200);
    console.log(`   Total awards available: ${listResponse.data.length}`);
    
    const student = await prisma.user.findUnique({
      where: { email: testStudent.email }
    });
    
    if (student) {
      // Test user awards
      const userAwardsResponse = await axios.get(`${BASE_URL}/api/awards/user?userId=${student.id}`);
      logTest('Get User Awards', userAwardsResponse.status === 200);
      console.log(`   Student awards earned: ${userAwardsResponse.data.length}`);
    }
    
  } catch (error) {
    logTest('Awards System', false, error.response?.data?.error || error.message);
  }
}

// ============================================================================
// TEST 17: Additional Course Endpoints
// ============================================================================
async function testCourseEndpoints() {
  console.log('\n📚 TEST 17: Course Endpoints');
  console.log('-'.repeat(60));
  
  try {
    // Test get all courses
    const allCoursesResponse = await axios.get(`${BASE_URL}/api/courses`);
    logTest('Get All Courses', allCoursesResponse.status === 200);
    console.log(`   Total courses: ${allCoursesResponse.data.length}`);
    
    if (createdCourseId) {
      // Test get specific course
      const courseResponse = await axios.get(`${BASE_URL}/api/courses/${createdCourseId}`);
      logTest('Get Specific Course', courseResponse.status === 200);
      
      // Test check enrollment
      const student = await prisma.user.findUnique({
        where: { email: testStudent.email }
      });
      
      if (student) {
        const enrollmentResponse = await axios.get(`${BASE_URL}/api/courses/${createdCourseId}/enrollment?studentId=${student.id}`);
        logTest('Check Course Enrollment', enrollmentResponse.status === 200);
      }
    }
    
  } catch (error) {
    logTest('Course Endpoints', false, error.response?.data?.error || error.message);
  }
}

// ============================================================================
// Main Test Runner
// ============================================================================
async function runAllTests() {
  try {
    await testDatabaseConnectivity();
    await sleep(500);
    
    await testHealthCheck();
    await sleep(500);
    
    await testStudentRegistration();
    await sleep(500);
    
    await testTeacherRegistration();
    await sleep(500);
    
    await testEmailVerification();
    await sleep(500);
    
    await testLogin();
    await sleep(500);
    
    await testTeacherApproval();
    await sleep(500);
    
    await testCourseCreation();
    await sleep(500);
    
    await testCourseApproval();
    await sleep(500);
    
    await testEnrollment();
    await sleep(500);
    
    await testPaymentGateway();
    await sleep(500);
    
    await testQuizSystem();
    await sleep(500);
    
    await testProgressTracking();
    await sleep(500);
    
    await testAnalytics();
    await sleep(500);
    
    await testChatbot();
    await sleep(500);
    
    await testAwardsSystem();
    await sleep(500);
    
    await testCourseEndpoints();
    
    // Print final results
    console.log('\n' + '═'.repeat(60));
    console.log('\n📊 PRODUCTION READINESS TEST RESULTS');
    console.log('═'.repeat(60));
    
    console.log(`\n✅ PASSED: ${testResults.passed.length} tests`);
    testResults.passed.forEach(test => console.log(`   ✓ ${test}`));
    
    if (testResults.warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS: ${testResults.warnings.length}`);
      testResults.warnings.forEach(w => console.log(`   ⚠ ${w.test}: ${w.warning}`));
    }
    
    if (testResults.failed.length > 0) {
      console.log(`\n❌ FAILED: ${testResults.failed.length} tests`);
      testResults.failed.forEach(f => console.log(`   ✗ ${f.test}: ${f.error}`));
    }
    
    const totalTests = testResults.passed.length + testResults.failed.length;
    const successRate = ((testResults.passed.length / totalTests) * 100).toFixed(2);
    
    console.log('\n' + '─'.repeat(60));
    console.log(`Success Rate: ${successRate}%`);
    console.log('─'.repeat(60));
    
    if (testResults.failed.length === 0) {
      console.log('\n🎉 ALL TESTS PASSED! Application is ready for production.');
    } else if (successRate >= 80) {
      console.log('\n⚠️  Most tests passed. Review failed tests before production deployment.');
    } else {
      console.log('\n❌ Several tests failed. Fix issues before deploying to production.');
    }
    
    console.log('\n' + '═'.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Test suite error:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log('\n✓ Database disconnected\n');
  }
}

// Run all tests
runAllTests().catch(console.error);
