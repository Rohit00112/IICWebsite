import Image from 'next/image';
import Link from 'next/link';
import { Home, SearchCheck, UsersRound } from 'lucide-react';

const committeeRows = [
  {
    sn: '01',
    name: '—',
    position: '—',
    degree: '—',
    expertise: '—',
    remarks: 'Convener',
  },
  {
    sn: '02',
    name: '—',
    position: '—',
    degree: '—',
    expertise: '—',
    remarks: 'Secretariat',
  },
  {
    sn: '03',
    name: '—',
    position: '—',
    degree: '—',
    expertise: '—',
    remarks: 'Member',
  },
  {
    sn: '04',
    name: '—',
    position: '—',
    degree: '—',
    expertise: '—',
    remarks: 'Member',
  },
  {
    sn: '05',
    name: '—',
    position: '—',
    degree: '—',
    expertise: '—',
    remarks: 'Member',
  },
];

function CommitteeTable() {
  return (
    <>
      <div className="hidden overflow-hidden border border-[#e0e6ef] bg-white shadow-[0_20px_60px_rgba(22,36,60,0.08)] md:block">
        <div className="bg-[#ED1C24] px-6 py-6 text-white">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/72">RMC</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Committee Structure</h2>
        </div>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Research Management Committee role table</caption>
          <thead className="bg-[#21409A] text-white">
            <tr>
              <th className="w-[76px] px-5 py-5 text-xs font-black uppercase tracking-[0.12em]">SN</th>
              <th className="px-5 py-5 text-xs font-black uppercase tracking-[0.12em]">Full Name (Alphabetical Order)</th>
              <th className="px-5 py-5 text-xs font-black uppercase tracking-[0.12em]">Current Academic Position/Rank</th>
              <th className="px-5 py-5 text-xs font-black uppercase tracking-[0.12em]">Highest Academic Degree</th>
              <th className="px-5 py-5 text-xs font-black uppercase tracking-[0.12em]">Major Field of Expertise</th>
              <th className="px-5 py-5 text-xs font-black uppercase tracking-[0.12em]">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {committeeRows.map((row) => (
              <tr key={row.sn} className="border-b border-[#e8edf4] last:border-b-0">
                <td className="px-5 py-6 text-sm font-black text-[#ED1C24]">{row.sn}</td>
                <td className="px-5 py-6 text-sm font-black text-[#172033]">{row.name}</td>
                <td className="px-5 py-6 text-sm font-semibold leading-relaxed text-[#64748b]">{row.position}</td>
                <td className="px-5 py-6 text-sm font-semibold leading-relaxed text-[#4f5f75]">{row.degree}</td>
                <td className="px-5 py-6 text-sm font-semibold leading-relaxed text-[#4f5f75]">{row.expertise}</td>
                <td className="px-5 py-6 text-sm font-black text-[#21409A]">{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        <div className="bg-[#ED1C24] px-5 py-6 text-white">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/72">RMC</p>
          <h2 className="mt-2 text-3xl font-black leading-tight">Committee Structure</h2>
        </div>
        {committeeRows.map((row) => (
          <article key={row.sn} className="border border-[#e0e6ef] bg-white p-5 shadow-[0_14px_34px_rgba(22,36,60,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#ED1C24] text-sm font-black text-white">
                {row.sn}
              </span>
              <span className="text-right text-xs font-black uppercase tracking-[0.16em] text-[#21409A]">
                {row.remarks}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-black text-[#172033]">{row.name}</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-[#64748b]">
              <span className="text-[#21409A]">Position:</span> {row.position}
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#4f5f75]">
              <span className="text-[#21409A]">Degree:</span> {row.degree}
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#4f5f75]">
              <span className="text-[#21409A]">Expertise:</span> {row.expertise}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-[#15275c]">
      <Image
        src="/images/lifestyle/research.JPG"
        alt="Students collaborating on research at Itahari International College"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#15275c]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#15275c]/96 via-[#15275c]/72 to-[#15275c]/22" />
      <div
        className="absolute bottom-0 right-0 h-28 w-[52vw] bg-[#21409A]"
        style={{ clipPath: 'polygon(18% 42%, 100% 0, 100% 100%, 0 100%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 h-2 w-[52vw] bg-[#ED1C24]"
        style={{ clipPath: 'polygon(18% 42%, 100% 0, 100% 100%, 0 100%)' }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-[12vw] z-10 text-5xl font-black tracking-[0.2em] text-white md:text-6xl"
        style={{ bottom: '1rem' }}
      >
        RMC
      </span>

      <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[1180px] flex-col justify-end px-5 pb-24 pt-24 sm:px-8 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-3 text-sm font-black text-white/72">
          <Link href="/" className="inline-flex items-center gap-2 transition hover:text-white">
            <Home className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
          <span aria-hidden="true" className="text-[#74C044]">/</span>
          <span className="text-white">Research Management Committee</span>
        </nav>

        <p className="inline-flex w-fit items-center gap-2 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#21409A] shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
          <SearchCheck className="h-4 w-4 text-[#74C044]" aria-hidden="true" />
          Research Governance
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl">
          Research Management Committee
        </h1>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-white/78 md:text-xl">
          Supporting ethical inquiry, academic quality, and student-faculty research practice at Itahari International College.
        </p>
      </div>
    </section>
  );
}

function ResearchEcosystemCta() {
  return (
    <section className="relative overflow-hidden bg-[#f5f7fa] px-5 py-20 text-center sm:px-8 md:py-28">
    

      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="text-xs font-black uppercase tracking-[0.36em] text-[#74C044]">
          IIC Research Ecosystem
        </p>
        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#172033] md:text-6xl">
          Building a stronger academic research culture
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-base font-bold leading-relaxed text-[#5c6b82] md:text-xl">
          Research at IIC grows through globally connected academics, industry-aware projects, and a campus culture that values evidence, curiosity, and responsible innovation.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="relative h-24 w-80">
            <Image
              src="/images/common/iic_logo.png"
              alt="Itahari International College"
              fill
              className="object-contain"
              sizes="320px"
            />
          </div>
        </div>

        <Link
          href="/admissions"
          className="mt-12 inline-flex w-full items-center justify-center gap-3 bg-[#ED1C24] px-10 py-4 text-sm font-black text-white transition hover:bg-[#c0141b] sm:w-auto"
        >
          Apply Now
          <UsersRound className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default function RmcPage() {
  return (
    <div className="bg-white text-[#172033]">
      <HeroSection />
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <CommitteeTable />
        </div>
      </section>
      <ResearchEcosystemCta />
    </div>
  );
}
