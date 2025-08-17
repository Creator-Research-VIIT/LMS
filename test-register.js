// Simple test script for the registration API
const testRegistration = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role: "STUDENT",
    referralCode: "optional-referral-code"
  };

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', result);
  } catch (error) {
    console.error('Error testing registration:', error);
  }
};

// Uncomment the line below to run the test when the server is running
// testRegistration(); 