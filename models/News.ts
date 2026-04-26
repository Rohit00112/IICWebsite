import mongoose, { Schema, model, models } from 'mongoose';

const NewsSchema = new Schema({
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['News', 'Event', 'Announcement'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date'],
  },
  time: String,
  location: String,
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the article content'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  author: {
    name: String,
    role: String,
    avatar: String,
  },
}, {
  timestamps: true,
});

// Auto-generate slug from title before saving
NewsSchema.pre('save', function() {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

// Use existing model if it exists, otherwise create a new one
const News = models.News || model('News', NewsSchema);

export default News;
