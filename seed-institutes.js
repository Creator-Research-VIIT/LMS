// Seed script to add sample institutes  
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function seedInstitutes() {
  console.log('🌱 Seeding institutes...\n');

  const institutes = [
    {
      name: 'Vishwakarma Institute of Information Technology',
      domain: 'viit.ac.in',
      description: 'A premier technical institute offering engineering and technology programs',
      address: 'Survey No 3/4, Kondhwa Budruk, Pune, Maharashtra 411048',
      phone: '+91-20-24407000',
      email: 'info@viit.ac.in',
      website: 'https://www.viit.ac.in',
      established: '1992',
    },
    {
      name: 'Vishwakarma Institute of Technology',
      domain: 'vit.edu',
      description: 'Engineering institute with focus on technical education',
      address: '666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra 411037',
      phone: '+91-20-24210111',
      email: 'info@vit.edu',
      website: 'https://www.vit.edu',
      established: '1983',
    },
  ];

  for (const institute of institutes) {
    const existing = await prisma.institute.findUnique({
      where: { domain: institute.domain },
    });

    if (existing) {
      console.log(`⏭️  Institute "${institute.name}" already exists`);
      continue;
    }

    const created = await prisma.institute.create({
      data: institute,
    });

    console.log(`✅ Created institute: ${created.name} (${created.domain})`);
  }

  console.log('\n✨ Institute seeding completed!');
}

seedInstitutes()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
