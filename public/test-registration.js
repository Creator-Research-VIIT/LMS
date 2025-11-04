// Test registration functionality
const testRegistration = async () => {
  const testData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123", 
    role: "STUDENT"
  };

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful:', result);
      alert('Registration successful! Check console for details.');
    } else {
      console.error('❌ Registration failed:', result);
      alert('Registration failed: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    alert('Network error: ' + error.message);
  }
};

// Add a button to test
const button = document.createElement('button');
button.textContent = 'Test Registration API';
button.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 4px;';
button.onclick = testRegistration;
document.body.appendChild(button);

console.log('🧪 Registration test button added to page');