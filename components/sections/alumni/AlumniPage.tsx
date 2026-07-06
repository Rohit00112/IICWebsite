'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  Quote,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

type Spotlight = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
};

type Story = {
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  classYear: string;
  avatar: string;
};

type AlumniProfile = {
  name: string;
  classYear: string;
  role: string;
  company: string;
  location: string;
  field: string;
  image?: string;
};

const spotlights: Spotlight[] = [
  {
    quote: 'The foundations I built here were instrumental in shaping my approach to global tech infrastructure.',
    name: 'Dr. Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'TechCorp Global',
    image: '/images/home/jen.JPG',
  },
  {
    quote: 'IIC gave me the community, confidence, and practical exposure to lead with clarity in fast-moving teams.',
    name: 'Aisha Patel',
    role: 'Product Manager',
    company: 'Innovate AI',
    image: '/images/home/kritika.JPG',
  },
  {
    quote: 'The network stayed with me long after graduation. Mentors, peers, and juniors still open new doors.',
    name: 'Michael Chang',
    role: 'Founder & CEO',
    company: 'GreenEnergy Innovations',
    image: '/images/home/utsav.png',
  },
];

const successStories: Story[] = [
  {
    tag: 'Innovation',
    title: 'Revolutionizing AI in Healthcare',
    excerpt: 'How an IIC graduate turned practical computing experience into products that support smarter clinical workflows.',
    image: '/images/about/career.JPG',
    author: 'Dr. Shristi Nepal',
    classYear: 'Class of 2015',
    avatar: '/images/home/sweta.JPG',
  },
  {
    tag: 'Innovation',
    title: 'Building Sustainable Smart Cities',
    excerpt: 'From classroom prototypes to civic technology, this journey shows how alumni are shaping modern cities.',
    image: '/images/lifestyle/tech.JPG',
    author: 'Dr. Shristi Nepal',
    classYear: 'Class of 2015',
    avatar: '/images/home/jen.JPG',
  },
  {
    tag: 'Leadership',
    title: 'Scaling Teams Across Markets',
    excerpt: 'A business graduate’s path from campus presentations to leading operations across multiple regions.',
    image: '/images/about/networking.JPG',
    author: 'Dr. Shristi Nepal',
    classYear: 'Class of 2015',
    avatar: '/images/home/kritika.JPG',
  },
  {
    tag: 'Research',
    title: 'Turning Data Into Better Decisions',
    excerpt: 'A practical learning foundation helped this alumnus build analytics systems for growing businesses.',
    image: '/images/lifestyle/research.JPG',
    author: 'Dr. Shristi Nepal',
    classYear: 'Class of 2015',
    avatar: '/images/home/utsav.png',
  },
];

const alumni: AlumniProfile[] = [
  { name: 'David Kim', classYear: '2018', role: 'Senior Data Scientist', company: 'DataDyn', location: 'Seattle', field: 'Technology', image: '/images/home/utsav.png' },
  { name: 'Aisha Patel', classYear: '2019', role: 'Product Manager', company: 'Innovate AI', location: 'Austin', field: 'Technology', image: '/images/home/kritika.JPG' },
  { name: 'James Wilson', classYear: '2014', role: 'Investment Banker', company: 'Capital Partners', location: 'New York', field: 'Finance', image: '/images/about/iic-ceo.webp' },
  { name: 'Maria Garcia', classYear: '2017', role: 'UX Lead', company: 'DesignCo', location: 'Madrid', field: 'Design', image: '/images/home/sweta.JPG' },
  { name: 'Chen Wei', classYear: '2021', role: 'Software Engineer', company: 'CloudNet', location: 'Singapore', field: 'Technology' },
  { name: 'Sophie Laurent', classYear: '2013', role: 'Marketing Director', company: 'LuxeLife', location: 'Paris', field: 'Marketing', image: '/images/home/jen.JPG' },
  { name: 'Omar Al-Fayed', classYear: '2016', role: 'Operations Head', company: 'Logistix', location: 'Dubai', field: 'Finance', image: '/images/about/ing-ceo.webp' },
  { name: 'Chloe Smith', classYear: '2020', role: 'Financial Analyst', company: 'Global Bank', location: 'London', field: 'Finance' },
  { name: 'Prabin Limbu', classYear: '2022', role: 'QA Automation Engineer', company: 'SaaS Team', location: 'Remote', field: 'Technology', image: '/images/home/utsav.png' },
  { name: 'Manisha Basnet', classYear: '2023', role: 'Marketing Associate', company: 'EdTech Brand', location: 'Kathmandu', field: 'Marketing', image: '/images/home/kritika.JPG' },
  { name: 'Asmita Gurung', classYear: '2021', role: 'Client Success Lead', company: 'B2B Platform', location: 'Dubai', field: 'Finance', image: '/images/home/sweta.JPG' },
  { name: 'Rohit Pokharel', classYear: '2020', role: 'Data Associate', company: 'Research Ops', location: 'Lalitpur', field: 'Technology' },
];

const filters = ['All', 'Technology', 'Finance', 'Design', 'Marketing', 'Class of 2023'];

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#eef3fb] px-5 pb-16 pt-28 text-center sm:px-8 md:pb-20 md:pt-32">
      <motion.div
        className="relative mx-auto max-w-[980px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d9e3f2] bg-white px-4 py-2 text-xs font-black text-[#21409A] shadow-[0_12px_30px_-24px_rgba(33,64,154,0.8)]">
          <Sparkles className="h-3.5 w-3.5 text-[#74C044]" aria-hidden="true" />
          Connecting Excellence Worldwide
        </span>
        <h1 className="mx-auto mt-6 max-w-[760px] font-[family-name:var(--font-sora)] text-[46px] font-black leading-[1.02] text-[#101828] sm:text-6xl md:text-[76px]">
          Our Alumni,
          <span className="block text-[#74C044]">Our Pride</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[740px] text-base font-semibold leading-7 text-[#667085] md:text-lg">
          Connect, collaborate, and celebrate with the brightest minds from Itahari International College. Join a global community of innovators and leaders.
        </p>
        <Link
          href="/contact-us"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#74C044] px-7 py-3 text-sm font-black text-white shadow-[0_16px_34px_-18px_rgba(116,192,68,0.95)] transition hover:bg-[#64ad3b]"
        >
          Join the Network
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}

function SpotlightCard({ item }: { item: Spotlight }) {
  return (
    <article className="rounded-[8px] bg-white p-7 shadow-[0_18px_48px_-36px_rgba(16,24,40,0.45)]">
      <Quote className="h-8 w-8 text-[#74C044]/25" aria-hidden="true" />
      <p className="mt-5 min-h-[70px] text-sm font-semibold italic leading-6 text-[#475467]">&ldquo;{item.quote}&rdquo;</p>
      <div className="mt-7 flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#d9d9d9]">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
          ) : (
            <span className="grid h-full w-full place-items-center text-sm font-black text-[#667085]">{initials(item.name)}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-black leading-tight text-[#101828]">{item.name}</p>
          <p className="mt-1 text-xs font-bold text-[#21409A]">{item.role}</p>
          <p className="text-xs font-semibold text-[#667085]">{item.company}</p>
        </div>
      </div>
    </article>
  );
}

function AlumniSpotlight() {
  const [index, setIndex] = useState(0);
  const visible = [spotlights[index], spotlights[(index + 1) % spotlights.length]];
  const go = (direction: number) => setIndex((current) => (current + direction + spotlights.length) % spotlights.length);

  return (
    <section className="bg-[#eaf0f8] px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-black text-[#101828] md:text-4xl">Alumni Spotlight</h2>
            <p className="mt-2 text-sm font-semibold text-[#667085]">Exceptional journeys and inspiring achievements.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous alumni spotlight"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#667085] transition hover:text-[#21409A]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next alumni spotlight"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#667085] transition hover:text-[#21409A]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((item) => (
            <SpotlightCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group grid overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.06] shadow-[0_20px_60px_-46px_rgba(0,0,0,0.8)] sm:grid-cols-[0.45fr_0.55fr]">
      <div className="relative min-h-[210px] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
          sizes="(max-width: 768px) 100vw, 280px"
        />
        <div className="absolute inset-0 bg-[#0b0635]/30" />
      </div>
      <div className="p-6 text-white">
        <span className="inline-flex rounded-full bg-[#74C044] px-3 py-1 text-[10px] font-black text-white">{story.tag}</span>
        <h3 className="mt-5 font-[family-name:var(--font-sora)] text-xl font-black leading-tight">{story.title}</h3>
        <p className="mt-3 text-sm font-medium leading-6 text-white/60">{story.excerpt}</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image src={story.avatar} alt={story.author} fill className="object-cover" sizes="36px" />
          </div>
          <div>
            <p className="text-xs font-black leading-tight text-white">By {story.author}</p>
            <p className="text-[11px] font-semibold text-white/50">{story.classYear}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function SuccessStories() {
  return (
    <section className="bg-[#120b46] px-5 py-16 text-white sm:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-black md:text-4xl">Success Stories</h2>
            <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-white/58">
              Deep dives into the impactful work our alumni are doing around the world.
            </p>
          </div>
          <Link href="/news-and-events" className="inline-flex items-center gap-2 text-sm font-black text-white">
            View All Stories
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {successStories.map((story) => (
            <StoryCard key={story.title} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DirectoryCard({ person }: { person: AlumniProfile }) {
  return (
    <article className="rounded-[8px] bg-white p-6 text-center shadow-[0_18px_48px_-38px_rgba(16,24,40,0.5)]">
      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-[#d9d9d9]">
        {person.image ? (
          <Image src={person.image} alt={person.name} fill className="object-cover" sizes="80px" />
        ) : (
          <span className="grid h-full w-full place-items-center text-lg font-black text-[#98A2B3]">{initials(person.name)}</span>
        )}
      </div>
      <p className="mt-4 text-xs font-black text-[#667085]">{person.classYear}</p>
      <h3 className="mt-2 text-base font-black leading-tight text-[#101828]">{person.name}</h3>
      <p className="mt-1 text-xs font-bold text-[#21409A]">{person.role}</p>
      <div className="mt-3 space-y-1 text-xs font-semibold text-[#667085]">
        <p className="flex items-center justify-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
          {person.company}
        </p>
        <p className="flex items-center justify-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {person.location}
        </p>
      </div>
      <Link href="/contact-us" className="mt-7 inline-flex text-xs font-black text-[#667085] transition hover:text-[#21409A]">
        View Profile
      </Link>
    </article>
  );
}

function AlumniDirectory() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return alumni.filter((person) => {
      const matchesFilter =
        active === 'All' ||
        person.field === active ||
        (active === 'Class of 2023' && person.classYear === '2023');
      const matchesQuery =
        !normalizedQuery ||
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.role.toLowerCase().includes(normalizedQuery) ||
        person.company.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [active, query]);

  const shown = results.slice(0, visibleCount);

  return (
    <section id="directory" className="bg-[#eef3fb] px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-black text-[#101828] md:text-4xl">Alumni Directory</h2>
            <p className="mt-2 text-sm font-semibold text-[#667085]">Connect with peers across the globe.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <label className="flex min-h-11 flex-1 items-center gap-2 rounded-[8px] bg-white px-4 shadow-[0_12px_36px_-30px_rgba(16,24,40,0.6)] lg:w-[320px]">
              <Search className="h-4 w-4 text-[#98A2B3]" aria-hidden="true" />
              <span className="sr-only">Search alumni directory</span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(8);
                }}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#101828] placeholder:text-[#98A2B3] focus:outline-none"
                placeholder="Search by name, company..."
              />
            </label>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-white px-5 text-sm font-black text-[#344054] shadow-[0_12px_36px_-30px_rgba(16,24,40,0.6)]"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActive(filter);
                setVisibleCount(8);
              }}
              className={`min-h-9 rounded-full px-4 text-xs font-black transition ${
                active === filter ? 'bg-[#101828] text-white' : 'bg-white text-[#667085] hover:text-[#21409A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((person) => (
            <DirectoryCard key={person.name} person={person} />
          ))}
        </div>

        {shown.length === 0 && (
          <p className="mt-10 rounded-[8px] bg-white p-6 text-center text-sm font-bold text-[#667085]">No alumni match your search.</p>
        )}

        {visibleCount < results.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 4)}
              className="rounded-full bg-white px-6 py-3 text-xs font-black text-[#344054] shadow-[0_12px_36px_-30px_rgba(16,24,40,0.7)] transition hover:text-[#21409A]"
            >
              Load More Alumni
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function LegacyCta() {
  return (
    <section className="bg-[#e8eef8] px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px] rounded-[8px] bg-white px-6 py-16 text-center shadow-[0_18px_54px_-42px_rgba(16,24,40,0.55)]">
        <span className="mx-auto grid h-16 w-16 place-items-center text-[#74C044]">
          <GraduationCap className="h-12 w-12" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-black text-[#101828] md:text-4xl">Be Part of the Legacy</h2>
        <p className="mx-auto mt-4 max-w-[650px] text-sm font-semibold leading-6 text-[#667085]">
          Stay connected with your peers, access exclusive opportunities, and help guide the next generation of graduates.
        </p>
        <Link
          href="/contact-us"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#74C044] px-6 py-3 text-sm font-black text-white transition hover:bg-[#64ad3b]"
        >
          Join the Alumni Network
        </Link>
      </div>
    </section>
  );
}

export default function AlumniPage() {
  return (
    <div className="bg-[#eef3fb] text-[#101828]">
      <Hero />
      <AlumniSpotlight />
      <SuccessStories />
      <AlumniDirectory />
      <LegacyCta />
    </div>
  );
}
