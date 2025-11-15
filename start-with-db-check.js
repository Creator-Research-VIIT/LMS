#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

// Minimal .env loader for local scripts (no dependency on dotenv)
function loadEnv() {
  const candidates = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '.env'),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        if (!line || line.trim().startsWith('#')) continue;
        const idx = line.indexOf('=');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!(key in process.env)) process.env[key] = val;
      }
    }
  }
}

loadEnv();

console.log('🚀 Starting LMS Application with Database Health Check\n');

async function checkDatabaseConnection() {
  try {
    console.log('🔍 Checking database connection...');
    
    // First, ensure Prisma client is generated
    console.log('📦 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Try to connect to database
    console.log('🌐 Testing database connection...');
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_URL }
      }
    });
    
    await prisma.$queryRaw`SELECT NOW()`;
    console.log('✅ Database connection successful!');
    
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Check your .env file has correct DATABASE_URL');
    console.log('2. Ensure your Neon database is not suspended');
    console.log('3. Try: npx prisma db push');
    console.log('4. Visit: https://console.neon.tech to check database status');
    
    return false;
  }
}

async function startApp() {
  const isDbConnected = await checkDatabaseConnection();
  
  if (!isDbConnected) {
    console.log('\n⚠️  Database connection issues detected.');
    console.log('   The app will start but you may experience errors.');
    console.log('   Please fix database connection and restart.');
  }
  
  console.log('\n🎯 Starting Next.js development server...');
  console.log('📱 App will be available at: http://localhost:3000');
  console.log('🔧 To fix database issues, run: npm run db:fix\n');
  
  // Start the Next.js dev server
  execSync('npm run dev', { stdio: 'inherit' });
}

// Run the startup check
startApp().catch(console.error);
