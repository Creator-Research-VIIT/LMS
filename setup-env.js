const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment variables for NextAuth and PostgreSQL...\n');

// Generate a random secret key
const generateSecret = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const envContent = `# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_db"

# NextAuth.js
NEXTAUTH_SECRET="${generateSecret()}"
NEXTAUTH_URL="http://localhost:3000"

# Optional: For production
# NEXTAUTH_URL="https://your-domain.com"
`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Environment variables created successfully!');
  console.log('📁 File created: .env.local');
  console.log('\n🔑 Generated NEXTAUTH_SECRET for security');
  console.log('🌐 Set NEXTAUTH_URL to http://localhost:3000');
  console.log('🗄️ PostgreSQL connection configured');
  console.log('\n📝 Next steps:');
  console.log('1. Make sure PostgreSQL is running on localhost:5432');
  console.log('2. Create database: lms_db');
  console.log('3. Update DATABASE_URL if your credentials are different');
  console.log('4. Run: npx prisma db push');
  console.log('5. Run: npm run dev');
  console.log('6. Test the authentication flow');
  console.log('\n🔧 If you have different PostgreSQL credentials, update the DATABASE_URL in .env.local');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  console.log('\n📝 Manual setup:');
  console.log('Create a .env.local file in the my-app directory with:');
  console.log('DATABASE_URL="postgresql://username:password@localhost:5432/lms_db"');
  console.log('NEXTAUTH_SECRET="your-secret-key-here"');
  console.log('NEXTAUTH_URL="http://localhost:3000"');
}
