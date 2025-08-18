const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAuthentication() {
  const baseUrl = 'http://localhost:3000/api';
  
  console.log('🧪 Testing Authentication System...\n');
  
  // Test 1: Register a new student
  console.log('1. Testing User Registration...');
  try {
    const registerResponse = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Student',
        email: 'student@test.com',
        password: 'password123',
        role: 'STUDENT'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Registration Response:', registerData);
    console.log('Status:', registerResponse.status);
  } catch (error) {
    console.log('❌ Registration Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Register a teacher
  console.log('2. Testing Teacher Registration...');
  try {
    const teacherResponse = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Teacher',
        email: 'teacher@test.com',
        password: 'password123',
        role: 'TEACHER'
      })
    });
    
    const teacherData = await teacherResponse.json();
    console.log('✅ Teacher Registration Response:', teacherData);
    console.log('Status:', teacherResponse.status);
  } catch (error) {
    console.log('❌ Teacher Registration Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: Try to register with duplicate email
  console.log('3. Testing Duplicate Email Registration...');
  try {
    const duplicateResponse = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Another Student',
        email: 'student@test.com', // Same email as before
        password: 'password123',
        role: 'STUDENT'
      })
    });
    
    const duplicateData = await duplicateResponse.json();
    console.log('✅ Duplicate Email Response:', duplicateData);
    console.log('Status:', duplicateResponse.status);
  } catch (error) {
    console.log('❌ Duplicate Email Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 4: Test invalid data
  console.log('4. Testing Invalid Data Registration...');
  try {
    const invalidResponse = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'A', // Too short
        email: 'invalid-email', // Invalid email
        password: '123', // Too short
        role: 'INVALID_ROLE' // Invalid role
      })
    });
    
    const invalidData = await invalidResponse.json();
    console.log('✅ Invalid Data Response:', invalidData);
    console.log('Status:', invalidResponse.status);
  } catch (error) {
    console.log('❌ Invalid Data Error:', error.message);
  }
  
  console.log('\n🎉 Authentication Testing Complete!');
}

testAuthentication().catch(console.error);
