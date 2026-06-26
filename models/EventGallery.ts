import { Schema, model, models } from 'mongoose';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../lib/image-source';

const EventGallerySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide an event slug'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  year: {
    type: Number,
    required: [true, 'Please provide an event year'],
  },
  summary: {
    type: String,
    required: [true, 'Please provide a gallery summary'],
  },
  coverImage: {
    type: String,
    required: [true, 'Please provide a cover image'],
    validate: {
      validator: isSafeImageSrc,
      message: IMAGE_SOURCE_ERROR,
    },
  },
  images: [{
    type: String,
    validate: {
      validator: isSafeImageSrc,
      message: IMAGE_SOURCE_ERROR,
    },
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const EventGallery = models.EventGallery || model('EventGallery', EventGallerySchema);

export default EventGallery;
