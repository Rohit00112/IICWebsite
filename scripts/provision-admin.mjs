import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI;
const defaultAdminEmail = 'web@iic.edu.np';
const defaultAdminPassword = 'IIC@2026';
const email = (process.env.ADMIN_EMAIL || defaultAdminEmail).trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || defaultAdminPassword;

if (!mongoUri) {
  throw new Error('MONGODB_URI must be configured before provisioning the administrator.');
}

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

try {
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  const existingAdmin = await Admin.exists({ email });

  if (existingAdmin) {
    console.log('Administrator already exists; preserving its credentials.');
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await Admin.create({
        email,
        password: hashedPassword,
        name: 'Itahari International College Administrator',
      });
      console.log('Administrator provisioned.');
    } catch (error) {
      if (!(error instanceof Error) || !('code' in error) || error.code !== 11000) {
        throw error;
      }

      console.log('Administrator was provisioned by another process.');
    }
  }
} finally {
  await mongoose.disconnect();
}
