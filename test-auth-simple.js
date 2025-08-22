const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSimpleAuth() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing Simple Authentication Flow...\n');
  
  // Test 1: Check if server is running
  console.log('1. 🔍 Checking server status...');
  try {
    const response = await fetch(`${baseUrl}/`);
    if (response.ok) {
      console.log('✅ Server is running on http://localhost:3000');
    } else {
      console.log('❌ Server responded with status:', response.status);
    }
  } catch (error) {
    console.log('❌ Server is not running. Please start with: npm run dev');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Check login page
  console.log('2. 🔍 Checking login page...');
  try {
    const response = await fetch(`${baseUrl}/login`);
    if (response.ok) {
      console.log('✅ Login page is accessible');
    } else {
      console.log('❌ Login page error:', response.status);
    }
  } catch (error) {
    console.log('❌ Login page error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Check signup page
  console.log('3. 🔍 Checking signup page...');
  try {
    const response = await fetch(`${baseUrl}/signup`);
    if (response.ok) {
      console.log('✅ Signup page is accessible');
    } else {
      console.log('❌ Signup page error:', response.status);
    }
  } catch (error) {
    console.log('❌ Signup page error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Check NextAuth session endpoint
  console.log('4. 🔍 Checking NextAuth session...');
  try {
    const response = await fetch(`${baseUrl}/api/auth/session`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ NextAuth session endpoint working');
      console.log('   Session data:', data);
    } else {
      console.log('❌ NextAuth session error:', response.status);
    }
  } catch (error) {
    console.log('❌ NextAuth session error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  console.log('🎉 Simple Authentication Test Complete!');
  console.log('\n📝 Next Steps:');
  console.log('1. Set up a PostgreSQL database (Neon/Supabase recommended)');
  console.log('2. Update DATABASE_URL in .env.local');
  console.log('3. Run: npx prisma db push');
  console.log('4. Test registration and login');
}

testSimpleAuth().catch(console.error);

