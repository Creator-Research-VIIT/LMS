/**
 * Manual User Verification Utility
 * Use this to manually verify users or generate new OTPs
 */

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

// Configuration
const ACTION = process.argv[2]; // 'verify', 'generate-otp', 'list-unverified'
const EMAIL = process.argv[3]; // User email

async function manualVerification() {
  console.log('\n🔧 Manual User Verification Utility\n');
  console.log('═'.repeat(60));

  try {
    if (!ACTION) {
      console.log('\nUsage:');
      console.log('  node manual-verify.js list-unverified');
      console.log('  node manual-verify.js verify <email>');
      console.log('  node manual-verify.js generate-otp <email>');
      console.log('\nExamples:');
      console.log('  node manual-verify.js list-unverified');
      console.log('  node manual-verify.js verify test@example.com');
      console.log('  node manual-verify.js generate-otp test@example.com\n');
      return;
    }

    // List Unverified Users
    if (ACTION === 'list-unverified') {
      console.log('\n📋 Unverified Users:\n');
      
      const unverified = await prisma.user.findMany({
        where: { emailVerified: null },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      });

      if (unverified.length === 0) {
        console.log('   ✅ All users are verified!\n');
        return;
      }

      unverified.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Registered: ${user.createdAt.toLocaleDateString()}`);
        console.log('');
      });

      console.log(`Total unverified: ${unverified.length}\n`);
      return;
    }

    // Verify User Manually
    if (ACTION === 'verify') {
      if (!EMAIL) {
        console.log('\n❌ Please provide email address\n');
        console.log('Usage: node manual-verify.js verify <email>\n');
        return;
      }

      const user = await prisma.user.findUnique({
        where: { email: EMAIL }
      });

      if (!user) {
        console.log(`\n❌ User not found: ${EMAIL}\n`);
        return;
      }

      if (user.emailVerified) {
        console.log(`\n✅ ${user.name} is already verified!\n`);
        return;
      }

      // Manually verify user
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });

      // Mark all OTPs as used
      await prisma.emailVerification.updateMany({
        where: { userId: user.id, used: false },
        data: { used: true }
      });

      console.log(`\n✅ Successfully verified: ${user.name} (${EMAIL})`);
      console.log(`   User can now login!\n`);
      return;
    }

    // Generate New OTP
    if (ACTION === 'generate-otp') {
      if (!EMAIL) {
        console.log('\n❌ Please provide email address\n');
        console.log('Usage: node manual-verify.js generate-otp <email>\n');
        return;
      }

      const user = await prisma.user.findUnique({
        where: { email: EMAIL }
      });

      if (!user) {
        console.log(`\n❌ User not found: ${EMAIL}\n`);
        return;
      }

      if (user.emailVerified) {
        console.log(`\n⚠️  ${user.name} is already verified!\n`);
        return;
      }

      // Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

      // Delete old OTPs
      await prisma.emailVerification.deleteMany({
        where: { userId: user.id, used: false }
      });

      // Create new OTP
      await prisma.emailVerification.create({
        data: {
          userId: user.id,
          email: user.email,
          otp: otp,
          expiresAt
        }
      });

      console.log(`\n✅ New OTP Generated for: ${user.name}`);
      console.log(`   Email: ${EMAIL}`);
      console.log(`   OTP: ${otp}`);
      console.log(`   User ID: ${user.id}`);
      console.log(`   Expires: ${expiresAt.toLocaleString()}`);
      console.log(`\n   📝 User can verify with:`);
      console.log(`   POST /api/auth/verify-email`);
      console.log(`   Body: { "userId": "${user.id}", "otp": "${otp}" }\n`);
      return;
    }

    console.log(`\n❌ Unknown action: ${ACTION}\n`);
    console.log('Valid actions: list-unverified, verify, generate-otp\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

manualVerification();
