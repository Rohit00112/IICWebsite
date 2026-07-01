type JsonRecord = Record<string, unknown>;

const asRecord = (value: unknown): JsonRecord => (
  value && typeof value === 'object' && !Array.isArray(value) ? value as JsonRecord : {}
);

const asString = (value: unknown, fallback = '') => (
  typeof value === 'string' || typeof value === 'number' ? String(value).trim() : fallback
);

const asArray = (value: unknown): unknown[] => (
  Array.isArray(value) ? value : []
);

export const normalizeFeaturedModulesJson = (items: unknown[]) => (
  items
    .map((item) => asString(item))
    .filter(Boolean)
);

export const normalizeLearningOutcomesJson = (items: unknown[]) => (
  items
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') return String(item).trim();

      const record = asRecord(item);
      return asString(record.outcome || record.title || record.description || record.value);
    })
    .filter(Boolean)
);

export const normalizeCurriculumJson = (items: unknown[]) => (
  items.map((item, index) => {
    const record = asRecord(item);

    return {
      title: asString(record.title, `Year ${index + 1}`),
      modules: asArray(record.modules).map((module) => {
        const moduleRecord = asRecord(module);

        return {
          name: asString(moduleRecord.name || moduleRecord.title),
          code: asString(moduleRecord.code || moduleRecord.moduleCode),
          description: asString(moduleRecord.description),
          credits: asString(moduleRecord.credits),
        };
      }),
    };
  })
);

export const normalizeCareerJson = (items: unknown[]) => (
  items.map((item) => {
    const record = asRecord(item);

    return {
      title: asString(record.title || record.role || record.name),
      description: asString(record.description),
      color: asString(record.color, '#21409A'),
    };
  })
);

export const normalizeFacultyJson = (items: unknown[]) => (
  items.map((item) => {
    const record = asRecord(item);

    return {
      name: asString(record.name),
      role: asString(record.role || record.title),
      description: asString(record.description || record.bio),
      image: asString(record.image),
    };
  })
);

export const normalizeProjectsJson = (items: unknown[]) => (
  items.map((item) => {
    const record = asRecord(item);

    return {
      title: asString(record.title || record.name),
      cohort: asString(record.cohort || record.year),
      image: asString(record.image),
    };
  })
);

export const normalizeFaqsJson = (items: unknown[]) => (
  items.map((item) => {
    const record = asRecord(item);

    return {
      question: asString(record.question || record.q || record.title),
      answer: asString(record.answer || record.a || record.description),
    };
  })
);

export const courseJsonExamples = {
  featuredModules: `featuredModules: [
  "Global Business",
  "Digital Management"
]`,
  curriculum: `curriculum: [
  {
    title: "Year 1",
    modules: [
      {
        name: "Programming",
        code: "COMP101",
        credits: "30",
        description: "Core programming concepts and practice."
      }
    ]
  }
]`,
  learningOutcomes: `learningOutcomes: [
  "Apply core computing concepts to practical problems.",
  "Build secure and scalable software solutions."
]`,
  careerOpportunities: `careerOpportunities: [
  {
    title: "Software Developer",
    description: "Graduates can create desktop, web, and enterprise applications."
  }
]`,
  faculty: `faculty: [
  {
    name: "Dr. Jane Smith",
    role: "Senior Lecturer",
    description: "Academic background and expertise.",
    image: "/images/common/iic_logo.png"
  }
]`,
  projects: `projects: [
  {
    title: "Smart Attendance System",
    cohort: "Class of 2026",
    image: "/images/course-details/course-details-hero.webp"
  }
]`,
  faqs: `faqs: [
  {
    question: "Who awards this degree?",
    answer: "The degree is awarded by London Metropolitan University."
  }
]`,
};
