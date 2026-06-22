import { Schema, model, models } from 'mongoose';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../lib/image-source';

const optionalImageSrc = (value?: string) => !value || isSafeImageSrc(value);
const ingSingleRecipientMessage = 'ING Postgraduate Scholarship can have only one recipient per year';

const ScholarshipRecipientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a recipient name'],
    trim: true,
  },
  programme: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    validate: {
      validator: optionalImageSrc,
      message: IMAGE_SOURCE_ERROR,
    },
  },
  quote: {
    type: String,
    trim: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const ScholarshipBatchSchema = new Schema({
  year: {
    type: Number,
    required: [true, 'Please provide a scholarship year'],
    min: 2000,
    max: 2100,
  },
  awardType: {
    type: String,
    required: [true, 'Please provide an award type'],
    enum: ['aaa', 'ing_postgraduate'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a batch title'],
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  groupImage: {
    type: String,
    validate: {
      validator: optionalImageSrc,
      message: IMAGE_SOURCE_ERROR,
    },
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  recipients: {
    type: [ScholarshipRecipientSchema],
    validate: {
      validator: function (this: { awardType?: string }, value?: unknown[]) {
        return this.awardType !== 'ing_postgraduate' || !value || value.length <= 1;
      },
      message: ingSingleRecipientMessage,
    },
  },
}, {
  timestamps: true,
});

ScholarshipBatchSchema.index({ year: -1, awardType: 1, createdAt: -1 });
ScholarshipBatchSchema.index({ status: 1, year: -1 });

const ScholarshipBatch = models.ScholarshipBatch || model('ScholarshipBatch', ScholarshipBatchSchema);

export default ScholarshipBatch;
