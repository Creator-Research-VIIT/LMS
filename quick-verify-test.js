const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
const USER_ID = 'cmj8hqmhi0000c3o86sbqbw9e';
const OTP = '807650';

async function quickVerify() {
  try {
    console.log('\n🔐 Verifying User...\n');
    
    const response = await axios.post(`${BASE_URL}/api/auth/verify-email`, {
      userId: USER_ID,
      otp: OTP
    });

    console.log('✅ SUCCESS!');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');
    
  } catch (error) {
    console.log('❌ FAILED!');
    console.log(error.response?.data || error.message);
    console.log('');
  }
}

quickVerify();
