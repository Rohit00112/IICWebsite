import { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: {
    type: String,
    select: false,
  },
  twoFactorPendingSecret: {
    type: String,
    select: false,
  },
  twoFactorRecoveryCodes: {
    type: [String],
    default: [],
    select: false,
  },
  twoFactorLastUsedCounter: {
    type: Number,
    default: -1,
    select: false,
  },
}, {
  timestamps: true,
});

const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;
