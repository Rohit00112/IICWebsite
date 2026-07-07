'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  ExternalLink,
  GraduationCap,
  MapPin,
  Quote,
  Sparkles,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINKEDIN_URL = 'https://www.linkedin.com/school/itahari-international-college/';

type AlumniProfile = {
  name: string;
  classYear: string;
  role: string;
  company: string;
  location: string;
  field: string;
  quote: string;
  linkedin: string;
  image?: string;
};

const alumni: AlumniProfile[] = [
  {
    name: 'David Kim',
    classYear: '2018',
    role: 'Senior Data Scientist',
    company: 'DataDyn',
    location: 'Seattle',
    field: 'Technology',
    quote: 'I still use the problem-solving rhythm I learned at IIC whenever I build data products for global teams.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/utsav.png',
  },
  {
    name: 'Aisha Patel',
    classYear: '2019',
    role: 'Product Manager',
    company: 'Innovate AI',
    location: 'Austin',
    field: 'Technology',
    quote: 'The strongest part of IIC was learning to turn ideas into working products with people from different disciplines.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/kritika.JPG',
  },
  {
    name: 'James Wilson',
    classYear: '2014',
    role: 'Investment Banker',
    company: 'Capital Partners',
    location: 'New York',
    field: 'Finance',
    quote: 'Presentations, case work, and peer learning helped me communicate numbers as decisions, not just reports.',
    linkedin: LINKEDIN_URL,
    image: '/images/about/iic-ceo.webp',
  },
  {
    name: 'Maria Garcia',
    classYear: '2017',
    role: 'UX Lead',
    company: 'DesignCo',
    location: 'Madrid',
    field: 'Design',
    quote: 'IIC gave me the confidence to listen deeply, prototype quickly, and defend design choices with evidence.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/sweta.JPG',
  },
  {
    name: 'Chen Wei',
    classYear: '2021',
    role: 'Software Engineer',
    company: 'CloudNet',
    location: 'Singapore',
    field: 'Technology',
    quote: 'The campus projects felt practical from day one, and that made the transition into engineering teams smoother.',
    linkedin: LINKEDIN_URL,
  },
  {
    name: 'Sophie Laurent',
    classYear: '2013',
    role: 'Marketing Director',
    company: 'LuxeLife',
    location: 'Paris',
    field: 'Marketing',
    quote: 'The network around IIC taught me how to build campaigns with strategy, empathy, and real audience insight.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/jen.JPG',
  },
  {
    name: 'Omar Al-Fayed',
    classYear: '2016',
    role: 'Operations Head',
    company: 'Logistix',
    location: 'Dubai',
    field: 'Finance',
    quote: 'I learned to stay calm inside complexity, which matters every day when operations move across borders.',
    linkedin: LINKEDIN_URL,
    image: '/images/about/ing-ceo.webp',
  },
  {
    name: 'Chloe Smith',
    classYear: '2020',
    role: 'Financial Analyst',
    company: 'Global Bank',
    location: 'London',
    field: 'Finance',
    quote: 'Mentors at IIC pushed me to ask better questions before reaching for the spreadsheet.',
    linkedin: LINKEDIN_URL,
  },
  {
    name: 'Prabin Limbu',
    classYear: '2022',
    role: 'QA Automation Engineer',
    company: 'SaaS Team',
    location: 'Remote',
    field: 'Technology',
    quote: 'The habit of testing assumptions early is the thing I carried from class into every release cycle.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/utsav.png',
  },
  {
    name: 'Manisha Basnet',
    classYear: '2023',
    role: 'Marketing Associate',
    company: 'EdTech Brand',
    location: 'Kathmandu',
    field: 'Marketing',
    quote: 'The alumni community made my first professional steps feel connected rather than lonely.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/kritika.JPG',
  },
  {
    name: 'Asmita Gurung',
    classYear: '2021',
    role: 'Client Success Lead',
    company: 'B2B Platform',
    location: 'Dubai',
    field: 'Finance',
    quote: 'IIC helped me pair business thinking with communication skills that clients can trust.',
    linkedin: LINKEDIN_URL,
    image: '/images/home/sweta.JPG',
  },
  {
    name: 'Rohit Pokharel',
    classYear: '2020',
    role: 'Data Associate',
    company: 'Research Ops',
    location: 'Lalitpur',
    field: 'Technology',
    quote: 'The best lesson was learning how to explain technical work simply enough that teams can act on it.',
    linkedin: LINKEDIN_URL,
  },
];

const fieldStyles: Record<string, { dot: string; soft: string; text: string; border: string }> = {
  Technology: {
    dot: 'bg-[#21409A]',
    soft: 'bg-[#eef3ff]',
    text: 'text-[#21409A]',
    border: 'border-[#d7e2ff]',
  },
  Finance: {
    dot: 'bg-[#74C044]',
    soft: 'bg-[#f1faeb]',
    text: 'text-[#4d982f]',
    border: 'border-[#d9efca]',
  },
  Design: {
    dot: 'bg-[#14B8A6]',
    soft: 'bg-[#e9fbf8]',
    text: 'text-[#0f766e]',
    border: 'border-[#bdeee4]',
  },
  Marketing: {
    dot: 'bg-[#F97316]',
    soft: 'bg-[#fff4eb]',
    text: 'text-[#c65a11]',
    border: 'border-[#fed7aa]',
  },
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

function useReliableReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const reveal = () => setIsVisible(true);
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.84 && rect.bottom > viewportHeight * 0.08) {
        reveal();
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const reducedMotionFrame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(reducedMotionFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { root: null, rootMargin: '0px 0px -16% 0px', threshold: 0.08 }
    );

    observer.observe(element);
    const firstFrame = requestAnimationFrame(checkVisibility);
    const timeouts = [450, 1100, 1500].map((delay) => window.setTimeout(checkVisibility, delay));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(firstFrame);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [isVisible]);

  return [ref, isVisible] as const;
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#d9e4f4] bg-[#eef1f6] px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
      <motion.div
        className="relative mx-auto max-w-[1280px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="relative overflow-hidden rounded-[8px] border border-[#d8dfea] bg-[#dce3ee] shadow-[0_30px_80px_-56px_rgba(16,24,40,0.78)]">
          <div className="relative min-h-[430px] md:min-h-[640px]">
            <div className="absolute inset-0">
              <Image
                src="/images/alumini/graduate.jpg"
                alt="IIC alumni graduation collage"
                fill
                className="object-cover grayscale contrast-125"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,241,246,0.72)_0%,rgba(238,241,246,0.3)_42%,rgba(238,241,246,0.12)_100%)]" />
            </div>

            <div className="absolute right-0 top-0 hidden h-full w-[64%] md:block" aria-hidden="true">
              <Image
                src="/images/about/networking.JPG"
                alt=""
                fill
                className="object-cover grayscale contrast-125"
                sizes="(max-width: 768px) 0px, 62vw"
              />
              <div className="absolute inset-0 bg-[#0f172a]/35" />
            </div>

            <div className="pointer-events-none absolute -right-10 top-6 h-40 w-72 bg-[#74C044]/45" aria-hidden="true" />
            <div className="pointer-events-none absolute right-16 top-40 h-28 w-80 bg-[#74C044]/35" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-16 right-6 h-40 w-96 bg-[#ED1C24]/50" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-10 right-28 h-20 w-[460px] bg-[#F4A51C]/70" aria-hidden="true" />
          </div>
        </div>

        <article className="relative -mt-10 border-[3px] border-[#0f172a] bg-white px-6 py-7 shadow-[0_30px_70px_-44px_rgba(16,24,40,0.62)] sm:px-8 md:absolute md:left-8 md:top-1/2 md:mt-0 md:w-[580px] md:-translate-y-1/2 md:px-10 md:py-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#3f5f8f]">
            <Sparkles className="h-3.5 w-3.5 text-[#74C044]" aria-hidden="true" />
            Alumni Voices
          </span>
          <h1 className="mt-5 max-w-[470px] font-[family-name:var(--font-sora)] text-[38px] font-black leading-[1.05] text-[#101828] sm:text-[48px] md:text-[62px]">
            Our Alumni,
            <span className="block text-[#74C044]">Our Pride</span>
          </h1>
          <p className="mt-5 max-w-[490px] text-sm font-semibold leading-7 text-[#667085] sm:text-base">
            Our alumni are creating impact as industry leaders, professionals, founders, and entrepreneurs—driving innovation, leading organizations, and shaping the future across Nepal and around the world.
          </p>
        </article>

        <div className="mt-10 h-px w-full bg-[#d6deeb] md:hidden" aria-hidden="true" />
        <div className="hidden md:block md:h-[80px]" aria-hidden="true" />
        <div className="hidden md:block md:h-[60px]" aria-hidden="true" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(238,241,246,0)_0%,rgba(238,241,246,1)_100%)]" aria-hidden="true" />
    </section>
  );
}


function AlumniQuoteRow({ person, index }: { person: AlumniProfile; index: number }) {
  const style = fieldStyles[person.field] ?? fieldStyles.Technology;
  const imageRight = index % 2 === 1;
  const [rowRef, isVisible] = useReliableReveal<HTMLElement>();

  return (
    <motion.article
      ref={rowRef}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14"
    >
      <motion.div
        initial={false}
        animate={isVisible ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: imageRight ? 80 : -80, rotate: imageRight ? 2 : -2 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
        className={`relative ${imageRight ? 'lg:order-2' : ''}`}
      >
        <div className={`absolute -bottom-5 h-32 w-32 ${imageRight ? '-left-5' : '-right-5'} ${style.soft}`} aria-hidden="true" />
        <div className={`absolute top-10 h-24 w-24 ${imageRight ? '-right-4' : '-left-4'} border ${style.border}`} aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[8px] border border-white bg-white p-5 shadow-[0_28px_70px_-48px_rgba(16,24,40,0.78)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#f7f8fb]">
            {person.image ? (
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover object-top transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            ) : (
              <span className="grid h-full w-full place-items-center text-5xl font-black text-[#98A2B3]">{initials(person.name)}</span>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(16,24,40,0.66))]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-white/75">Class of {person.classYear}</p>
                <h3 className="mt-1 font-[family-name:var(--font-sora)] text-2xl font-black leading-tight text-white">{person.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: imageRight ? -70 : 70 }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.14 }}
        className={`relative ${imageRight ? 'lg:order-1 lg:text-right' : ''}`}
      >
        <div className={`absolute top-0 hidden h-full w-1 ${style.dot} lg:block ${imageRight ? '-right-7' : '-left-7'}`} aria-hidden="true" />
        <Quote className={`h-16 w-16 ${style.text} opacity-25 ${imageRight ? 'ml-auto' : ''}`} aria-hidden="true" />
        <blockquote className="mt-5 font-[family-name:var(--font-sora)] text-2xl font-black leading-[1.35] text-[#475467] md:text-4xl md:leading-[1.32]">
          &ldquo;{person.quote}&rdquo;
        </blockquote>

        <div className={`mt-8 flex flex-col gap-2 ${imageRight ? 'lg:items-end' : ''}`}>
          <h3 className={`font-[family-name:var(--font-sora)] text-3xl font-black ${style.text}`}>{person.name}</h3>
          <p className="text-lg font-black text-[#101828]">{person.role}</p>
          <div className={`flex flex-wrap gap-3 text-sm font-bold text-[#667085] ${imageRight ? 'lg:justify-end' : ''}`}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_34px_-28px_rgba(16,24,40,0.7)]">
              <Building2 className="h-4 w-4 text-[#98A2B3]" aria-hidden="true" />
              {person.company}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_34px_-28px_rgba(16,24,40,0.7)]">
              <MapPin className="h-4 w-4 text-[#98A2B3]" aria-hidden="true" />
              {person.location}
            </span>
          </div>
        </div>

        <Link
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          aria-label={`Connect with ${person.name} on LinkedIn`}
          className={`mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#21409A] px-5 text-sm font-black text-white shadow-[0_18px_38px_-24px_rgba(33,64,154,0.95)] transition hover:bg-[#172f78] ${imageRight ? 'lg:ml-auto' : ''}`}
        >
          <span className="grid h-6 w-6 place-items-center rounded bg-white text-[14px] font-black leading-none text-[#21409A]">in</span>
          LinkedIn Contact
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </motion.article>
  );
}

function AlumniDirectory() {
  const featuredAlumni = alumni.filter((person) => person.image);

  return (
    <section id="directory" className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 md:py-24">
      <div className="relative mx-auto max-w-[1180px]">
        <div className="max-w-[720px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d9e4f4] bg-white px-4 py-2 text-xs font-black uppercase text-[#21409A] shadow-[0_14px_36px_-30px_rgba(33,64,154,0.7)]">
            <Sparkles className="h-3.5 w-3.5 text-[#74C044]" aria-hidden="true" />
            Alumni Voices
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-4xl font-black leading-tight text-[#101828] md:text-5xl">
            See where our Alumni have landed
          </h2>
        </div>

        <div className="relative mt-16 space-y-20 md:mt-20 md:space-y-28">
          {featuredAlumni.map((person, index) => (
            <AlumniQuoteRow key={person.name} person={person} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LegacyCta() {
  return (
    <section className="bg-[#21409A] px-5 py-16 text-white sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6 py-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/10 text-[#A8DF87]">
          <GraduationCap className="h-12 w-12" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-black text-white md:text-5xl">Be Part of the Legacy</h2>
        <p className="mx-auto mt-5 max-w-[650px] text-sm font-semibold leading-7 text-white/80 md:text-base">
          Ready to begin your journey at IIC? Apply now to gain industry-focused learning, global exposure, and the support to build a successful career.
        </p>
        <Link
          href="/admissions"
          className="mt-9 inline-flex min-h-11 items-center justify-center rounded-full bg-[#74C044] px-7 py-3.5 text-sm font-black text-white shadow-[0_16px_34px_-20px_rgba(116,192,68,0.95)] transition hover:bg-[#64ad3b]"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}

export default function AlumniPage() {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setAnimationKey((key) => key + 1);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <div key={animationKey} className="bg-[#eef3fb] text-[#101828]">
      <Hero />
      <AlumniDirectory />
      <LegacyCta />
    </div>
  );
}
