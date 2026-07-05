import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '2017', label: 'Established Since', accent: 'border-[#ED1C24]' },
  { value: '50+', label: 'Modern Labs', accent: 'border-[#24C7A6]' },
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
    title: 'Cutting-edge Tech',
    description: '',
    image: '/images/common/lecture.JPG',
    className: 'min-h-[240px] md:min-h-[273px]',
  },
  {
    label: 'Computer Labs',
    labelClass: 'bg-[#19B985]',
    title: 'Advanced Software',
    description: '',
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
    bullets: ['Diverse healthy menu options', 'Spacious indoor & outdoor seating', 'Wi-fi enabled lounge areas'],
    bulletColor: 'bg-[#23A8F2]',
    reverse: true,
  },
  {
    eyebrow: 'Campus Architecture',
    title: 'Inspiring Environments',
    description:
      'The architectural elegance of our academic blocks is designed to foster a sense of pride and inspiration, providing naturally lit, well-ventilated spaces for all faculties.',
    image: '/images/common/tower_block.JPG',
    cardTitle: 'Academic Blocks',
    cardDescription:
      'Discover a campus decorated with modern architectural blocks creating an inspiring environment.',
    bullets: ['Modern aesthetic design', 'Eco-friendly sustainability features', 'Accessible infrastructure for all'],
    bulletColor: 'bg-[#23B9D6]',
    reverse: false,
  },
];


function HeroStat({ value, label, accent }: (typeof stats)[number]) {
  return (
    <div className={`min-w-[190px] border-l-4 ${accent} rounded-xl bg-white px-7 py-4 shadow-[0_15px_38px_rgba(30,42,70,0.08)]`}>
      <p className="text-[32px] font-black leading-none tracking-tight text-[#172033]">{value}</p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#758196]">{label}</p>
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
    <article className={`group relative overflow-hidden rounded-[22px] bg-[#0f1f36] shadow-[0_16px_36px_rgba(20,34,59,0.22)] ${className}`}>
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

      <section className="mx-auto grid max-w-[1260px] items-center gap-12 px-6 pb-24 pt-20 md:grid-cols-[0.93fr_1.07fr] md:px-8 md:pb-28 md:pt-24">
        <div>
          <h1 className="max-w-[575px] text-[42px] font-black leading-[1.02] tracking-tight text-[#172033] md:text-[56px]">
            Top-Tier Infrastructure and Facilities for our Students
          </h1>
          <p className="mt-7 max-w-[545px] text-[14px] font-bold leading-[1.75] text-[#65738a]">
            IIC has top-notch facilities and equipment that support advanced and innovative learning methods providing students with access to cutting-edge technology, modern amenities, and comfortable spaces to enhance their academic experience.
          </p>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row">
            {stats.map((stat) => (
              <HeroStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="relative min-h-[410px] md:min-h-[520px]">
          <div className="absolute right-0 top-0 h-[390px] w-full overflow-hidden rounded-[22px] shadow-[0_22px_46px_rgba(21,35,58,0.18)] md:h-[488px] md:w-[520px]">
            <Image
              src="/images/common/tower_block.JPG"
              alt="Itahari International College Tower Block"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>

          <div className="absolute bottom-5 left-0 w-[340px] rounded-[20px] bg-white/94 p-6 shadow-[0_24px_56px_rgba(21,35,58,0.18)] backdrop-blur-md md:bottom-0 md:left-[44px] md:w-[380px]">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#dce6f2]">
                <Image src="/images/home/utsav.png" alt="Aasav Sharma" fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-[15px] font-black leading-tight text-[#172033]">Aasav Sharma</p>
                <p className="text-xs font-bold text-[#7a8597]">Class of 2024</p>
              </div>
            </div>
            <p className="mt-5 text-[13px] font-bold italic leading-relaxed text-[#2e3a4d]">
              &ldquo;The laboratories and library provided the perfect ecosystem for my research and academic growth.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-28 md:px-8">
        <div className="mb-11 text-center">
          <p className="text-[34px] font-black text-[#2d2f36] md:text-[40px]">Our</p>
          <h2 className="mt-3 text-[58px] font-black uppercase leading-none tracking-tight text-[#65BD53] md:text-[78px] lg:text-[86px]">
            Infrastructure
          </h2>
          <p className="mx-auto mt-7 max-w-[760px] text-[13px] font-semibold leading-relaxed text-[#1f2937]">
            Our State-Of-The-Art Facilities Are Meticulously Designed To Meet The Demands Of Modern Education, Providing You With The Perfect Environment To Thrive And Innovate.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2.08fr_1fr]">
          <FacilityCard {...facilityCards[0]} />
          <div className="grid gap-6">
            <FacilityCard {...facilityCards[1]} />
            <FacilityCard {...facilityCards[2]} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1120px] gap-28 px-6 pb-28 md:px-8 md:pb-36">
        {featureRows.map((row) => (
          <FeatureRow key={row.title} {...row} />
        ))}
      </div>

      <section className="bg-[#073044] px-6 py-28 text-center text-white md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-[42px] font-black tracking-tight md:text-[62px]">What&apos;s Your Next Step?</h2>
          <p className="mx-auto mt-6 max-w-[620px] text-lg font-bold leading-relaxed text-white/68">
            Experience our world-class facilities firsthand and take the first step towards your successful career.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex min-w-[165px] items-center justify-center rounded-full border-2 border-white/80 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white hover:text-[#073044]"
            >
              Schedule a Visit
            </Link>
            <Link
              href="/admissions"
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#294FC4] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#21409A]"
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
