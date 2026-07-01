import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI before running the seed script.');
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    // Models
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: { type: String },
      name: String,
    }, { timestamps: true });

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

    // Seed Admin
    console.log('Clearing Admin DB...');
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await Admin.create({
      email: 'admin@iic.edu.np',
      password: hashedPassword,
      name: 'Itahari International College Administrator'
    });
    console.log('Admin user seeded.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
