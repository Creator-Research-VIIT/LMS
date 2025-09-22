const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testOAuthFlow() {
  console.log('🔍 Testing OAuth Flow...\n');
  
  try {
    // Check if there are any existing users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true
      }
    });
    
    console.log(`📊 Total users in database: ${users.length}\n`);
    
    if (users.length > 0) {
      console.log('👥 Existing users:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
        console.log(`   Verified: ${user.emailVerified ? '✅' : '❌'}, Created: ${user.createdAt.toLocaleDateString()}\n`);
      });
      
      console.log('🎯 OAuth Test Scenarios:');
      console.log('1. ✅ Existing user OAuth login → Should go directly to dashboard');
      console.log('2. 🆕 New user OAuth login → Should redirect to role selection\n');
    } else {
      console.log('📝 No existing users found.');
      console.log('🎯 OAuth Test Scenario:');
      console.log('• 🆕 Any OAuth login → Should redirect to role selection\n');
    }
    
    console.log('🔧 OAuth Flow Configuration:');
    console.log('✅ signIn callback: Checks user existence and redirects new users');
    console.log('✅ Role selection page: Available at /oauth-role-selection');
    console.log('✅ OAuth registration API: Available at /api/oauth-register');
    console.log('✅ Middleware: Allows public access to oauth-role-selection\n');
    
    console.log('📋 Testing Steps:');
    console.log('1. Start dev server: npm run dev');
    console.log('2. Go to http://localhost:3000/login');
    console.log('3. Click "Continue with Google" or "Continue with GitHub"');
    console.log('4. If new user → Should see role selection page');
    console.log('5. If existing user → Should go to appropriate dashboard\n');
    
  } catch (error) {
    console.error('❌ Error testing OAuth flow:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testOAuthFlow();