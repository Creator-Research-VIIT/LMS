require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

console.log('\n🔧 Testing Gmail SMTP Connection...\n');
console.log('📋 Configuration:');
console.log('   Host:', process.env.EMAIL_HOST);
console.log('   Port:', process.env.EMAIL_PORT);
console.log('   User:', process.env.EMAIL_USER);
console.log('   Pass:', process.env.EMAIL_PASS ? `${process.env.EMAIL_PASS.substring(0, 4)}****` : 'NOT SET');
console.log('   Pass Length:', process.env.EMAIL_PASS?.length || 0);
console.log();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('🔄 Verifying SMTP connection...\n');

transporter.verify()
  .then(() => {
    console.log('✅ SUCCESS! Gmail SMTP is working correctly!\n');
    console.log('📧 Now testing actual email send...\n');
    
    return transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from LMS',
      html: '<h1>✅ Email Working!</h1><p>Your Gmail SMTP is configured correctly.</p>',
    });
  })
  .then(() => {
    console.log('✅ TEST EMAIL SENT! Check your inbox:', process.env.EMAIL_USER);
    console.log('\n🎉 Gmail SMTP is fully functional!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ SMTP ERROR:', error.message);
    console.error('\n📝 Error Code:', error.code);
    console.error('\n💡 SOLUTION:\n');
    
    if (error.code === 'EAUTH') {
      console.log('   Your App Password is INVALID or EXPIRED.');
      console.log('\n   📌 Steps to fix:');
      console.log('   1. Go to: https://myaccount.google.com/apppasswords');
      console.log('   2. Login with:', process.env.EMAIL_USER);
      console.log('   3. Create new App Password:');
      console.log('      - App: Mail');
      console.log('      - Device: Other (Custom name) → "LMS Platform"');
      console.log('   4. Copy the 16-character password (e.g., "abcd efgh ijkl mnop")');
      console.log('   5. Remove ALL spaces: "abcdefghijklmnop"');
      console.log('   6. Update .env.local:');
      console.log('      EMAIL_PASS="your_new_password_without_spaces"');
      console.log('   7. Restart this test: node test-gmail-smtp.js');
      console.log('\n   ⚠️ IMPORTANT: You need 2-Factor Authentication enabled!');
      console.log('      Enable at: https://myaccount.google.com/security\n');
    } else {
      console.log('   Check your internet connection and firewall settings.\n');
    }
    
    process.exit(1);
  });
