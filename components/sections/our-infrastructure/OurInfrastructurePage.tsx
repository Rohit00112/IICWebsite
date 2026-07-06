import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '78', label: 'Enterprise Wi-Fi Access Points', accent: 'border-[#21409A]' },
  { value: '24/7', label: 'Smart Surveillance', accent: 'border-[#24C7A6]' },
  { value: 'Biometric', label: 'Attendance', accent: 'border-[#74C044]', valueClass: 'text-[20px] md:text-[22px]' },
  { value: 'Enterprise', label: 'Servers', accent: 'border-[#F4A51C]', valueClass: 'text-[20px] md:text-[22px]' },
  { value: 'High-End', label: 'Workstations', accent: 'border-[#23A8F2]', valueClass: 'text-[20px] md:text-[22px]' },
  { value: 'Hardware & IoT', label: 'Labs', accent: 'border-[#ED1C24]', valueClass: 'text-[18px] md:text-[20px]' },
];

const facilityCards = [
  {
    label: 'Library',
    labelClass: 'bg-[#3478F6]',
    title: 'Extensive Digital & Print Resources',
    description:
      'Empowering students to conduct thorough research and expand their intellectual horizons with vast collections.',
    image: '/images/common/library.JPG',
    className: 'min-h-[390px] md:min-h-[570px]',
  },
  {
    label: 'Lecture Theatres',
    labelClass: 'bg-[#F4A51C]',
    title: 'Immersive Learning Environments',
    description: 'Spacious tiered halls with high-quality AV setups, designed for engaging lectures and dynamic seminars.',
    image: '/images/common/lecture.JPG',
    className: 'min-h-[240px] md:min-h-[273px]',
  },
  {
    label: 'Computer Labs',
    labelClass: 'bg-[#19B985]',
    title: 'Cutting-edge Workstations',
    description: 'High-performance workstations loaded with industry-standard software for hands-on technical learning.',
    image: '/images/common/lab.JPG',
    className: 'min-h-[240px] md:min-h-[273px]',
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
    <div className={`min-h-[82px] border-l-4 ${accent} rounded-xl bg-white px-5 py-3.5 shadow-[0_12px_28px_rgba(30,42,70,0.07)]`}>
      <p className={`font-black leading-[1.05] tracking-tight text-[#172033] ${valueClass ?? 'text-[28px]'}`}>{value}</p>
      <p className="mt-1.5 text-[9px] font-black uppercase leading-snug tracking-[0.11em] text-[#758196]">{label}</p>
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
}: (typeof facilityCards)[number]) {
  return (
    <article className={`group relative h-full overflow-hidden rounded-[22px] bg-[#0f1f36] shadow-[0_16px_36px_rgba(20,34,59,0.22)] ${className}`}>
      <Image
        src={image}
        alt={`${title} at Itahari International College`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071326]/92 via-[#071326]/28 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-9">
        <span className={`inline-flex rounded-full ${labelClass} px-4 py-1.5 text-[10px] font-black text-white`}>
          {label}
        </span>
        <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight md:text-[30px]">{title}</h3>
        {description && <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/82">{description}</p>}
      </div>
    </article>
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
      className={`absolute -bottom-6 left-1/2 isolate w-[72%] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/85 bg-white/38 p-6 shadow-[0_24px_78px_rgba(28,47,75,0.20),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(255,255,255,0.45)] backdrop-blur-[34px] backdrop-saturate-[1.75] before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(115deg,rgba(255,255,255,0.72)_0%,rgba(248,252,255,0.48)_44%,rgba(241,225,214,0.52)_100%)] before:content-[''] after:absolute after:inset-[3px] after:-z-10 after:rounded-[25px] after:border after:border-white/72 after:bg-[radial-gradient(circle_at_85%_18%,rgba(236,207,190,0.34),rgba(255,255,255,0.10)_44%,rgba(255,255,255,0.22)_100%)] after:content-[''] md:w-[292px] md:p-6 ${sideClass}`}
    >
      <div className="relative z-10">
        <h3 className="text-[22px] font-black tracking-tight text-[#121a2d] md:text-[24px]">{title}</h3>
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
}: (typeof featureRows)[number]) {
  const imageBlock = (
    <div className="relative mx-auto w-full max-w-[610px] pb-8">
      <div className="relative min-h-[330px] overflow-hidden rounded-[20px] bg-white shadow-[0_18px_44px_rgba(21,35,58,0.13)] md:min-h-[390px]">
        <Image
          src={image}
          alt={`${cardTitle} at Itahari International College`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <FloatingInfoCard title={cardTitle} description={cardDescription} side={reverse ? 'left' : 'right'} />
    </div>
  );

  const contentBlock = (
    <div className="flex flex-col justify-center">
      <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-[#55B862]">{eyebrow}</p>
      <h2 className="max-w-[520px] text-[42px] font-black leading-[0.98] tracking-tight text-[#172033] md:text-[54px]">
        {title}
      </h2>
      <p className="mt-7 max-w-[540px] text-[15px] font-bold leading-[1.75] text-[#6c788d] md:text-base">
        {description}
      </p>
      <ul className="mt-8 space-y-4">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 text-sm font-black text-[#4c5b70]">
            <span className={`h-3 w-3 rounded-full ${bulletColor}`} />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
  return (
    <div className="bg-[#eef3fb] font-iic text-[#172033]">

      <section className="mx-auto grid max-w-[1260px] items-center gap-14 px-6 pb-24 pt-20 md:grid-cols-[0.86fr_1.14fr] md:px-8 md:pb-28 md:pt-24">
        <div>
          <h1 className="max-w-[575px] text-[42px] font-black leading-[1.02] tracking-tight text-[#172033] md:text-[56px]">
            Top-Tier Infrastructure and Facilities for our Students
          </h1>
          <p className="mt-7 max-w-[545px] text-[14px] font-medium leading-[1.75] text-[#65738a]">
            IIC has top-notch facilities and equipment that support advanced and innovative learning methods providing students with access to cutting-edge technology, modern amenities, and comfortable spaces to enhance their academic experience.
          </p>
          <div className="mt-8 grid max-w-[545px] grid-cols-2 gap-3">
            {stats.map((stat) => (
              <HeroStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="relative pb-24 md:pb-16">
          {/* decorative accents */}
          <div className="absolute -right-3 -top-6 hidden h-28 w-28 rounded-[22px] border-[3px] border-[#74C044]/45 md:block" aria-hidden="true" />
          <div className="absolute bottom-6 right-6 hidden h-20 w-20 rounded-full bg-[#21409A]/[0.06] md:block" aria-hidden="true" />

          {/* image */}
          <div className="relative h-[360px] w-full overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(21,35,58,0.5)] md:h-[540px]">
            <Image
              src="/images/our-infrastructure/infra.png"
              alt="Itahari International College Tower Block"
              fill
              preload
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>

          {/* testimonial card — overhangs outside the image, bottom-left */}
          <div className="absolute bottom-0 left-4 w-[calc(100%-2rem)] max-w-[24rem] rounded-[22px] bg-white p-6 shadow-[0_30px_70px_-24px_rgba(21,35,58,0.45)] md:-left-5 md:bottom-4 md:w-[21rem] md:max-w-[21rem] md:p-7">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#dce6f2] ring-2 ring-[#74C044] ring-offset-2">
                <Image src="/images/home/utsav.png" alt="Aasav Sharma" fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-black leading-tight text-[#172033]">Aasav Sharma</p>
                <p className="text-sm font-bold text-[#7a8597]">Class of 2024</p>
              </div>
              <span className="font-[family-name:var(--font-sora)] text-5xl font-black leading-none text-[#74C044]/50" aria-hidden="true">&rdquo;</span>
            </div>
            <p className="mt-6 text-[15px] font-bold italic leading-relaxed text-[#2e3a4d] md:text-base">
              The laboratories and library provided the perfect ecosystem for my research and academic growth.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-28 md:px-8">
        <div className="mb-11 text-center">
          <p className="text-[34px] font-black text-[#2d2f36] md:text-[40px]">Our</p>
          <h2 className="mt-3 text-[58px] font-black uppercase leading-none tracking-tight text-[#65BD53] md:text-[78px] lg:text-[86px]">
            Infrastructure
          </h2>
          <p className="mx-auto mt-7 max-w-[760px] text-[13px] font-medium leading-relaxed text-[#1f2937]">
            Our State-Of-The-Art Facilities Are Meticulously Designed To Meet The Demands Of Modern Education, Providing You With The Perfect Environment To Thrive And Innovate.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <FacilityCard {...facilityCards[0]} />
          <div className="grid gap-6 lg:grid-rows-2">
            <FacilityCard {...facilityCards[1]} />
            <FacilityCard {...facilityCards[2]} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1320px] gap-28 px-6 pb-28 md:px-8 md:pb-36">
        {featureRows.map((row) => (
          <FeatureRow key={row.title} {...row} />
        ))}
      </div>

      <section className="bg-[#21409A] px-6 py-28 text-center text-white md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-[42px] font-black tracking-tight md:text-[62px]">What&apos;s Your Next Step?</h2>
          <p className="mx-auto mt-6 max-w-[620px] text-lg font-bold leading-relaxed text-white/76">
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
        </div>
      </section>
    </div>
  );
}
