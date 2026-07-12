'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const EASE = [0.22, 1, 0.36, 1] as const;

function useReliableReveal<T extends HTMLElement>(revealImmediately = false) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible || revealImmediately) return;

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
  }, [isVisible, revealImmediately]);

  return [ref, revealImmediately || isVisible] as const;
}

const stats = [
  { value: '60+', label: 'Enterprise Wi-Fi Access Points', accent: 'border-[#21409A]' },
  { value: '24/7', label: 'Smart Surveillance', accent: 'border-[#24C7A6]' },
  { value: '40+', label: 'Biometric Attendance', accent: 'border-[#74C044]', valueClass: 'text-[20px] md:text-[22px]' },
  { value: '5+', label: 'Enterprise Servers', accent: 'border-[#F4A51C]', valueClass: 'text-[20px] md:text-[22px]' },
];

const facilityCards = [
  {
    label: 'Library',
    labelClass: 'bg-[#3478F6]',
    title: 'Extensive Digital & Print Resources',
    description:
      'Empowering students to conduct thorough research and expand their intellectual horizons with vast collections.',
    image: '/images/common/library.JPG',
    className: 'min-h-[330px] md:min-h-[570px]',
  },
  {
    label: 'Lecture Theatres',
    labelClass: 'bg-[#F4A51C]',
    title: 'Immersive Learning Environments',
    description: 'Spacious tiered halls with high-quality AV setups, designed for engaging lectures and dynamic seminars.',
    image: '/images/common/lecture.JPG',
    className: 'min-h-[220px] md:min-h-[273px]',
  },
  {
    label: 'Computer Labs',
    labelClass: 'bg-[#19B985]',
    title: 'Cutting-edge Workstations',
    description: 'High-performance workstations loaded with industry-standard software for hands-on technical learning.',
    image: '/images/common/lab.JPG',
    className: 'min-h-[220px] md:min-h-[273px]',
  },
];

const featureRows = [
  {
    eyebrow: 'Interactive Spaces',
    title: 'Where Ideas Come to Life',
    description:
      'Equipped with premium audio-visual technology and comfortable seating, our seminar halls are designed to host guest lectures, workshops, and dynamic student presentations.',
    image: '/images/common/seminar.webp',
    cardTitle: 'Seminar Halls',
    cardDescription:
      'Our spacious seminar halls foster collaborative discussions and group activities, ensuring comprehensive understanding and academic growth.',
    bullets: ['High-definition projection systems', 'Acoustic soundproofing for clarity', 'Collaborative seating arrangements'],
    bulletColor: 'bg-[#8FD633]',
    reverse: false,
  },
  {
    eyebrow: 'Relax & Recharge',
    title: 'Vibrant Social Hub',
    description:
      'Our multi-cuisine cafeteria offers a hygienic, comfortable, and lively environment where students can unwind, share meals, and build lasting friendships outside the classroom.',
    image: '/images/about/cafeteria.webp',
    cardTitle: 'Cafeteria',
    cardDescription:
      'Indulge in delightful delicacies at our vibrant cafe providing the perfect spot for relaxation and socializing.',
    bullets: ['Diverse healthy menu options', 'Spacious indoor seating', 'Wi-fi enabled lounge areas'],
    bulletColor: 'bg-[#23A8F2]',
    reverse: true,
  },
  {
    eyebrow: 'Campus Architecture',
    title: 'Inspiring Environments',
    description:
      'The architectural elegance of our academic blocks is designed to foster a sense of pride and inspiration, providing naturally lit, well-ventilated spaces for all faculties.',
    image: '/images/our-infrastructure/academic-block.JPG',
    cardTitle: 'Academic Blocks',
    cardDescription:
      'Discover a campus decorated with modern architectural blocks creating an inspiring environment.',
    bullets: ['Modern aesthetic design', 'Eco-friendly sustainability features', 'Accessible infrastructure for all'],
    bulletColor: 'bg-[#23B9D6]',
    reverse: false,
  },
];


function HeroStat({ value, label, accent, valueClass }: (typeof stats)[number]) {
  return (
    <div className={`min-h-[74px] border-l-4 ${accent} rounded-xl bg-white px-4 py-3 shadow-[0_8px_20px_rgba(30,42,70,0.06)] md:min-h-[82px] md:px-5 md:py-3.5 md:shadow-[0_12px_28px_rgba(30,42,70,0.07)]`}>
      <p className={`font-black leading-[1.05] tracking-tight text-[#172033] ${valueClass ?? 'text-[24px] md:text-[28px]'}`}>{value}</p>
      <p className="mt-1.5 text-[8px] font-black uppercase leading-snug tracking-[0.1em] text-[#758196] md:text-[9px] md:tracking-[0.11em]">{label}</p>
    </div>
  );
}

function FacilityCard({
  label,
  labelClass,
  title,
  description,
  image,
  className,
  simplifyMotion,
}: (typeof facilityCards)[number] & { simplifyMotion: boolean }) {
  const [cardRef, isVisible] = useReliableReveal<HTMLElement>(simplifyMotion);

  return (
    <motion.article
      ref={cardRef}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: simplifyMotion ? 14 : 44 }}
      transition={{ duration: simplifyMotion ? 0.28 : 0.7, ease: EASE }}
      className={`group relative h-full overflow-hidden rounded-[22px] bg-[#0f1f36] shadow-[0_12px_26px_rgba(20,34,59,0.16)] md:shadow-[0_16px_36px_rgba(20,34,59,0.22)] ${className}`}
    >
      <Image
        src={image}
        alt={`${title} at Itahari International College`}
        fill
        quality={72}
        className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-105"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071326]/92 via-[#071326]/28 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-9">
        <span className={`inline-flex rounded-full ${labelClass} px-4 py-1.5 text-[10px] font-black text-white`}>
          {label}
        </span>
        <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight md:text-[30px]">{title}</h3>
        {description && <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/82">{description}</p>}
      </div>
    </motion.article>
  );
}

function FloatingInfoCard({
  title,
  description,
  side = 'right',
}: {
  title: string;
  description: string;
  side?: 'left' | 'right';
}) {
  const sideClass =
    side === 'left'
      ? 'md:left-[-24px] md:right-auto md:translate-x-0'
      : 'md:left-auto md:right-[-24px] md:translate-x-0';

  return (
    <div
      className={`relative z-10 mx-auto -mt-10 w-[calc(100%-1.5rem)] overflow-hidden rounded-2xl border border-white/90 bg-white/95 p-5 shadow-[0_14px_34px_rgba(28,47,75,0.14)] md:absolute md:-bottom-6 md:left-1/2 md:isolate md:mx-0 md:mt-0 md:w-[72%] md:-translate-x-1/2 md:rounded-[28px] md:bg-white/38 md:p-6 md:shadow-[0_24px_78px_rgba(28,47,75,0.20),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.45)] md:backdrop-blur-[34px] md:backdrop-saturate-[1.75] md:before:absolute md:before:inset-0 md:before:-z-10 md:before:bg-[linear-gradient(115deg,rgba(255,255,255,0.72)_0%,rgba(248,252,255,0.48)_44%,rgba(241,225,214,0.52)_100%)] md:before:content-[''] md:after:absolute md:after:inset-[3px] md:after:-z-10 md:after:rounded-[25px] md:after:border md:after:border-white/72 md:after:bg-[radial-gradient(circle_at_85%_18%,rgba(236,207,190,0.34),rgba(255,255,255,0.10)_44%,rgba(255,255,255,0.22)_100%)] md:after:content-[''] md:w-[292px] ${sideClass}`}
    >
      <div className="relative z-10">
        <h3 className="text-[20px] font-black tracking-tight text-[#121a2d] md:text-[24px]">{title}</h3>
        <p className="mt-3 text-[13px] font-bold leading-[1.65] text-[#4a5a71]">
          {description}
        </p>
      </div>
    </div>
  );
}

function FeatureRow({
  eyebrow,
  title,
  description,
  image,
  cardTitle,
  cardDescription,
  bullets,
  bulletColor,
  reverse,
  simplifyMotion,
}: (typeof featureRows)[number] & { simplifyMotion: boolean }) {
  const [rowRef, isVisible] = useReliableReveal<HTMLElement>(simplifyMotion);

  const imageBlock = (
    <motion.div
      initial={false}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : simplifyMotion ? { opacity: 0, y: 14 } : { opacity: 0, x: reverse ? 60 : -60 }}
      transition={{ duration: simplifyMotion ? 0.28 : 0.7, ease: EASE }}
      className="relative mx-auto w-full max-w-[610px] pb-0 md:pb-8"
    >
      <div className="relative min-h-[260px] overflow-hidden rounded-[20px] bg-white shadow-[0_12px_30px_rgba(21,35,58,0.1)] md:min-h-[390px] md:shadow-[0_18px_44px_rgba(21,35,58,0.13)]">
        <Image
          src={image}
          alt={`${cardTitle} at Itahari International College`}
          fill
          quality={72}
          className="object-cover"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <FloatingInfoCard title={cardTitle} description={cardDescription} side={reverse ? 'left' : 'right'} />
    </motion.div>
  );

  const contentBlock = (
    <motion.div
      initial={false}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : simplifyMotion ? { opacity: 0, y: 14 } : { opacity: 0, x: reverse ? -60 : 60 }}
      transition={{ duration: simplifyMotion ? 0.28 : 0.7, ease: EASE, delay: simplifyMotion ? 0 : 0.12 }}
      className="flex flex-col justify-center"
    >
      <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-[#55B862]">{eyebrow}</p>
      <h2 className="max-w-[520px] text-[36px] font-black leading-[0.98] tracking-tight text-[#172033] sm:text-[42px] md:text-[54px]">
        {title}
      </h2>
      <p className="mt-5 max-w-[540px] text-[14px] font-bold leading-[1.75] text-[#6c788d] md:mt-7 md:text-base">
        {description}
      </p>
      <ul className="mt-6 space-y-3 md:mt-8 md:space-y-4">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 text-sm font-black text-[#4c5b70]">
            <span className={`h-3 w-3 rounded-full ${bulletColor}`} />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section ref={rowRef} className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-20">
      {reverse ? (
        <>
          {contentBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {contentBlock}
        </>
      )}
    </section>
  );
}

export default function OurInfrastructurePage() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const shouldReduceMotion = useReducedMotion();
  const simplifyMotion = isMobile || Boolean(shouldReduceMotion);
  const [infrastructureHeadingRef, infrastructureHeadingVisible] = useReliableReveal<HTMLDivElement>(simplifyMotion);
  const [ctaRef, ctaVisible] = useReliableReveal<HTMLDivElement>(simplifyMotion);

  return (
    <div className="bg-[#eef3fb] font-iic text-[#172033]">

      <section className="mx-auto grid max-w-[1260px] items-center gap-10 px-5 pb-20 pt-24 sm:px-6 md:grid-cols-[0.86fr_1.14fr] md:gap-14 md:px-8 md:pb-28 md:pt-32 lg:pt-36">
        <motion.div
          initial={simplifyMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: simplifyMotion ? 0 : 0.6, ease: EASE }}
        >
          <h1 className="max-w-[575px] text-[38px] font-black leading-[1.02] tracking-tight text-[#172033] sm:text-[42px] md:text-[56px]">
            Top-Tier Infrastructure and Facilities for our Students
          </h1>
          <p className="mt-6 max-w-[545px] text-[14px] font-medium leading-[1.75] text-[#65738a] md:mt-7">
            IIC has top-notch facilities and equipment that support advanced and innovative learning methods providing students with access to cutting-edge technology, modern amenities, and comfortable spaces to enhance their academic experience.
          </p>
          <motion.div
            className="mt-8 grid max-w-[545px] grid-cols-2 gap-3"
            initial={simplifyMotion ? false : 'hidden'}
            animate="show"
            variants={{ show: { transition: { staggerChildren: simplifyMotion ? 0 : 0.08, delayChildren: simplifyMotion ? 0 : 0.2 } } }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <HeroStat {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative pb-16 md:pb-16"
          initial={simplifyMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: simplifyMotion ? 0 : 0.7, ease: EASE, delay: simplifyMotion ? 0 : 0.15 }}
        >
          {/* decorative accents */}
          <div className="absolute -right-3 -top-6 hidden h-28 w-28 rounded-[22px] border-[3px] border-[#74C044]/45 md:block" aria-hidden="true" />
          <div className="absolute bottom-6 right-6 hidden h-20 w-20 rounded-full bg-[#21409A]/[0.06] md:block" aria-hidden="true" />

          {/* image */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-[22px] shadow-[0_18px_44px_-26px_rgba(21,35,58,0.42)] sm:h-[360px] md:h-[540px] md:rounded-[24px] md:shadow-[0_30px_70px_-30px_rgba(21,35,58,0.5)]">
            <Image
              src="/images/our-infrastructure/infra.png"
              alt="Itahari International College Tower Block"
              fill
              preload
              quality={78}
              className="scale-[1.3] object-cover object-[30%_58%]"
              sizes="(max-width: 768px) 92vw, 640px"
            />
          </div>

          {/* testimonial card — overhangs outside the image, bottom-left */}
          <div className="absolute bottom-0 left-4 w-[calc(100%-2rem)] max-w-[24rem] rounded-[20px] bg-white p-5 shadow-[0_16px_36px_-24px_rgba(21,35,58,0.42)] md:-left-5 md:bottom-4 md:w-[21rem] md:max-w-[21rem] md:rounded-[22px] md:p-7 md:shadow-[0_30px_70px_-24px_rgba(21,35,58,0.45)]">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#dce6f2] ring-2 ring-[#74C044] ring-offset-2">
                <Image src="/images/our-infrastructure/ronal-niraula.png" alt="Ronal Niraula" fill quality={70} className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-black leading-tight text-[#172033]">Ronal Niraula</p>
                <p className="text-sm font-bold text-[#7a8597]">Class of 2021</p>
              </div>
              <span className="font-[family-name:var(--font-sora)] text-5xl font-black leading-none text-[#74C044]/50" aria-hidden="true">&rdquo;</span>
            </div>
            <p className="mt-5 text-[14px] font-bold italic leading-relaxed text-[#2e3a4d] md:mt-6 md:text-base">
              The laboratories and library provided the perfect ecosystem for my research and academic growth.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-6 md:px-8 md:pb-28">
        <motion.div
          ref={infrastructureHeadingRef}
          className="mb-8 text-center md:mb-11"
          initial={false}
          animate={infrastructureHeadingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: simplifyMotion ? 12 : 24 }}
          transition={{ duration: simplifyMotion ? 0.28 : 0.6, ease: EASE }}
        >
          <p className="text-[30px] font-black text-[#2d2f36] md:text-[40px]">Our</p>
          <h2 className="mt-3 text-[44px] font-black uppercase leading-none tracking-tight text-[#65BD53] sm:text-[58px] md:text-[78px] lg:text-[86px]">
            Infrastructure
          </h2>
          <p className="mx-auto mt-7 max-w-[760px] text-[13px] font-medium leading-relaxed text-[#1f2937]">
            Our State-Of-The-Art Facilities Are Meticulously Designed To Meet The Demands Of Modern Education, Providing You With The Perfect Environment To Thrive And Innovate.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <FacilityCard {...facilityCards[0]} simplifyMotion={simplifyMotion} />
          <div className="grid gap-6 lg:grid-rows-2">
            <FacilityCard {...facilityCards[1]} simplifyMotion={simplifyMotion} />
            <FacilityCard {...facilityCards[2]} simplifyMotion={simplifyMotion} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1320px] gap-16 px-5 pb-20 sm:px-6 md:gap-28 md:px-8 md:pb-36">
        {featureRows.map((row) => (
          <FeatureRow key={row.title} {...row} simplifyMotion={simplifyMotion} />
        ))}
      </div>

      <section className="bg-[#21409A] px-5 py-20 text-center text-white sm:px-6 md:px-8 md:py-28">
        <motion.div
          ref={ctaRef}
          className="mx-auto max-w-4xl"
          initial={false}
          animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: simplifyMotion ? 12 : 30 }}
          transition={{ duration: simplifyMotion ? 0.28 : 0.6, ease: EASE }}
        >
          <h2 className="text-[36px] font-black tracking-tight md:text-[62px]">What&apos;s Your Next Step?</h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base font-bold leading-relaxed text-white/76 md:mt-6 md:text-lg">
            Experience our world-class facilities firsthand and take the first step towards your successful career.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex min-w-[165px] items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#21409A] transition hover:bg-[#eef3fb]"
            >
              Schedule a Visit
            </Link>
            <Link
              href="/admissions"
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#74C044] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#65ad3b]"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
