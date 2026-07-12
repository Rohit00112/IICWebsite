import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { absoluteAssetUrl } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Page Not Found | Itahari International College',
    description: 'The page you are looking for could not be found. Explore IIC’s UK-awarded IT and Business programmes instead.',
    images: [
      {
        url: absoluteAssetUrl('/og/home.png'),
        width: 1200,
        height: 630,
        alt: 'Itahari International College',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found | Itahari International College',
    description: 'The page you are looking for could not be found. Explore IIC’s UK-awarded IT and Business programmes instead.',
    images: [absoluteAssetUrl('/og/home.png')],
  },
};

function CoursesPreview() {
  return (
    <div className="relative h-[210px] w-full overflow-hidden rounded-md bg-white sm:h-[235px] lg:h-[260px]">
      <div className="absolute inset-x-0 top-3 text-center sm:top-4">
        <p className="font-[family-name:var(--font-sora)] text-[22px] font-medium text-[#f4b21b] sm:text-[26px]">Courses</p>
        <p className="mx-auto mt-1 max-w-[18rem] text-[7px] font-semibold uppercase tracking-[0.08em] text-[#9aa3ad] sm:text-[8px]">
          Explore our IT and Business programmes
        </p>
      </div>

      <div className="absolute bottom-8 left-[2%] h-[118px] w-[30%] sm:bottom-10 sm:h-[140px]">
        <Image
          src="/images/home/course2.png"
          alt="IIC student with laptop"
          fill
          className="object-contain object-bottom"
          sizes="180px"
        />
      </div>

      <div className="absolute bottom-[58px] left-[27%] h-[66px] w-[30%] rounded-[2px] bg-[#147fb2] p-3 text-white shadow-[0_12px_28px_-24px_rgba(21,35,58,0.8)] sm:bottom-[68px] sm:h-[78px]">
        <p className="text-[6px] font-semibold opacity-80 sm:text-[7px]">Bachelor in</p>
        <p className="mt-1 text-[16px] font-black leading-[0.85] sm:text-[19px]">
          Information
          <br />
          Technology
        </p>
      </div>

      <div className="absolute bottom-[58px] left-[58%] h-[66px] w-[28%] rounded-[2px] bg-[#16b6bd] p-3 text-white shadow-[0_12px_28px_-24px_rgba(21,35,58,0.8)] sm:bottom-[68px] sm:h-[78px]">
        <p className="text-[17px] font-black leading-none sm:text-[21px]">BBA</p>
        <p className="mt-2 text-[5px] font-semibold leading-tight opacity-90 sm:text-[6px]">
          Digital Business
          <br />
          Marketing
        </p>
      </div>

      <div className="absolute bottom-8 right-[1%] h-[128px] w-[29%] sm:bottom-10 sm:h-[152px]">
        <Image
          src="/images/home/course1.png"
          alt="IIC business student"
          fill
          className="object-contain object-bottom"
          sizes="180px"
        />
      </div>
    </div>
  );
}

function LifePreview() {
  return (
    <div className="relative h-[210px] w-full overflow-hidden rounded-md bg-white sm:h-[235px] lg:h-[260px]">
      <div className="absolute left-[4%] top-4 h-[150px] w-[31%] overflow-hidden shadow-[0_14px_34px_-26px_rgba(21,35,58,0.75)] sm:h-[174px]">
        <Image
          src="/images/lifestyle/carnival.JPG"
          alt="IIC carnival event"
          fill
          className="object-cover"
          sizes="180px"
        />
      </div>
      <div className="absolute left-[38%] top-12 flex h-[138px] w-[29%] items-center justify-center bg-[#d8544c] p-4 text-center text-white shadow-[0_14px_34px_-26px_rgba(21,35,58,0.75)] sm:h-[160px]">
        <p className="text-[11px] font-bold leading-relaxed sm:text-[13px]">
          IIC Industrial Fair brings student ideas to life.
        </p>
      </div>
      <div className="absolute right-[4%] top-10 text-center">
        <p className="text-[8px] font-semibold text-[#8b9098]">Experience</p>
        <p className="mt-1 text-[20px] font-bold leading-none text-[#f15f4d] sm:text-[26px]">
          The
          <br />
          Difference!
        </p>
      </div>
      <div className="absolute bottom-4 right-[3%] h-[76px] w-[31%] overflow-hidden shadow-[0_14px_34px_-26px_rgba(21,35,58,0.75)] sm:h-[88px]">
        <Image
          src="/images/lifestyle/sports-week.JPG"
          alt="IIC sports week"
          fill
          className="object-cover"
          sizes="180px"
        />
      </div>
      <div className="absolute bottom-3 left-[4%] h-[2px] w-[31%] bg-[#f15f4d]" />
      <p className="absolute bottom-[13px] left-[9%] text-[9px] font-semibold text-[#8b9098] sm:text-[10px]">Spring Carnival</p>
    </div>
  );
}

function IndustryPreview() {
  return (
    <div className="relative h-[210px] w-full overflow-hidden rounded-md bg-white sm:h-[235px] lg:h-[260px]">
      <div className="absolute left-[7%] right-[2%] top-3 h-[150px] overflow-hidden shadow-[0_14px_34px_-26px_rgba(21,35,58,0.75)] sm:h-[174px]">
        <Image
          src="/images/industry-exposure/industry-exposure.JPG"
          alt="IIC industry exposure group visit"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 92vw, 420px"
        />
      </div>
      <div className="absolute bottom-12 left-[16%] h-[72px] w-[7px] bg-[#e44d45]" />
      <div className="absolute bottom-8 left-[21%] right-[10%] bg-white px-5 py-4 shadow-[0_14px_28px_-22px_rgba(21,35,58,0.7)]">
        <p className="text-[18px] font-medium text-[#4a4a4a] sm:text-[22px]">Industry Exposure</p>
        <p className="mt-2 text-[7px] font-medium text-[#9aa3ad] sm:text-[8px]">
          Gain valuable industry experience and insight from experts.
        </p>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <main className="relative z-[130] -mt-8 min-h-screen overflow-hidden bg-white px-5 pb-20 pt-24 text-[#3b3b3b] sm:px-6 md:px-8 md:pb-28 md:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-5 shadow-[0_6px_18px_rgba(0,0,0,0.2)]" />

      <section className="mx-auto flex max-w-[1520px] flex-col items-center">
        <div className="max-w-[920px] text-center">
          <h1 className="text-[30px] font-black leading-tight tracking-tight text-[#3f3f3f] sm:text-[40px] md:text-[52px]">
            The page you&apos;re looking for doesn&apos;t exist.
          </h1>
          <p className="mt-4 text-[20px] font-medium leading-snug text-[#777] sm:text-[26px] md:text-[36px]">
            Perhaps these pages will help find what you&apos;re looking for.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-[1320px] gap-12 md:mt-24 md:grid-cols-3 md:gap-8 lg:gap-14">
          <Link href="/courses" className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:ring-offset-4">
            <div className="transition duration-300 group-hover:-translate-y-1 group-hover:opacity-95">
              <CoursesPreview />
            </div>
            <h2 className="mt-7 text-[28px] font-black tracking-tight text-[#444] md:text-[34px]">Our Courses</h2>
          </Link>

          <Link href="/life-at-iic" className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:ring-offset-4">
            <div className="transition duration-300 group-hover:-translate-y-1 group-hover:opacity-95">
              <LifePreview />
            </div>
            <h2 className="mt-7 text-[28px] font-black tracking-tight text-[#444] md:text-[34px]">Life At IIC</h2>
          </Link>

          <Link href="/industry-exposure" className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C044] focus-visible:ring-offset-4">
            <div className="transition duration-300 group-hover:-translate-y-1 group-hover:opacity-95">
              <IndustryPreview />
            </div>
            <h2 className="mt-7 text-[28px] font-black tracking-tight text-[#444] md:text-[34px]">Industry Exposure</h2>
          </Link>
        </div>
      </section>
    </main>
  );
}
