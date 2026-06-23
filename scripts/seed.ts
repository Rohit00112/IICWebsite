import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = "mongodb+srv://subedirohit49:Password123@cluster0.lqorrbb.mongodb.net/iic_website?retryWrites=true&w=majority&appName=Cluster0";

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    // Models
    const NewsSchema = new mongoose.Schema({
      category: String,
      date: String,
      title: String,
      description: String,
      content: String,
      image: String,
      featured: Boolean,
      author: Object,
    }, { timestamps: true });

    const AdminSchema = new mongoose.Schema({
      email: String,
      password: { type: String },
      name: String,
    }, { timestamps: true });

    const CourseSchema = new mongoose.Schema({
      title: String,
      subtitle: String,
      slug: String,
      category: String,
      duration: String,
      description: String,
      image: String,
      level: String,
      listing: {
        title: String,
        category: String,
        description: String,
        image: String,
        backgroundColor: String,
        modulesLabel: String,
        creditsLabel: String,
        featuredModules: [String],
        order: Number,
      },
      featured: Boolean,
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
    }, { timestamps: true });

    const News = mongoose.models.News || mongoose.model('News', NewsSchema);
    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
    const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

    // 1. Seed News
    try {
      const newsPath = path.join(process.cwd(), 'data/news.json');
      const newsContent = await fs.readFile(newsPath, 'utf-8');
      const newsData = JSON.parse(newsContent) as Record<string, unknown>[];
      console.log('Clearing News DB...');
      await News.deleteMany({});
      const cleanNews = newsData.map((item) => {
        const rest = { ...item };
        delete rest.id;
        return rest;
      });
      await News.insertMany(cleanNews);
      console.log('News seeded.');
    } catch { console.log('Skipping News seed (file not found)'); }

    // 2. Seed Admin
    console.log('Clearing Admin DB...');
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@iic.edu.np',
      password: hashedPassword,
      name: 'Itahari International College Administrator'
    });
    console.log('Admin user seeded.');

    // 3. Seed Courses
    try {
      const coursesPath = path.join(process.cwd(), 'data/courses.json');
      const coursesContent = await fs.readFile(coursesPath, 'utf-8');
      const coursesData = JSON.parse(coursesContent) as Record<string, unknown>[];
      console.log('Clearing Courses DB...');
      await Course.deleteMany({});
      // Course IDs are strings like "bsc-computing" usually, so we might keep them or let Mongo generate
      const cleanCourses = coursesData.map((item) => {
        const rest = { ...item };
        delete rest.id;
        return rest;
      });
      await Course.insertMany(cleanCourses);
      console.log('Courses seeded.');
    } catch { console.log('Skipping Courses seed (file not found)'); }

    console.log('Full Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
