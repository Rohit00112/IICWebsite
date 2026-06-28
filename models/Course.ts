import { Schema, model, models } from 'mongoose';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../lib/image-source';

const optionalImageSrc = (value?: string) => !value || isSafeImageSrc(value);

const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  subtitle: String,
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  category: String,
  duration: String,
  description: String,
  image: {
    type: String,
    validate: {
      validator: optionalImageSrc,
      message: IMAGE_SOURCE_ERROR,
    },
  },
  level: String,
  listing: {
    title: String,
    mnemonic: String,
    mnemonicImage: {
      type: String,
      validate: {
        validator: optionalImageSrc,
        message: IMAGE_SOURCE_ERROR,
      },
    },
    displayTitle: String,
    specialism: String,
    category: String,
    description: String,
    image: {
      type: String,
      validate: {
        validator: optionalImageSrc,
        message: IMAGE_SOURCE_ERROR,
      },
    },
    backgroundColor: String,
    modulesLabel: String,
    creditsLabel: String,
    featuredModules: [String],
    order: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  overview: String,
  details: {
    level: String,
    duration: String,
    intake: String,
    awardingBody: String,
  },
  curriculum: [{
    title: String,
    modules: [{
      name: String,
      code: String,
      description: String,
      credits: String,
    }]
  }],
  learningOutcomes: [String],
  careerOpportunities: [{
    title: String,
    description: String,
    color: String,
  }],
  faculty: [{
    name: String,
    role: String,
    description: String,
    image: {
      type: String,
      validate: {
        validator: optionalImageSrc,
        message: IMAGE_SOURCE_ERROR,
      },
    },
    color: String,
  }],
  quote: {
    text: String,
    author: String,
  },
  projects: [{
    title: String,
    cohort: String,
    image: {
      type: String,
      validate: {
        validator: optionalImageSrc,
        message: IMAGE_SOURCE_ERROR,
      },
    },
  }],
  faqs: [{
    question: String,
    answer: String,
  }],
}, {
  timestamps: true,
});

const existingCourseModel = models.Course;

// Next.js keeps Mongoose models alive across development hot reloads. Add new
// fields to an already-compiled model so updates are not stripped.
if (existingCourseModel) {
  const missingListingFields: Record<string, StringConstructor> = {};

  ['displayTitle', 'specialism', 'mnemonic', 'mnemonicImage'].forEach((field) => {
    const path = `listing.${field}`;

    if (!existingCourseModel.schema.path(path)) {
      missingListingFields[path] = String;
    }
  });

  if (Object.keys(missingListingFields).length > 0) {
    existingCourseModel.schema.add(missingListingFields);
  }
}

if (existingCourseModel) {
  const curriculumSchema = existingCourseModel.schema.path('curriculum')?.schema;
  const moduleSchema = curriculumSchema?.path('modules')?.schema;

  if (moduleSchema && !moduleSchema.path('code')) {
    moduleSchema.add({ code: String });
  }
}

const Course = existingCourseModel || model('Course', CourseSchema);

export default Course;
