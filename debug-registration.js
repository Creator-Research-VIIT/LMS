// Quick test script to debug registration issue
const testRegistration = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role: "STUDENT"
  };

  try {
    console.log('🧪 Testing registration API...');
    console.log('📤 Sending data:', testData);
    
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📥 Raw response:', responseText);
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('📥 Parsed response:', responseJson);
    } catch (parseError) {
      console.log('❌ Failed to parse JSON:', parseError.message);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

testRegistration();