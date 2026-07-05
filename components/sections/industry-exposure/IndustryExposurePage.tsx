import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  MapPinned,
  MessageSquareText,
  Network,
  Presentation,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
} from 'lucide-react';

const exposureStats = [
  { value: '150+', label: 'Industry partners' },
  { value: '1000+', label: 'Career-ready graduates' },
  { value: '9+', label: 'Years of excellence' },
  { value: 'UK', label: 'Awarded programmes' },
];

const pathway = [
  {
    title: 'Discover',
    text: 'Students understand global career pathways, employer expectations, and professional possibilities early.',
    icon: Globe2,
  },
  {
    title: 'Prepare',
    text: 'Workshops, mentoring, and guided practice build communication, confidence, and application readiness.',
    icon: ClipboardCheck,
  },
  {
    title: 'Connect',
    text: 'Career events, expert sessions, visits, and networking help students meet the world beyond campus.',
    icon: Handshake,
  },
  {
    title: 'Grow',
    text: 'Projects, portfolios, and industry-informed feedback help students keep improving with purpose.',
    icon: Trophy,
  },
];

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
    title: 'International exposure',
    eyebrow: 'Beyond borders',
    kicker: 'Global mindset',
    description:
      'Students learn in a globally connected environment shaped by UK-awarded programmes, international academic standards, and opportunities to engage with wider professional perspectives.',
    image: '/images/about/about-hero.JPG',
    icon: Globe2,
    tags: ['UK curriculum access', 'Cross-cultural learning', 'Global outlook'],
    points: ['London Metropolitan University standards', 'Globally relevant academic practice'],
  },
  {
    title: 'Placement and job fair',
    eyebrow: 'Launch your career',
    kicker: 'Employer access',
    description:
      'IIC connects students with employers, alumni, and professional networks through career events, counselling, and preparation designed for the real hiring process.',
    image: '/images/about/career.JPG',
    icon: BriefcaseBusiness,
    tags: ['Employer interaction', 'Career counselling', 'Application readiness'],
    points: ['Direct company access', 'Interview and CV preparation'],
  },
  {
    title: 'Career development learning',
    eyebrow: 'Continuous growth',
    kicker: 'Skill building',
    description:
      'Learning does not stop in the classroom. Students build confidence through seminars, certifications, professional development, and practical academic projects.',
    image: '/images/about/practical.JPG',
    icon: GraduationCap,
    tags: ['Skill development', 'Expert sessions', 'Project work'],
    points: ['Industry certifications and workshops', 'Hands-on portfolio building'],
  },
  {
    title: 'Career readiness programme',
    eyebrow: 'Prepared for tomorrow',
    kicker: 'Professional habits',
    description:
      'Structured guidance helps students understand workplace expectations, communication, teamwork, leadership, and the habits that support long-term employability.',
    image: '/images/about/networking.JPG',
    icon: BadgeCheck,
    tags: ['Mentoring', 'Soft skills', 'Professional habits'],
    points: ['One-to-one career guidance', 'Professional communication practice'],
  },
  {
    title: 'Industry visits',
    eyebrow: 'Real-world insight',
    kicker: 'Applied learning',
    description:
      'Through professional visits and industry interactions, students connect classroom learning with how organizations operate, solve problems, and create value.',
    image: '/images/common/seminar.webp',
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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-white/16 bg-white/[0.08] px-6 py-7 text-center shadow-[0_18px_42px_rgba(5,18,50,0.18)] backdrop-blur-xl">
      <p className="text-4xl font-black leading-none text-white md:text-5xl">{value}</p>
      <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/72">{label}</p>
    </div>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#dce6f2] bg-white px-4 py-2 text-xs font-black text-[#21409A] shadow-[0_10px_28px_rgba(33,64,154,0.08)]">
      <CheckCircle2 className="h-3.5 w-3.5 text-[#74C044]" aria-hidden="true" />
      {children}
    </span>
  );
}

function PathwayCard({ title, text, icon: Icon, index }: (typeof pathway)[number] & { index: number }) {
  return (
    <article className="relative border border-[#dce6f2] bg-white p-6 shadow-[0_18px_50px_rgba(33,64,154,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center bg-[#21409A] text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-4xl font-black leading-none text-[#21409A]/10">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-6 text-2xl font-black tracking-tight text-[#172033]">{title}</h3>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-[#64748b]">{text}</p>
    </article>
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
        <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-[#64748b] md:text-lg">
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
            src="/images/about/career.JPG"
            alt="IIC students preparing for industry-focused careers"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071633]/96 via-[#071633]/74 to-[#071633]/24" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071633] via-transparent to-[#071633]/25" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[86svh] max-w-[1440px] items-end gap-12 px-5 pb-14 pt-24 sm:px-8 md:pb-20 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#74C044]">
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              Global opportunities
            </p>
            <h1 className="text-5xl font-black leading-[0.96] tracking-tight text-white md:text-7xl lg:text-[98px]">
              Industry Exposure
            </h1>
            <p className="mt-7 max-w-2xl text-base font-semibold leading-relaxed text-white/78 md:text-xl">
              Gain valuable industry experience and insight from industry experts to accelerate your global career.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-3 bg-[#74C044] px-7 py-4 text-sm font-black text-white shadow-[0_18px_35px_rgba(116,192,68,0.28)] transition hover:bg-[#65ad3b]"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-3 border border-white/35 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Schedule a Visit
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md border border-white/18 bg-white/[0.10] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a8df87]">Career ecosystem</p>
              <div className="mt-6 grid gap-4">
                {['Employer conversations', 'Professional mentoring', 'Career readiness workshops'].map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-white/14 bg-white/[0.08] px-4 py-3 text-sm font-black text-white/88">
                    <Target className="h-4 w-4 text-[#74C044]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#21409A] px-5 py-8 sm:px-8 md:py-10">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-4">
          {exposureStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#74C044]">Career connected learning</p>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#172033] md:text-6xl">
                A clear path from campus to career
              </h2>
            </div>
            <p className="max-w-2xl text-base font-semibold leading-relaxed text-[#64748b] md:text-lg">
              IIC combines globally benchmarked academics with practical touchpoints that help students understand real workplaces and build confidence before graduation.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pathway.map((item, index) => (
              <PathwayCard key={item.title} {...item} index={index} />
            ))}
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

      <section className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#74C044]">How students grow</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#172033] md:text-5xl">
              Practical support at every step
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {supportCards.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border border-[#dce5f2] bg-[#f8fbff] p-6 shadow-[0_14px_40px_rgba(33,64,154,0.06)]">
                <Icon className="h-8 w-8 text-[#21409A]" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black text-[#172033]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[#64748b]">{text}</p>
              </article>
            ))}
          </div>
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
              className="inline-flex w-full items-center justify-center gap-3 bg-[#74C044] px-7 py-4 text-sm font-black text-white transition hover:bg-[#65ad3b] sm:w-auto"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex w-full items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-black text-[#21409A] transition hover:bg-[#eef3fb] sm:w-auto"
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
