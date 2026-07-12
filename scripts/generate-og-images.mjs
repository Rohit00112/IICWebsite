import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'public', 'og');
const logoPath = path.join(projectRoot, 'public', 'images', 'common', 'iic_logo_white.png');

const cards = [
  { filename: 'home.png', source: 'public/images/home/hero.webp', eyebrow: 'UK DEGREES IN ITAHARI', lines: ['IT & Business', 'Degree Programmes'], position: 'centre' },
  { filename: 'about.png', source: 'public/images/about/about-hero.JPG', eyebrow: 'ABOUT IIC', lines: ['Mission, Values &', 'UK Partnership'], position: 'centre' },
  { filename: 'courses.png', source: 'public/images/courses/course-hero.JPG', eyebrow: 'ACADEMIC PROGRAMMES', lines: ['UK Degree Programmes', 'in Itahari'], position: 'centre' },
  { filename: 'admissions.png', source: 'public/images/common/lecture.JPG', eyebrow: 'ADMISSIONS 2026', lines: ['Apply to Itahari', 'International College'], position: 'centre' },
  { filename: 'scholarships.png', source: 'public/images/lifestyle/graduation.JPG', eyebrow: 'SCHOLARSHIPS', lines: ['Recognition for', 'Student Achievement'], position: 'centre' },
  { filename: 'news.png', source: 'public/images/common/seminar.webp', eyebrow: 'IIC NEWSROOM', lines: ['News & Events', 'from IIC'], position: 'centre' },
  { filename: 'student-life.png', source: 'public/images/lifestyle/lifestyle-hero.JPG', eyebrow: 'STUDENT EXPERIENCE', lines: ['Life at Itahari', 'International College'], position: 'centre' },
  { filename: 'infrastructure.png', source: 'public/images/our-infrastructure/infra.png', eyebrow: 'CAMPUS FACILITIES', lines: ['Infrastructure', 'Built for Learning'], position: 'centre' },
  { filename: 'industry-exposure.png', source: 'public/images/industry-exposure/exposure-banner.JPG', eyebrow: 'CAREER READINESS', lines: ['Industry Exposure &', 'Placement Support'], position: 'attention' },
  { filename: 'alumni.png', source: 'public/images/alumini/graduate.jpg', eyebrow: 'GRADUATE COMMUNITY', lines: ['IIC Alumni Network &', 'Graduate Stories'], position: 'centre' },
  { filename: 'research.png', source: 'public/images/rmc/hero.png', eyebrow: 'ACADEMIC RESEARCH', lines: ['Research Management', 'Committee'], position: 'centre' },
  { filename: 'contact.png', source: 'public/images/common/tower_block.JPG', eyebrow: 'CONTACT IIC', lines: ['Admissions, Visits', '& Directions'], position: 'centre' },
  { filename: 'privacy.png', source: 'public/images/common/library.JPG', eyebrow: 'WEBSITE POLICY', lines: ['Privacy Policy'], position: 'centre' },
  { filename: 'terms.png', source: 'public/images/our-infrastructure/academic-block.JPG', eyebrow: 'WEBSITE TERMS', lines: ['Terms of Service'], position: 'centre' },
];

const obsoleteGeneratedAssets = [
  '_iic-brand-background.png',
  'iic-brand-background.png',
  'about-us.png',
  'contact-us.png',
  'life-at-iic.png',
  'news-and-events.png',
  'our-infrastructure.png',
  'privacy-policy.png',
  'research-management-committee.png',
  'scholarship.png',
  'terms-of-service.png',
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cardOverlay({ eyebrow, lines }) {
  const titleY = lines.length === 1 ? 396 : 360;
  const fontSize = lines.length === 1 ? 66 : 56;
  const lineHeight = 76;
  const titleLines = lines
    .map(
      (line, index) =>
        `<text x="64" y="${titleY + index * lineHeight}" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="-1.4">${escapeXml(line)}</text>`
    )
    .join('');

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H700L615 630H0Z" fill="#061a3a" fill-opacity="0.91"/>
      <path d="M0 0H700L615 630H0Z" fill="none" stroke="#ffffff" stroke-opacity="0.12"/>
      <rect x="64" y="268" width="68" height="6" rx="3" fill="#74c044"/>
      <text x="64" y="312" fill="#d9ecff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="3">${escapeXml(eyebrow)}</text>
      ${titleLines}
      <text x="64" y="558" fill="#ffffff" fill-opacity="0.78" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" letter-spacing="1">iic.edu.np</text>
    </svg>
  `);
}

const logo = await sharp(logoPath)
  .resize({ width: 410, height: 105, fit: 'inside', withoutEnlargement: true })
  .png()
  .toBuffer();

await Promise.all(
  cards.map(async (card) => {
    const sourcePath = path.join(projectRoot, card.source);

    await sharp(sourcePath)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: card.position })
      .composite([
        { input: cardOverlay(card), left: 0, top: 0 },
        { input: logo, left: 64, top: 70 },
      ])
      .png({ compressionLevel: 9, palette: true, quality: 90, colours: 256, dither: 0.6 })
      .toFile(path.join(outputDirectory, card.filename));
  })
);

await Promise.all(
  obsoleteGeneratedAssets.map((filename) =>
    fs.rm(path.join(outputDirectory, filename), { force: true })
  )
);

console.log(`Generated ${cards.length} real-photo Open Graph images in ${outputDirectory}`);
