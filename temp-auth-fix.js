const fs = require('fs');

console.log('🔧 Creating temporary authentication fix...\n');

// Create a temporary .env.local with SQLite for immediate testing
const envContent = `# 🔧 TEMPORARY SETUP - For immediate testing
# This uses SQLite which doesn't require external database setup
# 
# To use PostgreSQL later:
# 1. Set up Neon/Supabase database
# 2. Replace DATABASE_URL with your connection string
# 3. Change provider back to "postgresql" in prisma/schema.prisma

# Temporary SQLite database (works immediately)
DATABASE_URL="file:./dev.db"

# NextAuth.js Configuration
NEXTAUTH_SECRET="temp-secret-key-for-testing"
NEXTAUTH_URL="http://localhost:3000"

# 📝 Instructions:
# 1. Run: npx prisma db push
# 2. Run: npm run dev
# 3. Test authentication at http://localhost:3000/signup
# 4. Once working, set up PostgreSQL for production
`;

try {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Temporary .env.local created!');
  console.log('💾 Using SQLite for immediate testing');
  console.log('\n🚀 Quick Commands:');
  console.log('1. npx prisma db push');
  console.log('2. npm run dev');
  console.log('3. Test at http://localhost:3000/signup');
  console.log('\n💡 This will work immediately without external database setup!');
} catch (error) {
  console.error('❌ Error creating temporary fix:', error.message);
}

