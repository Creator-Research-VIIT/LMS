const fs = require('fs');
const crypto = require('crypto');

console.log('🚀 Quick Neon Database Setup\n');

// Generate a secure secret
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secret = generateSecret();

const envContent = `# 🌐 Neon Database Setup (Free PostgreSQL)
# 
# STEP 1: Go to https://neon.tech
# STEP 2: Sign up with GitHub/Google (free)
# STEP 3: Click "Create New Project"
# STEP 4: Choose a name (e.g., "lms-project")
# STEP 5: Copy the connection string from the dashboard
# STEP 6: Replace the DATABASE_URL below with your Neon connection string
#
# Example Neon connection string:
# DATABASE_URL="postgresql://username:password@ep-cool-name-123456.us-east-1.aws.neon.tech/lms_db?sslmode=require"

# 🔧 REPLACE THIS WITH YOUR NEON CONNECTION STRING:
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_db"

# NextAuth.js Configuration
NEXTAUTH_SECRET="${secret}"
NEXTAUTH_URL="http://localhost:3000"

# 📝 After updating DATABASE_URL:
# 1. Run: npx prisma db push
# 2. Run: npm run dev
# 3. Test authentication at http://localhost:3000/signup
`;

try {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ .env.local updated with secure configuration!');
  console.log('🔑 Generated secure NEXTAUTH_SECRET');
  console.log('\n📋 Next Steps:');
  console.log('1. 🌐 Go to: https://neon.tech');
  console.log('2. 👤 Sign up with GitHub/Google');
  console.log('3. 🆕 Create new project');
  console.log('4. 📋 Copy connection string from dashboard');
  console.log('5. ✏️  Replace DATABASE_URL in .env.local');
  console.log('6. 🚀 Run: npx prisma db push');
  console.log('7. 🎯 Run: npm run dev');
  console.log('\n💡 Neon gives you 3GB free database - perfect for development!');
} catch (error) {
  console.error('❌ Error updating .env.local:', error.message);
}
