const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔗 Update Neon Database Connection\n');

console.log('📋 Instructions:');
console.log('1. Go to https://neon.tech');
console.log('2. Sign in to your account');
console.log('3. Select your project');
console.log('4. Copy the connection string from the dashboard');
console.log('5. Paste it below when prompted\n');

console.log('💡 Your connection string should look like:');
console.log('postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/lms_db?sslmode=require\n');

rl.question('🔗 Paste your Neon connection string here: ', (connectionString) => {
  // Clean up the connection string
  const cleanConnectionString = connectionString.trim();
  
  if (!cleanConnectionString.startsWith('postgresql://')) {
    console.log('❌ Invalid connection string format. It should start with "postgresql://"');
    rl.close();
    return;
  }

  // Read current .env.local
  let envContent = '';
  try {
    envContent = fs.readFileSync('.env.local', 'utf8');
  } catch (error) {
    console.log('⚠️  .env.local not found, creating new file...');
  }

  // Update DATABASE_URL
  const lines = envContent.split('\n');
  const updatedLines = lines.map(line => {
    if (line.startsWith('DATABASE_URL=')) {
      return `DATABASE_URL="${cleanConnectionString}"`;
    }
    return line;
  });

  // If DATABASE_URL wasn't found, add it
  if (!updatedLines.some(line => line.startsWith('DATABASE_URL='))) {
    updatedLines.unshift(`DATABASE_URL="${cleanConnectionString}"`);
  }

  // Ensure other required variables exist
  if (!updatedLines.some(line => line.startsWith('NEXTAUTH_SECRET='))) {
    updatedLines.push('NEXTAUTH_SECRET=temp-secret-key-for-testing');
  }
  if (!updatedLines.some(line => line.startsWith('NEXTAUTH_URL='))) {
    updatedLines.push('NEXTAUTH_URL=http://localhost:3000');
  }

  // Write updated .env.local
  try {
    fs.writeFileSync('.env.local', updatedLines.join('\n'));
    console.log('✅ .env.local updated successfully!');
    console.log('🔗 Database URL updated to your Neon connection');
    console.log('\n🚀 Next steps:');
    console.log('1. Run: npx prisma db push');
    console.log('2. Run: npm run dev');
    console.log('3. Test authentication at http://localhost:3000/signup');
  } catch (error) {
    console.log('❌ Error updating .env.local:', error.message);
  }

  rl.close();
});

