const fs = require('fs');
const path = require('path');

console.log('🌐 Setting up Cloud PostgreSQL Database...\n');

// Generate a random secret key
const generateSecret = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const envContent = `# Database - Choose ONE option below:

# Option 1: Neon (Free PostgreSQL)
# DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/lms_db?sslmode=require"

# Option 2: Supabase (Free PostgreSQL)
# DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# Option 3: Local PostgreSQL (if you have it installed)
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_db"

# NextAuth.js
NEXTAUTH_SECRET="${generateSecret()}"
NEXTAUTH_URL="http://localhost:3000"
`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Environment file created successfully!');
  console.log('📁 File created: .env.local');
  console.log('\n🔑 Generated NEXTAUTH_SECRET for security');
  console.log('🌐 Set NEXTAUTH_URL to http://localhost:3000');
  console.log('\n📝 Database Setup Options:');
  console.log('\n🌐 Option 1: Neon (Recommended - Free)');
  console.log('1. Go to: https://neon.tech');
  console.log('2. Sign up for free account');
  console.log('3. Create new project');
  console.log('4. Copy the connection string');
  console.log('5. Replace DATABASE_URL in .env.local');
  console.log('\n🌐 Option 2: Supabase (Free)');
  console.log('1. Go to: https://supabase.com');
  console.log('2. Sign up for free account');
  console.log('3. Create new project');
  console.log('4. Go to Settings > Database');
  console.log('5. Copy the connection string');
  console.log('6. Replace DATABASE_URL in .env.local');
  console.log('\n💻 Option 3: Local PostgreSQL');
  console.log('1. Install PostgreSQL locally');
  console.log('2. Create database: lms_db');
  console.log('3. Use the current DATABASE_URL');
  console.log('\n🔧 After setting up database:');
  console.log('1. Update DATABASE_URL in .env.local');
  console.log('2. Run: npx prisma db push');
  console.log('3. Run: npm run dev');
  console.log('4. Test the authentication flow');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
}

