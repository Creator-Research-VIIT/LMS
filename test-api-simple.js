const https = require('http');

function testEndpoint(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: url,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (method === 'POST') {
      const testData = JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'STUDENT'
      });
      req.write(testData);
    }

    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');

  // Test home page
  console.log('1. Testing Home Page...');
  try {
    const homeResponse = await testEndpoint('/');
    console.log('✅ Home page status:', homeResponse.status);
  } catch (error) {
    console.log('❌ Home page error:', error.message);
  }

  console.log('\n2. Testing Registration API...');
  try {
    const registerResponse = await testEndpoint('/api/register', 'POST');
    console.log('✅ Registration API status:', registerResponse.status);
    console.log('Response:', registerResponse.data.substring(0, 200) + '...');
  } catch (error) {
    console.log('❌ Registration API error:', error.message);
  }

  console.log('\n🎉 API Tests Complete!');
}

runTests();