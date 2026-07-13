import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const defaultAdminEmail = 'web@iic.edu.np';
const defaultAdminPassword = 'IIC@2026';
const email = (process.env.ADMIN_EMAIL || defaultAdminEmail).trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || defaultAdminPassword;

try {
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log('Administrator already exists; preserving its credentials.');
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Itahari International College Administrator',
        },
      });
      console.log('Administrator provisioned.');
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        console.log('Administrator was provisioned by another process.');
      } else {
        throw error;
      }
    }
  }
} finally {
  await prisma.$disconnect();
}
