import mongoose, { Schema, model, models } from 'mongoose';

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
}, {
  timestamps: true,
});

const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;
