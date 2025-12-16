/**
 * OTP Email Verification Test Suite
 * Tests the complete email verification workflow
 */

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function testOTPVerification() {
  console.log('\n🧪 Testing OTP Email Verification System\n');
  console.log('═'.repeat(60));

  try {
    // Test 1: Check Email Verification System Setup
    console.log('\n1️⃣  Email Verification System Check');
    console.log('-'.repeat(60));
    
    const totalVerifications = await prisma.emailVerification.count();
    const unusedVerifications = await prisma.emailVerification.count({
      where: { used: false }
    });
    const expiredVerifications = await prisma.emailVerification.count({
      where: {
        used: false,
        expiresAt: { lt: new Date() }
      }
    });

    console.log(`   Total Verification Records: ${totalVerifications}`);
    console.log(`   Unused OTPs: ${unusedVerifications}`);
    console.log(`   Expired OTPs: ${expiredVerifications}`);

    // Test 2: Check Unverified Users
    console.log('\n2️⃣  Unverified Users');
    console.log('-'.repeat(60));
    
    const unverifiedUsers = await prisma.user.findMany({
      where: { emailVerified: null },
      include: {
        EmailVerification: {
          where: { used: false },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      take: 5
    });

    if (unverifiedUsers.length > 0) {
      console.log(`   Found ${unverifiedUsers.length} unverified users:\n`);
      
      for (const user of unverifiedUsers) {
        console.log(`   📧 ${user.name} (${user.email})`);
        console.log(`      Role: ${user.role}`);
        console.log(`      Created: ${user.createdAt.toLocaleDateString()}`);
        
        if (user.EmailVerification.length > 0) {
          const verification = user.EmailVerification[0];
          const isExpired = new Date(verification.expiresAt) < new Date();
          const timeLeft = Math.floor((new Date(verification.expiresAt) - new Date()) / 1000 / 60);
          
          console.log(`      OTP: ${verification.otp}`);
          console.log(`      Status: ${isExpired ? '❌ Expired' : `✅ Valid (${timeLeft} min left)`}`);
          console.log(`      Expires: ${verification.expiresAt.toLocaleString()}`);
        } else {
          console.log(`      ⚠️  No OTP found - needs resend`);
        }
        console.log('');
      }
    } else {
      console.log('   ✅ All users are verified!');
    }

    // Test 3: Check Verified Users
    console.log('\n3️⃣  Verified Users');
    console.log('-'.repeat(60));
    
    const verifiedUsers = await prisma.user.count({
      where: { emailVerified: { not: null } }
    });
    const totalUsers = await prisma.user.count();
    const verificationRate = totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(1) : 0;

    console.log(`   Verified Users: ${verifiedUsers}/${totalUsers} (${verificationRate}%)`);

    // Test 4: Generate Test OTP
    console.log('\n4️⃣  Test OTP Generation');
    console.log('-'.repeat(60));
    
    // Find a test user or create one
    let testUser = await prisma.user.findFirst({
      where: { 
        email: { contains: 'test' },
        emailVerified: null 
      }
    });

    if (!testUser && unverifiedUsers.length > 0) {
      testUser = unverifiedUsers[0];
    }

    if (testUser) {
      console.log(`   Using test user: ${testUser.email}`);
      
      // Generate new OTP
      const testOTP = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
      
      // Delete old unused OTPs
      await prisma.emailVerification.deleteMany({
        where: { userId: testUser.id, used: false }
      });
      
      // Create new OTP
      const newVerification = await prisma.emailVerification.create({
        data: {
          userId: testUser.id,
          email: testUser.email,
          otp: testOTP,
          expiresAt
        }
      });

      console.log(`   ✅ New OTP Generated: ${testOTP}`);
      console.log(`   Expires: ${expiresAt.toLocaleString()}`);
      console.log(`\n   📝 Test this OTP with:`);
      console.log(`   POST /api/auth/verify-email`);
      console.log(`   Body: { "userId": "${testUser.id}", "otp": "${testOTP}" }`);
    } else {
      console.log('   ℹ️  No test user available');
    }

    // Test 5: Cleanup Expired OTPs
    console.log('\n5️⃣  Cleanup Expired OTPs');
    console.log('-'.repeat(60));
    
    const deletedCount = await prisma.emailVerification.deleteMany({
      where: {
        used: false,
        expiresAt: { lt: new Date() }
      }
    });

    console.log(`   🗑️  Deleted ${deletedCount.count} expired OTP(s)`);

    // Test 6: Email Configuration Check
    console.log('\n6️⃣  Email Configuration');
    console.log('-'.repeat(60));
    
    const emailConfig = {
      host: process.env.EMAIL_HOST || 'Not set',
      port: process.env.EMAIL_PORT || 'Not set',
      user: process.env.EMAIL_USER || 'Not set',
      from: process.env.EMAIL_FROM || 'Not set',
      passConfigured: !!process.env.EMAIL_PASS
    };

    console.log(`   SMTP Host: ${emailConfig.host}`);
    console.log(`   SMTP Port: ${emailConfig.port}`);
    console.log(`   Email User: ${emailConfig.user}`);
    console.log(`   Email From: ${emailConfig.from}`);
    console.log(`   Password: ${emailConfig.passConfigured ? '✅ Configured' : '❌ Not set'}`);

    // Test 7: API Endpoints Test Guide
    console.log('\n7️⃣  API Testing Guide');
    console.log('-'.repeat(60));
    
    console.log('\n   A. Register New User:');
    console.log('   POST /api/register');
    console.log('   Body: {');
    console.log('     "name": "Test User",');
    console.log('     "email": "testuser@example.com",');
    console.log('     "password": "Test123!",');
    console.log('     "role": "STUDENT"');
    console.log('   }');
    console.log('   → OTP will be sent to email (or logged in console)');

    console.log('\n   B. Verify Email with OTP:');
    console.log('   POST /api/auth/verify-email');
    console.log('   Body: {');
    console.log('     "userId": "user_id_from_registration",');
    console.log('     "otp": "123456"');
    console.log('   }');

    console.log('\n   C. Resend OTP:');
    console.log('   POST /api/auth/resend-verification');
    console.log('   Body: {');
    console.log('     "userId": "user_id"');
    console.log('   }');

    // Test 8: Common Issues and Solutions
    console.log('\n8️⃣  Common Issues & Solutions');
    console.log('-'.repeat(60));
    
    const issues = [
      {
        issue: 'OTP not received in email',
        solution: 'Check console logs - OTP is printed if email fails. Verify EMAIL_* env vars.'
      },
      {
        issue: 'OTP expired',
        solution: 'Request new OTP via /api/auth/resend-verification (valid for 30 minutes)'
      },
      {
        issue: 'Invalid OTP error',
        solution: 'OTP is case-sensitive 6-digit number. Check for typos.'
      },
      {
        issue: 'Email already verified',
        solution: 'User already verified. Can proceed to login.'
      },
      {
        issue: 'No verification token found',
        solution: 'Request new OTP via resend endpoint'
      }
    ];

    issues.forEach((item, index) => {
      console.log(`\n   ${index + 1}. ${item.issue}`);
      console.log(`      → ${item.solution}`);
    });

    // Summary
    console.log('\n' + '═'.repeat(60));
    console.log('\n📊 Summary');
    console.log('═'.repeat(60));
    
    const summary = {
      totalUsers,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers,
      activeOTPs: unusedVerifications - expiredVerifications,
      expiredOTPs: expiredVerifications,
      verificationRate: `${verificationRate}%`,
      emailConfigured: emailConfig.passConfigured && emailConfig.host !== 'Not set'
    };

    console.log(`   Total Users: ${summary.totalUsers}`);
    console.log(`   Verified: ${summary.verifiedUsers} (${summary.verificationRate})`);
    console.log(`   Unverified: ${summary.unverifiedUsers}`);
    console.log(`   Active OTPs: ${summary.activeOTPs}`);
    console.log(`   Expired OTPs: ${summary.expiredOTPs} (cleaned up)`);
    console.log(`   Email System: ${summary.emailConfigured ? '✅ Configured' : '⚠️  Check configuration'}`);

    console.log('\n' + '═'.repeat(60));
    
    if (summary.unverifiedUsers > 0) {
      console.log('\n⚠️  Action Required:');
      console.log(`   ${summary.unverifiedUsers} users need email verification`);
      console.log('   Users can request new OTP via resend endpoint');
    } else {
      console.log('\n✅ All users are verified!');
    }

    if (!summary.emailConfigured) {
      console.log('\n⚠️  Email Configuration:');
      console.log('   Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS in .env');
      console.log('   OTPs will be logged to console until email is configured');
    }

    console.log('\n✅ OTP Verification Test Complete!\n');

  } catch (error) {
    console.error('\n❌ Test Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testOTPVerification();
