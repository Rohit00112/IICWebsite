import mongoose, { Schema, model, models } from 'mongoose';

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
  image: String,
  level: String,
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
    image: String,
    color: String,
  }],
  quote: {
    text: String,
    author: String,
  },
  projects: [{
    title: String,
    cohort: String,
    image: String,
  }],
  faqs: [{
    question: String,
    answer: String,
  }],
}, {
  timestamps: true,
});

const Course = models.Course || model('Course', CourseSchema);

export default Course;
