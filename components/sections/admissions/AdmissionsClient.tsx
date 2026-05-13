'use client';

import React, { useState } from 'react';
import AdmissionsHero from './AdmissionsHero';
import ApplicationForm from './ApplicationForm';
import AdmissionsSidebar from './AdmissionsSidebar';

export default function AdmissionsClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <AdmissionsHero />

      {/* Main Content Grid */}
      <section className="relative w-full py-12 md:py-20 -mt-8 md:-mt-12 z-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Form Column */}
            <div className="lg:col-span-8 w-full">
              <ApplicationForm
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 w-full">
              <AdmissionsSidebar isSubmitted={isSubmitted} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
