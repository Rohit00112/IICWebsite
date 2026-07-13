import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'web@iic.edu.np').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'IIC@2026';

async function seed() {
  try {
    console.log('Connecting to database...');
    // Prisma client auto-connects
    console.log('Clearing Admin DB...');
    await prisma.admin.deleteMany({});
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await prisma.admin.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Itahari International College Administrator',
      },
    });
    console.log('Admin user seeded.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
