import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Globe2,
  GraduationCap,
  MapPinned,
  MessageSquareText,
  Network,
  Presentation,
  Sparkles,
  UsersRound,
} from 'lucide-react';




const exposureSections: Array<{
  title: string;
  eyebrow: string;
  kicker: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tags: string[];
  points: string[];
}> = [
  {
    title: 'International Exposure',
    eyebrow: 'Beyond borders',
    kicker: 'Global mindset',
    description:
      'Itahari International College provides students with international experience opportunities in the UK and Thailand, offering academic and cultural immersion through classroom observations, field visits, and cross-cultural learning that broadens global perspectives and supports professional development.',
    image: '/images/about/about-hero.JPG',
    icon: Globe2,
    tags: ['Global Leaders', 'Cross-cultural learning', 'Global outlook'],
    points: ['Life-Changing International Experience', 'International Education Practices'],
  },
  {
    title: 'Placement and Job Fair',
    eyebrow: 'Launch your career',
    kicker: 'Employer access',
    description:
      'Itahari International College bridges the gap between students and industry by connecting them with leading employers through dedicated job fair. The initiative prepares students for successful career transitions while providing direct access to internship and employment opportunities.',
    image: '/images/industry-exposure/placement-and-job-fair.jpg',
    icon: BriefcaseBusiness,
    tags: ['20+ Companies', 'Walk-in Interviews', 'Career Opportunities'],
    points: ['Direct company access', 'Intenship and Graduate Roles'],
  },
  {
    title: 'Career Development Learning',
    eyebrow: 'Continuous growth',
    kicker: 'Skill building',
    description:
      'Learning does not stop in the classroom. Students build confidence through seminars, certifications, professional development, and practical academic projects.',
    image: '/images/industry-exposure/career-development-learning.png',
    icon: GraduationCap,
    tags: ['Skill development', 'Real-world Projects', 'Internship Readiness'],
    points: ['Industry Exposure and Networking', 'Up to date with industry trends and practices'],
  },
  {
    title: 'Career Readiness Programme',
    eyebrow: 'Prepared for tomorrow',
    kicker: 'Professional habits',
    description:
      'Structured guidance helps students understand workplace expectations, communication, teamwork, leadership, and the habits that support long-term employability.',
    image: '/images/about/networking.JPG',
    icon: BadgeCheck,
    tags: ['Career Counseling', 'Mock Interviews', 'Resume Building'],
    points: ['One-to-one career guidance', 'Internship and Placement Preparation'],
  },
  {
    title: 'Industry visits',
    eyebrow: 'Real-world insight',
    kicker: 'Applied learning',
    description:
      'Through professional visits and industry interactions, students connect classroom learning with how organizations operate, solve problems, and create value.',
    image: '/images/industry-exposure/industry-exposure.JPG',
    icon: MapPinned,
    tags: ['Operational insights', 'Professional networking', 'Applied learning'],
    points: ['Behind-the-scenes exposure', 'Industry expert conversations'],
  },
];

const supportCards = [
  {
    icon: Network,
    title: 'Industry network',
    text: "Employer connections and professional interactions broaden students' career perspective.",
  },
  {
    icon: Presentation,
    title: 'Expert sessions',
    text: 'Guest talks and workshops bring current industry practice into everyday learning.',
  },
  {
    icon: FileText,
    title: 'Portfolio building',
    text: 'Projects and presentations help students demonstrate practical ability with confidence.',
  },
  {
    icon: MessageSquareText,
    title: 'Mentor guidance',
    text: 'Career support helps students prepare for interviews, teamwork, and professional growth.',
  },
];

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#dce6f2] bg-white px-4 py-2 text-xs font-black text-[#21409A] shadow-[0_10px_28px_rgba(33,64,154,0.08)]">
      <CheckCircle2 className="h-3.5 w-3.5 text-[#74C044]" aria-hidden="true" />
      {children}
    </span>
  );
}


function ExposureBlock({
  title,
  eyebrow,
  kicker,
  description,
  image,
  icon: Icon,
  tags,
  points,
  reverse,
}: (typeof exposureSections)[number] & { reverse?: boolean }) {
  return (
    <section className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className="relative min-h-[360px] overflow-hidden bg-[#dce6f2] shadow-[0_28px_70px_rgba(33,64,154,0.14)] md:min-h-[470px]">
        <Image
          src={image}
          alt={`${title} at Itahari International College`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061626]/78 via-[#061626]/18 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#21409A] shadow-xl">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {kicker}
            </span>
            <p className="mt-4 max-w-sm text-2xl font-black leading-tight text-white">{title}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#74C044]">{eyebrow}</p>
        <h2 className="text-4xl font-black leading-[1.02] tracking-tight text-[#16306b] md:text-6xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-[#64748b] md:text-base">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <ul className="mt-8 grid gap-4 border-t border-[#dce6f2] pt-6">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm font-black text-[#26364d] md:text-base">
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#74C044] shadow-[0_0_0_6px_rgba(116,192,68,0.12)]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function IndustryExposurePage() {
  return (
    <div className="bg-[#eef3fb] text-[#172033]">
      <section className="relative overflow-hidden bg-[#071633]">
        <div className="absolute inset-0">
          <Image
            src="/images/industry-exposure/exposure-banner.jpg"
            alt="IIC students preparing for industry-focused careers"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071633]/96 via-[#071633]/74 to-[#071633]/24" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071633] via-transparent to-[#071633]/25" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[86svh] max-w-[900px] flex-col items-center justify-center px-5 pb-14 pt-24 text-center sm:px-8 md:pb-20">
          <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur-md">
            <Globe2 className="h-4 w-4 text-[#74C044]" aria-hidden="true" />
            Global opportunities
          </p>
          <h1 className="text-5xl font-black leading-[0.96] tracking-tight text-white md:text-7xl lg:text-[98px]">
            Industry Exposure
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-white/80 md:text-2xl">
            Gain valuable industry experience and insight from industry experts to accelerate your global career.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#74C044] px-9 py-4 text-base font-black text-white shadow-[0_18px_35px_rgba(116,192,68,0.28)] transition hover:bg-[#65ad3b]"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-9 py-4 text-base font-black text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-20 md:gap-28">
          {exposureSections.map((section, index) => (
            <ExposureBlock key={section.title} {...section} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>



      <section className="bg-[#21409A] px-5 py-16 text-white sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#a8df87]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Your next step
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">What&apos;s your next step?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/76 md:text-lg">
            Explore programmes built around practical learning, global standards, and career-focused growth.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/admissions"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#74C044] px-9 py-4 text-sm font-black text-white transition hover:bg-[#65ad3b] sm:w-auto"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-black text-[#21409A] transition hover:bg-[#eef3fb] sm:w-auto"
            >
              Schedule a Visit
              <UsersRound className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
